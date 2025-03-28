const AuthorBio = () => {
    return (
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* Bold, Eye-Catching Quote */}
          <h2 className="text-2xl md:text-5xl font-extrabold leading-tight uppercase text-red-600">
    "Discover why Swaggerism isn’t just a book—it’s a movement. This mindset unlocked my success, transformed my hustle, and elevated my entire life. Now, it’s your turn."
  </h2>
  
  
          {/* Images Section */}
          <div className="relative flex justify-center mt-10">
            {/* Book Image */}
            <img
              src="/555.png"
              alt="Elevate Higher"
              className="rounded-lg shadow-2xl w-full max-w-5xl mx-auto"
            />
           
            
           
          </div>
  
          {/* Content Section */}
          <div className="text-left text-xl leading-relaxed mt-12 max-w-3xl mx-auto">
            <p className="mt-4 font-semibold text-gray-900">
              <span className="block text-2xl font-bold text-gray-800 mb-4">Discover the Key Benefits:</span>
              <span className="block mt-3">🔥 <strong>Spiritual Growth:</strong> Deepen your spiritual connection and find inner peace for a more fulfilling life.</span>
              <span className="block mt-3">💪 <strong>Wellness Enhancement:</strong> Improve your physical and mental health to boost overall well-being.</span>
              <span className="block mt-3">📚 <strong>Knowledge Expansion:</strong> Gain valuable insights to make informed decisions and foster continuous growth.</span>
              <span className="block mt-3">❤️ <strong>Relationship Building:</strong> Master the principles of strong, healthy connections with loved ones and colleagues.</span>
              <span className="block mt-3">🚀 <strong>Action-Oriented Mindset:</strong> Cultivate a proactive attitude that drives success and fulfillment.</span>
              <span className="block mt-3">💰 <strong>Financial Mastery:</strong> Learn effective strategies to manage money wisely and achieve financial freedom.</span>
              <span className="block mt-3">🌟 <strong>Lifestyle Improvement:</strong> Create a meaningful and enjoyable life tailored to your aspirations.</span>
              <span className="block mt-3">🔥 <strong>Motivation Ignition:</strong> Develop techniques to stay focused and driven towards your biggest goals.</span>
              <span className="block mt-3">🛑 <strong>Pattern Breaking:</strong> Identify and break free from negative habits to unlock personal and professional growth.</span>
              <span className="block mt-3">🌍 <strong>Holistic Development:</strong> Elevate every aspect of your life with a well-rounded self-improvement approach.</span>
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default AuthorBio;
  