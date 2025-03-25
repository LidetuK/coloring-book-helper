
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonialSections = {
  "Marketing": [
    { name: "Nacima", rating: 5, title: "All in One", text: "Elevate Higher gave me a complete roadmap for marketing success. The strategies are practical and easy to apply." },
    { name: "Steve R.", rating: 5, title: "A Fresh Look at Marketing", text: "This book changed my approach to marketing. The case studies were particularly insightful." },
    { name: "Abdul A.", rating: 5, title: "Mastering Modern Marketing", text: "The book covers everything, from branding to conversion. A must-read for serious marketers." },
    { name: "Lisa G.", rating: 5, title: "Marketing Made Simple", text: "The best marketing book I've read in years. Clear, concise, and effective strategies." },
    { name: "Tom B.", rating: 5, title: "Next-Level Marketing", text: "This book helped me take my campaigns to the next level with data-driven insights." },
  ],
  "Personal Success": [
    { name: "Carly", rating: 5, title: "Life-Changing", text: "Elevate Higher helped me find purpose in my work and achieve greater success." },
    { name: "Inna", rating: 5, title: "A Book for Achievers", text: "I feel more motivated than ever! The principles are transformative." },
    { name: "Marek", rating: 5, title: "Step-by-Step Success", text: "Practical steps that actually work. I've seen remarkable progress." },
    { name: "David W.", rating: 5, title: "A Must-Read", text: "This book provided the mindset shift I needed to reach my goals faster." },
    { name: "Samantha L.", rating: 5, title: "Practical & Inspiring", text: "Unlike other self-help books, this one gives actionable steps that truly make a difference." },
  ],
  "Business Growth": [
    { name: "James K.", rating: 5, title: "Exceptional Value", text: "This transformed how I approach business strategy. The ROI has been incredible." },
    { name: "Sarah M.", rating: 5, title: "Revolutionary Approach", text: "The business insights are gold. My company has grown 300% since implementing these strategies." },
    { name: "Michael P.", rating: 5, title: "Business Essential", text: "Every entrepreneur needs this. The frameworks for scaling are invaluable." },
    { name: "Olivia R.", rating: 5, title: "Game-Changer", text: "The strategies in this book helped us streamline operations and maximize profits." },
    { name: "Daniel T.", rating: 5, title: "Strategic Success", text: "If you're serious about business growth, this book is a must-have resource." },
  ]
};

const AnimatedTestimonials = () => {
  const isMobile = useIsMobile();
  const [width, setWidth] = useState<number>(280);

  useEffect(() => {
    setWidth(isMobile ? 230 : 280);
  }, [isMobile]);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">What People Are Saying</h2>
        <p className="text-center text-gray-400 mb-4 md:mb-8 text-sm md:text-base">Hear from readers who have transformed their lives with Elevate Higher</p>
      </div>

      {Object.entries(testimonialSections).map(([sectionName, testimonials], sectionIndex) => {
        // Create a continuous loop by duplicating testimonials multiple times
        // This ensures there's never an empty space in the scroll
        const repeatedTestimonials = [
          ...testimonials, 
          ...testimonials, 
          ...testimonials, 
          ...testimonials, 
          ...testimonials,
          ...testimonials,
          ...testimonials,
          ...testimonials
        ];
        
        return (
          <div key={sectionName} className="mb-4 md:mb-8 last:mb-0">
            <div className="group relative overflow-hidden w-full">
              <div className="marquee-container overflow-hidden w-full">
                <div 
                  className="flex space-x-2 md:space-x-4 animate-scroll-left group-hover:pause"
                  style={{ 
                    width: "fit-content",
                    animation: "scrollLeft 120s linear infinite" // Slowed down even more
                  }}
                >
                  {repeatedTestimonials.map((testimonial, idx) => (
                    <div
                      key={`${testimonial.name}-${idx}`}
                      className={`w-[${width}px] flex-shrink-0 backdrop-blur-lg bg-white/5 rounded-xl p-3 md:p-5 border border-white/10 hover:bg-white/10 transition-colors`}
                      style={{ width: `${width}px` }}
                    >
                      <div className="flex mb-1 md:mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={isMobile ? 12 : 14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-300 mb-2 md:mb-3 text-xs md:text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <div className="pt-1 md:pt-2 border-t border-white/10">
                        <p className="text-gray-400 text-xs md:text-sm">{testimonial.name}</p>
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
