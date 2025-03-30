
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Users, Target, Zap, Star, Calendar, Truck, Gift } from "lucide-react";

const LimitedOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const targetAudience = [
    {
      title: "Individuals Seeking Authenticity",
      description: "Those who want to break free from societal expectations and live true to themselves."
    },
    {
      title: "Style Enthusiasts",
      description: "People passionate about fashion and self-expression who want to elevate their personal style."
    },
    {
      title: "Creative Souls",
      description: "Artists, musicians, writers, and other creatives looking to unleash their unique talents."
    },
    {
      title: "Young Adults",
      description: "Those navigating the challenges of self-discovery and identity formation."
    },
    {
      title: "Anyone Feeling Lost or Uninspired",
      description: "Individuals seeking direction, motivation, and a renewed sense of purpose."
    },
    {
      title: "Entrepreneurs and Leaders",
      description: "Those who want to stand out from the crowd and build a distinctive personal brand."
    },
    {
      title: "People Who Value Individuality",
      description: "Those who believe in the power of self-expression and celebrating differences."
    },
    {
      title: "Anyone Seeking Personal Empowerment",
      description: "Individuals ready to take control of their lives and unlock their full potential."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black to-theme-purple-darkest text-white text-center">
      {/* Free Shipping Promo Banner - NEW */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div 
          className="bg-gradient-to-r from-theme-purple-DEFAULT to-theme-pink-DEFAULT p-6 md:p-10 rounded-xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block bg-white text-theme-purple-dark text-sm font-bold px-3 py-1 rounded-full mb-4">LIMITED TIME OFFER</div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
                FREE SHIPPING <span className="text-yellow-300">on All Pre-orders!</span>
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Pre-order "Swaggerism My Religion" before <span className="font-bold underline">July 15th</span> and get <span className="font-bold">FREE shipping</span> anywhere in the world!
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Calendar className="h-5 w-5 text-yellow-300 mr-2" />
                  <span>Until July 15, 2025</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Truck className="h-5 w-5 text-theme-pink-light mr-2" />
                  <span>Free Global Shipping</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                  <Gift className="h-5 w-5 text-theme-purple-light mr-2" />
                  <span>Limited Offer</span>
                </div>
              </div>
            </div>
            
            <img 
              src="/2-removebg-preview (1).png" 
              alt="Swaggerism My Religion Book" 
              className="w-40 md:w-72 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <motion.button
            onClick={() => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 md:mt-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xl px-10 py-4 font-bold uppercase rounded-lg transform transition-all duration-300 hover:scale-105 shadow-xl relative z-10 w-full md:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-order Now & Save
          </motion.button>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide leading-tight mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-theme-pink-DEFAULT text-4xl md:text-6xl">🎯</span> Who Needs This Book:
        </motion.h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {targetAudience.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -right-10 -top-10 w-20 h-20 bg-theme-purple-DEFAULT/20 rounded-full blur-xl group-hover:bg-theme-pink-DEFAULT/30 transition-all"></div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-theme-pink-DEFAULT relative z-10">
                {item.title}
              </h3>
              
              <p className="text-white/90 relative z-10">
                {item.description}
              </p>
              
              <Check className="absolute bottom-3 right-3 text-green-400 opacity-0 group-hover:opacity-100 transition-all" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 md:mt-16 bg-gradient-to-br from-theme-purple-DEFAULT to-theme-pink-DEFAULT p-8 rounded-xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Transform Your Life Today</h3>
          
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto relative z-10">
            No matter where you are in life's journey, Swaggerism gives you the tools to express your true self 
            and live with unshakable confidence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span>Limited Time Offer</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-theme-pink-light mr-2" />
              <span>Thousands Already Transformed</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <Target className="h-5 w-5 text-theme-purple-light mr-2" />
              <span>Proven Results</span>
            </div>
          </div>
          
          <button
            onClick={() => document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xl px-10 py-4 font-bold uppercase rounded-lg transform transition-all duration-300 hover:scale-105 shadow-xl relative z-10"
          >
            Claim Your Copy Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LimitedOffer;
