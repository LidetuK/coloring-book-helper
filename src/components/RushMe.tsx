
const RushMe = () => {
    return (
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Title */}
          <h1 className="text-3xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
            MOST PEOPLE WISH FOR AN EASIER LIFE, BUT THE KEY IS TO WORK ON BECOMING BETTER.
          </h1>
  
          {/* Call to Action Button */}
          <div className="mt-8">
            <button
              className="bg-theme-pink-medium hover:bg-theme-pink-dark text-white text-xl md:text-2xl px-8 md:px-16 py-6 md:py-8 mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-110 shadow-xl"
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
  
  export default RushMe;
