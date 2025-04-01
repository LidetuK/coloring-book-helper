
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
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('finalCtaTime');
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);
      return parsedTime;
    }
    return {
      hours: 3,
      minutes: 59,
      seconds: 59
    };
  });
  const [copiesLeft, setCopiesLeft] = useState(37);
  const [coverType, setCoverType] = useState('softcover');
  const [timerExpired, setTimerExpired] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('finalCtaTime', JSON.stringify(timeLeft));
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        setTimerExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);
  
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

        {!timerExpired && (
          <div className="mb-6 border rounded-lg p-4 bg-white/10">
            <h3 className="font-medium mb-2 text-white">Choose Your Cover Type:</h3>
            <div className="flex justify-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="coverType"
                  value="softcover"
                  checked={coverType === 'softcover'}
                  onChange={() => setCoverType('softcover')}
                  className="mr-2 h-5 w-5"
                />
                <span>Softcover</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="coverType" 
                  value="hardcover"
                  checked={coverType === 'hardcover'}
                  onChange={() => setCoverType('hardcover')}
                  className="mr-2 h-5 w-5"
                />
                <span>Hardcover (+$5.00)</span>
              </label>
            </div>
          </div>
        )}

        <button
          className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
          onClick={() =>
            document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {!timerExpired ? (
            <>Define Your Religion <br /> Order 'Swaggerism' Today</>
          ) : (
            <>RUSH ME MY COPIES NOW</>
          )}
        </button>

        <p className="mt-4 md:mt-6 text-base md:text-lg opacity-90 text-white">
          {!timerExpired ? (
            "Limited Time Offer - Act Now While Supplies Last!"
          ) : (
            "Order Today For Fast Delivery!"
          )}
        </p>

        {!timerExpired && (
          <div className="mt-4 text-sm bg-white/10 p-2 rounded">
            <span>Original price: <span className="line-through">${coverType === 'hardcover' ? '44.99' : '39.99'}</span> - Today's price: <span className="font-bold text-yellow-300">${coverType === 'hardcover' ? '34.99' : '29.99'}</span></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalCTA;
