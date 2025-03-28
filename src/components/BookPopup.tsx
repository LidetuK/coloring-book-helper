
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const BookPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds on page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.open("https://books.reskque.com/empowerment/self-development-guide/elevate-higher-the-book/", "_blank");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl p-0 border-0 overflow-hidden bg-gradient-to-br from-theme-purple-light to-theme-purple-DEFAULT rounded-lg w-[90vw] md:w-auto">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300">
          <div className="h-full bg-gradient-to-r from-red-500 to-theme-purple-DEFAULT w-1/2 animate-pulse"></div>
        </div>
        
        {/* Close Button - Only one X button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-4 top-4 text-white hover:text-gray-200 z-10 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Content */}
        <div className="p-6 md:p-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            ELEVATE HIGHER: Unlock Your Potential
          </h2>
          
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8">
            Grab a copy of Elevate Higher! This book is designed to help you expand your mindset and achieve greater success. It's the perfect complement to your journey. Get it now, and if you're not completely satisfied, I'll refund the cost of shipping and handling. Elevate your future today!
          </p>
          
          {/* Book Images */}
          <div className="flex justify-center items-center my-6 md:my-8">
            <img 
              src="/download (2).png" 
              alt="Elevate Higher Book"
              className="max-w-full h-auto max-h-[300px] rounded-md shadow-lg"
            />
          </div>
          
          {/* CTA Button */}
          <button
            onClick={handleRedirect}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xl px-6 md:px-8 py-3 md:py-4 font-bold uppercase rounded-lg transform transition-all duration-300 hover:scale-105 shadow-xl w-full md:w-auto"
          >
            RUSH ME A FREE COPY
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookPopup;
