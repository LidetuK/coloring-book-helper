
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ProductType, CoverType } from './ProductTypeSelection';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CheckoutPageProps {
  clientSecret: string;
  formData: any;
  productType: ProductType;
  coverType: CoverType;
  setShowCheckout: (show: boolean) => void;
  handlePaymentSuccess: (data: any) => void;
}

const steps = [
  { id: "personal-info", title: "Personal Information" },
  { id: "book-format", title: "Book Format" },
  { id: "shipping", title: "Shipping Details" },
  { id: "summary", title: "Order Summary" },
  { id: "payment", title: "Payment" },
];

const CheckoutPage = ({ 
  clientSecret, 
  formData, 
  productType, 
  coverType,
  setShowCheckout,
  handlePaymentSuccess 
}: CheckoutPageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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

  // Submit form data to Web3Forms when user reaches payment step
  useEffect(() => {
    if (currentStep === 4 && !formSubmitted) {
      submitFormData();
    }
  }, [currentStep, formSubmitted]);

  const submitFormData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'f39f7a05-fac0-4032-a2cc-e68fff78426c');
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('productType', productType);
      formDataToSend.append('coverType', coverType);
      
      if (productType !== 'digital') {
        formDataToSend.append('address1', formData.address1);
        formDataToSend.append('address2', formData.address2 || '');
        formDataToSend.append('city', formData.city);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('zipCode', formData.zipCode);
        formDataToSend.append('country', formData.country);
      }
      
      formDataToSend.append('totalPrice', totalPrice.toString());
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      console.log('Web3Forms submission response:', data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form to Web3Forms:', error);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-4">
            <h3 className="font-medium mb-2 text-gray-700">Personal Information</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="border border-gray-300 rounded p-2 bg-gray-100">
                {formData.email}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <div className="border border-gray-300 rounded p-2 bg-gray-100">
                {formData.firstName} {formData.lastName}
              </div>
            </div>
          </div>
        );
      
      case 1: // Book Format
        return (
          <div className="space-y-4">
            <h3 className="font-medium mb-2 text-gray-700">Book Format</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Product Type</label>
              <div className="border border-gray-300 rounded p-2 bg-gray-100">
                {productType === 'digital' ? 'Digital Copy' : 
                 productType === 'physical' ? 'Physical Book' : 
                 productType === 'dual-books' ? 'Both Books' :
                 'Digital + Physical Bundle'}
              </div>
            </div>
            {(productType === 'physical' || productType === 'bundle') && (
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Cover Type</label>
                <div className="border border-gray-300 rounded p-2 bg-gray-100">
                  {coverType === 'hardcover' ? 'Hardcover' : 'Softcover'}
                </div>
              </div>
            )}
          </div>
        );
      
      case 2: // Shipping Details
        return productType !== 'digital' ? (
          <div className="space-y-4">
            <h3 className="font-medium mb-2 text-gray-700">Shipping Details</h3>
            <div className="space-y-2 text-sm">
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
              <div className="border border-gray-300 rounded p-2 bg-gray-100">
                {formData.country}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No shipping required for digital products.</p>
            <button 
              onClick={handleNext}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Skip to Next Step
            </button>
          </div>
        );
      
      case 3: // Order Summary
        return (
          <div className="space-y-4">
            <h3 className="font-medium mb-2 text-gray-700">Order Summary</h3>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{productType === 'digital' ? 'Digital Book:' : 
                       productType === 'physical' ? 'Physical Book:' :
                       productType === 'dual-books' ? 'Both Books:' :
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
        );
      
      case 4: // Payment
        return (
          <div className="space-y-4">
            <h3 className="font-medium mb-2 text-gray-700">Payment Details</h3>
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
        );
      
      default:
        return null;
    }
  };

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
            
            {/* Steps indicator */}
            <div className="mb-6">
              <ol className="relative flex flex-col gap-2 border-l border-gray-200 dark:border-gray-700">
                {steps.map((step, index) => (
                  <li key={step.id} className="ml-4">
                    <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border ${
                      index < currentStep ? 'bg-green-500 border-green-500' : 
                      index === currentStep ? 'bg-blue-500 border-blue-500' : 
                      'bg-gray-200 border-gray-200'
                    }`}></div>
                    <div className={`${
                      index === currentStep ? 'font-medium text-blue-500' : 
                      index < currentStep ? 'font-normal text-green-500' : 
                      'font-normal text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            
            <h2 className="text-lg font-medium mb-1">Elevate Higher Book</h2>
            <div className="flex items-baseline mb-1">
              <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {productType === 'digital' ? 'Digital copy - instant access' : 
               productType === 'physical' ? 'Your FREE copy - just pay shipping & handling' :
               productType === 'dual-books' ? 'Both physical books - with FREE shipping' :
               'Digital + Physical Bundle - 5% discount!'}
            </p>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{productType === 'digital' ? 'Digital Book:' : 
                       productType === 'physical' ? 'Physical Book:' :
                       productType === 'dual-books' ? 'Both Books:' :
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
            {renderStepContent()}
            
            <div className="mt-6 flex justify-between">
              {currentStep > 0 && (
                <button 
                  onClick={handlePrevious}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
              )}
              
              {currentStep === 0 && (
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Edit information
                </button>
              )}
              
              {currentStep < steps.length - 1 && (
                <button 
                  onClick={handleNext}
                  className="ml-auto flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
