
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who is this for?",
    answer: "This is for the bold. The fearless. The ones who refuse to settle. If you’re ready to elevate your mindset, amplify your presence, and dominate every arena of life, then Swaggerism is your new religion."
  },
  {
    question: "Will this work for me?",
    answer: "If you have swagger in your DNA—yes. If you’re willing to break free from limits and embrace unstoppable confidence and abundance—absolutely. Swaggerism isn’t for doubters. It’s for doers."
  },
  {
    question: "Is there a digital or audiobook version available?",
    answer: "Yes! Swagger has no limits, and neither should your access to it. A digital and audiobook version will be available soon—stay tuned!"
  },
  {
    question: "How is this different from other products?",
    answer: "Most books tell you what to do. Swaggerism transforms who you ARE. This isn’t a self-help guide—it’s a mindset revolution. It’s not about following the rules. It’s about rewriting them."
  },
  {
    question: "What exactly am I getting?",
    answer: "You're getting the blueprint to an unshakable life. Inside, you’ll find the 7 Secret Strategies that separate the mediocre from the masters. This is swagger in its purest form—unfiltered, unapologetic, and unstoppable."
  },
  {
    question: "Do you have any success stories?",
    answer: "Thousands of people have unlocked their inner swagger and transformed their lives using these principles. Entrepreneurs, creatives, high achievers—all of them proving that Swaggerism works. You could be next."
  },
  {
    question: "When will my book arrive?",
    answer: "Swagger doesn’t wait—but shipping does. Expect your book to arrive within [X] business days based on your location. We move fast. So should you."
  },
  {
    question: "Is this covered by a 100% money-back guarantee?",
    answer: "No refunds—because there’s nothing to refund. Swaggerism is priceless. The only risk is not claiming your copy."
  },
  {
    question: "How much does shipping and handling cost?",
    answer: "Shipping costs vary based on location, but we’re covering the book—you just cover the delivery. A small price for a lifetime of unstoppable swagger."
  },
  {
    question: "Can I get a bulk order for my team or organization?",
    answer: "Absolutely. Swagger spreads best in numbers. If you want to upgrade your squad, your company, or your crew, bulk orders are available. Reach out for exclusive deals."
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
          Embrace Your Swaggerism <br/>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
