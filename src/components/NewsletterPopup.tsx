
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore') === 'true';
    const hasSubscribed = localStorage.getItem('hasSubscribed') === 'true';
    
    if (!hasVisitedBefore && !hasSubscribed) {
      // Show popup after a delay for new visitors
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      
      // Mark that user has visited the site
      localStorage.setItem('hasVisitedBefore', 'true');
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Store subscription in localStorage
    localStorage.setItem('hasSubscribed', 'true');
    
    // Show success message
    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    // Close the popup
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl p-0 border-0 overflow-hidden rounded-full w-[90vw] md:w-auto shadow-xl">
        {/* This DialogTitle is visually hidden but needed for accessibility */}
        <DialogTitle className="sr-only">Newsletter Signup</DialogTitle>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-4 top-4 text-white hover:text-gray-200 z-10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Theme Purple */}
          <div className="bg-theme-purple-DEFAULT p-6 md:p-8 text-center md:text-left md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col justify-center"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Join Our Newsletter
              </h2>
              
              <p className="text-white/90 text-base md:text-lg mb-4">
                Get exclusive updates and content delivered straight to your inbox
              </p>

              <div className="hidden md:block">
                <img 
                  src="/2222222222.png" 
                  alt="Swaggerism Book" 
                  className="max-h-32 md:max-h-40 mx-auto md:mx-0 object-contain"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Right Side - Black */}
          <div className="bg-black p-6 md:p-8 text-center md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full flex flex-col justify-center"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-5">
                Subscribe now
              </h3>

              <div className="md:hidden mb-4">
                <img 
                  src="/2222222222.png" 
                  alt="Swaggerism Book" 
                  className="max-h-32 mx-auto object-contain"
                />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 pl-10 bg-zinc-800 border border-zinc-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-theme-purple-light/50"
                    required
                  />
                  <Mail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-zinc-400 h-4 w-4" />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-theme-pink-DEFAULT hover:bg-theme-pink-medium text-white font-bold py-3 rounded-full transition-colors duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>
              
              <p className="text-xs text-zinc-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
