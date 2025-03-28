
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Check, Package, BookOpen, Gift } from 'lucide-react';

const DualBookOffer = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('dual-book-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const bookBenefits = [
    "Personal growth strategies from two powerful perspectives",
    "Complementary methodologies that reinforce each other",
    "Save money with bundle pricing (15% off individual prices)",
    "One unified shipping cost for both physical books",
    "Immediate access to both digital versions"
  ];

  return (
    <section 
      id="dual-book-section"
      className="py-16 md:py-24 bg-gradient-to-br from-theme-purple-light to-theme-purple-dark text-white"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            ULTIMATE TRANSFORMATION BUNDLE
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Get both bestselling books and save! Experience the power of combined wisdom and double your growth potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Book 1: Elevate Higher */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-white/20 h-full flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 relative mr-4">
                <img 
                  src="/download (2).png" 
                  alt="Elevate Higher" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Elevate Higher</h3>
                <p className="text-white/80 text-sm md:text-base">Unlock your potential and achieve greater success with proven strategies for personal growth.</p>
                <div className="mt-2 text-white/70 text-sm">Individual price: <span className="line-through">$39.99</span> <span className="text-white font-bold">$29.99</span></div>
              </div>
            </div>
            <div className="mt-auto pt-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 mr-2 text-white/70 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">7 key areas of transformation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Practical exercises and action steps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Book 2: Swaggerism My Religion */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-white/20 h-full flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 relative mr-4">
                <img 
                  src="/2-removebg-preview (1).png" 
                  alt="Swaggerism My Religion" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Swaggerism My Religion</h3>
                <p className="text-white/80 text-sm md:text-base">Discover the art of confidence and authentic self-expression to transform your life.</p>
                <div className="mt-2 text-white/70 text-sm">Individual price: <span className="line-through">$39.99</span> <span className="text-white font-bold">$29.99</span></div>
              </div>
            </div>
            <div className="mt-auto pt-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 mr-2 text-white/70 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Build unshakeable confidence</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Master authentic self-expression</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bundle Box */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-white/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#DC2626] text-white py-1 px-4 font-bold text-sm">
            BEST VALUE
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Complete Bundle</h3>
              <p className="text-white/90 mb-4">Get both books and transform every aspect of your life. Save 15% compared to buying separately!</p>
              
              <div className="space-y-3 mb-6">
                {bookBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-xl">Bundle Price:</span>
                  <span className="text-3xl font-bold ml-2">$50.99</span>
                  <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded">SAVE 15%</span>
                </div>
                <p className="text-sm text-white/80">
                  <Package className="inline h-4 w-4 mr-1" /> 
                  Physical copies + <BookOpen className="inline h-4 w-4 mx-1" /> digital versions included
                </p>
              </div>
              
              <button
                onClick={() => window.location.href = "#claim"}
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-lg px-8 py-4 font-bold uppercase rounded-lg flex items-center justify-center w-full md:w-auto transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get Both Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center relative">
                <img 
                  src="/download (2).png" 
                   
                  alt="Elevate Higher" 
                  className="w-40 h-auto object-contain drop-shadow-xl transform -rotate-6 absolute -left-4 md:left-8 z-10"
                />
                <img 
                  src="/2-removebg-preview (1).png"
                  alt="Swaggerism My Religion" 
                  className="w-40 h-auto object-contain drop-shadow-xl transform rotate-6 absolute -right-4 md:right-8 z-10"
                />
                <div className="w-60 h-60 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Gift className="h-16 w-16 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualBookOffer;
