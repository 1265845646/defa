import { WEBHOOK_URL, CHATBOT_URL, API_TIMEOUT, GeneratedDocData } from './constants';

// API Request with timeout and error handling
async function apiRequest<T>(
  url: string,
  data: Record<string, any>,
  timeout: number = API_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Generate document via n8n webhook
export async function generateDocument(params: {
  topic: string;
  goal: string;
  tone: string;
  docType: string;
  userType: string;
}): Promise<GeneratedDocData> {
  return apiRequest<GeneratedDocData>(WEBHOOK_URL, params);
}

// Send chatbot message via n8n
export async function sendChatMessage(message: string): Promise<{
  reply?: string;
  message?: string;
  datasetsFound?: boolean;
  showProceedButton?: boolean;
}> {
  return apiRequest(CHATBOT_URL, { message });
}

// Error message helper
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return "요청 시간이 초과되었습니다.\n네트워크 연결을 확인하고 다시 시도해주세요.";
    } else if (error.message.includes('Failed to fetch')) {
      return "서버에 연결할 수 없습니다.\n네트워크 연결과 n8n 서버 상태를 확인해주세요.";
    } else {
      return `오류가 발생했습니다:\n${error.message}`;
    }
  }
  return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
}
