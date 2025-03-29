
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonialSections = {
  "Marketing": [
    { "name": "Malik J.", "rating": 5, "title": "The Ultimate Swagger Guide", "text": "Swaggerism, My Religion unlocked a new level of confidence and success for me. Every principle is powerful and life-changing." },
    { "name": "Sophia R.", "rating": 5, "title": "A Game-Changer", "text": "This book completely shifted my mindset. Resk’Que’s wisdom is exactly what I needed to break limits and level up." },
    { "name": "Darnell T.", "rating": 5, "title": "Unstoppable Energy", "text": "Every page fuels ambition and confidence. Swaggerism, My Religion is more than a book—it’s a movement!" },
    { "name": "Jasmine L.", "rating": 5, "title": "Swagger for Life", "text": "Resk’Que’s words pushed me to embrace my power unapologetically. This book is a must-read for anyone ready to step up." },
    { "name": "Carlos M.", "rating": 5, "title": "Success on My Terms", "text": "Swaggerism is the blueprint for commanding success. The strategies are bold, real, and designed for winners." },
  ],
  "Personal Success": [
    {
      "name": "Jordan M.",
      "rating": 5,
      "title": "A Confidence Game-Changer",
      "text": "Swaggerism, My Religion helped me tap into my power and redefine success on my own terms. This book is next level!"
  },
  {
      "name": "Tasha B.",
      "rating": 5,
      "title": "A Must-Have for Go-Getters",
      "text": "The mindset shift this book provides is unmatched. I feel more driven, focused, and ready to take on the world."
  },
  {
      "name": "Elijah R.",
      "rating": 5,
      "title": "Blueprint for Unstoppable Success",
      "text": "The principles in this book are real and powerful. Every chapter is packed with insights that push you toward greatness."
  },
  {
      "name": "Derrick S.",
      "rating": 5,
      "title": "Next-Level Mentality",
      "text": "Swaggerism, My Religion gave me the confidence and mindset shift I needed to break barriers and level up in every aspect of my life."
  },
  {
      "name": "Vanessa K.",
      "rating": 5,
      "title": "Actionable & Life-Changing",
      "text": "This isn’t just another motivational book—it’s a movement. Every lesson comes with practical steps that make a real difference."
  },
  ],
  "Business Growth": [
    {
      "name": "Malik J.",
      "rating": 5,
      "title": "The Ultimate Confidence Boost",
      "text": "Swaggerism, My Religion unlocked a whole new level of self-belief and success for me. Every principle is bold, transformative, and designed to elevate your game."
  },
  {
      "name": "Sophia R.",
      "rating": 5,
      "title": "A Mindset Revolution",
      "text": "This book reshaped the way I think and move in life. Resk’Que’s wisdom was the breakthrough I needed to break barriers and reach new heights."
  },
  {
      "name": "Darnell T.",
      "rating": 5,
      "title": "Fuel for Ambition",
      "text": "Every page ignites confidence and drive. Swaggerism, My Religion isn’t just a book—it’s a lifestyle, a movement, and the key to unstoppable energy."
  },
  {
      "name": "Jasmine L.",
      "rating": 5,
      "title": "Owning My Power",
      "text": "Resk’Que’s words pushed me to embrace my power without hesitation. This is a must-read for anyone ready to level up and live unapologetically."
  },
  {
      "name": "Carlos M.",
      "rating": 5,
      "title": "Blueprint for Success",
      "text": "Swaggerism, My Religion lays out the exact steps to command success. The strategies are real, powerful, and designed for those who refuse to settle."
  },
  ]
};

const AnimatedTestimonials = () => {
  const isMobile = useIsMobile();
  const [width, setWidth] = useState<number>(280);

  useEffect(() => {
    setWidth(isMobile ? 230 : 280);
  }, [isMobile]);

  // Add animation keyframes to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-280px * 5 - 1rem * 5)); }
      }
      
      @keyframes scrollRight {
        0% { transform: translateX(calc(-280px * 5 - 1rem * 5)); }
        100% { transform: translateX(0); }
      }
      
      .animate-scroll-left {
        animation: scrollLeft 80s linear infinite;
      }
      
      .animate-scroll-right {
        animation: scrollRight 80s linear infinite;
      }
      
      .pause {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-theme-purple-darkest via-black to-theme-purple-dark py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">What People Are Saying</h2>
        <p className="text-center text-gray-400 mb-4 md:mb-8 text-sm md:text-base">See what readers are saying about 'Swaggerism: My Religion'...</p>
      </div>

      {Object.entries(testimonialSections).map(([sectionName, testimonials], sectionIndex) => {
        // Create a continuous loop by duplicating testimonials multiple times
        const repeatedTestimonials = [
          ...testimonials, 
          ...testimonials, 
          ...testimonials, 
          ...testimonials
        ];
        
        const direction = sectionIndex % 2 === 0 ? 'animate-scroll-left' : 'animate-scroll-right';
        const gradientColors = 'bg-gradient-to-r from-theme-purple-light via-theme-purple-medium to-theme-purple-darkest';
        
        return (
          <div key={sectionName} className="mb-4 md:mb-8 last:mb-0">
            <div className="group relative overflow-hidden w-full">
              <div className={`marquee-container overflow-hidden w-full ${gradientColors} bg-opacity-10`}>
                <div 
                  className={`flex space-x-2 md:space-x-4 ${direction} group-hover:pause`}
                  style={{ 
                    width: "fit-content",
                    animation: `${sectionIndex % 2 === 0 ? 'scrollLeft' : 'scrollRight'} 80s linear infinite`
                  }}
                >
                  {repeatedTestimonials.map((testimonial, idx) => (
                    <div
                      key={`${testimonial.name}-${idx}`}
                      className={`w-[${width}px] flex-shrink-0 backdrop-blur-lg bg-theme-purple-DEFAULT/10 rounded-xl p-3 md:p-5 border border-theme-purple-light/30 hover:bg-theme-purple-DEFAULT/20 transition-colors duration-300 transform hover:scale-105`}
                      style={{ width: `${width}px` }}
                    >
                      <div className="flex mb-1 md:mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={isMobile ? 12 : 14} className="text-theme-purple-light fill-current" />
                        ))}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-300 mb-2 md:mb-3 text-xs md:text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <div className="pt-1 md:pt-2 border-t border-white/10">
                        <p className="text-theme-purple-light text-xs md:text-sm font-medium">{testimonial.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTestimonials;
