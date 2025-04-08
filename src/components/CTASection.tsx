
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";
import OutOfStockDialog from "./OutOfStockDialog";
import ProductTypeSelection, { ProductType, CoverType } from './checkout/ProductTypeSelection';
import AddressForm from './checkout/AddressForm';
import OrderSummary from './checkout/OrderSummary';
import CheckoutPage from './checkout/CheckoutPage';
import CountdownTimer from './checkout/CountdownTimer';
import OrderComplete from './checkout/OrderComplete';

// Initialize Stripe outside component to maintain reference
const stripePromise = loadStripe("pk_test_51Gx2sVCNjyaQ14tCaqL6XpRPHLRMtzOK8vjEx6WrqHsA4g6PwjQrMJbjgIkpUCj9Rll9t6wPhYfQt35w0qZ0zvrX003sS4B1yS");

// Add to global window to be accessible from CheckoutPage
declare global {
  interface Window {
    stripePromise: any;
  }
}
if (typeof window !== 'undefined') {
  window.stripePromise = stripePromise;
}

const CTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [productType, setProductType] = useState<ProductType>('digital'); // Default is 'digital'
  const [coverType, setCoverType] = useState<CoverType>('softcover'); // 'softcover' or 'hardcover'
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [timerExpired, setTimerExpired] = useState(false);
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      observerRef.current?.observe(element);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Function to validate current step data
  const validateStepData = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName || !formData.lastName || !formData.email) {
          toast.error("Please fill in all required fields");
          return false;
        }
        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      
      case 2: // Book Format
        // No validation needed here, product type is already selected
        return true;
        
      case 3: // Shipping Details
        if (productType === 'digital') {
          // Skip validation for digital products
          return true;
        }
        if (!formData.address1 || !formData.city || !formData.state || !formData.zipCode) {
          toast.error("Please fill in all shipping details");
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };
  
  // Move to next step
  const handleNextStep = () => {
    if (validateStepData(currentStep)) {
      if (currentStep === 3) {
        // Submit form to Web3Forms if shipping step is completed
        submitFormToWeb3Forms();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };
  
  // Submit form data to Web3Forms
  const submitFormToWeb3Forms = async () => {
    setIsSubmitting(true);
    try {
      const apiFormData = new FormData();
      
      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value as string);
      });
      
      // Add product info
      apiFormData.append('productType', productType);
      apiFormData.append('coverType', coverType);
      
      // Required Web3Forms field
      apiFormData.append('access_key', 'f39f7a05-fac0-4032-a2cc-e68fff78426c');
      
      // Submit the form
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: apiFormData
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Form successfully submitted to Web3Forms');
        toast.success("Your information has been saved");
        setCurrentStep(prev => prev + 1); // Move to next step
      } else {
        console.error('Form submission failed', data);
        toast.error("There was an issue saving your information. Continuing anyway.");
        setCurrentStep(prev => prev + 1); // Move to next step anyway
      }
    } catch (error) {
      console.error('Error submitting form to Web3Forms', error);
      toast.error("There was an issue saving your information. Continuing anyway.");
      setCurrentStep(prev => prev + 1); // Move to next step anyway
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let amount = 0;
      
      if (productType === 'digital') {
        amount = 9.99;
      } else if (productType === 'physical') {
        amount = coverType === 'hardcover' ? 34.99 : 29.99;
      } else if (productType === 'bundle') {
        const physicalPrice = coverType === 'hardcover' ? 34.99 : 29.99;
        amount = (9.99 + physicalPrice) * 0.95;
      } else if (productType === 'dual-books') {
        amount = coverType === 'hardcover' ? 62.98 : 53.98;
      }
      
      const shippingCost = (productType === 'digital') ? 0 : 
                          (productType === 'dual-books') ? 0 : 
                          (formData.country === 'United States' || formData.country === 'Canada') ? 14.97 : 14.99;
      const totalAmount = amount + ((productType === 'digital' || productType === 'dual-books') ? 0 : shippingCost);
      
      const response = await supabase.functions.invoke("create-payment", {
        body: {
          amount: totalAmount,
          currency: "usd",
          productType: productType,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          shippingAddress: productType !== 'digital' ? {
            address: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          } : undefined,
          coverType: coverType,
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setClientSecret(response.data.clientSecret);
      setShowCheckout(true);
      
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("There was a problem processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (data: any) => {
    setOrderComplete(true);
    setSuccessMessage(data.message || "Your order has been received! Check your email for confirmation details.");
    setShowCheckout(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
    setCurrentStep(1);
  };

  const handleCoverTypeChange = (type: CoverType) => {
    if (type === 'hardcover') {
      setShowOutOfStockDialog(true);
    } else {
      setCoverType(type);
    }
  };

  // Handle completed order view
  if (orderComplete) {
    return (
      <OrderComplete 
        successMessage={successMessage} 
        onNewOrder={() => setOrderComplete(false)} 
      />
    );
  }

  // Handle checkout view
  if (showCheckout && clientSecret) {
    return (
      <CheckoutPage
        clientSecret={clientSecret}
        formData={formData}
        productType={productType}
        coverType={coverType}
        setShowCheckout={setShowCheckout}
        handlePaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  // Prepare step indicator
  const steps = [
    { id: 1, name: 'Personal Information' },
    { id: 2, name: 'Book Format' },
    { id: 3, name: 'Shipping Details' },
    { id: 4, name: 'Order Summary' },
  ];

  // Only show shipping step if needed
  const filteredSteps = productType === 'digital' 
    ? steps.filter(step => step.id !== 3) 
    : steps;

  // Main order form view
  return (
    <section id="claim" className="py-20 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">LIMITED TIME OFFER</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Swaggerism My Religion: Get Your Copy<br className="hidden md:block" /> And Exclusive Bonuses!
          </h2>
          <CountdownTimer onExpire={() => setTimerExpired(true)} />
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-on-scroll">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md">
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Order Your Copy Now</h3>
                    <p className="text-gray-600 mb-6">Complete the form below to get your copy</p>
                    
                    <div className="flex mb-6">
                      {filteredSteps.map((step, index) => (
                        <div key={step.id} className="flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              step.id === currentStep ? 'bg-theme-purple-dark text-white' : 
                              step.id < currentStep ? 'bg-green-500 text-white' : 
                              'bg-gray-200 text-gray-500'
                            }`}>
                              {step.id < currentStep ? (
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                step.id
                              )}
                            </div>
                            <span className="text-xs hidden md:block">{step.name}</span>
                          </div>
                          {index < filteredSteps.length - 1 && (
                            <div className="hidden md:block h-1 bg-gray-200 w-full mt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <AddressForm 
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        productType={productType}
                        step={1}
                      />
                      
                      <div className="flex items-center space-x-2 text-sm text-brand-black/70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Secure Checkout</span>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-4">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>256-bit SSL Encryption</span>
                      </div>
                      
                      <button
                        type="button"
                        className="w-full cta-button justify-center"
                        onClick={handleNextStep}
                      >
                        Continue to Book Format
                      </button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Order Your Copy Now</h3>
                    <p className="text-gray-600 mb-6">Complete the form below to get your copy</p>
                    
                    <div className="flex mb-6">
                      {filteredSteps.map((step, index) => (
                        <div key={step.id} className="flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              step.id === currentStep ? 'bg-theme-purple-dark text-white' : 
                              step.id < currentStep ? 'bg-green-500 text-white' : 
                              'bg-gray-200 text-gray-500'
                            }`}>
                              {step.id < currentStep ? (
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                step.id
                              )}
                            </div>
                            <span className="text-xs hidden md:block">{step.name}</span>
                          </div>
                          {index < filteredSteps.length - 1 && (
                            <div className="hidden md:block h-1 bg-gray-200 w-full mt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <ProductTypeSelection 
                      productType={productType}
                      setProductType={setProductType}
                      coverType={coverType}
                      handleCoverTypeChange={handleCoverTypeChange}
                      timerExpired={timerExpired}
                      step={2}
                    />
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-theme-purple-dark text-white rounded-md hover:bg-theme-purple"
                        onClick={() => {
                          if (productType === 'digital') {
                            // Skip shipping step for digital products
                            submitFormToWeb3Forms();
                            setCurrentStep(4);
                          } else {
                            handleNextStep();
                          }
                        }}
                      >
                        {productType === 'digital' ? 'Continue to Summary' : 'Continue to Shipping'}
                      </button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Order Your Copy Now</h3>
                    <p className="text-gray-600 mb-6">Complete the form below to get your copy</p>
                    
                    <div className="flex mb-6">
                      {filteredSteps.map((step, index) => (
                        <div key={step.id} className="flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              step.id === currentStep ? 'bg-theme-purple-dark text-white' : 
                              step.id < currentStep ? 'bg-green-500 text-white' : 
                              'bg-gray-200 text-gray-500'
                            }`}>
                              {step.id < currentStep ? (
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                step.id
                              )}
                            </div>
                            <span className="text-xs hidden md:block">{step.name}</span>
                          </div>
                          {index < filteredSteps.length - 1 && (
                            <div className="hidden md:block h-1 bg-gray-200 w-full mt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <AddressForm 
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        productType={productType}
                        step={3}
                      />
                      
                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                          onClick={() => setCurrentStep(2)}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 bg-theme-purple-dark text-white rounded-md hover:bg-theme-purple ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                          onClick={handleNextStep}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Processing...' : 'Continue to Summary'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Order Your Copy Now</h3>
                    <p className="text-gray-600 mb-6">Complete the form below to get your copy</p>
                    
                    <div className="flex mb-6">
                      {filteredSteps.map((step, index) => (
                        <div key={step.id} className="flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              step.id === currentStep ? 'bg-theme-purple-dark text-white' : 
                              step.id < currentStep ? 'bg-green-500 text-white' : 
                              'bg-gray-200 text-gray-500'
                            }`}>
                              {step.id < currentStep ? (
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                step.id
                              )}
                            </div>
                            <span className="text-xs hidden md:block">{step.name}</span>
                          </div>
                          {index < filteredSteps.length - 1 && (
                            <div className="hidden md:block h-1 bg-gray-200 w-full mt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <h4 className="font-medium mb-3">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Product:</span>
                            <span>
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
                              <span>{coverType === 'hardcover' ? 'Hardcover' : 'Softcover'}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span>
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
                              <span>Shipping & Handling:</span>
                              <span>$14.97</span>
                            </div>
                          )}
                          
                          {(productType === 'dual-books') && (
                            <div className="flex justify-between">
                              <span>Shipping & Handling:</span>
                              <span className="text-green-600">FREE</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                            <span>Total:</span>
                            <span>
                              {productType === 'digital' 
                                ? '$9.99' 
                                : productType === 'physical'
                                ? coverType === 'hardcover' ? '$49.96' : '$40.96'
                                : productType === 'bundle'
                                ? coverType === 'hardcover' 
                                  ? `$${((9.99 + 34.99) * 0.95 + 14.97).toFixed(2)}` 
                                  : `$${((9.99 + 25.99) * 0.95 + 14.97).toFixed(2)}`
                                : coverType === 'hardcover' ? '$62.98' : '$53.98'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.email}</p>
                      </div>
                      
                      {productType !== 'digital' && (
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <p>{formData.address1}</p>
                          {formData.address2 && <p>{formData.address2}</p>}
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.country}</p>
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit}>
                        <div className="flex justify-between mt-8">
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                            onClick={() => setCurrentStep(productType === 'digital' ? 2 : 3)}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className={`px-4 py-2 bg-theme-purple-dark text-white rounded-md hover:bg-theme-purple ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <OrderSummary productType={productType} coverType={coverType} step={currentStep} />
          </div>
        </div>
      </div>
      
      <OutOfStockDialog 
        open={showOutOfStockDialog} 
        onClose={() => {
          setShowOutOfStockDialog(false);
          setCoverType('softcover');
        }} 
      />
    </section>
  );
};

export default CTASection;
