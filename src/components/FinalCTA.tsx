
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import OutOfStockDialog from "./OutOfStockDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);
  const [freeOffer, setFreeOffer] = useState(false);
  const [freeOfferTimeLeft, setFreeOfferTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const [showFreeBonus, setShowFreeBonus] = useState(false);
  
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
  
  // Check if user clicked on free offer
  useEffect(() => {
    const freeOfferClicked = localStorage.getItem('freeOfferClicked') === 'true';
    const clickTime = localStorage.getItem('freeOfferClickTime');
    const freeOfferExpired = localStorage.getItem('freeOfferExpired') === 'true';
    
    if (freeOfferClicked && clickTime && !freeOfferExpired) {
      setFreeOffer(true);
      setShowFreeBonus(true);
      
      // Calculate remaining time from the 5 minute offer
      const elapsedMs = Date.now() - parseInt(clickTime);
      const totalMs = 5 * 60 * 1000; // 5 minutes in ms
      const remainingMs = Math.max(0, totalMs - elapsedMs);
      
      const minutes = Math.floor(remainingMs / (60 * 1000));
      const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
      
      setFreeOfferTimeLeft({ minutes, seconds });
      
      // Start the free offer countdown
      const freeOfferInterval = setInterval(() => {
        setFreeOfferTimeLeft(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          }
          
          // Time's up for free offer
          setFreeOffer(false);
          setShowFreeBonus(false);
          localStorage.setItem('freeOfferExpired', 'true');
          clearInterval(freeOfferInterval);
          return { minutes: 0, seconds: 0 };
        });
      }, 1000);
      
      return () => clearInterval(freeOfferInterval);
    }
  }, []);
  
  const handleCoverTypeChange = (type: string) => {
    if (type === 'hardcover') {
      setShowOutOfStockDialog(true);
    } else {
      setCoverType(type);
    }
  };
  
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const scrollToCheckout = () => {
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-theme-purple-light via-theme-purple-DEFAULT to-theme-purple-dark text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
      
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
          {freeOffer ? "Get Your Free Book Now!" : "Get My Bestselling Book For Free!"}
        </h1>

        {freeOffer && (
          <div className="mt-4 mb-6 p-3 bg-green-600 rounded-lg animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-white" />
              <span className="text-lg font-bold text-white">
                Complete checkout in {formatNumber(freeOfferTimeLeft.minutes)}:{formatNumber(freeOfferTimeLeft.seconds)} to claim your free book!
              </span>
            </div>
          </div>
        )}

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
              <RadioGroup
                value={coverType}
                onValueChange={handleCoverTypeChange}
                className="flex justify-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="softcover" id="softcover" />
                  <Label htmlFor="softcover" className="text-white cursor-pointer">Softcover</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hardcover" id="hardcover" />
                  <Label htmlFor="hardcover" className="text-white cursor-pointer">Hardcover (+$5.00)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <Button
          variant="cta"
          size="xl"
          className="mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
          onClick={scrollToCheckout}
        >
          {!timerExpired ? (
            <>Define Your Religion <br /> Order 'Swaggerism' Today</>
          ) : (
            <>RUSH ME MY COPIES NOW</>
          )}
        </Button>

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
      
      <OutOfStockDialog 
        open={showOutOfStockDialog} 
        onClose={() => {
          setShowOutOfStockDialog(false);
          setCoverType('softcover');
        }} 
      />
    </section>
  );
};

export default FinalCTA;
