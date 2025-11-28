import React from 'react';

const BusanAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-mint/20" />

      {/* Clouds */}
      <div className="absolute top-10 w-[200%] h-20 animate-cloud-move opacity-60">
        <svg className="w-full h-full text-white" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M50,50 Q70,30 90,50 T130,50 T170,50 T210,50 T250,50 T290,50 T330,50 T370,50 T410,50 T450,50 T490,50 T530,50 T570,50 T610,50 T650,50 T690,50 T730,50 T770,50 T810,50 T850,50 T890,50 T930,50 T970,50 V100 H0 V50" />
        </svg>
      </div>

      <div className="absolute bottom-0 w-full h-full flex flex-col justify-end">
        
        {/* Gwangan Bridge Silhouette (Background) */}
        <div className="w-full h-48 md:h-64 absolute bottom-20 md:bottom-32 opacity-30 text-deep-navy/30">
             <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,320 L0,200 Q360,100 720,200 Q1080,300 1440,200 L1440,320 Z" />
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M100,320 L100,150 Q360,50 620,150 L620,320" />
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M820,320 L820,150 Q1080,50 1340,150 L1340,320" />
                <line x1="100" y1="160" x2="620" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="820" y1="160" x2="1340" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
             </svg>
        </div>

        {/* Waves Layer 1 (Back) */}
        <div className="w-[200%] h-32 absolute bottom-0 animate-wave-slow opacity-30 text-baby-blue translate-y-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Waves Layer 2 (Middle) */}
        <div className="w-[200%] h-32 absolute bottom-0 animate-wave-medium opacity-50 text-mint translate-y-5">
           <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Rail Track */}
        <div className="absolute bottom-12 w-full h-2 bg-deep-navy/10 z-10"></div>
        <div className="absolute bottom-10 w-full h-6 flex justify-between z-10 px-4">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div key={i} className="w-2 h-full bg-deep-navy/20 rounded-full"></div>
             ))}
        </div>

        {/* Capsule Train Container */}
        <div className="absolute bottom-16 w-full h-32 z-20 overflow-hidden pointer-events-none">
          <div className="animate-train-move absolute left-0 bottom-0 flex items-end">
            
            {/* The Capsule Train */}
            <div className="w-48 h-32 relative">
                {/* Train Body */}
                <div className="absolute bottom-2 left-0 w-44 h-28 bg-soft-yellow rounded-[2.5rem] shadow-pop border-4 border-deep-navy overflow-hidden z-10">
                    {/* Stripe */}
                    <div className="absolute top-1/2 w-full h-4 bg-mint/50"></div>
                </div>
                
                {/* Windows */}
                <div className="absolute bottom-10 left-4 w-36 h-14 bg-baby-blue/30 rounded-2xl border-2 border-deep-navy/20 z-20 flex items-center justify-center overflow-hidden">
                    {/* The Duck Character */}
                    <div className="w-12 h-12 relative animate-float mt-4">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-black absolute top-0 left-0"></div> {/* Head */}
                        <div className="w-2 h-2 bg-black rounded-full absolute top-3 left-6"></div> {/* Eye */}
                        <div className="w-4 h-3 bg-orange-500 rounded-lg absolute top-5 left-8 transform -rotate-12"></div> {/* Beak */}
                        <div className="w-12 h-6 bg-yellow-400 rounded-full border-2 border-black absolute top-8 -left-2"></div> {/* Body */}
                    </div>
                </div>

                {/* Wheels */}
                <div className="absolute bottom-0 left-6 w-8 h-8 bg-deep-navy rounded-full border-2 border-white z-0 animate-spin"></div>
                <div className="absolute bottom-0 right-10 w-8 h-8 bg-deep-navy rounded-full border-2 border-white z-0 animate-spin"></div>
            </div>
            
            {/* Trail effect */}
            <div className="ml-4 mb-10 space-x-2 flex">
               <div className="w-4 h-4 bg-white/50 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce delay-150"></div>
            </div>

          </div>
        </div>

        {/* Waves Layer 3 (Front) */}
        <div className="w-[200%] h-24 absolute -bottom-4 animate-wave-fast opacity-80 text-baby-blue z-30">
           <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>

      </div>
    </div>
  );
};

export default BusanAnimation;