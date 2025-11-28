
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Search, CheckCircle2, FileText, Send, Bot, ArrowLeft, ChevronRight, PenTool, Database, Loader2, Download, Edit, Check, ExternalLink } from 'lucide-react';
import { NAV_LINKS, HOW_IT_WORKS_STEPS, DATA_STATS, DOCUMENT_CATEGORIES, SAMPLE_RESULT_CONTENT, WEBHOOK_URL, CHATBOT_URL, API_TIMEOUT, GeneratedDocData } from './constants';
import BusanAnimation from './components/BusanAnimation';

// --- Shared Components ---

export const LeekIcon = ({ className }: { className?: string }) => (
  <img
    src="/logo.png"
    alt="DEFA Logo"
    className={className}
  />
);

export const HeaderLogo = () => (
  <div className="flex items-center gap-2">
    <img
      src="/logo.png"
      alt="DEFA Logo"
      className="w-10 h-10"
    />

    <div className="flex flex-col leading-tight">
      <span className="font-bold text-lg">Data Finder</span>
      <span className="text-xs text-gray-500">AI AGENT</span>
    </div>
  </div>
);



const Navigation = ({ activePath, onNavigate, isMenuOpen, setIsMenuOpen }: any) => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b-4 border-mint/30 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => onNavigate('index.html')}
        >
          <LeekIcon className="h-12 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.href)}
              className="font-bold text-deep-navy/70 hover:text-deep-navy transition-colors text-lg"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => onNavigate('chatbot.html')}
            className="bg-soft-yellow text-deep-navy px-6 py-2.5 rounded-full font-bold border-2 border-deep-navy shadow-pop hover:shadow-pop-hover hover:-translate-y-0.5 transition-all"
          >
            데파 시작하기
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-deep-navy hover:bg-mint/20 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {isMenuOpen && (
      <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-mint/30 shadow-xl p-4 flex flex-col space-y-4 animate-float">
        {NAV_LINKS.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              onNavigate(link.href);
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-xl hover:bg-mint/20 font-bold text-lg"
          >
            {link.name}
          </button>
        ))}
        <button
          onClick={() => {
            onNavigate('chatbot.html');
            setIsMenuOpen(false);
          }}
          className="w-full bg-soft-yellow text-deep-navy py-3 rounded-xl font-bold border-2 border-deep-navy shadow-pop"
        >
          데파 시작하기
        </button>
      </div>
    )}
  </nav>
);

