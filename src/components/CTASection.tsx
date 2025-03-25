
import { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";

const CTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your order has been received! Check your email for confirmation details.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }, 2000);
  };

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 57,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24 hours when it reaches zero
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="claim" className="py-20 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">LIMITED TIME OFFER</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Elevate Higher With Your Free Copy<br className="hidden md:block" /> And Exclusive Bonuses!
          </h2>
          <div className="mt-4 inline-flex items-center justify-center space-x-2 bg-brand-black/90 text-white px-4 py-2 rounded-md">
            <span className="text-sm">Offer ends in:</span>
            <div className="flex items-center space-x-1 font-mono text-sm">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-on-scroll">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4">
                  Claim Your FREE Copy Now
                </h3>
                <p className="text-brand-black/70 mb-6">
                  Just Cover Shipping & Handling
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Shipping Address"
                      className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-brand-black/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Secure Checkout</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-4">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>256-bit SSL Encryption</span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red mr-2">
                      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                    <span className="text-sm text-brand-black/70">Money-Back Guarantee</span>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full cta-button justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Rush Me A Free Copy Now'}
                  </button>
                  
                  <p className="text-center text-xs text-brand-black/60">
                    By clicking above, you agree to pay shipping & handling of $9.95
                  </p>
                </form>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-brand-gray/50 to-white p-8 md:p-12 flex items-center">
              <div>
                <div className="mb-8 flex justify-center">
                  <div className="relative w-64">
                    <div className="absolute -inset-1 bg-gradient-to-br from-brand-purple to-brand-red opacity-20 blur-sm rounded-lg"></div>
                    <img 
                      src="/lovable-uploads/32d41431-5610-4994-bcb5-67818e686355.png" 
                      alt="Swaggerism, My Religion book" 
                      className="relative w-full h-auto shadow-xl rounded-lg" 
                    />
                  </div>
                </div>
                
                <h4 className="text-lg font-bold mb-2">Discover the Secrets to Success</h4>
                <p className="text-brand-black/70 mb-6">
                  This book will transform your mindset and help you achieve greatness. Grab your FREE copy today—just cover shipping & handling!
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">Premium Hardcover Edition</span>
                      <p className="text-sm text-brand-black/60">High-quality print with beautiful design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">7 Life-Changing Strategies</span>
                      <p className="text-sm text-brand-black/60">Practical techniques you can apply immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">60-Day Money-Back Guarantee</span>
                      <p className="text-sm text-brand-black/60">Risk-free satisfaction promise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
