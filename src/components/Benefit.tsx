
const audience = [
    "Aspiring Entrepreneurs: Individuals looking to start their own business and seeking guidance on how to achieve success.",
    "Business Professionals: Those aiming to enhance their career, improve their skills, and achieve greater professional success.",
    "Personal Development Enthusiasts: People passionate about self-improvement and looking for comprehensive strategies to elevate their lives.",
    "Students and Graduates: Young adults preparing to enter the workforce and seeking advice on how to navigate their careers and personal growth.",
    "Health and Wellness Seekers: Individuals focused on improving their physical and mental well-being.",
    "Spiritual Seekers: Those looking to deepen their spiritual connection and find greater meaning in life.",
    "Financial Planners: People aiming to improve their financial literacy and achieve financial freedom.",
    "Relationship Builders: Individuals seeking to enhance their personal and professional relationships.",
    "Motivated Individuals: Anyone looking for inspiration and motivation to achieve their goals and dreams.",
    "Lifestyle Enthusiasts: People interested in creating a balanced, enjoyable, and fulfilling lifestyle.",
    "Founders: Entrepreneurs who have already started their businesses and are looking for strategies to scale and sustain their success.",
    "Content Creators: Individuals who produce digital content and are seeking ways to enhance their creativity, productivity, and audience engagement.",
  ];
  
  const Benefit = () => {
    return (
      <section className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-red-600 mb-2 md:mb-4">
            WHO NEEDS THIS?
          </h2>
  
          {/* Subtitle */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-700 mb-4 md:mb-8 px-2">
            7 SECRET STRATEGIES TO ACHIEVE UNPRECEDENTED ABUNDANCE IN YOUR LIFE.
          </h3>
  
          {/* Image */}
          <div className="flex justify-center mb-8 md:mb-16">
            <img src="/11.png" alt="Who Needs This?" className="w-auto max-w-full h-auto" />
          </div>
  
          {/* Audience List */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {audience.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:scale-105 md:hover:scale-110 flex items-center text-base md:text-xl font-semibold border-l-4 border-red-500">
                <span className="text-red-600 text-xl md:text-3xl mr-2 md:mr-4 flex-shrink-0">✔️</span>
                <p className="text-gray-800 flex-1 text-left">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Benefit;
  