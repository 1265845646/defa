
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Search, CheckCircle2, FileText, Send, Bot, ArrowLeft, ChevronRight, PenTool, Database, Loader2, Download, Edit, Check } from 'lucide-react';
import { NAV_LINKS, HOW_IT_WORKS_STEPS, DATA_STATS, DOCUMENT_CATEGORIES, SAMPLE_RESULT_CONTENT, WEBHOOK_URL, CHATBOT_URL, API_TIMEOUT, GeneratedDocData } from './constants';
import BusanAnimation from './components/BusanAnimation';

// --- Shared Components ---

const LeekIcon = ({ className }: { className?: string }) => (
  <img
    src="/logo.png"
    alt="DEFA Logo"
    className={className}
  />
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
            className="bg-soft-yellow text-deep-navy px-6 py-2.5 rounded-full font-bold border-2 border-deep-navy shadow-pop hover:shadow-pop-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <LeekIcon className="w-4 h-4" />
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
          className="w-full bg-soft-yellow text-deep-navy py-3 rounded-xl font-bold border-2 border-deep-navy shadow-pop flex items-center justify-center gap-2"
        >
          <LeekIcon className="w-5 h-5" />
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
          <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => onNavigate('index.html')}>
             <div className="w-8 h-8 bg-mint rounded-lg flex items-center justify-center border border-deep-navy">
                <LeekIcon className="w-6 h-6 pb-1" />
              </div>
             <span className="font-display text-xl font-bold text-deep-navy">DEFA</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            데이터(Data)를 찾아주는(Finder) 대파(DEFA).<br/>
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

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <BusanAnimation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur rounded-full border-2 border-mint shadow-sm mb-2 animate-float">
                <span className="text-deep-navy font-bold flex items-center gap-2">
                  <LeekIcon className="w-5 h-5" />
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
                "이 데이터 어디서 찾지?" 고민하지 마세요.<br className="md:hidden" />
                DEFA가 찾아주고, 문서 초안까지 써드립니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button 
                  onClick={() => onNavigate('chatbot.html')}
                  className="group bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-xl shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                   <LeekIcon className="w-6 h-6 pb-1" />
                   데파 시작하기
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Search Mockup */}
              <div className="mt-8 bg-white p-2 rounded-full shadow-soft border border-mint/50 max-w-md mx-auto md:mx-0 flex items-center transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center ml-1">
                    <Search className="text-deep-navy w-5 h-5" />
                </div>
                <div className="flex-1 px-4 text-gray-400 font-medium truncate">
                    "반려동물 동반 여행 시장 분석해줘"
                </div>
                <div className="bg-deep-navy text-white px-4 py-2 rounded-full text-sm font-bold">
                    검색
                </div>
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
               데이터 탐색부터 문서 완성까지,<br/> 
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
                  className={`bg-white rounded-[2.5rem] p-8 md:p-12 border-4 border-deep-navy/5 shadow-soft h-full transition-all duration-500 transform ${
                    activeTab === item.id ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute top-0 left-0 pointer-events-none'
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
             준비되셨나요?<br/>
             <span className="text-mint">데파</span>와 함께 문서를 완성하세요!
          </h2>
          <button 
            onClick={() => onNavigate('chatbot.html')}
            className="bg-soft-yellow text-deep-navy text-xl md:text-2xl font-bold px-12 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(255,250,205,0.6)] hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(255,250,205,0.8)] transition-all transform duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <LeekIcon className="w-8 h-8 pb-1" />
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

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

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('n8n 응답:', responseData);

      // n8n 응답 구조 파싱
      let botMessage = '';
      let datasetsFound = false;

      // 응답 구조 확인
      let dataToProcess;

      if (Array.isArray(responseData)) {
        // 배열이면 첫 번째 요소 사용
        if (responseData.length > 0) {
          dataToProcess = responseData[0];
        } else {
          throw new Error('응답 배열이 비어있습니다');
        }
      } else {
        // 객체면 그대로 사용
        dataToProcess = responseData;
      }

      // parsed 배열에서 데이터 추출
      if (dataToProcess.parsed && Array.isArray(dataToProcess.parsed) && dataToProcess.parsed.length > 0) {
        const parsedData = dataToProcess.parsed[0].body;

        if (parsedData && parsedData.content) {
          const content = parsedData.content;

          // 문제 정의
          if (content.문제정의) {
            botMessage += `📊 **문제 정의**\n${content.문제정의}\n\n`;
          }

          // 핵심 키워드
          if (content.핵심키워드 && Array.isArray(content.핵심키워드)) {
            botMessage += `🔑 **핵심 키워드**\n${content.핵심키워드.join(', ')}\n\n`;
          }

          // 필요한 데이터셋 목록
          if (content.필요한데이터셋 && Array.isArray(content.필요한데이터셋)) {
            botMessage += `📁 **추천 데이터셋**\n\n`;
            content.필요한데이터셋.forEach((dataset: any, idx: number) => {
              botMessage += `${idx + 1}. **${dataset.데이터명}**\n`;
              botMessage += `   - 내용: ${dataset.내용}\n`;
              botMessage += `   - 출처: ${dataset.출처}\n\n`;
            });
            datasetsFound = true;
          }
        }
      }

      // body.content에서 실제 데이터셋 검색 결과 추출
      const extractedDatasets: DatasetCard[] = [];

      if (dataToProcess.body && dataToProcess.body.content && Array.isArray(dataToProcess.body.content)) {
        botMessage += `\n🔍 **검색된 실제 데이터셋**\n\n`;

        // 중복 제거를 위한 Set
        const displayedServices = new Set<string>();
        let displayCount = 0;
        const MAX_DISPLAY = 10; // 최대 10개 추출

        dataToProcess.body.content.forEach((queryResult: any) => {
          if (queryResult.datasets && Array.isArray(queryResult.datasets) && displayCount < MAX_DISPLAY) {
            queryResult.datasets.forEach((dataset: any) => {
              if (dataset.contents && Array.isArray(dataset.contents) && displayCount < MAX_DISPLAY) {
                dataset.contents.forEach((item: any) => {
                  if (item.서비스명 && !displayedServices.has(item.서비스명) && displayCount < MAX_DISPLAY) {
                    displayedServices.add(item.서비스명);
                    displayCount++;

                    // HTML 태그 제거
                    const cleanDesc = item.서비스설명
                      ? item.서비스설명.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
                      : '설명 없음';

                    // 데이터셋 카드 배열에 추가
                    extractedDatasets.push({
                      serviceName: item.서비스명,
                      description: cleanDesc,
                      provider: item.제공기관,
                      views: item.조회수,
                      downloads: item.다운로드수
                    });

                    botMessage += `✅ **${item.서비스명}**\n`;
                    // 서비스 설명도 챗봇 메시지에 포함
                    const shortDesc = cleanDesc.substring(0, 100);
                    botMessage += `   ${shortDesc}${cleanDesc.length > 100 ? '...' : ''}\n`;
                    if (item.제공기관) {
                      botMessage += `   📍 ${item.제공기관}\n`;
                    }
                    botMessage += '\n';
                  }
                });
              }
            });
          }
        });

        if (displayCount > 0) {
          datasetsFound = true;
          botMessage += `\n총 ${displayCount}개의 데이터셋을 찾았습니다. 오른쪽 패널에서 확인하세요.\n`;
        }
      }

      // 데이터셋 상태 업데이트
      if (extractedDatasets.length > 0) {
        setDatasets(extractedDatasets);
      }

      setIsTyping(false);

      // botMessage가 비어있으면 기본 메시지라도 표시
      if (!botMessage.trim()) {
        botMessage = '⚠️ n8n에서 응답을 받았지만 파싱 가능한 데이터가 없습니다.\n\n응답 구조를 확인해주세요.';
      }

      setMessages((prev: any) => [...prev, {
        type: 'bot',
        text: botMessage + (datasetsFound ? '\n📋 탐색된 데이터셋을 기반으로 적절한 문서 포맷을 선택해 주세요.' : '')
      }]);
      setShowProceedBtn(datasetsFound);

    } catch (error) {
      console.error("Chatbot error:", error);
      setIsTyping(false);

      // 에러 메시지만 표시 (하드코딩된 데이터 없음)
      let errorMessage = '⚠️ 데이터셋 탐색 중 오류가 발생했습니다.\n\n';

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage += '요청 시간이 초과되었습니다. (60초)\nn8n 서버 처리 시간이 오래 걸리고 있습니다.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage += 'n8n 서버에 연결할 수 없습니다.\n네트워크 연결과 서버 상태를 확인해주세요.';
        } else {
          errorMessage += `오류 상세: ${error.message}`;
        }
      } else {
        errorMessage += '알 수 없는 오류가 발생했습니다.';
      }

      errorMessage += '\n\n다시 시도해주세요.';

      setMessages(prev => [...prev, {
        type: 'bot',
        text: errorMessage
      }]);
      setShowProceedBtn(false);
    }
  };

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
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-mint shadow-sm mr-4">
              <LeekIcon className="w-8 h-8 pb-1" />
            </div>
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
                   <div className="w-10 h-10 rounded-full bg-mint flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                     <LeekIcon className="w-6 h-6 pb-1" />
                   </div>
                 )}
                 <div className={`p-5 rounded-2xl shadow-sm border ${
                   msg.type === 'user'
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
                 <div className="w-10 h-10 rounded-full bg-mint flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                   <LeekIcon className="w-6 h-6 pb-1" />
                 </div>
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
                  onClick={() => toggleDatasetCheck(idx)}
                  className={`w-full text-left bg-white rounded-2xl p-4 border-2 cursor-pointer transition-all group ${
                    dataset.checked
                      ? 'border-mint bg-mint/5 shadow-md'
                      : 'border-gray-100 hover:border-mint hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* 체크박스 */}
                    <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5 ${
                      dataset.checked
                        ? 'bg-mint border-mint'
                        : 'border-gray-300 group-hover:border-mint'
                    }`}>
                      {dataset.checked && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm mb-2 transition-colors line-clamp-2 ${
                        dataset.checked ? 'text-mint' : 'text-deep-navy group-hover:text-mint'
                      }`}>
                        {dataset.serviceName}
                      </h4>
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
                  className={`w-full flex items-center p-3 rounded-xl transition-all mb-2 ${
                    selectedCategory === cat.id 
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

  // State for inputs
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('투자 유치용');
  const [tone, setTone] = useState('전문적이고 신뢰감 있는');

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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                goal: goal,
                tone: tone,
                docType: docName || category.docType,
                userType: category.label,
                selectedDatasets: selectedDatasets, // 선택된 데이터셋 포함
                timestamp: new Date().toISOString()
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const data: GeneratedDocData = await response.json();

        // Validate response structure
        if (!data.title || !data.sections || !Array.isArray(data.sections)) {
            throw new Error('Invalid response format from server');
        }

        // Pass the generated data to the parent (App) so ResultPage can use it
        onGenerateSuccess(data);
        onNavigate('result_doc.html');

    } catch (error) {
        console.error("Error generating document:", error);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                alert("요청 시간이 초과되었습니다.\n네트워크 연결을 확인하고 다시 시도해주세요.");
            } else if (error.message.includes('Failed to fetch')) {
                alert("서버에 연결할 수 없습니다.\n네트워크 연결과 n8n 서버 상태를 확인해주세요.");
            } else {
                alert(`문서 생성 중 오류가 발생했습니다:\n${error.message}`);
            }
        } else {
            alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
    } finally {
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
                     onChange={(e) => setTopic(e.target.value)}
                     className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint focus:ring-4 focus:ring-mint/10 outline-none transition-all font-medium text-lg"
                     placeholder="예: 반려동물 동반 여행 시장 분석 보고서"
                   />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-deep-navy font-bold text-lg mb-2">문서 작성 목표</label>
                     <select 
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
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
                        onChange={(e) => setTone(e.target.value)}
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
                    <li key={idx} className="text-gray-600 hover:text-mint cursor-pointer truncate">
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
                    <div key={idx} className="space-y-3">
                       <h3 className="font-bold text-xl text-deep-navy">{sec.heading}</h3>
                       <p className="text-gray-600 leading-8 text-justify whitespace-pre-wrap">
                          {sec.content}
                       </p>
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
           <button className="bg-white text-deep-navy border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:border-mint hover:text-mint transition-all flex items-center justify-center gap-2">
              <Edit size={20} />
              추가 편집 요청
           </button>
           <button className="bg-deep-navy text-white px-8 py-4 rounded-full font-bold text-lg shadow-pop hover:shadow-pop-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              PDF / DOCX 다운로드
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
    } else {
       setCurrentPath(path);
       window.scrollTo(0, 0);
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