const Footer = ({ onNavigate }: any) => (
  <footer id="footer" className="bg-white pt-16 pb-8 border-t border-gray-100 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-4 cursor-pointer" onClick={() => onNavigate('index.html')}>
            <span className="font-display text-xl font-bold text-deep-navy">DEFA</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            데이터(Data)를 찾아주는(Finder) 대파(DEFA).<br />
            누구나 쉽게 공공데이터를 활용해 문서를 만듭니다.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-deep-navy mb-4">Service</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><button onClick={() => onNavigate('index.html#features')} className="hover:text-mint transition-colors">기능 소개</button></li>
            <li><button className="hover:text-mint transition-colors">문서 템플릿</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-deep-navy mb-4">Support</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><button className="hover:text-mint transition-colors">데이터셋 요청</button></li>
            <li><button className="hover:text-mint transition-colors">이용 가이드</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-deep-navy mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>서울특별시 강남구 테헤란로 123</li>
            <li>support@defa.kr</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>&copy; 2024 DEFA Project. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const MainPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState(DOCUMENT_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 검색어를 localStorage에 저장하고 챗봇 페이지로 이동
      localStorage.setItem('initialSearchQuery', searchQuery.trim());
      onNavigate('chatbot.html');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <BusanAnimation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur rounded-full border-2 border-mint shadow-sm mb-2 animate-float">
                <span className="text-deep-navy font-bold">
                  아이디어만 있으면 데이터는 데파가 찾아요!
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl leading-tight text-deep-navy drop-shadow-sm">
                문서 작성의 시작,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-baby-blue to-mint relative">
                  데이터파인더 DEFA
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-deep-navy/70 leading-relaxed font-medium">
                "이 데이터 어디서 찾지?" 고민하지 마세요.<br />
                DEFA가 찾아주고, 문서 초안까지 써드립니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button
                  onClick={() => onNavigate('chatbot.html')}
                  className="group bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-xl shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  데파 시작하기
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Search Input */}
              <div className="mt-8 bg-white p-2 rounded-full shadow-soft border border-mint/50 max-w-md mx-auto md:mx-0 flex items-center transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center ml-1">
                  <Search className="text-deep-navy w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="반려동물 동반 여행 시장 분석해줘"
                  className="flex-1 px-4 font-medium outline-none bg-transparent placeholder:text-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="bg-deep-navy text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-baby-blue hover:text-deep-navy transition-colors"
                >
                  검색
                </button>
              </div>
            </div>

            <div className="hidden md:block h-full min-h-[400px]"></div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-mint/20 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {DATA_STATS.map((stat, idx) => (
              <div key={idx} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-display font-bold text-baby-blue mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-deep-navy font-bold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-paper-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <span className="text-mint font-display text-xl tracking-wider uppercase">Process</span>
            <h2 className="font-display text-4xl md:text-5xl text-deep-navy">
              데이터 탐색부터 문서 완성까지,<br />
              <span className="relative inline-block mt-2">
                DEFA가 다 해요!
                <span className="absolute bottom-1 left-0 w-full h-3 bg-soft-yellow/60 -z-10 rounded-sm"></span>
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-16 left-0 w-full h-1 z-0">
              <svg className="w-full h-20" preserveAspectRatio="none">
                <path d="M100 10 Q 300 50 500 10 T 900 10" fill="none" stroke="#B2EBF2" strokeWidth="4" strokeDasharray="10,10" />
              </svg>
            </div>

            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-32 h-32 bg-white rounded-3xl border-4 border-mint shadow-soft flex items-center justify-center mb-8 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <step.icon size={48} className="text-baby-blue" />
                  <div className="absolute -top-4 -right-4 bg-deep-navy text-white px-4 py-1 rounded-full font-bold text-sm shadow-md">
                    {step.badge}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-deep-navy mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600 whitespace-pre-line leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="py-24 bg-mint/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-yellow/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-deep-navy mb-6">
              DEFA, 누구를 위한 서비스인가요?
            </h2>
            <p className="text-xl text-gray-600">
              추천 문서 포맷을 확인하고 바로 작성을 시작하세요.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {DOCUMENT_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all w-full min-w-[260px] text-left group
                    ${activeTab === item.id
                      ? 'bg-white border-deep-navy shadow-pop scale-100 lg:translate-x-4'
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-mint'
                    }`}
                >
                  <div className={`p-3 rounded-xl mr-4 ${item.color} text-deep-navy bg-opacity-50`}>
                    <item.icon size={24} className="group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${activeTab === item.id ? 'text-deep-navy' : 'text-gray-500'}`}>
                      {item.label}
                    </h4>
                    {activeTab === item.id && (
                      <span className="text-xs text-mint font-bold mt-1 block">Selected</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:w-2/3">
              {DOCUMENT_CATEGORIES.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-[2.5rem] p-8 md:p-12 border-4 border-deep-navy/5 shadow-soft h-full transition-all duration-500 transform ${activeTab === item.id ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute top-0 left-0 pointer-events-none'
                    }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className={`inline-block px-4 py-2 rounded-full ${item.color} text-deep-navy font-bold mb-4 md:mb-0`}>
                      {item.role} 추천 문서
                    </div>
                    <div className="flex items-center text-gray-400 text-sm font-medium">
                      <CheckCircle2 size={16} className="mr-2 text-mint" />
                      자동 데이터 매칭 지원
                    </div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-deep-navy mb-6">
                    생성 가능한 문서 목록
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {item.docs.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigate(`create_doc.html?cat=${item.id}&doc=${encodeURIComponent(doc.name)}`)}
                        className="flex items-center p-3 rounded-xl border border-gray-100 hover:border-mint hover:bg-mint/5 transition-all text-left group/doc"
                      >
                        <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm mr-3">
                          <FileText size={18} className="text-baby-blue" />
                        </div>
                        <div>
                          <div className="font-bold text-deep-navy text-sm group-hover/doc:text-mint transition-colors">{doc.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => onNavigate('documents.html')}
                      className="bg-deep-navy text-white px-6 py-3 rounded-full font-bold text-lg flex items-center shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all"
                    >
                      전체 문서 목록 보기 <ArrowRight size={20} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-deep-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 Q 50 0 100 100" fill="white" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl text-white mb-8">
            준비되셨나요?<br />
            <span className="text-mint">데파</span>와 함께 문서를 완성하세요!
          </h2>
          <button
            onClick={() => onNavigate('chatbot.html')}
            className="bg-soft-yellow text-deep-navy text-xl md:text-2xl font-bold px-12 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(255,250,205,0.6)] hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(255,250,205,0.8)] transition-all transform duration-300 mx-auto"
          >
            지금 무료로 시작하기 🚀
          </button>
        </div>
      </section>
    </>
  );
};

interface DatasetCard {
  serviceName: string;
  description: string;
  provider?: string;
  views?: string;
  downloads?: string;
  checked?: boolean;
}

const ChatbotPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [messages, setMessages] = useState<any[]>([
    { type: 'bot', text: '안녕하세요! 데이터파인더 DEFA입니다. 🌱\n어떤 주제에 대한 문서가 필요하신가요? 아이디어를 자유롭게 입력해 주세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProceedBtn, setShowProceedBtn] = useState(false);
  const [datasets, setDatasets] = useState<DatasetCard[]>([]);
  const [selectedDatasets, setSelectedDatasets] = useState<DatasetCard[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 초기 검색어가 있으면 자동 실행
  useEffect(() => {
    const initialQuery = localStorage.getItem('initialSearchQuery');
    if (initialQuery) {
      localStorage.removeItem('initialSearchQuery');
      setInput(initialQuery);
      // 짧은 딜레이 후 자동 실행
      setTimeout(() => {
        handleSend(initialQuery);
      }, 500);
    }
  }, []);





  // ---------------------------------



  const handleSend = async (customInput?: string) => {
  const messageToSend = customInput || input;
  if (!messageToSend.trim()) return;

  setMessages(prev => [...prev, { type: "user", text: messageToSend }]);
  setInput("");
  setIsTyping(true);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(CHATBOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: messageToSend,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Server error ${response.status}`);

    const responseData = await response.json();
    console.log("응답 전체:", responseData);

    const firstItem = Array.isArray(responseData) ? responseData[0] : responseData;

    let botMessage = "";
    const datasets: DatasetCard[] = [];

    // ============================================================
    // 1) 🔥 미매칭 탐지 — 최우선 검사
    // ============================================================
    const rawContent = firstItem?.["data.data.outputs.content"];
    let mismatch = false;
    let mismatchMsg = "";

    if (rawContent) {
      try {
        const parsed = JSON.parse(rawContent);
        if (parsed["미매칭 안내"]) {
          mismatch = true;
          mismatchMsg = parsed["미매칭 안내"];
        }
      } catch {
        if (typeof rawContent === "string" && rawContent.includes("죄송합니다")) {
          mismatch = true;
          mismatchMsg = rawContent;
        }
      }
    }

    // ============================================================
    // 2) 🔥 미매칭이면 즉시 종료 (데이터셋 파싱 금지)
    // ============================================================
    if (mismatch) {
      console.log("미매칭 탐지 → 데이터셋 파싱 중단");
      setDatasets([]);
      setShowProceedBtn(false);
      setIsTyping(false);
      setMessages(prev => [...prev, { type: "bot", text: mismatchMsg }]);
      return;
    }

    // ============================================================
    // 3) 문제 정의 / 키워드 / 필요한 데이터셋 (GPT 구조)
    // ============================================================
    const parsedBlock = firstItem?.parsed?.[0]?.body?.content;

    if (parsedBlock) {
      if (parsedBlock.문제정의) {
        botMessage += `📊 **문제 정의**\n${parsedBlock.문제정의}\n\n`;
      }
      if (parsedBlock.핵심키워드) {
        botMessage += `🔑 **핵심 키워드**\n${parsedBlock.핵심키워드.join(", ")}\n\n`;
      }

      if (parsedBlock.필요한데이터셋) {
        botMessage += `📁 **AI 추천 데이터셋**\n\n`;
        parsedBlock.필요한데이터셋.forEach((d, i) => {
          botMessage += `${i + 1}. **${d.데이터명}**\n - 내용: ${d.내용}\n - 출처: ${d.출처}\n\n`;
        });
      }
    }

    // ============================================================
    // 4) 실제 매칭된 데이터셋만 파싱
    // ============================================================
    const contentBlock = firstItem?.body?.content;

    if (contentBlock && Array.isArray(contentBlock)) {
      botMessage += `\n🔍 **검색된 실제 데이터셋**\n\n`;

      const seen = new Set<string>();

      contentBlock.forEach(query => {
        query?.datasets?.forEach(ds => {
          ds?.contents?.forEach(item => {
            if (!item.서비스명 || seen.has(item.서비스명)) return;
            seen.add(item.서비스명);

            const desc = (item["서비스 설명"] || "").replace(/<[^>]+>/g, " ").trim();

            datasets.push({
              serviceName: item.서비스명,
              description: desc,
              provider: item.분류 || "미제공",
              views: item.조회수,
              downloads: item.다운로드수,
            });

            botMessage += `✅ **${item.서비스명}**\n${desc}\n\n`;
          });
        });
      });
    }

    // ============================================================
    // 5) 데이터셋이 없다? → 미매칭으로 처리
    // ============================================================
    if (datasets.length === 0) {
      const fallback = rawContent || "❗ 관련 데이터셋을 찾을 수 없습니다.";
      setDatasets([]);
      setShowProceedBtn(false);
      setIsTyping(false);
      setMessages(prev => [...prev, { type: "bot", text: fallback }]);
      return;
    }

    // ============================================================
    // 6) 정상 매칭 — 오른쪽 패널 띄우기
    // ============================================================
    setDatasets(datasets);
    setShowProceedBtn(true);
    setIsTyping(false);

    setMessages(prev => [
      ...prev,
      {
        type: "bot",
        text:
          botMessage +
          `\n\n📋 탐색된 데이터셋을 기반으로 적절한 문서 포맷을 선택해 주세요.`,
      },
    ]);
  } catch (err) {
    console.error(err);
    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      { type: "bot", text: "⚠️ 서버 오류가 발생했습니다." },
    ]);
  }
};




  // ------------------------------------------------

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleDatasetCheck = (index: number) => {
    const updatedDatasets = [...datasets];
    updatedDatasets[index].checked = !updatedDatasets[index].checked;
    setDatasets(updatedDatasets);

    // 선택된 데이터셋 목록 업데이트
    const selected = updatedDatasets.filter(d => d.checked);
    setSelectedDatasets(selected);
  };

  // 서비스명을 URL 파라미터로 변환하는 함수
  const createDatasetUrl = (serviceName: string) => {
    // 마지막 띄어쓰기는 %20으로, 나머지는 %로 변환
    const parts = serviceName.split(' ');
    let encoded = '';
    for (let i = 0; i < parts.length; i++) {
      encoded += parts[i];
      if (i < parts.length - 1) {
        // 마지막이 아니면 %로 연결
        encoded += '%';
      }
    }
    // 마지막 부분에 %20 추가 (예시 URL 패턴에 맞춤)
    if (parts.length > 0) {
      const lastPart = parts[parts.length - 1];
      encoded = encoded.slice(0, -lastPart.length) + lastPart.replace(/ /g, '%20');
    }
    return `https://data.busan.go.kr/bdip/searchWrap.do?keyword=${encoded}&qryType=OR&from=dsh`;
  };

  const openDatasetPage = (serviceName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    const url = createDatasetUrl(serviceName);
    window.open(url, '_blank');
  };

  const handleProceedWithSelectedDatasets = () => {
    const selected = datasets.filter(d => d.checked);
    if (selected.length === 0) {
      alert('최소 1개 이상의 데이터셋을 선택해주세요.');
      return;
    }
    // 선택된 데이터셋을 localStorage에 저장
    localStorage.setItem('selectedDatasets', JSON.stringify(selected));
    onNavigate('documents.html');
  };

  return (
    <div className="min-h-screen pt-20 relative flex flex-col items-center justify-center overflow-hidden">
      <BusanAnimation />

      <div className="w-full max-w-7xl px-4 relative z-20 mb-10 h-[85vh] flex gap-4">

        {/* Left Column - Chat Interface */}
        <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-soft border-4 border-white flex flex-col overflow-hidden">

          {/* Chat Header */}
          <div className="bg-mint/30 p-6 flex items-center border-b border-white">
            <LeekIcon className="h-14 w-auto mr-4" />
            <div>
              <h2 className="font-display text-2xl text-deep-navy">DEFA Chatbot</h2>
              <p className="text-sm text-deep-navy/60 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                실시간 데이터 탐색 중
              </p>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex items-start ${msg.type === 'user' ? 'justify-end' : ''} max-w-[90%] ${msg.type === 'user' ? 'ml-auto' : ''}`}>
                {msg.type === 'bot' && (
                  <LeekIcon className="h-10 w-auto flex-shrink-0 mr-3 mt-1" />
                )}
                <div className={`p-5 rounded-2xl shadow-sm border ${msg.type === 'user'
                  ? 'bg-deep-navy text-white rounded-tr-none border-deep-navy shadow-pop'
                  : 'bg-white text-deep-navy rounded-tl-none border-gray-100'
                  } leading-relaxed whitespace-pre-line`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Bot Typing Simulation */}
            {isTyping && (
              <div className="flex items-start max-w-[80%]">
                <LeekIcon className="h-10 w-auto flex-shrink-0 mr-3 mt-1" />
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            {showProceedBtn && (
              <div className="flex justify-center mt-6 animate-float">
                <button
                  onClick={() => onNavigate('documents.html')}
                  className="bg-soft-yellow text-deep-navy px-8 py-4 rounded-full font-bold text-lg border-2 border-deep-navy shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  문서 포맷 선택하기
                  <ArrowRight size={20} />
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="어떤 주제로 문서를 만들고 싶으신가요?"
                className="w-full bg-white border-2 border-gray-200 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-mint focus:ring-2 focus:ring-mint/20 transition-all font-medium text-lg placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-2 p-2 bg-deep-navy text-white rounded-full hover:bg-baby-blue hover:text-deep-navy transition-all shadow-md"
              >
                <Send size={24} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column - Dataset Cards */}
        <div className="w-[420px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-soft border-4 border-white flex flex-col overflow-hidden">

          {/* Dataset Header */}
          <div className="bg-baby-blue/30 p-6 border-b border-white">
            <h3 className="font-display text-xl text-deep-navy flex items-center">
              <Database size={24} className="mr-2 text-baby-blue" />
              추천 데이터셋
            </h3>
            <p className="text-sm text-deep-navy/60 mt-1">
              {datasets.length > 0 ? `총 ${datasets.length}개 발견` : '데이터 탐색 대기 중'}
            </p>
          </div>

          {/* Dataset Cards Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {datasets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Database size={40} className="text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">
                  아직 데이터셋이 없습니다.<br />
                  왼쪽 챗봇에 주제를 입력해보세요!
                </p>
              </div>
            ) : (
              datasets.map((dataset, idx) => (
                <div
                  key={idx}
                  className={`w-full text-left bg-white rounded-2xl p-4 border-2 transition-all group ${dataset.checked
                    ? 'border-mint bg-mint/5 shadow-md'
                    : 'border-gray-100 hover:border-mint hover:shadow-md'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {/* 체크박스 */}
                    <div
                      onClick={() => toggleDatasetCheck(idx)}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 cursor-pointer ${dataset.checked
                        ? 'bg-mint border-mint'
                        : 'border-gray-300 group-hover:border-mint'
                        }`}>
                      {dataset.checked && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className={`font-bold text-sm transition-colors line-clamp-2 flex-1 ${dataset.checked ? 'text-mint' : 'text-deep-navy group-hover:text-mint'
                          }`}>
                          {dataset.serviceName}
                        </h4>
                        {/* 바로가기 버튼 */}
                        <button
                          onClick={(e) => openDatasetPage(dataset.serviceName, e)}
                          className="flex-shrink-0 p-1.5 rounded-lg bg-baby-blue/20 hover:bg-baby-blue/40 text-deep-navy transition-colors"
                          title="데이터 포털에서 보기"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                        {dataset.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                        {dataset.provider && (
                          <span className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-mint rounded-full mr-1"></span>
                            {dataset.provider}
                          </span>
                        )}
                        {dataset.views && (
                          <span>조회 {dataset.views}</span>
                        )}
                        {dataset.downloads && (
                          <span>다운로드 {dataset.downloads}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 선택된 데이터셋으로 문서 작성 버튼 */}
          {datasets.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white">
              <button
                onClick={handleProceedWithSelectedDatasets}
                disabled={selectedDatasets.length === 0}
                className="w-full bg-deep-navy text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <FileText size={20} />
                선택한 데이터셋으로 문서 작성 ({selectedDatasets.length}개)
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const DocumentListPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState(DOCUMENT_CATEGORIES[0].id);

  const activeDocs = DOCUMENT_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-10 relative bg-paper-white">
      {/* Top Banner Background */}
      <div className="absolute top-0 w-full h-64 overflow-hidden pointer-events-none">
        <BusanAnimation />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl text-deep-navy mb-2">DEFA 문서 도서관</h1>
          <p className="text-gray-600">5대 타겟을 위한 30여 종의 데이터 기반 문서 템플릿</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="md:w-1/4 space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-soft border border-mint/30 sticky top-24">
              <h3 className="font-bold text-deep-navy mb-4 px-2">타겟 선택</h3>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all mb-2 ${selectedCategory === cat.id
                    ? `${cat.color} text-deep-navy shadow-sm font-bold`
                    : 'hover:bg-gray-50 text-gray-500'
                    }`}
                >
                  <cat.icon size={20} className="mr-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Document Grid */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[600px]">
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl ${activeDocs?.color} mr-4`}>
                  {activeDocs && <activeDocs.icon size={32} className="text-deep-navy" />}
                </div>
                <div>
                  <h2 className="font-display text-2xl text-deep-navy">{activeDocs?.label}</h2>
                  <p className="text-gray-500 text-sm">{activeDocs?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeDocs?.docs.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(`create_doc.html?cat=${activeDocs.id}&doc=${encodeURIComponent(doc.name)}`)}
                    className="flex flex-col text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-mint hover:bg-mint/5 hover:-translate-y-1 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                        <FileText size={20} className="text-baby-blue" />
                      </div>
                      <ChevronRight className="text-gray-300 group-hover:text-mint transition-colors" />
                    </div>
                    <h4 className="font-bold text-lg text-deep-navy mb-1 group-hover:text-mint transition-colors">{doc.name}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{doc.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateDocPage = ({ targetId, docName, onNavigate, onGenerateSuccess }: { targetId?: string, docName?: string, onNavigate: (path: string) => void, onGenerateSuccess: (data: GeneratedDocData) => void }) => {
  const category = DOCUMENT_CATEGORIES.find(c => c.id === targetId) || DOCUMENT_CATEGORIES[0];
  const [isGenerating, setIsGenerating] = useState(false);

  // 현재 카테고리와 문서명을 localStorage에 저장
  useEffect(() => {
    if (targetId) localStorage.setItem('docCategory', targetId);
    if (docName) localStorage.setItem('docName', docName);
  }, [targetId, docName]);

  // localStorage에서 선택된 데이터셋 가져오기
  const [selectedDatasets, setSelectedDatasets] = useState<DatasetCard[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('selectedDatasets');
    if (stored) {
      try {
        const datasets = JSON.parse(stored);
        setSelectedDatasets(datasets);
      } catch (e) {
        console.error('Failed to parse selected datasets:', e);
      }
    }
  }, []);

  // State for inputs - localStorage에서 복원
  const [topic, setTopic] = useState(() => {
    return localStorage.getItem('docTopic') || '';
  });
  const [goal, setGoal] = useState(() => {
    return localStorage.getItem('docGoal') || '투자 유치용';
  });
  const [tone, setTone] = useState(() => {
    return localStorage.getItem('docTone') || '전문적이고 신뢰감 있는';
  });

  // 입력값 변경 시 localStorage에 저장
  const handleTopicChange = (value: string) => {
    setTopic(value);
    localStorage.setItem('docTopic', value);
  };

  const handleGoalChange = (value: string) => {
    setGoal(value);
    localStorage.setItem('docGoal', value);
  };

  const handleToneChange = (value: string) => {
    setTone(value);
    localStorage.setItem('docTone', value);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("문서 주제를 입력해주세요.");
      return;
    }

    if (selectedDatasets.length === 0) {
      alert("최소 1개 이상의 데이터셋을 선택해주세요. 챗봇으로 돌아가서 데이터셋을 선택해주세요.");
      return;
    }

    setIsGenerating(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            topic,
            goal,
            tone,
            docType: docName || category.docType,
            userType: category.label,
            selectedDatasets,
            timestamp: new Date().toISOString()
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      // === JSON 응답 파싱 ===
      const raw = await response.json();
      console.log("n8n raw response:", raw);

      let parsed: GeneratedDocData;

      // 🔥 n8n 응답 구조: 배열 안에 sections 배열이 있는 형태
      // 예: [{ "ok": true, "sections": [...] }]
      if (Array.isArray(raw) && raw.length > 0) {
        // 첫 번째 요소에서 sections 추출
        const firstItem = raw[0];

        if (firstItem.sections && Array.isArray(firstItem.sections)) {
          // sections 배열을 파싱
          parsed = {
            title: `${topic} 초안`,
            sections: firstItem.sections.map((sec: any) => ({
              heading: sec.heading || "",
              bullets: sec.bullets || [],
              paragraphs: sec.paragraphs || [],
              content: "" // bullets와 paragraphs를 별도로 렌더링하므로 content는 비워둠
            }))
          };
        } else {
          // sections 배열이 없는 경우 fallback
          parsed = {
            title: topic,
            sections: [{
              heading: "본문",
              bullets: [],
              paragraphs: [],
              content: JSON.stringify(raw, null, 2)
            }]
          };
        }
      }
      // 객체 형태로 온 경우
      else if (raw && typeof raw === 'object') {
        if (raw.title && raw.sections) {
          // {title, sections} 형태
          parsed = raw;
        } else if (raw.sections && Array.isArray(raw.sections)) {
          // {sections} 형태
          parsed = {
            title: `${topic} 초안`,
            sections: raw.sections.map((sec: any) => ({
              heading: sec.heading || "",
              bullets: sec.bullets || [],
              paragraphs: sec.paragraphs || [],
              content: ""
            }))
          };
        } else {
          // 알 수 없는 형태
          parsed = {
            title: topic,
            sections: [{
              heading: "본문",
              bullets: [],
              paragraphs: [],
              content: JSON.stringify(raw, null, 2)
            }]
          };
        }
      }
      // 그 외 fallback
      else {
        parsed = {
          title: topic,
          sections: [{
            heading: "본문",
            bullets: [],
            paragraphs: [],
            content: "응답 형식을 인식할 수 없습니다."
          }]
        };
      }

      // === ResultPage 로 전달 ===
      onGenerateSuccess(parsed);
      onNavigate('result_doc.html');

    } catch (error) {
      console.error("Error generating document:", error);
      alert(`문서 생성 중 오류: ${error}`);
    }
    finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-paper-white relative flex flex-col items-center">
      <div className="absolute top-0 w-full h-80 overflow-hidden pointer-events-none">
        <BusanAnimation />
      </div>

      <div className="w-full max-w-4xl px-4 relative z-10">
        <button
          onClick={() => onNavigate('documents.html')}
          className="flex items-center text-deep-navy/60 hover:text-deep-navy font-bold mb-6 transition-colors bg-white/50 backdrop-blur px-4 py-2 rounded-full inline-block"
        >
          <ArrowLeft size={18} className="mr-1" /> 문서 목록으로 돌아가기
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-soft border-4 border-white overflow-hidden">
          {/* Header */}
          <div className={`${category.color} p-8 md:p-10 text-center`}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-deep-navy">
              <category.icon size={32} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-deep-navy mb-2">
              {docName ? decodeURIComponent(docName) : category.docType} 작성
            </h1>
            <p className="text-deep-navy/70 font-medium">
              데이터 기반의 {category.label} 맞춤형 문서입니다.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">

            {/* Section 1: Dataset Preparation */}
            <section className="space-y-6">
              <h3 className="font-display text-2xl text-deep-navy flex items-center">
                <Database className="mr-2 text-mint" />
                1. 선택된 데이터셋
              </h3>

              {/* Selected Datasets */}
              {selectedDatasets.length > 0 ? (
                <div className="bg-mint/10 rounded-2xl p-6 border border-mint/30">
                  <h4 className="font-bold text-deep-navy mb-3 flex items-center text-sm">
                    <Bot size={16} className="mr-2" />
                    챗봇에서 선택된 데이터셋 ({selectedDatasets.length}개)
                  </h4>
                  <div className="space-y-2">
                    {selectedDatasets.map((dataset, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-start">
                          <CheckCircle2 size={16} className="text-mint mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-bold text-deep-navy text-sm mb-1">{dataset.serviceName}</div>
                            <div className="text-xs text-gray-600 line-clamp-2">{dataset.description}</div>
                            {dataset.provider && (
                              <div className="text-xs text-gray-400 mt-1">제공: {dataset.provider}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                  <p className="text-gray-500">선택된 데이터셋이 없습니다. 챗봇에서 데이터셋을 선택해주세요.</p>
                  <button
                    onClick={() => onNavigate('chatbot.html')}
                    className="mt-4 bg-mint text-deep-navy px-6 py-2 rounded-full font-bold text-sm hover:bg-mint/80 transition-colors"
                  >
                    챗봇으로 돌아가기
                  </button>
                </div>
              )}
            </section>

            <hr className="border-gray-100" />

            {/* Section 2: Draft Settings */}
            <section className="space-y-6">
              <h3 className="font-display text-2xl text-deep-navy flex items-center">
                <PenTool className="mr-2 text-soft-yellow" />
                2. 문서 상세 설정
              </h3>

              <div>
                <label className="block text-deep-navy font-bold text-lg mb-2">문서 주제 / 아이디어</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => handleTopicChange(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint focus:ring-4 focus:ring-mint/10 outline-none transition-all font-medium text-lg"
                  placeholder="예: 반려동물 동반 여행 시장 분석 보고서"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-deep-navy font-bold text-lg mb-2">문서 작성 목표</label>
                  <select
                    value={goal}
                    onChange={(e) => handleGoalChange(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint outline-none appearance-none font-medium"
                  >
                    <option>투자 유치용</option>
                    <option>내부 보고용</option>
                    <option>공모전/지원사업 제출용</option>
                    <option>시장 조사용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-deep-navy font-bold text-lg mb-2">문서 톤앤매너</label>
                  <select
                    value={tone}
                    onChange={(e) => handleToneChange(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint outline-none appearance-none font-medium"
                  >
                    <option>전문적이고 신뢰감 있는</option>
                    <option>창의적이고 혁신적인</option>
                    <option>객관적이고 분석적인</option>
                    <option>친근하고 설득력 있는</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-deep-navy text-white font-bold text-xl py-5 rounded-2xl shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    AI 문서 초안 생성 중...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2" />
                    최종 문서 초안 생성하기
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                * AI가 매칭된 데이터셋을 심층 분석하여 초안을 완성합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultPage = ({ onNavigate, data }: { onNavigate: (path: string) => void, data?: GeneratedDocData }) => {
  // If no data is passed (e.g. refreshed), fallback to sample
  const content = data || SAMPLE_RESULT_CONTENT;
  const isFallback = !data;

  // localStorage에서 선택된 데이터셋 가져오기
  const [selectedDatasets, setSelectedDatasets] = useState<DatasetCard[]>([]);

  // 섹션 스크롤을 위한 ref
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 추가 편집 요청 버튼 핸들러
  const handleEditRequest = () => {
    const savedCategory = localStorage.getItem('docCategory') || 'startup';
    const savedDocName = localStorage.getItem('docName') || '';
    onNavigate(`create_doc.html?cat=${savedCategory}&doc=${encodeURIComponent(savedDocName)}`);
  };

  // PDF 다운로드 함수
  const handleDownloadPDF = () => {
    // 간단한 텍스트 기반 다운로드 (브라우저 프린트 기능 활용)
    window.print();
  };

  // DOCX 다운로드 함수 (HTML을 텍스트로 변환하여 다운로드)
  const handleDownloadDOCX = () => {
    let docContent = `${content.title}\n\n`;
    docContent += `Generated by DEFA AI • ${new Date().toLocaleDateString()}\n\n`;
    docContent += '='.repeat(50) + '\n\n';

    content.sections.forEach((sec) => {
      docContent += `${sec.heading}\n\n`;

      if (sec.bullets && sec.bullets.length > 0) {
        sec.bullets.forEach((bullet) => {
          docContent += `• ${bullet}\n`;
        });
        docContent += '\n';
      }

      if (sec.paragraphs && sec.paragraphs.length > 0) {
        sec.paragraphs.forEach((para) => {
          docContent += `${para}\n\n`;
        });
      }

      if ((!sec.bullets || sec.bullets.length === 0) && (!sec.paragraphs || sec.paragraphs.length === 0) && sec.content) {
        docContent += `${sec.content}\n\n`;
      }

      docContent += '\n';
    });

    docContent += '\n' + '='.repeat(50) + '\n\n';
    docContent += '참조 데이터 출처\n\n';
    if (selectedDatasets.length > 0) {
      selectedDatasets.forEach((dataset, idx) => {
        docContent += `${idx + 1}. ${dataset.serviceName}`;
        if (dataset.provider) {
          docContent += ` (제공: ${dataset.provider})`;
        }
        docContent += '\n';
      });
    } else {
      docContent += '참조 데이터셋 정보가 없습니다.\n';
    }

    // Blob 생성 및 다운로드
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${content.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const stored = localStorage.getItem('selectedDatasets');
    if (stored) {
      try {
        const datasets = JSON.parse(stored);
        setSelectedDatasets(datasets);
      } catch (e) {
        console.error('Failed to parse selected datasets:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-paper-white relative flex flex-col items-center">
      <div className="absolute top-0 w-full h-80 overflow-hidden pointer-events-none">
        <BusanAnimation />
      </div>

      <div className="w-full max-w-5xl px-4 relative z-10">

        {/* Success Header */}
        <div className="text-center mb-8 animate-float">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-soft mb-4 border border-mint">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-deep-navy mb-2">
            문서 생성이 완료되었습니다!
          </h1>
          <p className="text-xl text-gray-600">
            DEFA가 데이터에 기반하여 작성한 초안입니다.
            {isFallback && <span className="block text-sm text-red-400 mt-1">(연결된 데이터가 없어 샘플을 표시합니다)</span>}
          </p>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-[2rem] shadow-soft border-4 border-deep-navy/5 overflow-hidden flex flex-col md:flex-row h-[70vh]">

          {/* Sidebar Preview */}
          <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-100 p-6 overflow-y-auto">
            <h4 className="font-bold text-deep-navy mb-4 text-sm uppercase tracking-wide text-gray-400">목차</h4>
            <ul className="space-y-3 text-sm">
              {content.sections.map((sec, idx) => (
                <li
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className="text-gray-600 hover:text-mint cursor-pointer truncate transition-colors"
                >
                  {sec.heading}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white relative">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="border-b-2 border-deep-navy pb-6 mb-8">
                <h2 className="font-display text-3xl text-deep-navy">{content.title}</h2>
                <p className="text-gray-400 mt-2">Generated by DEFA AI • {new Date().toLocaleDateString()}</p>
              </div>

              {content.sections.map((sec, idx) => (
                <div
                  key={idx}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  className="space-y-4"
                >
                  <h3 className="font-bold text-xl text-deep-navy border-b-2 border-mint/30 pb-2">{sec.heading}</h3>

                  {/* Bullets 렌더링 */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 ml-1">
                      {sec.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start">
                          <span className="text-mint mr-3 mt-1 flex-shrink-0">•</span>
                          <span className="text-gray-700 leading-7">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Paragraphs 렌더링 */}
                  {sec.paragraphs && sec.paragraphs.length > 0 && (
                    <div className="space-y-3">
                      {sec.paragraphs.map((para, paraIdx) => (
                        <p key={paraIdx} className="text-gray-600 leading-8 text-justify">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* bullets와 paragraphs가 없고 content만 있는 경우 (기존 로직 유지) */}
                  {(!sec.bullets || sec.bullets.length === 0) && (!sec.paragraphs || sec.paragraphs.length === 0) && sec.content && (
                    <p className="text-gray-600 leading-8 text-justify whitespace-pre-wrap">
                      {sec.content}
                    </p>
                  )}
                </div>
              ))}

              <div className="p-6 bg-mint/10 rounded-xl border border-mint/30 mt-8">
                <h4 className="font-bold text-deep-navy mb-3 flex items-center">
                  <Database size={16} className="mr-2 text-mint" />
                  참조 데이터 출처
                </h4>
                {selectedDatasets.length > 0 ? (
                  <ul className="text-sm text-gray-600 space-y-2">
                    {selectedDatasets.map((dataset, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 size={14} className="text-mint mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-deep-navy">{dataset.serviceName}</div>
                          {dataset.provider && (
                            <div className="text-xs text-gray-400 mt-0.5">제공: {dataset.provider}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">참조 데이터셋 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={handleEditRequest}
            className="bg-white text-deep-navy border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:border-mint hover:text-mint transition-all flex items-center justify-center gap-2"
          >
            <Edit size={20} />
            추가 편집 요청
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-lg shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            PDF로 저장 (인쇄)
          </button>
          <button
            onClick={handleDownloadDOCX}
            className="bg-mint text-deep-navy px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            TXT로 다운로드
          </button>
          <button
            onClick={() => onNavigate('index.html')}
            className="sm:hidden text-gray-400 text-sm mt-2 underline"
          >
            메인으로 돌아가기
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Main App & Router ---

function App() {
  const [currentPath, setCurrentPath] = useState('index.html');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedDocData | undefined>(undefined);

  // Helper to "navigate" and parse simple params
  const handleNavigate = (path: string) => {
    // Check if it's a hash link on index
    if (path.includes('#') && path.startsWith('index.html')) {
      setCurrentPath('index.html');
      const hash = path.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (path === 'index.html' && currentPath === 'index.html') {
      // 같은 페이지에서 index.html로 이동 시 부드럽게 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    // Simple URL parsing
    const pathBase = currentPath.split('?')[0];
    const urlParams = new URLSearchParams(currentPath.split('?')[1]);

    if (pathBase === 'index.html' || pathBase === '/') {
      return <MainPage onNavigate={handleNavigate} />;
    }
    if (pathBase === 'chatbot.html') {
      return <ChatbotPage onNavigate={handleNavigate} />;
    }
    if (pathBase === 'documents.html') {
      return <DocumentListPage onNavigate={handleNavigate} />;
    }
    if (pathBase === 'create_doc.html') {
      const cat = urlParams.get('cat') || undefined;
      const doc = urlParams.get('doc') || undefined;
      return <CreateDocPage
        targetId={cat}
        docName={doc}
        onNavigate={handleNavigate}
        onGenerateSuccess={(data) => setGeneratedResult(data)}
      />;
    }
    if (pathBase === 'result_doc.html') {
      return <ResultPage onNavigate={handleNavigate} data={generatedResult} />;
    }
    return <MainPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-paper-white font-sans text-deep-navy selection:bg-mint selection:text-deep-navy">
      <Navigation
        activePath={currentPath}
        onNavigate={handleNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main>
        {renderPage()}
      </main>

      {(currentPath !== 'chatbot.html' && !currentPath.includes('create_doc') && currentPath !== 'result_doc.html') && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
