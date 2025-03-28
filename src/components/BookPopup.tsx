
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
      <DialogContent className="max-w-3xl p-0 border-0 overflow-hidden bg-gray-100 rounded-lg">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300">
          <div className="h-full bg-gradient-to-r from-red-500 to-theme-purple-DEFAULT w-1/2"></div>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-4 top-4 text-gray-600 hover:text-black z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Content */}
        <div className="p-8 md:p-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            WAIT! BEFORE YOU GO...
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Send me your address and I'll rush a FREE copy of my brand 
            new physical book to your doorstep, ASAP! And if you don't love 
            it I'll refund you the cost of shipping and handling.
          </p>
          
          {/* Book Images */}
          <div className="flex justify-center items-center my-8">
            <img 
              src="/lovable-uploads/b62a853b-3f6b-4c2f-b142-3e002008d964.png" 
              alt="Elevate Higher Book" 
              className="max-w-full h-auto"
            />
          </div>
          
          {/* CTA Button */}
          <button
            onClick={handleRedirect}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xl md:text-2xl px-8 py-4 md:py-5 font-bold uppercase rounded-lg transform transition-all duration-300 hover:scale-105 shadow-xl w-full md:w-auto"
          >
            RUSH ME A FREE COPY
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookPopup;
