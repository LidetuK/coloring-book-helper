
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
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
      <DialogContent className="max-w-md p-0 border-0 overflow-hidden rounded-lg w-[90vw] md:w-auto bg-gradient-to-br from-purple-50 to-white">
        {/* This DialogTitle is visually hidden but needed for accessibility */}
        <DialogTitle className="sr-only">Newsletter Signup</DialogTitle>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-4 top-4 text-gray-700 hover:text-gray-900 z-10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Content */}
        <div className="p-6 md:p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-theme-purple-dark mb-2">
              Get <span className="text-[#DC2626]">Exclusive Content</span>
            </h2>
            
            <p className="text-gray-700 mb-6">
              Join our newsletter for exclusive access to mindset tips, success strategies, and special offers!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-purple-light"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-theme-purple-DEFAULT hover:bg-theme-purple-dark text-white font-bold py-3 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBSCRIBE NOW
              </motion.button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy and will never share your information.
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
