
const testimonial = [
    
    {
      name: "Elijah M.",
      role: "BUSINESS INFLUENCER",
      followers: "21K Followers",
      text: "🔥This book isn’t just motivation—it’s a power move. Resk’Que’s Swaggerism philosophy rewired my thinking and showed me how to command success on my terms. Every page fuels ambition, confidence, and the relentless drive to win. This is next-level game!🔥",
      image: "/DeWatermark.ai_1743319350620.png"
    },
    {
      name: "Jordan R.",
      role: "8 FIGURE ENTREPRENEUR",
      followers: "12.5K Followers",
      text: "🔥Swaggerism is the mindset revolution I didn’t know I needed. Resk’Que’s raw, unapologetic wisdom unlocked my confidence and dominance. His principles helped me break barriers, embrace challenges, and own my success without limits. This book is pure power!🔥",
      image: "/DeWatermark.ai_1743319505564.png"
    },
    {
      name: "Serena L.",
      role: "CEO AND FOUNDER OF SKINNYME TEA",
      followers: "205K Followers",
      text: "🔥Swaggerism is a mindset upgrade. Resk’Que’s words pushed me to step into my power, level up my confidence, and dominate every space I enter. Every chapter is a game plan for clarity, strength, and resilience. This book is straight fire!🔥",
      image: "/DeWatermark.ai_1743318892093.png"
    },
    {
      name: "Damien T.",
      role: "CEO of Johnson Tech Innovations",
      followers: "189K Followers",
      text: "🔥This book is a game-changer. Resk’Que’s strategies completely transformed my mindset, elevated my confidence, and made me take fearless action. Swaggerism isn’t just a book—it’s a blueprint for unstoppable success. This will change lives!🔥",
      image: "/DeWatermark.ai_1743319576672.png"
    },
    {
      name: "Maya S.",
      role: "BESTSELLING AUTHOR",
      followers: "175K Followers",
      text: "🔥Swaggerism is pure power! Resk’Que’s storytelling and wisdom expanded my vision, unlocked my potential, and challenged me to think bigger. Every lesson fuels growth, resilience, and confidence. If you’re ready to level up, this is it!🔥",
      image: "/DeWatermark.ai_1743319042099.png"
    },
    {
      name: "Xavier K.",
      role: "CEO OF FOUNDR MAGAZINE",
      followers: "19K Followers",
      text: "🔥This book didn’t just motivate me—it forced me to level up. Resk’Que’s principles made me realize who I truly am and what I’m truly capable of. Every page is a lesson in resilience, confidence, and unstoppable swagger. No excuses, just results!🔥",
      image: "/DeWatermark.ai_1743319422766.png"
    },
  ];
  
  const Testimonial = () => {
    return (
      <section className="py-10 md:py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          {/* First row with 3 testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonial.slice(0, 3).map((testimonial, idx) => (
              <div key={idx} className="text-center mb-8 md:mb-0">
                <div className="relative inline-block">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-2 border-gray-300"
                  />
                  <span className="absolute bottom-0 right-0 bg-white border border-white rounded-full p-1">
                    <img src="/lovable-uploads/blue.avif" alt="Verified" className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </div>
                <p className="text-blue-400 text-xs md:text-sm mt-2">{testimonial.followers}</p>
                <p className="text-gray-800 italic mb-3 md:mb-4 text-sm md:text-base">{testimonial.text}</p>
                <h4 className="font-bold text-red-600 text-sm md:text-base">{testimonial.name}</h4>
                <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
          
          {/* Second row with 3 testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-0 md:mt-10">
            {testimonial.slice(3).map((testimonial, idx) => (
              <div key={idx} className="text-center">
                <div className="relative inline-block">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-2 border-gray-300"
                  />
                  <span className="absolute bottom-0 right-0 bg-white border border-white rounded-full p-1">
                    <img src="/lovable-uploads/blue.avif" alt="Verified" className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </div>
                <p className="text-blue-400 text-xs md:text-sm mt-2">{testimonial.followers}</p>
                <p className="text-gray-800 italic mb-3 md:mb-4 text-sm md:text-base">{testimonial.text}</p>
                <h4 className="font-bold text-red-600 text-sm md:text-base">{testimonial.name}</h4>
                <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonial;
  