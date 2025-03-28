
const RushMe = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-theme-purple-darkest to-black text-white text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-theme-purple-DEFAULT/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-40 right-10 w-60 h-60 bg-theme-pink-DEFAULT/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-theme-purple-light/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <h1 className="text-3xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white mb-8">
          MOST PEOPLE WISH FOR AN <span className="text-theme-pink-light">EASIER LIFE</span>, BUT THE KEY IS TO WORK ON <span className="text-theme-purple-light">BECOMING BETTER</span>.
        </h1>

        {/* Call to Action Button */}
        <div className="mt-8">
          <button
            className="bg-[#DC2626] hover:bg-[#9B1C1C] text-white text-base sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto"
            onClick={() =>
              document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10">RUSH ME A FREE COPY NOW</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RushMe;
