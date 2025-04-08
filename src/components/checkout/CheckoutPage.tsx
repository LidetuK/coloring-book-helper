import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ProductType, CoverType } from './ProductTypeSelection';

interface CheckoutPageProps {
  clientSecret: string;
  formData: any;
  productType: ProductType;
  coverType: CoverType;
  setShowCheckout: (show: boolean) => void;
  handlePaymentSuccess: (data: any) => void;
}

const CheckoutPage = ({ 
  clientSecret, 
  formData, 
  productType, 
  coverType,
  setShowCheckout,
  handlePaymentSuccess 
}: CheckoutPageProps) => {
  // Calculate prices
  let price = 0;
  if (productType === 'digital') {
    price = 9.99;
  } else if (productType === 'physical') {
    price = coverType === 'hardcover' ? 34.99 : 29.99;
  } else if (productType === 'bundle') {
    price = (9.99 + (coverType === 'hardcover' ? 34.99 : 29.99)) * 0.95;
  } else if (productType === 'dual-books') {
    price = coverType === 'hardcover' ? 62.98 : 53.98;
  }
  
  const shipping = (productType === 'digital' || productType === 'dual-books') ? 0 : 
                  (formData.country === 'United States' || formData.country === 'Canada') ? 14.97 : 14.99;
  const totalPrice = price + shipping;

  return (
    <section id="claim" className="py-10 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 p-6 md:w-2/5">
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span>AMZER LLC</span>
              <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">TEST MODE</span>
            </div>
            
            <h2 className="text-lg font-medium mb-1">Elevate Higher Book</h2>
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {productType === 'digital' ? 'Digital copy - instant access' : 
               productType === 'physical' ? 'Your FREE copy - just pay shipping & handling' :
               'Digital + Physical Bundle - 5% discount!'}
            </p>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{productType === 'digital' ? 'Digital Book:' : 
                       productType === 'physical' ? 'Physical Book:' :
                       'Bundle (Digital + Physical):'}</span>
                <span>${price.toFixed(2)}</span>
              </div>
              {(productType === 'physical' || productType === 'bundle') && (
                <div className="flex justify-between text-sm mb-2">
                  <span>Shipping & Handling:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:w-3/5">
            <div className="mb-6 flex justify-center">
              <button className="bg-green-500 text-white font-medium py-2 px-4 rounded w-full">
                Pay with <span className="font-bold">Link</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
              <div className="border-t border-gray-200 flex-grow mr-3"></div>
              <span>Or pay with card</span>
              <div className="border-t border-gray-200 flex-grow ml-3"></div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-700">Shipping information</h3>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="border border-gray-300 rounded p-2 bg-gray-100">
                  {formData.email}
                </div>
              </div>
              
              {productType !== 'digital' && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Shipping address</h4>
                  <div className="space-y-2 text-sm">
                    <div className="border border-gray-300 rounded p-2 bg-gray-100">
                      {formData.firstName} {formData.lastName}
                    </div>
                    <div className="border border-gray-300 rounded p-2 bg-gray-100">
                      {formData.country}
                    </div>
                    <div className="border border-gray-300 rounded p-2 bg-gray-100">
                      {formData.address1}
                    </div>
                    {formData.address2 && (
                      <div className="border border-gray-300 rounded p-2 bg-gray-100">
                        {formData.address2}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-gray-300 rounded p-2 bg-gray-100">
                        {formData.city}
                      </div>
                      <div className="border border-gray-300 rounded p-2 bg-gray-100">
                        {formData.zipCode}
                      </div>
                    </div>
                    <div className="border border-gray-300 rounded p-2 bg-gray-100">
                      {formData.state}
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => setShowCheckout(false)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              >
                Edit information
              </button>
            </div>
            
            <h3 className="font-medium mb-2 text-gray-700">Payment details</h3>
            
            <Elements stripe={clientSecret ? window.stripePromise : null} options={{ clientSecret }}>
              <CheckoutForm 
                clientSecret={clientSecret} 
                orderDetails={{
                  ...formData,
                  productType,
                  totalPrice: `$${totalPrice.toFixed(2)}`
                }}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
