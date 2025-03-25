
import { useEffect, useRef } from 'react';

const BookShowcase = () => {
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
    <section id="about" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">ABOUT THE BOOK</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Unleash Your Best Self. Begin Now.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative mx-auto w-full max-w-md animate-on-scroll">
            <div className="aspect-[0.75/1] relative">
              <div className="absolute -right-8 -top-4 w-full h-full">
                <img 
                  src="/lovable-uploads/52316f66-e63f-4a3f-abbb-fab39ed14c39.png" 
                  alt="Book cover and slipcase" 
                  className="w-full h-auto shadow-xl rounded-lg"
                />
              </div>
              <div className="absolute -left-8 -bottom-4 w-full h-full">
                <img 
                  src="/lovable-uploads/8a6f75eb-74a5-4c36-bcf1-eaaa47514ad5.png" 
                  alt="Book from different angle" 
                  className="w-full h-auto shadow-xl rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-2xl font-display font-bold">
              SWAGGERISM, MY RELIGION by RESKQUE
            </h3>
            
            <p className="text-lg text-brand-black/80">
              This groundbreaking book is designed to help you enhance seven key areas of your life: Spiritual, Wellness, Knowledge, Relationship, Actions, Financial, and Lifestyle.
            </p>
            
            <p className="text-lg text-brand-black/80">
              By focusing on these areas, you can achieve more abundance and fulfillment than ever before.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Self-mastery principles</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Practical strategies</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Mindset transformation</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Financial guidance</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Wellness techniques</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-medium">Relationship mastery</span>
              </div>
            </div>
            
            <div className="pt-4">
              <a href="#claim" className="cta-button">
                Get Your Free Copy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookShowcase;
