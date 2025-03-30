import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#3A0233] pt-10 md:pt-16 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs md:text-sm uppercase tracking-widest text-[#ffffff]">
        A trailblazing entrepreneur, high-stakes investor, life architect,
        </p>
        <p className="text-xs md:text-sm mt-2 uppercase tracking-wider italic">
        style icon, and unapologetic force of nature is
        </p>

        <div className="space-y-1 md:space-y-2 mt-4">
          <p className="text-3xl sm:text-4xl md:text-7xl font-bold leading-[1.1] md:leading-[1.3]">
          GIVING AWAY 10,000 COPIES 
          </p>
          <p className="text-3xl sm:text-4xl md:text-7xl font-bold leading-[1.1] md:leading-[1.3]">
          of his #1 bestselling book!
          </p>
        </div>

        <div className="text-[#ffffff] uppercase tracking-widest space-x-4">
 
  <span className="block md:inline text-4xl font-bold leading-tight">
    Why? Because Swaggerism isn’t just a mindset
  </span>
  <span className="block md:inline text-xl font-bold">
  —it’s a movement. And to prove it, he’s revealing his 11 Secret Strategies
  </span>
  <span className="block md:inline text-xl font-bold">
    for unlocking unstoppable success, limitless abundance, and ultimate swagger. 
  </span>
  <span className="block md:inline text-xl font-bold">
    in Your Life. Simply to Prove His Point. 
  </span>
  <span className="block md:inline text-xl font-bold">
    This isn’t charity. This is proof that Swaggerism works.
  </span>
</div>

        {/* Image Section with Adjusted Size */}
        <div className="relative flex items-center justify-center mt-4 md:mt-6 w-full">
          <img 
            src="/555.png" 
            alt="Main Feature" 
            className="rounded-lg shadow-xl w-full max-w-4xl object-cover"
          />
        </div>

        <Button 
  size="lg"
  className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-2xl px-4 md:px-16 py-6 md:py-8 mt-6 md:mt-8 font-bold uppercase rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto"
  onClick={() => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })}
>
Embrace Your Swaggerism- Get Your Copy Now!
  <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
</Button>
        <p className="mt-4 text-xs md:text-sm opacity-80 font-bold">
          HURRY! STOCK OF THIS BOOK AS OF FEBRUARY 21 IS LOW
        </p>

        {/* Logos Section Adjusted */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-6 opacity-80 mb-16 md:mb-32 w-full max-w-5xl">
          <img 
            src="/logo.png" 
            alt="Forbes" 
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* Curved Wave Section */}
      <div className="absolute -bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="relative w-full h-[100px] md:h-[280px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,250.7C672,256,768,256,864,250.7C960,245,1056,235,1152,240C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="duration-300 ease-in-out"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
