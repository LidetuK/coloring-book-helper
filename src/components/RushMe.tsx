
const RushMe = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-theme-purple-darkest to-black text-white text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-theme-purple-DEFAULT/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-40 right-10 w-60 h-60 bg-theme-purple-DEFAULT/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-theme-purple-light/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <h1 className="text-3xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white mb-8">
        Swaggerism: My Religion <span className="text-theme-purple-light">Unlock Your Ultimate Self-Expression, Discover Swaggerism</span>.
        </h1>

        {/* Call to Action Button - Red with animation */}
        <div className="mt-8">
        <button
  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-base sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl w-full sm:w-auto relative overflow-hidden"
  onClick={() =>
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })
  }
>
  <span className="relative z-10 text-center block">
    Define Your Religion <br /> Order 'Swaggerism' Today
  </span>
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
</button>
        </div>
      </div>
    </section>
  );
};

export default RushMe;
