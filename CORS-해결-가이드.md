# CORS 오류 해결 가이드

## 현재 발생하는 오류

```
Access to fetch at 'https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2'
from origin 'http://localhost:3000' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## CORS란?

CORS (Cross-Origin Resource Sharing)는 브라우저 보안 기능으로, 다른 도메인의 리소스에 접근할 때 발생합니다.

- **프론트엔드**: `http://localhost:3000`
- **백엔드**: `https://n8n.dpgtestbed.kr`
- **문제**: 서로 다른 도메인이므로 CORS 허용 필요

## 해결 방법

### 방법 1: n8n 워크플로우에서 CORS 헤더 추가 (권장)

n8n 워크플로우의 **Respond to Webhook** 노드 또는 **마지막 노드**에서 응답 헤더를 추가하세요.

#### Respond to Webhook 노드 설정

1. **Options** → **Response Headers** 추가:

```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}
```

또는 Function 노드에서:

```javascript
// n8n Function 노드
return {
  json: {
    // 응답 데이터
    ...yourData
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
};
```

### 방법 2: n8n 서버 설정 (Docker 사용 시)

`docker-compose.yml` 파일에 환경 변수 추가:

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_CORS_ORIGIN=*
      - N8N_WEBHOOK_URL=https://n8n.dpgtestbed.kr/
    volumes:
      - ~/.n8n:/home/node/.n8n
```

재시작:
```bash
docker-compose down
docker-compose up -d
```

### 방법 3: Nginx 리버스 프록시 사용 (프로덕션 권장)

```nginx
server {
    listen 80;
    server_name n8n.dpgtestbed.kr;

    location / {
        proxy_pass http://localhost:5678;

        # CORS 헤더 추가
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;

        # Preflight 요청 처리
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 방법 4: 개발 중 임시 해결 (Chrome 확장 프로그램)

**주의: 개발 중에만 사용하세요!**

Chrome 확장 프로그램 설치:
- [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

설치 후 아이콘 클릭하여 활성화

## n8n 워크플로우 예시

### 챗봇 워크플로우

```
[Webhook] → [Function: 입력처리] → [AI/데이터처리] → [Function: 응답포맷] → [Respond to Webhook]
```

**Respond to Webhook 노드 설정:**
- Response Mode: `Respond to Webhook`
- Response Data: `Last Node`
- Response Headers:
  ```json
  {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  }
  ```

## 테스트 방법

### 1. CURL로 테스트 (CORS 없이)

```bash
curl -X POST https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2 \
  -H "Content-Type: application/json" \
  -d '{"topic": "부산 청년 실업률"}' \
  -v
```

**확인할 것:**
- 응답 헤더에 `Access-Control-Allow-Origin: *`가 포함되어 있는지

### 2. 브라우저 개발자 도구로 테스트

1. F12 → Network 탭 열기
2. 챗봇에서 메시지 전송
3. n8n 요청 클릭
4. Headers 탭에서 확인:
   - Request Headers에 `Origin: http://localhost:3000`
   - Response Headers에 `Access-Control-Allow-Origin: *`

### 3. Preflight 요청 확인

브라우저는 POST 전에 OPTIONS 요청을 먼저 보냅니다:

```bash
curl -X OPTIONS https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2 \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**예상 응답:**
```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 현재 프론트엔드 설정

프론트엔드는 이미 올바르게 설정되어 있습니다:

```typescript
// App.tsx - ChatbotPage
const response = await fetch(CHATBOT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    topic: userMsg,
    timestamp: new Date().toISOString()
  }),
  signal: controller.signal
});
```

**문제는 백엔드(n8n)에서 CORS 헤더를 보내지 않는 것입니다.**

## 체크리스트

- [ ] n8n 워크플로우에서 CORS 헤더 추가
- [ ] OPTIONS 요청 처리 확인
- [ ] CURL로 테스트 (응답 헤더 확인)
- [ ] 브라우저에서 테스트
- [ ] 개발자 도구에서 Network 탭 확인
- [ ] preflight 요청 성공 확인

## 프로덕션 배포 시 주의사항

**보안을 위해 `*` 대신 특정 도메인만 허용하세요:**

```json
{
  "Access-Control-Allow-Origin": "https://yourdomain.com",
  "Access-Control-Allow-Credentials": "true"
}
```

## 추가 도움말

- n8n 공식 문서: https://docs.n8n.io/hosting/configuration/
- CORS 설명: https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

---

**도움이 필요하면 n8n 워크플로우 설정을 확인하고, CORS 헤더가 올바르게 추가되었는지 확인하세요!** 🚀
