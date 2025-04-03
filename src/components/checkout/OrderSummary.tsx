
interface OrderSummaryProps {
  productType: 'digital' | 'physical' | 'bundle' | 'dual-books';
  coverType: 'softcover' | 'hardcover';
}

const OrderSummary = ({ productType, coverType }: OrderSummaryProps) => {
  const getOrderImages = () => {
    if (productType === 'dual-books') {
      return (
        <div className="relative w-64">
          <div className="absolute -inset-1 bg-gradient-to-br from-brand-purple to-brand-red opacity-20 blur-sm rounded-lg"></div>
          <div className="flex relative">
            <img 
              src="/1111.png" 
              alt="Elevate Higher book" 
              className="max-w-[50%] h-[300px] shadow-xl rounded-lg transform -rotate-6 relative z-10" 
            />
            <img 
              src="/2222222222.png" 
              alt="Swaggerism My Religion book" 
              className="max-w-[50%] h-[300px] shadow-xl rounded-lg transform rotate-6 relative z-0" 
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-64">
          <div className="absolute -inset-1 bg-gradient-to-br from-brand-purple to-brand-red opacity-20 blur-sm rounded-lg"></div>
          <img 
            src="2222222222.png" 
            alt="Elevate Higher book" 
          />
        </div>
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-gray/50 to-white p-8 md:p-12 flex items-center">
      <div>
        <div className="mb-8 flex justify-center">
          {getOrderImages()}
        </div>
        
        <h4 className="text-lg font-bold mb-2">
          {productType === 'dual-books' ? 'Ultimate Transformation Bundle' : 'Discover the Secrets to Success'}
        </h4>
        <p className="text-brand-black/70 mb-6">
          {productType === 'dual-books' 
            ? `Get both bestselling books in ${coverType} format and transform your life with complementary wisdom at a special discounted price.`
            : `This book will transform your mindset and help you achieve greatness. Choose your preferred format and start your journey today!`}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <span className="font-medium">
                {productType === 'dual-books' 
                  ? `Two Complete ${coverType === 'hardcover' ? 'Hardcover' : 'Softcover'} Books, One Amazing Price` 
                  : `Premium ${productType === 'bundle' ? 'Bundle' : productType === 'physical' ? (coverType === 'hardcover' ? 'Hardcover' : 'Softcover') : 'Digital'} Edition`}
              </span>
              <p className="text-sm text-brand-black/60">
                {productType === 'dual-books'
                  ? 'Save 10% compared to buying separately'
                  : productType === 'bundle' 
                    ? `Get both digital and ${coverType} editions together`
                    : productType === 'physical' 
                      ? `High-quality ${coverType} print with beautiful design` 
                      : 'Instant access with easy navigation'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <span className="font-medium">
                {productType === 'dual-books' ? 'FREE Shipping & Handling' : '7 Life-Changing Strategies'}
              </span>
              <p className="text-sm text-brand-black/60">
                {productType === 'dual-books'
                  ? 'No additional shipping costs worldwide'
                  : 'Practical techniques you can apply immediately'}
              </p>
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
          
          {productType === 'dual-books' && (
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <span className="font-medium">Complementary Knowledge</span>
                <p className="text-sm text-brand-black/60">Experience the power of both perspectives</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
