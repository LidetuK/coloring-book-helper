
import { CoverType, ProductType } from './ProductTypeSelection';

interface OrderSummaryProps {
  productType: ProductType;
  coverType: CoverType;
  step?: number;
}

const OrderSummary = ({ productType, coverType, step = 0 }: OrderSummaryProps) => {
  // For digital products, step 3 is the order summary, step 4 for other products
  const showOrder = (productType === 'digital' && step === 3) || 
                   (productType !== 'digital' && step === 4) ||
                   step === 0;
                    
  return (
    <div className={`bg-gradient-to-r from-theme-purple-dark to-theme-purple p-8 md:p-12 text-white ${showOrder ? '' : 'hidden md:block'}`}>
      <div className="flex items-center justify-center mb-8">
        <img src="/2-removebg-preview (1).png" alt="Book" className="w-32 h-auto" />
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-6">
        Discover the Secrets to Success
      </h3>
      
      <div className="mb-8">
        <p className="mb-4">
          This book will transform your mindset and help you achieve greatness. Choose your preferred format:
        </p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant access to life-changing insights</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Practical exercises to implement right away</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-300 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Step-by-step guidance to transform your life</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white/10 p-4 rounded-md">
        <h4 className="font-medium text-lg border-b border-white/20 pb-2 mb-3">
          Your Order Summary
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Selected Format:</span>
            <span className="font-medium">
              {productType === 'digital' 
                ? 'Digital Copy' 
                : productType === 'physical'
                ? 'Physical Book' 
                : productType === 'bundle'
                ? 'Bundle (Digital + Physical)'
                : 'Both Books Bundle'}
            </span>
          </div>
          
          {productType !== 'digital' && (
            <div className="flex justify-between">
              <span>Cover Type:</span>
              <span className="font-medium">{coverType === 'hardcover' ? 'Hardcover' : 'Softcover'}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium">
              {productType === 'digital' 
                ? '$9.99' 
                : productType === 'physical'
                ? coverType === 'hardcover' ? '$34.99' : '$25.99'
                : productType === 'bundle'
                ? coverType === 'hardcover' 
                  ? `$${((9.99 + 34.99) * 0.95).toFixed(2)}` 
                  : `$${((9.99 + 25.99) * 0.95).toFixed(2)}`
                : coverType === 'hardcover' ? '$62.98' : '$53.98'}
            </span>
          </div>
          
          {(productType === 'physical' || productType === 'bundle') && (
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium">+ $14.97</span>
            </div>
          )}
          
          {(productType === 'dual-books') && (
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium text-green-300">FREE</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <svg className="h-5 w-5 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-medium">100% Secure Checkout</span>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 text-yellow-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-medium">30-Day Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
