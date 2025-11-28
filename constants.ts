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

export const NAV_LINKS = [
  { name: '서비스 소개', href: 'index.html#features' },
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
      { name: '사업 기획서', desc: '체계적인 사업 준비를 위한 기초 문서' },
      { name: '시장 분석 리포트', desc: '시장 규모 및 트렌드 데이터 분석' },
      { name: '유사 서비스·경쟁사 분석', desc: '경쟁 우위 확보를 위한 심층 분석' },
      { name: 'MVP 구현 전략서', desc: '핵심 기능 정의 및 검증 계획' },
      { name: 'IR 피치덱 초안', desc: '투자 유치를 위한 핵심 설득 논리' },
      { name: '고객 페르소나/고객 여정 맵', desc: '타겟 고객의 니즈와 행동 분석' },
      { name: 'BM Canvas', desc: '비즈니스 모델의 9가지 핵심 요소' },
      { name: '타깃 세그먼트/시장 규모 분석', desc: '구체적인 타겟 시장 정의 및 TAM/SAM/SOM' },
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
      { name: '지역문제 실태 보고서', desc: '데이터로 보는 지역 현안 분석' },
      { name: '정책 제안서', desc: '해결 방안 및 기대 효과 제시' },
      { name: '공공사업 기획안', desc: '사업 추진 배경 및 실행 계획' },
      { name: '행정 예산 계획 초안', desc: '근거 기반 예산 산출 내역' },
      { name: '사업 효과 분석', desc: '정량적/정성적 기대 효과' },
      { name: '데이터 기반 지역 현황 리포트', desc: '통계로 보는 지역 변화 추이' },
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
      { name: '논문 배경 연구', desc: '선행 연구 및 이론적 배경 정리' },
      { name: '연구 분석 보고서', desc: '실험/조사 데이터 상세 분석' },
      { name: '데이터 기반 현황 조사', desc: '객관적 지표 중심의 현황 파악' },
      { name: '학술 발표자료 PPT', desc: '연구 성과 시각화 및 요약' },
      { name: '해커톤/캡스톤 프로젝트 제안서', desc: '창의적 문제 해결 프로젝트 기획' },
      { name: 'SW/AI 서비스 설계서', desc: '알고리즘 및 시스템 구조 설계' },
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
      { name: '상권 분석 보고서', desc: '유동인구 및 배후 수요 분석' },
      { name: '매출/소비 트렌드 분석', desc: '업종별/시기별 매출 추이' },
      { name: '피해/위기 지원 신청용 근거 자료', desc: '지원사업 신청을 위한 증빙' },
      { name: '마케팅/홍보 전략 기획서', desc: '타겟 맞춤형 홍보 실행안' },
      { name: '매출 예측 개선안', desc: '데이터 기반 매출 증대 전략' },
    ]
  },
  {
    id: 'pm',
    label: '실무자 & PM',
    role: '실무자 & PM',
    desc: '기획부터 결과 보고까지 빠르게',
    docType: '기획안 & 성과 보고서',
    icon: Briefcase,
    color: 'bg-soft-yellow',
    description: '기획부터 결과 보고까지, 실무 효율을 극대화합니다.',
    docs: [
      { name: '상신 보고서', desc: '현황, 개선안, 근거 데이터를 포함한 보고' },
      { name: '현황 파악 문서', desc: '프로젝트 및 이슈 현황 요약' },
      { name: '프로젝트 진행계획서', desc: 'WBS 및 리소스 할당 계획' },
      { name: '민원 대응 분석 자료', desc: '주요 민원 키워드 및 패턴 분석' },
      { name: '예산 신청 근거 문서', desc: '비용 집행의 타당성 확보' },
    ]
  },
];

export const SAMPLE_RESULT_CONTENT = {
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