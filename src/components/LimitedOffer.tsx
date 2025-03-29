
import { useState } from "react";

const LimitedOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-black text-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight">
          🎁 Who Needs This Book:
        </h1>

        {/* Content */}
        <div className="mt-8 bg-white text-gray-900 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-theme-pink-DEFAULT"></h3>
          <p className="mt-4 text-lg leading-relaxed">
          Individuals Seeking Authenticity: Those who want to break free from societal expectations and live true to themselves.  
            
          </p>
          <p className="mt-4 text-lg leading-relaxed">
          Style Enthusiasts: People passionate about fashion and self-expression who want to elevate their personal style.

            <span className="font-bold"> Creative Souls:</span>  
             Artists, musicians, writers, and other creatives looking to unleash their unique talents.

          </p>
          <p className="mt-4 text-lg leading-relaxed">
          Young Adults: Those navigating the challenges of self-discovery and identity formation.

            <span className="font-bold"> Anyone Feeling Lost or Uninspired:</span>  
            Individuals seeking direction, motivation, and a renewed sense of purpose.


          </p>
          <p className="mt-4 text-lg leading-relaxed">
          Entrepreneurs and Leaders: Those who want to stand out from the crowd and build a distinctive personal brand.


            <span className="font-bold"> People Who Value Individuality:</span>  
            Those who believe in the power of self-expression and celebrating differences.


          </p>

          <p className="mt-6 text-lg">
          Anyone Seeking Personal Empowerment: Individuals ready to take control of their lives and unlock their full potential.
          </p>

          {/* Urgency Section */}
          <div className="mt-6 p-6 bg-theme-pink-DEFAULT text-white rounded-lg">
            <p className="text-xl font-bold">
              🚨 This is a Limited-Time Offer 🚨
            </p>
            <p className="mt-2">
       
            </p>
            <p className="mt-2 font-bold uppercase"></p>
          </div>

          {/* Trust & Guarantee */}
          <div className="mt-6 text-lg">
            <h4 className="text-2xl font-bold text-theme-purple-dark"></h4>
            <p className="mt-2">
           
            </p>
            <p className="mt-2">
              
            </p>
          </div>
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              {/* Embedded Form */}
              <iframe
                src="https://reskque-booking-buddy.vercel.app/"
                className="w-full h-[600px] rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LimitedOffer;
