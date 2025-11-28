# n8n 백엔드 응답 구조 가이드

## 📋 현재 n8n 응답 구조

프론트엔드가 n8n에서 받는 실제 응답 구조입니다.

### 전체 응답 구조

```typescript
Array<{
  parsed: Array<{
    body: {
      topic: string;
      content: {
        문제정의: string;
        핵심키워드: string[];
        필요한데이터셋: Array<{
          데이터명: string;
          내용: string;
          출처: string;
        }>;
        분석방향: string[];
      };
    };
  }>;
  body: {
    topic: string;
    content: Array<{
      query: string;
      datasets: Array<{
        id: string;
        title: string;
        contents: Array<{
          제공기관?: string;
          서비스유형?: string;
          다운로드수?: string;
          조회수?: string;
          등록일?: string;
          수정일?: string;
          분류?: string;
          서비스명?: string;
          서비스설명?: string;
        }>;
      }>;
    }>;
  };
}>
```

## 📝 실제 응답 예시

```json
[
  {
    "parsed": [
      {
        "body": {
          "topic": "부산 청년 실업률 문제 해결을 위한 데이터 기획",
          "content": {
            "문제정의": "부산 지역의 청년 실업률 문제를 파악하고 해결 방안을 제시하기 위한 데이터 분석",
            "핵심키워드": [
              "부산",
              "청년",
              "실업률",
              "고용",
              "경제활동",
              "구직",
              "산업별 동향"
            ],
            "필요한데이터셋": [
              {
                "데이터명": "부산 청년 고용 현황 데이터",
                "내용": "부산 지역 내 청년층(만 15~34세)의 고용 상태, 실업률, 취업 직종별 분포",
                "출처": "통계청 지역별 고용조사, 부산광역시 일자리 포털"
              },
              {
                "데이터명": "청년 구직 활동 및 교육 수준 데이터",
                "내용": "청년 구직자의 교육 수준, 전공, 구직 기간, 구직 방식",
                "출처": "한국고용정보원, 지역 대학 및 직업훈련센터"
              }
            ],
            "분석방향": [
              "청년 실업률과 교육 수준 및 전공의 상관관계 분석",
              "부산 내 산업별 청년 고용 수요 및 공급 미스매치 파악"
            ]
          }
        }
      }
    ],
    "body": {
      "topic": "부울경 산업별 고용·청년 실업 관련 데이터셋 정리",
      "content": [
        {
          "query": "부산 청년 실업률 통계",
          "datasets": [
            {
              "id": "74",
              "title": "데이터셋_목록.jsonl",
              "contents": [
                {
                  "제공기관": "부산광역시",
                  "서비스유형": "F S M",
                  "다운로드수": "909",
                  "조회수": "4056",
                  "등록일": "2020-03-23",
                  "수정일": "2025-08-26",
                  "분류": "공공행정",
                  "서비스명": "부산광역시 연제구_아동_청년_노인 인구 통계",
                  "서비스설명": "이 데이터는 부산광역시 연제구의 아동, 청년, 노인 인구를 성별로 구분하여..."
                }
              ]
            }
          ]
        }
      ]
    }
  }
]
```

## 🔍 프론트엔드에서 데이터 추출

### 1. 문제 정의 및 키워드 추출

```typescript
const responseData = await response.json();
const firstItem = responseData[0];

if (firstItem.parsed?.[0]?.body?.content) {
  const content = firstItem.parsed[0].body.content;

  // 문제 정의
  const 문제정의 = content.문제정의;

  // 핵심 키워드
  const 키워드들 = content.핵심키워드; // string[]

  // 추천 데이터셋
  const 추천데이터셋 = content.필요한데이터셋;
  // [{ 데이터명, 내용, 출처 }, ...]
}
```

### 2. 실제 검색된 데이터셋 추출

```typescript
if (firstItem.body?.content) {
  firstItem.body.content.forEach((queryResult) => {
    const query = queryResult.query; // 검색 쿼리

    queryResult.datasets.forEach((dataset) => {
      dataset.contents.forEach((item) => {
        const 서비스명 = item.서비스명;
        const 설명 = item.서비스설명;
        const 제공기관 = item.제공기관;
        // ... 기타 필드
      });
    });
  });
}
```

## 💬 챗봇 응답 생성 예시

현재 `App.tsx`의 `ChatbotPage`에서 구현된 방식:

