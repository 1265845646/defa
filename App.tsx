import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Search, CheckCircle2, FileText, Send, Bot, ArrowLeft, ChevronRight, PenTool, Upload, Database, Loader2, Download, Edit } from 'lucide-react';
import { NAV_LINKS, HOW_IT_WORKS_STEPS, DATA_STATS, DOCUMENT_CATEGORIES, SAMPLE_RESULT_CONTENT } from './constants';
import BusanAnimation from './components/BusanAnimation';

// --- Shared Components ---

const LeekIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* White Bulb (Root) */}
    <path d="M50 90 C 35 90 30 75 35 60 L 40 40 L 60 40 L 65 60 C 70 75 65 90 50 90 Z" fill="#FFFFFF" stroke="#191970" strokeWidth="3" />
    {/* Green Stem (Left) */}
    <path d="M40 40 Q 30 10 10 5" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" />
    {/* Green Stem (Right) */}
    <path d="M60 40 Q 70 10 90 5" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" />
    {/* Green Stem (Center) */}
    <path d="M50 40 L 50 5" fill="none" stroke="#4ADE80" strokeWidth="8" strokeLinecap="round" />
    {/* Face */}
    <circle cx="43" cy="70" r="3" fill="#191970" />
    <circle cx="57" cy="70" r="3" fill="#191970" />
    <path d="M48 76 Q 50 78 52 76" fill="none" stroke="#191970" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Navigation = ({ activePath, onNavigate, isMenuOpen, setIsMenuOpen }: any) => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b-4 border-mint/30 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div 
          className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('index.html')}
        >
          <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center border-2 border-deep-navy shadow-pop group-hover:shadow-pop-hover transition-all">
            <LeekIcon className="w-8 h-8 pb-1" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-deep-navy">
            DEFA <span className="text-sm font-sans text-deep-navy/60 ml-1 tracking-normal">Data Finder</span>
          </span>
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

const ChatbotPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [messages, setMessages] = useState<any[]>([
    { type: 'bot', text: '안녕하세요! 데이터파인더 DEFA입니다. 🌱\n어떤 주제에 대한 문서가 필요하신가요? 아이디어를 자유롭게 입력해 주세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProceedBtn, setShowProceedBtn] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: `"${userMsg}" 주제와 관련된 유용한 데이터셋을 찾았습니다!\n\n✅ 공공데이터포털: 지역별 유동인구 데이터\n✅ K-Data: 소비 트렌드 지수\n\n탐색된 데이터셋을 기반으로 적절한 문서 포맷을 선택해 주세요.` 
      }]);
      setShowProceedBtn(true);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen pt-20 relative flex flex-col items-center justify-center overflow-hidden">
      <BusanAnimation />
      
      <div className="w-full max-w-4xl px-4 relative z-20 mb-10 h-[80vh] flex flex-col">
        {/* Chat Interface */}
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
              <div key={idx} className={`flex items-start ${msg.type === 'user' ? 'justify-end' : ''} max-w-[90%] md:max-w-[80%] ${msg.type === 'user' ? 'ml-auto' : ''}`}>
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
                   탐색된 데이터셋으로 문서 포맷 선택하기
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

const CreateDocPage = ({ targetId, docName, onNavigate }: { targetId?: string, docName?: string, onNavigate: (path: string) => void }) => {
  const category = DOCUMENT_CATEGORIES.find(c => c.id === targetId) || DOCUMENT_CATEGORIES[0];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
        setIsGenerating(false);
        onNavigate('result_doc.html');
    }, 2500);
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
                    1. 데이터셋 준비
                </h3>
                
                {/* Recommended Datasets */}
                <div className="bg-mint/10 rounded-2xl p-6 border border-mint/30">
                    <h4 className="font-bold text-deep-navy mb-3 flex items-center text-sm">
                        <Bot size={16} className="mr-2" />
                        DEFA 추천 데이터셋 (챗봇 연동됨)
                    </h4>
                    <div className="space-y-2">
                        <div className="bg-white p-3 rounded-xl text-sm text-gray-600 flex items-center shadow-sm">
                            <CheckCircle2 size={16} className="text-mint mr-2" />
                            공공데이터포털 - 지역별 유동인구 현황 (2024.01)
                        </div>
                        <div className="bg-white p-3 rounded-xl text-sm text-gray-600 flex items-center shadow-sm">
                            <CheckCircle2 size={16} className="text-mint mr-2" />
                            통계청 - K-Data 소비 트렌드 지수
                        </div>
                    </div>
                </div>

                {/* Direct Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-mint hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-mint/20 transition-colors">
                        <Upload size={24} className="text-gray-400 group-hover:text-mint" />
                    </div>
                    <p className="font-bold text-deep-navy">직접 데이터셋 업로드 (선택사항)</p>
                    <p className="text-sm text-gray-400 mt-1">CSV, Excel, PDF 파일 지원</p>
                </div>
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
                     className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint focus:ring-4 focus:ring-mint/10 outline-none transition-all font-medium text-lg"
                     placeholder="예: 반려동물 동반 여행 시장 분석 보고서"
                   />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-deep-navy font-bold text-lg mb-2">문서 작성 목표</label>
                     <select className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint outline-none appearance-none font-medium">
                       <option>투자 유치용</option>
                       <option>내부 보고용</option>
                       <option>공모전/지원사업 제출용</option>
                       <option>시장 조사용</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-deep-navy font-bold text-lg mb-2">문서 톤앤매너</label>
                     <select className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 focus:border-mint outline-none appearance-none font-medium">
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

const ResultPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
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
           </p>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-[2rem] shadow-soft border-4 border-deep-navy/5 overflow-hidden flex flex-col md:flex-row h-[70vh]">
           
           {/* Sidebar Preview */}
           <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-100 p-6 overflow-y-auto">
              <h4 className="font-bold text-deep-navy mb-4 text-sm uppercase tracking-wide text-gray-400">목차</h4>
              <ul className="space-y-3 text-sm">
                 {SAMPLE_RESULT_CONTENT.sections.map((sec, idx) => (
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
                    <h2 className="font-display text-3xl text-deep-navy">{SAMPLE_RESULT_CONTENT.title}</h2>
                    <p className="text-gray-400 mt-2">Generated by DEFA AI • 2024.05.20</p>
                 </div>

                 {SAMPLE_RESULT_CONTENT.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                       <h3 className="font-bold text-xl text-deep-navy">{sec.heading}</h3>
                       <p className="text-gray-600 leading-8 text-justify">
                          {sec.content}
                       </p>
                    </div>
                 ))}
                 
                 <div className="p-6 bg-mint/10 rounded-xl border border-mint/30 mt-8">
                    <h4 className="font-bold text-deep-navy mb-2 flex items-center">
                       <Database size={16} className="mr-2 text-mint" />
                       참조 데이터 출처
                    </h4>
                    <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
                       <li>공공데이터포털 유동인구 API</li>
                       <li>K-Data 소비지출 트렌드 리포트</li>
                       <li>한국관광공사 반려동물 여행 실태조사</li>
                    </ul>
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
      return <CreateDocPage targetId={cat} docName={doc} onNavigate={handleNavigate} />;
    }
    if (pathBase === 'result_doc.html') {
      return <ResultPage onNavigate={handleNavigate} />;
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