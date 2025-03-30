
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const DualBookOffer = () => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-theme-purple-dark via-theme-purple-darkest to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ELEVATE YOUR MINDSET WITH THESE TRANSFORMATIVE BOOKS
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            These powerful books will guide you in mastering every dimension of swagger,
            from mindset to style to financial abundance.
          </p>
        </div>
        
        {/* Books Display - MUCH BIGGER BOOKS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Book 1 - Made much bigger */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredBook(1)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <img 
              src="/555.png" 
              alt="Swaggerism Book" 
              className="w-64 md:w-96 h-auto object-contain rounded-md shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${hoveredBook === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                onClick={() => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-theme-pink-DEFAULT text-white px-6 py-3 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
              >
                Get Your Copy
              </button>
            </div>
          </div>
          
          {/* Arrow or separator - Only visible on larger screens */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-12 h-12 text-theme-pink-DEFAULT mx-6" />
          </div>
          
          {/* Book 2 - Made much bigger */}
          <div 
            className="relative group mt-8 md:mt-0"
            onMouseEnter={() => setHoveredBook(2)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <img 
              src="/download (2).png" 
              alt="Elevate Higher Book" 
              className="w-64 md:w-96 h-auto object-contain rounded-md shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${hoveredBook === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <a 
                href="https://books.reskque.com/empowerment/self-development-guide/elevate-higher-the-book/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-theme-pink-DEFAULT text-white px-6 py-3 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Arrow or separator for third book - Only visible on larger screens */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-12 h-12 text-theme-pink-DEFAULT mx-6" />
          </div>
          
          {/* Book 3 - Added as requested */}
          <div 
            className="relative group mt-8 md:mt-0"
            onMouseEnter={() => setHoveredBook(3)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <img 
              src="/DeWatermark.ai_1743318892093.png" 
              alt="Third Book" 
              className="w-64 md:w-96 h-auto object-contain rounded-md shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${hoveredBook === 3 ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                className="bg-theme-pink-DEFAULT text-white px-6 py-3 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <button
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xl px-10 py-5 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })}
          >
            GET YOUR COPIES TODAY
          </button>
          <p className="text-white/70 mt-4 text-sm md:text-base">
            Limited time offer. Secure your transformative journey now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DualBookOffer;
