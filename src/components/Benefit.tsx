
const audience = [
    "Future Tycoons: Visionaries ready to build their empire, dominate their industry, and turn big ideas into unstoppable success.",
    "Career Hustlers: Professionals looking to level up, break limits, and own their career path with confidence and skill.",
    "Self-Mastery Seekers: Individuals dedicated to personal growth, mindset shifts, and unlocking their fullest potential.",
    "Next-Gen Leaders: Students and graduates preparing to step into greatness, navigate their path, and build a future of impact.",
    "Wellness Warriors: Those committed to mastering their physical and mental well-being for peak performance in all aspects of life.",
    "Spiritual Alchemists: Seekers looking to connect deeply, align their energy, and elevate their spiritual journey.",
    "Money Mavericks: Hustlers ready to take charge of their finances, master wealth-building, and secure financial freedom.",
    "Connection Architects: Individuals focused on building unshakable relationships, both personally and professionally.",
    "Ambition Fuelers: Dream chasers looking for the fire, strategies, and mindset to conquer their goals with swagger.",
    "Life Designers: Creators of their own reality, crafting a life that blends success, fulfillment, and undeniable style.",
    "Business Builders: Entrepreneurs looking to scale, sustain, and transform their ventures into legacy businesses.",
    "Creators and Innovators: Digital storytellers, content creators, and innovators pushing boundaries and making an impact."
  ];
  
  const Benefit = () => {
    return (
      <section className="py-20 bg-theme-purple-light/20 text-center">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-theme-pink-DEFAULT mb-2 md:mb-4">
          WHO NEEDS SWAGGERISM?
          </h2>
  
          {/* Subtitle */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-theme-purple-dark mb-4 md:mb-8 px-2">
          7 SWAGGER-FUELED STRATEGIES TO UNLEASH LIMITLESS ABUNDANCE IN YOUR LIFE
          </h3>
  
          {/* Image */}
          <div className="flex justify-center mb-8 md:mb-16">
            <img src="/ques.png" alt="Who Needs This?" className="w-auto max-w-full h-auto" />
          </div>
  
          {/* Audience List */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {audience.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 md:p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:scale-105 md:hover:scale-110 flex items-center text-base md:text-xl font-semibold border-l-4 border-theme-pink-DEFAULT">
                <span className="text-theme-pink-DEFAULT text-xl md:text-3xl mr-2 md:mr-4 flex-shrink-0">✔️</span>
                <p className="text-theme-purple-darkest flex-1 text-left">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Benefit;
