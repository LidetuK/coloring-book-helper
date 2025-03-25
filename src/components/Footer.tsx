
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-2xl font-display font-bold mb-4 md:mb-0">
              RESKQUE
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm mb-4 md:mb-0">
                &copy; {currentYear} RESKQUE. All rights reserved.
              </p>
              
              <p className="text-white/60 text-sm text-center md:text-right">
                Swaggerism, My Religion is a trademark of RESKQUE Enterprises.
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white/40 text-xs max-w-3xl mx-auto">
                Disclaimer: Results may vary. The testimonials featured may not be representative of the results that you may achieve. Success depends on various factors such as dedication, effort, and implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
