
const testimonial = [
    {
      name: "Madison H.",
      role: "8 FIGURE ENTREPRENEUR",
      followers: "11.9k followers",
      text: "Elevate Higher is a must-read for all! Resk'Que’s compelling thoughts and advice helped me embrace challenges and unlock my true potential. Every lesson is packed with encouragement that cultivates wisdom, persistence, and confidence.",
      image: "/lovable-uploads/Face (6).jpeg"
    },
    {
      name: "Jamal C.",
      role: "BUSINESS INFLUENCER",
      followers: "19K followers",
      text: "Elevate Higher is a transformative book! Resk'Que’s guidance and reflections shifted my mindset and motivated me to reach for new possibilities. Every page delivers profound lessons that inspire confidence, ambition, and perseverance.",
      image: "/15.webp"
    },
    {
      name: "Tiana B.",
      role: "CEO AND FOUNDER OF SKINNYME TEA",
      followers: "192k followers",
      text: "Elevate Higher is a truly inspiring read! Resk'Que’s words and perspective unlocked new insights and gave me the courage to step out of my comfort zone. Every part holds essential lessons that foster clarity, strength, and motivation.",
      image: "/11.jpg"
    },
    {
      name: "Darius W.",
      role: "CEO of Johnson Tech Innovations",
      followers: "172k followers",
      text: "Elevate Higher is a true game-changer! Resk’Que’s wisdom and strategies reshaped my thinking and empowered me to take bold action. Each chapter is packed with powerful insights that inspire growth, confidence, and success.",
      image: "/20.jpg"
    },
    {
      name: "Imani W.",
      role: "BESTSELLING AUTHOR",
      followers: "182k followers",
      text: "Elevate Higher is a book of pure inspiration! Resk'Que’s powerful storytelling and knowledge expanded my view and helped me embrace new opportunities. Every chapter carries meaningful lessons that ignite passion, discipline, and success.",
      image: "/lovable-uploads/Face (5).jpeg"
    },
    {
      name: "Malik J.",
      role: "CEO OF FOUNDR MAGAZINE",
      followers: "17k followers",
      text: "Elevate Higher is a life-changing read! Resk'Que's wisdom and insights challenged my perspective and inspired me to push beyond my limits. Every chapter is filled with powerful lessons that encourage growth, resilience, and self-discovery.",
      image: "/10.jpg"
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
  