
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About the Book</h3>
            <p className="text-gray-400">
              Elevate Higher is a transformative guide designed to help you enhance seven key areas 
              of your life: Spiritual, Wellness, Knowledge, Relationship, Actions, Financial, and Lifestyle.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="#order" className="text-gray-400 hover:text-white transition">
                  Order Now
                </a>
              </li>
              <li>
                <a href="#claim" className="text-gray-400 hover:text-white transition">
                  Claim Free Copy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Have questions about the book or your order? Feel free to reach out to us.
            </p>
            <p className="mt-2 text-gray-400">
              Email: <a href="mailto:support@elevate-higher.com" className="text-primary hover:underline">
                support@elevate-higher.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {year} Elevate Higher. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
