
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who is this for?",
    answer: "This book is for anyone looking to elevate their life, career, or personal growth. Whether you're an entrepreneur, professional, or someone seeking personal development, the principles in this book will help you reach your full potential."
  },
  {
    question: "Will this work for me?",
    answer: "Yes! The principles and strategies in this book have been carefully developed and tested to work for people from all walks of life. The actionable advice is designed to be implemented by anyone regardless of their starting point."
  },
  {
    question: "Is there a digital or audiobook version available?",
    answer: "Currently, we're offering the physical version with the special shipping-only promotion. Digital and audiobook versions will be available soon, and purchasers of the physical copy will receive special access."
  },
  {
    question: "How is this different from other products?",
    answer: "Unlike many self-help books that offer generic advice, Swaggerism, My Religion provides practical, actionable strategies backed by real-world experience. Each chapter contains implementable techniques you can start using immediately."
  },
  {
    question: "What exactly am I getting?",
    answer: "You're receiving a premium hardcover copy of 'Swaggerism, My Religion' with over 200 pages of life-changing content, covering the 7 key areas to transform your life: Spiritual, Wellness, Knowledge, Relationship, Action, Financial, and Lifestyle."
  },
  {
    question: "Do you have any success stories?",
    answer: "Absolutely! Thousands of readers have transformed their lives using the principles in this book. From entrepreneurs who've scaled their businesses to individuals who've overcome personal challenges, the success stories are numerous and inspiring."
  },
  {
    question: "When will my book arrive?",
    answer: "Books typically ship within 1-2 business days. Delivery times vary based on your location, but most readers receive their copy within 5-7 business days in the US, and 10-14 business days internationally."
  },
  {
    question: "Is this covered by a 100% money-back guarantee?",
    answer: "Yes! We're so confident in the value of this book that we offer a 60-day, no-questions-asked, 100% money-back guarantee. If you're not completely satisfied, we'll refund your shipping cost in full."
  },
  {
    question: "How much does shipping and handling cost?",
    answer: "Shipping and handling costs just $9.95 for US orders and $19.95 for international orders. This covers the cost of packaging, processing, and delivery to your doorstep."
  },
  {
    question: "Can I get a bulk order for my team or organization?",
    answer: "Yes! We offer special bulk pricing for orders of 10+ copies. Please contact our support team for more information about bulk orders for your team, organization, or event."
  }
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
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
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">COMMON QUESTIONS</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "border-b border-brand-black/10 py-4 animate-on-scroll",
                index === 0 && "border-t"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center py-2 text-left focus:outline-none"
              >
                <span className="font-medium text-brand-black">{faq.question}</span>
                <span className="ml-4 flex-shrink-0 text-brand-black/60">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={cn(
                      "transition-transform duration-200",
                      openItem === index ? "transform rotate-180" : ""
                    )}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openItem === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-brand-black/70 pb-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <p className="text-brand-black/70 mb-6">
            Still have questions? We're here to help!
          </p>
          <a href="#claim" className="cta-button">
            Claim Your Free Copy Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
