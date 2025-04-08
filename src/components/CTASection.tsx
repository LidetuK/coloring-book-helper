import { useState, useEffect, useRef } from 'react';
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
  const [formSubmittedToWeb3Forms, setFormSubmittedToWeb3Forms] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitFormToWeb3Forms = async () => {
    if (formSubmittedToWeb3Forms) return;
    
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
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      console.log('Web3Forms submission response:', data);
      setFormSubmittedToWeb3Forms(true);
    } catch (error) {
      console.error('Error submitting form to Web3Forms:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitFormToWeb3Forms();
      
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
    setFormSubmittedToWeb3Forms(false);
  };

  const handleCoverTypeChange = (type: CoverType) => {
    if (type === 'hardcover') {
      setShowOutOfStockDialog(true);
    } else {
      setCoverType(type);
    }
  };

  if (orderComplete) {
    return (
      <OrderComplete 
        successMessage={successMessage} 
        onNewOrder={() => setOrderComplete(false)} 
      />
    );
  }

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
                <ProductTypeSelection 
                  productType={productType}
                  setProductType={setProductType}
                  coverType={coverType}
                  handleCoverTypeChange={handleCoverTypeChange}
                  timerExpired={timerExpired}
                />
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AddressForm 
                    formData={formData}
                    handleChange={handleChange}
                    setFormData={setFormData}
                    productType={productType}
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
                    type="submit"
                    className="w-full cta-button justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 
                     productType === 'physical' ? 'RUSH ME MY COPIES NOW' : 
                     productType === 'digital' ? 'Get Digital Access Now' : 
                     productType === 'dual-books' ? 'RUSH ME MY COPIES NOW' :
                     'Get Bundle Access Now'}
                  </button>
                  
                  <p className="text-center text-xs text-brand-black/60">
                    {productType === 'physical' 
                      ? `By clicking above, you agree to pay $${coverType === 'hardcover' ? '34.99' : '29.99'} plus shipping & handling` 
                      : productType === 'digital' 
                      ? 'By clicking above, you agree to pay $9.99 for digital access'
                      : productType === 'dual-books'
                      ? `By clicking above, you agree to pay $${coverType === 'hardcover' ? '62.98' : '53.98'} for both books with free shipping`
                      : `By clicking above, you agree to pay for the bundle with 5% discount plus shipping`}
                  </p>
                </form>
              </div>
            </div>
            
            <OrderSummary productType={productType} coverType={coverType} />
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
