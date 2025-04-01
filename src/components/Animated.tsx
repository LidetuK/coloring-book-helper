
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const Animated = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to get saved time from localStorage, otherwise start with default values
    const savedTime = localStorage.getItem('freeOfferTime');
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);
      return parsedTime;
    }
    return {
      minutes: 5,
      seconds: 0
    };
  });
  
  const [offerExpired, setOfferExpired] = useState(() => {
    const expired = localStorage.getItem('freeOfferExpired');
    return expired === 'true';
  });

  useEffect(() => {
    // Save current time to localStorage whenever it changes
    localStorage.setItem('freeOfferTime', JSON.stringify(timeLeft));
    
    const timer = setInterval(() => {
      if (offerExpired) return; // Don't countdown if expired
      
      setTimeLeft(current => {
        if (current.seconds > 0) {
          return { ...current, seconds: current.seconds - 1 };
        }
        if (current.minutes > 0) {
          return { minutes: current.minutes - 1, seconds: 59 };
        }
        // Timer reached 0:00
        setOfferExpired(true);
        localStorage.setItem('freeOfferExpired', 'true');
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, offerExpired]);

  const handleRedirectToCheckout = () => {
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
    // Store the information that user has clicked the offer
    localStorage.setItem('freeOfferClicked', 'true');
    localStorage.setItem('freeOfferClickTime', Date.now().toString());
  };
  
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Book image and info */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="relative">
                <img
                  src="/111.png"
                  alt="Elevate Higher Book"
                  className="rounded-lg shadow-2xl w-full max-w-md mx-auto transform -rotate-3 hover:rotate-0 transition-all duration-300"
                />
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
                  <Badge className="bg-theme-purple-dark text-white px-3 py-1.5 text-sm md:text-base font-bold shadow-lg">
                    BESTSELLER
                  </Badge>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-theme-purple-light to-theme-purple-dark rounded-full opacity-20 blur-3xl -z-10"></div>
            <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 blur-3xl -z-10"></div>
          </div>

          {/* Right side - Book details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-theme-purple-dark">
              ELEVATE <span className="text-[#DC2626]">HIGHER</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium text-gray-700">
              Unlock Your Potential and Transform Your Life
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-theme-purple-light flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <BookOpen className="h-3 w-3" />
                </div>
                <p className="text-gray-700">Discover powerful frameworks to enhance every area of your life</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-theme-purple-light flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <BookOpen className="h-3 w-3" />
                </div>
                <p className="text-gray-700">Practical action steps for immediate results</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-theme-purple-light flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <BookOpen className="h-3 w-3" />
                </div>
                <p className="text-gray-700">Transform your mindset and achieve your biggest goals</p>
              </div>
            </div>
            
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {!offerExpired ? (
                  <>
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full animate-pulse">
                      <Clock className="h-4 w-4 text-green-700" />
                      <span className="font-bold text-green-700">{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">FREE TODAY!</span>
                    <div className="flex items-center">
                      <span className="text-lg text-gray-500 line-through mr-1">$29.99</span>
                      <span className="text-lg text-gray-500 line-through mr-1">$39.99</span>
                      <span className="bg-gray-200 text-gray-500 text-sm line-through px-2.5 py-0.5 rounded">25% OFF</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-[#DC2626]">$29.99</span>
                    <span className="text-lg text-gray-500 line-through">$39.99</span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">25% OFF</span>
                  </>
                )}
              </div>
              
              <Button
                variant={offerExpired ? "cta" : "freeCta"}
                className="text-lg px-8 py-6 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
                onClick={handleRedirectToCheckout}
              >
                {offerExpired ? "Claim Your Copy" : "GET IT FREE NOW"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                <BookOpen className="inline-block h-4 w-4 mr-1" />
                Digital version {offerExpired ? "included with every purchase" : "included free"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Animated;
