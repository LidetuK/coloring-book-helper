
import { useEffect, useRef } from 'react';

const Hero = () => {
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
    <section className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-gray -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-purple/5 blur-3xl -z-5" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl -z-5" />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <div className="space-y-6 max-w-2xl">
            <span className="badge badge-primary animate-on-scroll">LIFE-CHANGING WISDOM</span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-on-scroll">
              <span className="block">SWAGGERISM,</span>
              <span className="block">MY RELIGION</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-black/80 animate-on-scroll animate-delay-200">
              Beyond Beliefs: The Gospel of Self-Mastery and Unapologetic Abundance. Living in the world of conformity without being conformed. Be BOLD. Be YOU. Just BE.
            </p>
            
            <div className="pt-4 animate-on-scroll animate-delay-300">
              <a href="#claim" className="cta-button">
                Claim Your FREE Copy
              </a>
              <p className="mt-3 text-sm text-brand-black/60">
                *Just pay shipping & handling
              </p>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-on-scroll">
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-purple to-brand-red opacity-30 blur-sm rounded-lg"></div>
            <img 
              src="/lovable-uploads/83ee6273-c9e7-4ab4-a382-1149e5456388.png"
              alt="Swaggerism, My Religion book cover" 
              className="relative w-full h-auto shadow-2xl rounded-lg animate-float" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
