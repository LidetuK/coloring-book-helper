
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Truck, Gift, MessageSquare, Check } from "lucide-react";

const Limit = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black to-theme-purple-darkest text-white text-center">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div 
          className="bg-gradient-to-r from-theme-purple-DEFAULT to-theme-pink-DEFAULT rounded-xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Message box styling */}
          <div className="relative">
            {/* Message header */}
            <div className="bg-theme-purple-dark p-4 flex items-center border-b border-white/20">
              <MessageSquare className="h-6 w-6 text-white mr-3" />
              <h3 className="text-xl font-bold text-white">Important Message</h3>
            </div>
            
            {/* Message content */}
            <div className="p-6 md:p-10 text-left">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative z-10">
                <div className="flex-1 text-left">
                  <div className="inline-block bg-white text-theme-purple-dark text-sm font-bold px-3 py-1 rounded-full mb-4">The giveaway is now closed!</div>
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
                    While we've exceeded our goal of giving <span className="text-yellow-300">away 10,000 copies, we're still offering the book at a special discount for a limited time!</span>
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mb-6">
                    Don't miss out on unlocking the 11 Secret Strategies for unstoppable success, limitless abundance, and ultimate swagger in your life.
                  </p>
                  <div className="flex flex-wrap justify-start gap-4 mb-6">
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
                Claim Your Copy Now at a Discounted Price!
              </motion.button>
            </div>
            
            {/* Message footer */}
            <div className="bg-theme-purple-dark/70 p-3 border-t border-white/20 text-center text-sm">
              <div className="flex items-center justify-center space-x-1">
                <Check className="h-4 w-4 text-green-400" />
                <span>Offer valid while supplies last. Terms and conditions apply.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Limit;
