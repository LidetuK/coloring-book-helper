
import { useIsMobile } from "@/hooks/use-mobile";

const CallToAction = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-theme-purple-darkest via-black to-theme-purple-dark text-white text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-theme-purple-DEFAULT/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-theme-purple-DEFAULT/20 rounded-full blur-3xl"></div>
        
        {/* Section Title */}
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white relative z-10 animate-pulse-glow">
          ELEVATE HIGHER WITH YOUR FREE COPY AND EXCLUSIVE BONUSES!
        </h1>
  
        {/* Call to Action Button - Changed to red */}
        <div className="mt-6 md:mt-8 relative z-10">
        <button
  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 mt-4 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto animate-shimmer"
  onClick={() =>
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
  }
>
  RUSH ME A FREE COPY NOW
</button>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
