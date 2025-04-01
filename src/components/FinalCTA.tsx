import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import OutOfStockDialog from "./OutOfStockDialog";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "Transform your business with proven sales strategies",
  "Generate unlimited leads and sales on autopilot",
  "Close high-ticket deals with confidence",
  "Build a powerful sales team that delivers results"
];

const FinalCTA = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 59, seconds: 59 });
  const [copiesLeft, setCopiesLeft] = useState(37);
  const [timerExpired, setTimerExpired] = useState(false);
  const [freeOffer, setFreeOffer] = useState(false);
  const [freeOfferTimeLeft, setFreeOfferTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        setTimerExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const scrollToCheckout = () => {
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-theme-purple-light via-theme-purple-DEFAULT to-theme-purple-dark text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
          {freeOffer ? "Get Your Free Book Now!" : "Get My Bestselling Book For Free!"}
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

        <Button
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-6 py-3 rounded-lg uppercase shadow-md transition transform hover:scale-105 w-full sm:w-auto"
          onClick={scrollToCheckout}
        >
          CLAIM YOUR COPY NOW
        </Button>

        <p className="mt-4 md:mt-6 text-base md:text-lg opacity-90 text-white">
          {timerExpired ? "Order Today For Fast Delivery!" : "Limited Time Offer - Act Now While Supplies Last!"}
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
