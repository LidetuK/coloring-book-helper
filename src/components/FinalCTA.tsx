
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const benefits = [
  "Transform your business with proven sales strategies",
  "Generate unlimited leads and sales on autopilot",
  "Close high-ticket deals with confidence",
  "Build a powerful sales team that delivers results"
];

const FinalCTA = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-theme-purple-light via-theme-purple-DEFAULT to-theme-purple-dark text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
      
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
          Get My Bestselling Book For Free!
        </h1>

        <div className="mb-6 md:mb-8 mt-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start md:items-center justify-center mb-4 px-2">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 flex-shrink-0 mt-0.5 md:mt-0 text-white" />
              <span className="text-left text-base md:text-lg text-white">{benefit}</span>
            </div>
          ))}
        </div>

        <button
  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
  onClick={() =>
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
  }
>
  Claim Your Free Copy
</button>


        <p className="mt-4 md:mt-6 text-base md:text-lg opacity-90 text-white">
          Limited Time Offer - Act Now While Supplies Last!
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
