
import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  followers: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Madison H.",
    position: "6 FIGURE ENTREPRENEUR",
    followers: "11.9k followers",
    image: "/lovable-uploads/3d2c5875-86c9-4733-b79e-566773655b00.png",
    text: "Elevate Higher is a must-read for all! Resk'Que's compelling thoughts and advice helped me embrace challenges and unlock my true potential. Every lesson is packed with encouragement that cultivates wisdom, persistence, and confidence."
  },
  {
    id: 2,
    name: "Jamal C.",
    position: "BUSINESS INFLUENCER",
    followers: "19k followers",
    image: "/lovable-uploads/18a6b9c8-04f0-44ff-8e3d-fff99db93702.png",
    text: "Elevate Higher is a transformative book! Resk'Que's guidance and reflections shifted my mindset and motivated me to reach for new possibilities. Every page delivers profound lessons that inspire confidence, ambition, and perseverance."
  },
  {
    id: 3,
    name: "Tiana B.",
    position: "CEO AND FOUNDER OF SONNYME TEA",
    followers: "192k followers",
    image: "/lovable-uploads/a4b014cb-c722-49d1-82c2-cd35bcd85437.png",
    text: "Elevate Higher is a truly inspiring read! Resk'Que's words and perspective unlocked new insights and gave me the courage to step out of my comfort zone. Every part holds essential lessons that foster clarity, strength, and motivation."
  },
  {
    id: 4,
    name: "Darius W.",
    position: "CEO of Johnsen Tech Innovations",
    followers: "173k followers",
    image: "/lovable-uploads/dbb4ceda-1bd0-43bf-af25-4dacc508d744.png",
    text: "Elevate Higher is a true game-changer! Resk'Que's wisdom and strategies reshaped my thinking and empowered me to take bold action. Each chapter is packed with powerful insights that inspire growth, confidence, and success."
  },
  {
    id: 5,
    name: "Imani W.",
    position: "BESTSELLING AUTHOR",
    followers: "182k followers",
    image: "/lovable-uploads/c70ba3e2-ae2d-4c17-8910-6fc2f7c1c1a9.png",
    text: "Elevate Higher is a book of pure inspiration! Resk'Que's powerful storytelling and knowledge expanded my view and helped me embrace new opportunities. Every chapter carries meaningful lessons that ignite passion, discipline, and success."
  },
  {
    id: 6,
    name: "Malik J.",
    position: "CEO OF FOUNDR MAGAZINE",
    followers: "17k followers",
    image: "/lovable-uploads/d1a2378f-fa89-4cd7-8b77-707adc267825.png",
    text: "Elevate Higher is a life-changing read! Resk'Que's wisdom and insights challenged my perspective and inspired me to push beyond my limits. Every chapter is filled with powerful lessons that encourage growth, resilience, and self-discovery."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      observerRef.current?.observe(element);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">WHAT PEOPLE ARE SAYING</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Find Out Why Readers Everywhere Are<br className="hidden md:block" /> Loving This Book
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gray flex-shrink-0 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-brand-black/60">
                      {testimonial.followers}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 text-brand-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
              </div>
              
              <p className="text-brand-black/80 text-sm mb-4">
                {testimonial.text}
              </p>
              
              <div className="mt-4">
                <p className="font-bold text-brand-red">{testimonial.name}</p>
                <p className="text-sm text-brand-black/60">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl animate-on-scroll"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gray flex-shrink-0 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-brand-black/60">
                      {testimonial.followers}
                    </div>
                  </div>
                </div>
                <div className="w-6 h-6 text-brand-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
              </div>
              
              <p className="text-brand-black/80 text-sm mb-4">
                {testimonial.text}
              </p>
              
              <div className="mt-4">
                <p className="font-bold text-brand-red">{testimonial.name}</p>
                <p className="text-sm text-brand-black/60">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a href="#claim" className="cta-button">
            Get My Copy Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
