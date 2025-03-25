
import { useEffect, useRef } from 'react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Spiritual Growth",
    description: "Deepen your spiritual connection and find inner peace for a more fulfilling life.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-7"/>
        <path d="M5 6a7 7 0 0 1 14 0"/>
        <circle cx="12" cy="11" r="4"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Wellness Enhancement",
    description: "Improve your physical and mental health to boost overall well-being.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Knowledge Expansion",
    description: "Gain valuable insights to make informed decisions and better understand yourself.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Relationship Building",
    description: "Master the principles of strong, healthy connections with others.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Action-Oriented Mindset",
    description: "Cultivate a proactive attitude that drives success and fulfillment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Financial Mastery",
    description: "Learn effective strategies to manage money wisely and achieve financial freedom.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    )
  },
  {
    id: 7,
    title: "Lifestyle Improvement",
    description: "Create a meaningful and enjoyable life tailored to your aspirations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    )
  },
  {
    id: 8,
    title: "Motivation Ignition",
    description: "Develop techniques to stay focused and driven towards achieving your goals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  }
];

const Benefits = () => {
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

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">KEY BENEFITS</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Transform Your Life With These<br className="hidden md:block" /> Powerful Strategies
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:transform hover:translate-y-[-5px] animate-on-scroll"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-brand-black/70 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto animate-on-scroll">
          <div className="bg-brand-gray rounded-xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-purple/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-red/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-center">
                Most People Wish For An Easier Life, But The Key Is To Work On Becoming Better.
              </h3>
              
              <p className="text-center text-brand-black/70 mb-8">
                This book provides you with proven strategies that will help you become the best version of yourself. Don't wait for the perfect moment — start your transformation journey today.
              </p>
              
              <div className="text-center">
                <a href="#claim" className="cta-button">
                  Get Your Free Copy Now
                </a>
                <p className="mt-3 text-sm text-brand-black/60">
                  *Just cover shipping & handling of $9.95
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
