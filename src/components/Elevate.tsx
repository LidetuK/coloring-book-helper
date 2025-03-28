
import { useIsMobile } from "@/hooks/use-mobile";

const Elevate = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-20 bg-white text-black text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl italic font-semibold text-theme-purple-dark">
        This book will guide you to
        </h2>
  
        {/* Divider */}
        <div className="text-2xl md:text-3xl font-bold mt-2 text-theme-purple-medium">&gt;</div>
  
        {/* Subtext */}
        <p className="uppercase text-xs md:text-sm mt-2 tracking-wide text-theme-purple-dark">
           EMBRACE YOUR SWAG. BE UNSTOPPABLE. LIVE LIMITLESS.
        </p>
  
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mt-4 md:mt-6 leading-none text-theme-purple-darkest">
        UNLEASH <br /> YOUR SWAGGER
        </h1>
  
        {/* 7 Areas Section */}
        <p className="mt-4 md:mt-6 text-base md:text-lg font-semibold">
        Rise above, stand out, and elevate every aspect of your life with Swaggerism.
        </p>
  
        <p className="text-xs md:text-md mt-2 uppercase font-medium tracking-wide">
        Spirituality | Health | Wisdom | Relationships | Hustle | Wealth | Lifestyle
        </p>
  
        {/* Author */}
        <p className="mt-6 md:mt-8 text-base md:text-lg font-bold uppercase">BY: Resk 'Que</p>
  
        {/* Call to Action Button */}
        <div className="mt-6 md:mt-8">
        <button
  className="bg-[#DC2626] hover:bg-[#9B1C1C] text-white text-base sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
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

export default Elevate;
