# n8n 백엔드 테스트 가이드

## 1. n8n 워크플로우 설정

### 문서 생성 워크플로우

1. **Webhook 노드 추가**
   - Method: POST
   - Path: `/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2`
   - Response Mode: Respond to Webhook
   - Response Data: Last Node

2. **Function 노드 - 입력 검증**
   ```javascript
   const input = $json.body;

   // 입력 검증
   if (!input.topic || !input.goal || !input.tone) {
     throw new Error('Missing required fields');
   }

   return {
     json: {
       topic: input.topic,
       goal: input.goal,
       tone: input.tone,
       docType: input.docType,
       userType: input.userType
     }
   };
   ```

3. **HTTP Request 노드 - 공공데이터 API 호출 (선택)**
   - Method: GET
   - URL: 공공데이터포털 API URL
   - Authentication: API Key

4. **AI 노드 (OpenAI/Claude)**
   - Model: GPT-4 또는 Claude
   - Prompt:
   ```
   당신은 전문 문서 작성 AI입니다.

   사용자 정보:
   - 주제: {{$json.topic}}
   - 목표: {{$json.goal}}
   - 톤: {{$json.tone}}
   - 문서 타입: {{$json.docType}}
   - 사용자 유형: {{$json.userType}}

   위 정보를 바탕으로 다음 JSON 형식의 문서를 생성해주세요:
   {
     "title": "문서 제목",
     "sections": [
       {
         "heading": "섹션 1 제목",
         "content": "섹션 1 내용 (최소 100자 이상)"
       },
       {
         "heading": "섹션 2 제목",
         "content": "섹션 2 내용 (최소 100자 이상)"
       }
     ]
   }

   중요: 반드시 JSON 형식으로만 응답하세요.
   ```

5. **Function 노드 - 응답 포맷팅**
   ```javascript
   const aiResponse = $json.message.content[0].text;

   try {
     // AI 응답에서 JSON 추출
     const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
     if (!jsonMatch) {
       throw new Error('Invalid AI response format');
     }

     const result = JSON.parse(jsonMatch[0]);

     // 응답 검증
     if (!result.title || !Array.isArray(result.sections)) {
       throw new Error('Missing required fields in response');
     }

     return { json: result };
   } catch (error) {
     // 에러 시 기본 응답
     return {
       json: {
         title: "문서 생성 오류",
         sections: [
           {
             heading: "오류 발생",
             content: "AI 문서 생성 중 오류가 발생했습니다. 다시 시도해주세요."
           }
         ]
       }
     };
   }
   ```

### 챗봇 워크플로우

1. **Webhook 노드**
   - Method: POST
   - Path: `/webhook/chatbot`
   - Response Mode: Respond to Webhook

2. **Function 노드 - 메시지 처리**
   ```javascript
   const userMessage = $json.body.message;

   return {
     json: {
       message: userMessage,
       timestamp: new Date().toISOString()
     }
   };
   ```

3. **AI Agent 노드**
   - Prompt:
   ```
   당신은 공공데이터 검색 전문 챗봇입니다.
   사용자의 요청에 따라 적절한 데이터셋을 추천해주세요.

   사용자 메시지: {{$json.message}}

   다음 형식으로 응답하세요:
   - 관련 데이터셋 목록 (✅ 이모지 사용)
   - 간단한 설명
   - 활용 방안
   ```

4. **Function 노드 - 응답 생성**
   ```javascript
   const aiReply = $json.message.content[0].text;

   return {
     json: {
       reply: aiReply,
       datasetsFound: true,
       showProceedButton: true
     }
   };
   ```

## 2. 테스트 방법

### curl로 테스트

#### 문서 생성 API 테스트
```bash
curl -X POST https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2 \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "반려동물 동반 여행 시장 분석",
    "goal": "투자 유치용",
    "tone": "전문적이고 신뢰감 있는",
    "docType": "시장 분석 리포트",
    "userType": "창업자 & 스타트업",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }'
```

**예상 응답:**
```json
{
  "title": "반려동물 동반 여행 시장 분석 보고서",
  "sections": [
    {
      "heading": "1. 시장 개요",
      "content": "2024년 국내 반려동물 양육 가구는..."
    },
    {
      "heading": "2. 타겟 고객 분석",
      "content": "핵심 타겟은 2030 MZ세대..."
    }
  ]
}
```

#### 챗봇 API 테스트
```bash
curl -X POST https://n8n.dpgtestbed.kr/webhook/chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "message": "부산 관광 관련 데이터 찾아줘",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }'
```

**예상 응답:**
```json
{
  "reply": "부산 관광 관련 데이터셋을 찾았습니다!\n\n✅ 부산시 관광 통계\n✅ 해운대 유동인구 데이터\n✅ 부산 숙박시설 현황",
  "datasetsFound": true,
  "showProceedButton": true
}
```

### Postman으로 테스트

1. **새 Request 생성**
   - Method: POST
   - URL: `https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2`

2. **Headers 설정**
   ```
   Content-Type: application/json
   ```

3. **Body (raw JSON)**
   ```json
   {
     "topic": "스마트시티 솔루션",
     "goal": "투자 유치용",
     "tone": "전문적이고 신뢰감 있는",
     "docType": "IR 피치덱",
     "userType": "창업자 & 스타트업"
   }
   ```

## 3. 문제 해결

### CORS 오류
**증상:** 브라우저 콘솔에 CORS 에러 표시

**해결방법:**
n8n 설정에서 CORS 허용:
```yaml
environment:
  - N8N_CORS_ORIGIN=*
```

또는 Webhook 응답 헤더에 추가:
```javascript
return {
  json: result,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
};
```

### 타임아웃 오류
**증상:** 30초 후 요청 취소

**해결방법:**
1. n8n 워크플로우 최적화 (불필요한 노드 제거)
2. AI 모델 응답 시간 단축 (더 빠른 모델 사용)
3. 프론트엔드 타임아웃 시간 증가 (.env):
   ```
   VITE_API_TIMEOUT=60000
   ```

### JSON 파싱 오류
**증상:** "Invalid response format from server"

**해결방법:**
AI 응답을 정확한 JSON 형식으로 변환:
```javascript
// Function 노드에서 JSON 추출 및 검증
const aiResponse = $json.message.content[0].text;
const cleaned = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
const result = JSON.parse(cleaned);

// 필수 필드 검증
if (!result.title) result.title = "제목 없음";
if (!Array.isArray(result.sections)) result.sections = [];

return { json: result };
```

## 4. 프로덕션 체크리스트

- [ ] n8n 워크플로우 활성화
- [ ] CORS 설정 확인
- [ ] API 키 보안 설정
- [ ] 에러 핸들링 구현
- [ ] Rate Limiting 설정
- [ ] 로그 모니터링 설정
- [ ] 백업 워크플로우 준비
- [ ] 응답 시간 최적화 (< 10초)
- [ ] 부하 테스트 수행
- [ ] .env 파일 프로덕션 URL로 업데이트

## 5. 모니터링

n8n 대시보드에서 확인:
- 워크플로우 실행 횟수
- 평균 실행 시간
- 에러 발생 빈도
- 성공/실패 비율

---

**준비되셨나요? 이제 실제 n8n 워크플로우를 만들어보세요!** 🚀
