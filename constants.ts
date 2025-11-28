
import { 
  Rocket, 
  Building2, 
  Microscope, 
  Store, 
  Briefcase, 
  FileText, 
  Presentation, 
  ScrollText, 
  BarChart3,
  Lightbulb,
  Search,
  MapPin,
  Target
} from 'lucide-react';

export const WEBHOOK_URL = "https://n8n.dpgtestbed.kr/webhook/07971f9d-3e2f-4004-bdef-11b6a6ce3588";
export const CHATBOT_URL = "https://n8n.dpgtestbed.kr/webhook/07971f9d-3e2f-4004-bdef-11b6a6ce3588";
export const API_TIMEOUT = 60000;

export interface GeneratedDocData {
  title: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
    paragraphs?: string[];
  }[];
}

export const NAV_LINKS = [
  { name: '서비스 소개', href: 'index.html' },
  { name: '작동 방식', href: 'index.html#how-it-works' },
  { name: '추천 문서 포맷', href: 'index.html#solutions' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: '아이디어 입력',
    description: '작성하고 싶은 문서의\n주제나 아이디어를 말해주세요.',
    icon: Lightbulb,
    badge: 'Step 01'
  },
  {
    id: 2,
    title: '데이터 탐색',
    description: 'DEFA가 공공/민간 데이터를\n자동으로 찾아 매칭합니다.',
    icon: Search,
    badge: 'Step 02'
  },
  {
    id: 3,
    title: '문서 초안 완성',
    description: '데이터가 포함된 전문적인\n문서 초안을 즉시 생성합니다.',
    icon: FileText,
    badge: 'Step 03'
  }
];

export const DATA_STATS = [
  { label: '공공데이터', value: '2,540+' },
  { label: '민간 데이터셋', value: '320+' },
  { label: '문서 템플릿', value: '50+' },
  { label: '사용자 생성', value: '12k+' },
];

// Detailed Category Data for Multi-Page Structure
export const DOCUMENT_CATEGORIES = [
  {
    id: 'startup',
    label: '창업자 & 스타트업',
    role: '창업자 & 스타트업',
    desc: '혁신적인 아이디어를 투자자에게',
    docType: 'IR 피치덱 & 사업계획서',
    icon: Rocket,
    color: 'bg-mint',
    description: '혁신적인 아이디어를 투자자에게 설득력 있게 전달합니다.',
    docs: [
      { name: '사업계획서', desc: '체계적인 사업 준비를 위한 기초 문서' },
      { name: '시장 분석 리포트', desc: '시장 규모 및 트렌드 데이터 분석' },
    ]
  },
  {
    id: 'public',
    label: '공공기관',
    role: '공공기관',
    desc: '데이터 기반의 정확한 정책 수립',
    docType: '정책 제안서 & 보도자료',
    icon: Building2,
    color: 'bg-soft-yellow',
    description: '데이터에 기반한 정확하고 신뢰성 있는 정책을 수립합니다.',
    docs: [
      { name: '정책 기획서', desc: '해결 방안 및 기대 효과 제시' },
      { name: '성과/효과 분석 보고서', desc: '정량적/정성적 기대 효과' },
    ]
  },
  {
    id: 'research',
    label: '연구자',
    role: '연구자',
    desc: '복잡한 데이터를 명확한 인사이트로',
    docType: '연구 보고서 & 논문 초안',
    icon: Microscope,
    color: 'bg-baby-blue',
    description: '방대한 데이터를 분석하여 명확한 연구 인사이트를 도출합니다.',
    docs: [
      { name: '데이터셋 기술서', desc: '데이터 구조, 출처, 활용 방법 정리' },
      { name: '실험분석 보고서', desc: '실험/조사 데이터 상세 분석' },
    ]
  },
  {
    id: 'business',
    label: '소상공인',
    role: '소상공인',
    desc: '내 가게 상권 분석을 한눈에',
    docType: '상권 분석 보고서',
    icon: Store,
    color: 'bg-mint',
    description: '내 가게 주변 상권과 매출 흐름을 한눈에 파악합니다.',
    docs: [
      { name: '수요·상권 분석 리포트', desc: '유동인구 및 배후 수요 분석' },
      { name: '지역 소비패턴/고객군 분석', desc: '업종별/시기별 매출 추이 및 고객 특성' },
    ]
  },
  {
    id: 'pm',
    label: 'PM & 기획자',
    role: 'PM & 기획자',
    desc: '기획부터 결과 보고까지 빠르게',
    docType: '기획안 & 성과 보고서',
    icon: Briefcase,
    color: 'bg-soft-yellow',
    description: '기획부터 결과 보고까지, 실무 효율을 극대화합니다.',
    docs: [
      { name: '기능 요구사항 정의서', desc: '시스템 기능 및 사용자 요구사항 명세' },
      { name: '사용자 여정 + 데이터 결합 시나리오', desc: '사용자 경험과 데이터 활용 시나리오' },
    ]
  },
];

export const SAMPLE_RESULT_CONTENT: GeneratedDocData = {
  title: "반려동물 동반 여행 시장 분석 보고서",
  sections: [
    {
      heading: "1. 시장 개요",
      content: "2024년 국내 반려동물 양육 가구는 전체의 28%에 달하며, '펫팸족'의 여행 수요가 급증하고 있습니다. 특히 부산 지역은 해운대, 광안리 등 반려견 동반 가능한 해수욕장 개장으로 인해 관련 관광 시장이 전년 대비 15% 성장했습니다."
    },
    {
      heading: "2. 타겟 고객 분석 (Persona)",
      content: "핵심 타겟은 2030 MZ세대 1인 가구 및 신혼부부입니다. 이들은 숙소 선정 시 '청결도'와 '반려견 전용 어메니티'를 가장 중요하게 고려하며, 평균 1박 지출 비용은 일반 여행객 대비 1.5배 높습니다."
    },
    {
      heading: "3. 데이터 기반 인사이트",
      content: "공공데이터포털의 유동인구 데이터를 분석한 결과, 주말 오후 2시~5시 사이 기장군 해안도로 인근의 반려동물 동반 방문객이 가장 밀집되어 있습니다. 이를 통해 해당 지역에 '펫 프렌들리 카페' 및 '전용 산책로' 연계 서비스가 유망할 것으로 예측됩니다."
    },
    {
      heading: "4. 제언 및 전략",
      content: "기존 숙박 예약 플랫폼과 차별화된 '반려동물 성향별 맞춤 코스 추천' 기능 도입을 제안합니다. 또한, 로컬 펫푸드 브랜드와의 제휴를 통해 '웰컴 키트'를 제공하여 고객 만족도를 제고해야 합니다."
    }
  ]
};
