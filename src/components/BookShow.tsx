
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Check } from 'lucide-react';

type BookOption = 'digital' | 'physical' | 'bundle';

const BookShow = () => {
  const isMobile = useIsMobile();
  const [selectedOption, setSelectedOption] = useState<BookOption>('digital');

  const handleOptionSelect = (option: BookOption) => {
    setSelectedOption(option);
  };

  // Calculate price based on selected option
  const getPrice = () => {
    switch (selectedOption) {
      case 'digital':
        return '$9.99';
      case 'physical':
        return '$29.99';
      case 'bundle':
        // 5% off combined price
        const digitalPrice = 9.99;
        const physicalPrice = 29.99;
        const bundlePrice = (digitalPrice + physicalPrice) * 0.95;
        return `$${bundlePrice.toFixed(2)}`;
    }
  };

  return (
    <section className="py-12 md:py-20 bg-theme-purple-medium text-white text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-wide leading-tight" style={{ color: '#FFFFFF' }}>
          UNLEASH YOUR BEST SELF. BEGIN NOW.
        </h1>

        {/* Book Introduction */}
        <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
          I'm excited to introduce my book, Swaggerism My Religion: Live Bold, Hustle Smart, Rule Your World.,{" "}
          <span className="font-bold uppercase">
            This book is your blueprint for mastering the art of confidence, success, and influence. It focuses on seven essential pillars of Swaggerism—Mindset, Style, Hustle, Influence, Wealth, Legacy, and Freedom—
          </span>{" "}
          empowering you to command every room, elevate your game, and build a life that speaks power. If you're ready to embrace the mindset of greatness, this is your guide.:{" "}
          <strong></strong> 
        </p>

        {/* Book Display - Large Size */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <img 
            src="/download (2).png" 
            alt="Book Cover" 
            className="w-2/3 max-w-md h-auto object-contain mx-auto"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Availability Notice */}
        <div className="mt-6 md:mt-8 bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
          <p className="text-base md:text-lg font-bold uppercase">
            DUE TO THE HIGH DEMAND FOR THIS TRANSFORMATIVE BOOK, IT MAY TAKE A FEW SECONDS TO LOAD AFTER YOU PLACE YOUR ORDER HERE ONLINE.
          </p>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            YOUR <span className="text-theme-purple-dark font-bold">FREE COPY</span> 
            MAY TAKE <strong>14-25 BUSINESS DAYS</strong> TO BE DELIVERED TO YOUR DOORSTEP.  
            I KINDLY ASK FOR YOUR PATIENCE DURING THIS PROCESS…
          </p>
        </div>

        {/* Ordering Options */}
        <div className="mt-6 md:mt-8">
          <p className="text-base md:text-lg mb-4">
            Choose your preferred option:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Digital Version */}
            <div 
              className={`bg-white p-4 md:p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${selectedOption === 'digital' ? 'ring-4 ring-theme-pink-DEFAULT transform scale-105' : 'hover:shadow-lg'}`}
              onClick={() => handleOptionSelect('digital')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg md:text-xl font-bold text-theme-purple-dark">Digital Version</h3>
                {selectedOption === 'digital' && <Check className="h-5 w-5 text-theme-pink-DEFAULT" />}
              </div>
              <p className="mb-2 text-gray-700">Instant access to the e-book</p>
              <div className="flex items-baseline">
                <span className="line-through text-gray-500 mr-2">$14.99</span>
                <span className="text-xl md:text-2xl font-bold text-theme-purple-dark">$9.99</span>
              </div>
            </div>
            
            {/* Physical Copy */}
            <div 
              className={`bg-white p-4 md:p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${selectedOption === 'physical' ? 'ring-4 ring-theme-pink-DEFAULT transform scale-105' : 'hover:shadow-lg'}`}
              onClick={() => handleOptionSelect('physical')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg md:text-xl font-bold text-theme-purple-dark">Physical Copy</h3>
                {selectedOption === 'physical' && <Check className="h-5 w-5 text-theme-pink-DEFAULT" />}
              </div>
              <p className="mb-2 text-gray-700">Shipped to your doorstep</p>
              <div className="flex items-baseline">
                <span className="line-through text-gray-500 mr-2">$39.99</span>
                <span className="text-xl md:text-2xl font-bold text-theme-purple-dark">$29.99</span>
                <span className="text-xs ml-2 text-gray-600">+ shipping</span>
              </div>
            </div>
            
            {/* Bundle Deal */}
            <div 
              className={`bg-white p-4 md:p-6 rounded-lg border-2 border-theme-purple-DEFAULT relative cursor-pointer transition-all duration-300 ${selectedOption === 'bundle' ? 'ring-4 ring-theme-pink-DEFAULT transform scale-105' : 'hover:shadow-lg'}`}
              onClick={() => handleOptionSelect('bundle')}
            >
              <div className="absolute -top-3 right-4 bg-theme-purple-DEFAULT text-white text-xs px-2 py-1 rounded">BEST VALUE</div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg md:text-xl font-bold text-theme-purple-dark">Bundle Deal</h3>
                {selectedOption === 'bundle' && <Check className="h-5 w-5 text-theme-pink-DEFAULT" />}
              </div>
              <p className="mb-2 text-gray-700">Get both digital & physical</p>
              <p className="font-bold text-theme-purple-dark">Save 5%</p>
            </div>
          </div>

          <button
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-lg md:text-xl px-6 md:px-12 py-4 md:py-6 mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() =>
              document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Claim Your Copy - {getPrice()}
          </button>
        </div>

        {/* Free Shipping Notice for Physical & Bundle */}
        {(selectedOption === 'physical' || selectedOption === 'bundle') && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg inline-block">
            <Check className="inline-block h-4 w-4 mr-1" />
            FREE shipping when pre-ordered before July 15!
          </div>
        )}

        {/* Closing Message */}
        <p className="mt-8 md:mt-12 italic opacity-80 text-base md:text-lg">
          Thank you for taking the time to read this page. I look forward to hearing from you soon and helping you embark on this journey to elevate your life.
        </p>

        <p className="mt-4 md:mt-6 text-base md:text-lg font-bold">Warm regards,</p>
        <p className="text-lg md:text-xl font-bold text-theme-purple-light">Resk'Que</p>
        <img 
          src="/Screenshot_2025-02-28_231038-removebg-preview.png" 
          alt="Signature" 
          className="mx-auto" 
        />
        <h3 className="text-2xl md:text-3xl font-bold text-theme-purple-light">P.S.</h3>
        <p className="mt-8 md:mt-12 italic opacity-80 text-base md:text-lg">
          I promise you one thing, just taking action to receive this gift from me, I'll be happy to invite you to my next event free of charge and also autograph a copy of your book when you share how this book impact your thoughts or life on any of your social media platforms and tag me on it.
        </p>
      </div>
    </section>
  );
};

export default BookShow;
