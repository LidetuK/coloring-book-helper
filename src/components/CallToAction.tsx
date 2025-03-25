import { useIsMobile } from "@/hooks/use-mobile";

const CallToAction = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-20 bg-[#3A0233] text-white text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
          ELEVATE HIGHER WITH YOUR FREE COPY AND EXCLUSIVE BONUSES!
        </h1>
  
        {/* Call to Action Button */}
        <div className="mt-6 md:mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 mt-4 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
            onClick={() =>
              document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })
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