```typescript
const handleSend = async () => {
  // ... (요청 전송)

  const responseData = await response.json();
  let botMessage = '';

  // 1. parsed 데이터에서 문제 정의 및 추천 데이터셋
  if (responseData[0]?.parsed?.[0]?.body?.content) {
    const content = responseData[0].parsed[0].body.content;

    botMessage += `📊 **문제 정의**\n${content.문제정의}\n\n`;
    botMessage += `🔑 **핵심 키워드**\n${content.핵심키워드.join(', ')}\n\n`;

    if (content.필요한데이터셋) {
      botMessage += `📁 **추천 데이터셋**\n\n`;
      content.필요한데이터셋.forEach((dataset, idx) => {
        botMessage += `${idx + 1}. **${dataset.데이터명}**\n`;
        botMessage += `   - 내용: ${dataset.내용}\n`;
        botMessage += `   - 출처: ${dataset.출처}\n\n`;
      });
    }
  }

  // 2. body 데이터에서 실제 검색된 데이터셋
  if (responseData[0]?.body?.content) {
    botMessage += `\n🔍 **검색된 실제 데이터셋**\n\n`;

    responseData[0].body.content.forEach((queryResult) => {
      queryResult.datasets?.slice(0, 3).forEach((dataset) => {
        dataset.contents?.forEach((item) => {
          if (item.서비스명) {
            botMessage += `✅ **${item.서비스명}**\n`;

            if (item.서비스설명) {
              const shortDesc = item.서비스설명.substring(0, 100);
              botMessage += `   ${shortDesc}...\n`;
            }

            if (item.제공기관) {
              botMessage += `   제공: ${item.제공기관}\n`;
            }

            botMessage += '\n';
          }
        });
      });
    });
  }

  // 사용자에게 표시
  setMessages(prev => [...prev, {
    type: 'bot',
    text: botMessage + '\n\n📋 탐색된 데이터셋을 기반으로 적절한 문서 포맷을 선택해 주세요.'
  }]);
};
```

## 🛠️ n8n에서 반환해야 할 형식

n8n 워크플로우의 마지막 노드에서 다음 형식으로 응답을 반환하세요:

### Function 노드 예시

```javascript
// n8n Function 노드
const topic = $json.topic;

// 1. AI가 분석한 내용
const parsed = [{
  body: {
    topic: topic,
    content: {
      문제정의: "분석된 문제 정의",
      핵심키워드: ["키워드1", "키워드2", "키워드3"],
      필요한데이터셋: [
        {
          데이터명: "데이터셋 이름",
          내용: "데이터셋 설명",
          출처: "데이터 출처"
        }
      ],
      분석방향: ["분석 방향 1", "분석 방향 2"]
    }
  }
}];

// 2. 실제 데이터베이스/API에서 검색한 데이터셋
const searchResults = [
  {
    query: "검색 쿼리",
    datasets: [
      {
        id: "1",
        title: "데이터셋 파일명",
        contents: [
          {
            서비스명: "부산광역시 OO 데이터",
            서비스설명: "상세 설명...",
            제공기관: "부산광역시",
            조회수: "1000",
            등록일: "2024-01-01"
          }
        ]
      }
    ]
  }
];

return [{
  json: {
    parsed: parsed,
    body: {
      topic: topic + " 관련 데이터셋 정리",
      content: searchResults
    }
  }
}];
```

## ⚠️ 중요 사항

1. **CORS 헤더 필수**: n8n 응답에 CORS 헤더를 반드시 포함하세요
   ```json
   {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Allow-Headers": "Content-Type"
   }
   ```

2. **응답은 배열**: 최상위는 항상 배열 `[...]`

3. **필수 필드**:
   - `parsed[0].body.content.문제정의`
   - `parsed[0].body.content.핵심키워드`
   - `body.content[]` - 검색 결과

4. **선택 필드**:
   - `parsed[0].body.content.필요한데이터셋`
   - `parsed[0].body.content.분석방향`

## 🎯 테스트 요청

```bash
curl -X POST https://n8n.dpgtestbed.kr/webhook-test/1def621f-f09c-4cdf-b46a-cbe0b04c45c2 \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "부산 청년 실업률 문제 해결",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }'
```

응답이 위의 구조와 일치하는지 확인하세요!

---

**이 구조를 따르면 프론트엔드가 자동으로 데이터를 파싱하여 사용자에게 표시합니다.** ✅
