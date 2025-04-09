import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ProductType, CoverType } from './ProductTypeSelection';
import { useState, useEffect } from 'react';
import { User, Book, Truck, Receipt, CreditCard } from 'lucide-react';
import OrderSummary from "./OrderSummary";

interface CheckoutPageProps {
  clientSecret: string;
  formData: any;
  productType: ProductType;
  coverType: CoverType;
  setShowCheckout: (show: boolean) => void;
  handlePaymentSuccess: (data: any) => void;
}

const icons = {
  personal: User,
  format: Book,
  shipping: Truck,
  summary: Receipt,
  payment: CreditCard
};

const CheckoutPage = ({ 
  clientSecret, 
  formData, 
  productType, 
  coverType,
  setShowCheckout,
  handlePaymentSuccess 
}: CheckoutPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepFormData, setStepFormData] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
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
  
  const needsShipping = productType === 'physical' || productType === 'bundle' || productType === 'dual-books';
  
  // Get visible steps based on product type
  const getVisibleSteps = () => {
    if (productType === 'digital') {
      return [
        { id: 1, name: 'Personal Information', icon: icons.personal },
        { id: 2, name: 'Book Format', icon: icons.format },
        { id: 3, name: 'Order Summary', icon: icons.summary },
        { id: 4, name: 'Payment', icon: icons.payment },
      ];
    }
    return [
      { id: 1, name: 'Personal Information', icon: icons.personal },
      { id: 2, name: 'Book Format', icon: icons.format },
      { id: 3, name: 'Shipping Details', icon: icons.shipping },
      { id: 4, name: 'Order Summary', icon: icons.summary },
      { id: 5, name: 'Payment', icon: icons.payment },
    ];
  };
  
  const visibleSteps = getVisibleSteps();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStepFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleContinue = () => {
    // If we're at the shipping step, submit the form to Web3Forms
    if (currentStep === 3 && needsShipping) {
      submitFormToWeb3Forms();
    } else if (currentStep === 2 && !needsShipping) {
      // Skip shipping step for digital only
      submitFormToWeb3Forms();
      setCurrentStep(3); // Go to order summary (position 3 for digital)
    } else {
      // Otherwise just go to next step
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const submitFormToWeb3Forms = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add the form data to the FormData object
      Object.entries(stepFormData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      // Add product info
      formData.append('productType', productType);
      formData.append('coverType', coverType);
      formData.append('totalPrice', totalPrice.toFixed(2));
      
      // Add the access key
      formData.append('access_key', 'f39f7a05-fac0-4032-a2cc-e68fff78426c');
      
      // Submit the form
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Form submitted successfully', data);
        // Continue to next step after submission
        setCurrentStep(prev => prev + 1);
      } else {
        console.error('Form submission failed', data);
        // Still continue to next step even if form submission fails
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
      return;
    }
    
    if (currentStep === 3 && !needsShipping) {
      setCurrentStep(2); // Go back to book format if shipping was skipped
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleProceedToPayment = () => {
    setCurrentStep(needsShipping ? 5 : 4); // Set to the payment step instead of just showing payment
  };
  
  // Render appropriate step content based on currentStep
  const renderStepContent = () => {
    const paymentStep = needsShipping ? 5 : 4;
    
    if (currentStep === paymentStep) {
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">Payment Details</h3>
          <Elements stripe={clientSecret ? window.stripePromise : null} options={{ clientSecret }}>
            <CheckoutForm 
              clientSecret={clientSecret} 
              orderDetails={{
                ...stepFormData,
                productType,
                totalPrice: `$${totalPrice.toFixed(2)}`
              }}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      );
    }
    
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={stepFormData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={stepFormData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={stepFormData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Book Format</h3>
            <div className="space-y-4">
              {/* Book display - making it bigger */}
              <div className="flex justify-center mb-6">
                <div className="w-full max-w-xs">
                  <img 
                    src={productType === 'dual-books' ? "/2-removebg-preview (1).png" : "/download (2).png"} 
                    alt="Book Cover" 
                    className="w-full h-auto object-contain mx-auto"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="digital"
                  name="bookFormat"
                  value="digital"
                  checked={productType === 'digital'}
                  onChange={() => {}}
                  className="h-4 w-4"
                  disabled
                />
                <label htmlFor="digital" className="flex flex-col">
                  <span className="font-medium">Digital Copy - <span className="line-through text-gray-500">$14.99</span> $9.99</span>
                  <span className="text-sm text-gray-600">Instant download access</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="physical"
                  name="bookFormat"
                  value="physical"
                  checked={productType === 'physical'}
                  onChange={() => {}}
                  className="h-4 w-4"
                  disabled
                />
                <label htmlFor="physical" className="flex flex-col">
                  <span className="font-medium">Physical Book - <span className="line-through text-gray-500">$39.99</span> $25.99</span>
                  <span className="text-sm text-gray-600">Plus shipping & handling</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bundle"
                  name="bookFormat"
                  value="bundle"
                  checked={productType === 'bundle'}
                  onChange={() => {}}
                  className="h-4 w-4"
                  disabled
                />
                <label htmlFor="bundle" className="flex flex-col">
                  <span className="font-medium">Bundle (Digital + Physical) - <span className="text-green-500 font-bold">Save 5%</span></span>
                  <span className="text-sm text-gray-600">Get both formats at a special discount!</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3 relative">
                <input
                  type="radio"
                  id="dual-books"
                  name="bookFormat"
                  value="dual-books"
                  checked={productType === 'dual-books'}
                  onChange={() => {}}
                  className="h-4 w-4"
                  disabled
                />
                <label htmlFor="dual-books" className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-medium">Both Books Bundle (Elevate Higher + Swaggerism) - 
                      <span className="line-through text-gray-500">$59.98</span> <span className="text-green-500 font-bold">$53.98</span>
                    </span>
                    <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">10% OFF</span>
                  </div>
                  <span className="text-sm text-gray-600">Get both physical books with FREE shipping!</span>
                </label>
                <div className="absolute -right-2 -top-2">
                  <span className="bg-yellow-400 text-xs font-bold text-black px-2 py-0.5 rounded-full transform rotate-3 shadow">BEST VALUE</span>
                </div>
              </div>
              
              <div className="border p-3 rounded-md bg-gray-50 mt-4">
                <h4 className="font-medium text-sm mb-2">Cover Type:</h4>
                <div className="flex space-x-4">
                  <div 
                    className={`border p-2 rounded-md ${coverType === 'softcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
                  >
                    <span className="text-sm">Softcover</span>
                  </div>
                  <div 
                    className={`border p-2 rounded-md ${coverType === 'hardcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
                  >
                    <span className="text-sm">Hardcover (+$10.00)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return needsShipping ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shipping Details</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Country</label>
              <select
                name="country"
                value={stepFormData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={stepFormData.address1}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address Line 2 (optional)</label>
              <input
                type="text"
                name="address2"
                value={stepFormData.address2}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={stepFormData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={stepFormData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">State/Province</label>
              <input
                type="text"
                name="state"
                value={stepFormData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Product:</span>
                  <span>Digital Copy</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>$9.99</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                  <span>Total:</span>
                  <span>$9.99</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Contact Information</h4>
              <p>{stepFormData.firstName} {stepFormData.lastName}</p>
              <p>{stepFormData.email}</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Product:</span>
                  <span>
                    {productType === 'physical'
                      ? 'Physical Book'
                      : productType === 'bundle'
                      ? 'Bundle (Digital + Physical)'
                      : productType === 'digital'
                      ? 'Digital Copy'
                      : 'Both Books Bundle'}
                  </span>
                </div>
                {productType !== 'digital' && (
                  <div className="flex justify-between">
                    <span>Cover Type:</span>
                    <span>{coverType === 'hardcover' ? 'Hardcover' : 'Softcover'}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${price.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between">
                    <span>Shipping & Handling:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Contact Information</h4>
              <p>{stepFormData.firstName} {stepFormData.lastName}</p>
              <p>{stepFormData.email}</p>
            </div>
            {needsShipping && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p>{stepFormData.address1}</p>
                {stepFormData.address2 && <p>{stepFormData.address2}</p>}
                <p>{stepFormData.city}, {stepFormData.state} {stepFormData.zipCode}</p>
                <p>{stepFormData.country}</p>
              </div>
            )}
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <section id="claim" className="py-10 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order Your Copy Now</h2>
            <p className="text-gray-600 mb-6">Complete the form below to get your copy</p>
            
            {/* Stepper */}
            <div className="flex justify-between mb-8">
              {visibleSteps.map((step, index) => {
                // Determine if step is active, completed, or upcoming
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                const StepIcon = step.icon;
                
                return (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center ${
                      isActive ? 'text-theme-purple-dark' : 
                      isCompleted ? 'text-green-500' : 
                      'text-gray-400'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                      isActive ? 'bg-theme-purple-dark text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Step Content */}
            <div className="mb-6">
              {renderStepContent()}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              
              {currentStep < (needsShipping ? 4 : 3) ? (
                <button 
                  onClick={handleContinue}
                  className={`ml-auto px-4 py-2 bg-theme-purple-dark text-white rounded-md hover:bg-theme-purple ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </button>
              ) : currentStep === (needsShipping ? 4 : 3) ? (
                <button 
                  onClick={handleProceedToPayment}
                  className="ml-auto px-4 py-2 bg-theme-purple-dark text-white rounded-md hover:bg-theme-purple"
                >
                  Proceed to Payment
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Order Summary for last step before payment */}
      {currentStep === (needsShipping ? 4 : 3) && (
        <div className="md:hidden mt-6">
          <OrderSummary productType={productType} coverType={coverType} step={currentStep} />
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
