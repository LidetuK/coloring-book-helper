
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const benefits = [
  "Transform your business with proven sales strategies",
  "Generate unlimited leads and sales on autopilot",
  "Close high-ticket deals with confidence",
  "Build a powerful sales team that delivers results"
];

const FinalCTA = () => {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 59,
    seconds: 59
  });
  const [copiesLeft, setCopiesLeft] = useState(37);
  
  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Random decrease in copies
  useEffect(() => {
    const decreaseCopies = () => {
      if (copiesLeft > 5) {
        setCopiesLeft(prev => prev - 1);
      }
    };
    
    const interval = setInterval(decreaseCopies, Math.random() * 30000 + 15000);
    return () => clearInterval(interval);
  }, [copiesLeft]);
  
  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  
  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-theme-purple-light via-theme-purple-DEFAULT to-theme-purple-dark text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
      
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
          Get My Bestselling Book For Free!
        </h1>

        {/* Flash Sale Banner */}
        <div className="mt-6 mb-8 bg-black p-4 rounded-lg animate-pulse-glow">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center">
              <Flame className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-xl font-bold text-white">FLASH SALE</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-yellow-300 mr-2" />
              <div className="flex items-center space-x-1 text-white">
                <span className="bg-gray-800 p-1 rounded">{formatNumber(timeLeft.hours)}</span>
                <span>:</span>
                <span className="bg-gray-800 p-1 rounded">{formatNumber(timeLeft.minutes)}</span>
                <span>:</span>
                <span className="bg-gray-800 p-1 rounded">{formatNumber(timeLeft.seconds)}</span>
              </div>
            </div>
            <div className="text-white">
              <span className="font-bold text-red-400">Only {copiesLeft} copies left!</span>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8 mt-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start md:items-center justify-center mb-4 px-2">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0 mt-0.5 md:mt-0 text-white" />
              <span className="text-left text-base md:text-lg text-white">{benefit}</span>
            </div>
          ))}
        </div>

        <button
          className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
          onClick={() =>
            document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Claim Your Free Copy
        </button>

        <p className="mt-4 md:mt-6 text-base md:text-lg opacity-90 text-white">
          Limited Time Offer - Act Now While Supplies Last!
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
