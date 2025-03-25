
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#" className="text-2xl font-display font-bold text-brand-black">
          RESKQUE
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm font-medium text-brand-black/80 hover:text-brand-red transition-colors">
            About
          </a>
          <a href="#testimonials" className="text-sm font-medium text-brand-black/80 hover:text-brand-red transition-colors">
            Testimonials
          </a>
          <a href="#benefits" className="text-sm font-medium text-brand-black/80 hover:text-brand-red transition-colors">
            Benefits
          </a>
          <a href="#faq" className="text-sm font-medium text-brand-black/80 hover:text-brand-red transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#claim"
          className="hidden md:flex items-center px-4 py-2 rounded-md bg-brand-red text-white font-medium text-sm hover:bg-brand-red/90 transition-colors"
        >
          Claim Free Copy
        </a>

        <button
          className="md:hidden flex flex-col space-y-1.5"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-brand-black transition-transform duration-300",
            mobileMenuOpen && "transform rotate-45 translate-y-2"
          )} />
          <span className={cn(
            "w-6 h-0.5 bg-brand-black transition-opacity duration-300",
            mobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "w-6 h-0.5 bg-brand-black transition-transform duration-300",
            mobileMenuOpen && "transform -rotate-45 -translate-y-2"
          )} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-[400px] border-b" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="py-2 text-brand-black/80 hover:text-brand-red transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#testimonials" 
            className="py-2 text-brand-black/80 hover:text-brand-red transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            href="#benefits" 
            className="py-2 text-brand-black/80 hover:text-brand-red transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Benefits
          </a>
          <a 
            href="#faq" 
            className="py-2 text-brand-black/80 hover:text-brand-red transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <a
            href="#claim"
            className="inline-flex w-full justify-center items-center px-4 py-2 rounded-md bg-brand-red text-white font-medium text-sm hover:bg-brand-red/90 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Claim Free Copy
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
