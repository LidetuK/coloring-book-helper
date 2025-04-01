
import { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Check, ChevronDown } from "lucide-react";
import OutOfStockDialog from "./OutOfStockDialog";

const stripePromise = loadStripe("pk_test_51Gx2sVCNjyaQ14tCaqL6XpRPHLRMtzOK8vjEx6WrqHsA4g6PwjQrMJbjgIkpUCj9Rll9t6wPhYfQt35w0qZ0zvrX003sS4B1yS");

const CheckoutForm = ({ clientSecret, orderDetails, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${orderDetails.firstName} ${orderDetails.lastName}`,
            email: orderDetails.email,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        const response = await supabase.functions.invoke("payment-success", {
          body: { paymentIntentId: paymentIntent.id },
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        toast.success("Payment successful!");
        onSuccess(response.data);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment processing error. Please try again.");
      setErrorMessage(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-8">
        <h3 className="font-medium mb-2 text-gray-700">Card information</h3>
        <div className="border border-gray-300 rounded p-3 bg-white">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="billingIsSame"
          checked={billingIsSameAsShipping}
          onChange={() => setBillingIsSameAsShipping(!billingIsSameAsShipping)}
          className="mr-2 h-5 w-5"
        />
        <label htmlFor="billingIsSame" className="text-sm text-gray-700">
          Billing info is same as shipping
        </label>
      </div>
      
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="saveInfo"
          checked={saveInfo}
          onChange={() => setSaveInfo(!saveInfo)}
          className="mr-2 h-5 w-5"
        />
        <label htmlFor="saveInfo" className="text-sm text-gray-700">
          Securely save my information for 1-click checkout
        </label>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        Pay faster on AMZER LLC and everywhere Link is accepted.
      </div>

      <button
        type="submit" 
        disabled={!stripe || !elements || isProcessing} 
        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium"
      >
        {isProcessing ? "Processing..." : `Pay`}
      </button>
      
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      
      <div className="flex justify-center items-center mt-4 text-xs text-gray-500">
        <span>Powered by</span>
        <img src="https://cdn.jsdelivr.net/gh/stripe/stripe-js@9fcc34d95e11cf5e3a59bf522320bd3be9ed1ae7/fixture/stripe-logo-dark.svg" 
             alt="Stripe" className="h-6 mx-2" />
        <span className="mx-2">|</span>
        <span className="mx-1">Terms</span>
        <span className="mx-1">Privacy</span>
      </div>
    </form>
  );
};

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
  const [productType, setProductType] = useState('physical'); // 'digital', 'physical', 'bundle' or 'dual-books'
  const [coverType, setCoverType] = useState('softcover'); // 'softcover' or 'hardcover'
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [timerExpired, setTimerExpired] = useState(false);
  const [showOutOfStockDialog, setShowOutOfStockDialog] = useState(false);
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

  const handlePaymentSuccess = (data) => {
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
  };

  const calculatePrices = () => {
    const originalPrices = {
      digital: 14.99,
      physical: coverType === 'hardcover' ? 44.99 : 39.99,
      bundle: coverType === 'hardcover' ? (14.99 + 44.99) : (14.99 + 39.99),
      dualBooks: coverType === 'hardcover' ? 69.98 : 59.98
    };

    const discountedPrices = {
      digital: 9.99,
      physical: coverType === 'hardcover' ? 34.99 : 29.99,
      bundle: coverType === 'hardcover' ? (9.99 + 34.99) * 0.95 : (9.99 + 29.99) * 0.95,
      dualBooks: coverType === 'hardcover' ? 62.98 : 53.98
    };

    return {
      original: originalPrices,
      discounted: discountedPrices
    };
  };

  const prices = calculatePrices();

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 57,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          setTimerExpired(true);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCoverTypeChange = (type) => {
    if (type === 'hardcover') {
      setShowOutOfStockDialog(true);
    } else {
      setCoverType(type);
    }
  };

  if (orderComplete) {
    return (
      <section id="claim" className="py-20 bg-gradient-to-b from-brand-gray to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
              <p className="mb-6">{successMessage}</p>
              <button 
                onClick={() => setOrderComplete(false)}
                className="cta-button justify-center"
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showCheckout && clientSecret) {
    let price = 0;
    if (productType === 'digital') {
      price = 9.99;
    } else if (productType === 'physical') {
      price = coverType === 'hardcover' ? 34.99 : 29.99;
    } else if (productType === 'bundle') {
      price = (9.99 + coverType === 'hardcover' ? 34.99 : 29.99) * 0.95;
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
                
                {productType === 'physical' && (
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
              
              <Elements stripe={stripePromise} options={{ clientSecret }}>
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
  }

  return (
    <section id="claim" className="py-20 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge badge-primary">LIMITED TIME OFFER</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
          Swaggerism My Religion: Get Your Copy<br className="hidden md:block" /> And Exclusive Bonuses!
          </h2>
          <div className="mt-4 inline-flex items-center justify-center space-x-2 bg-brand-black/90 text-white px-4 py-2 rounded-md">
            <span className="text-sm">Offer ends in:</span>
            <div className="flex items-center space-x-1 font-mono text-sm">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden animate-on-scroll">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4">
                  Select Your Preferred Format
                </h3>
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="physical"
                      name="productType"
                      value="physical"
                      checked={productType === 'physical'}
                      onChange={() => setProductType('physical')}
                      className="mr-3 h-5 w-5"
                    />
                    <label htmlFor="physical" className="flex flex-col">
                      <span className="font-medium">Physical Book - 
                        {!timerExpired ? (
                          <span> <span className="line-through text-gray-500">
                            ${prices.original.physical.toFixed(2)}
                          </span> ${prices.discounted.physical.toFixed(2)}</span>
                        ) : (
                          <span> ${prices.discounted.physical.toFixed(2)}</span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">Plus shipping & handling</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="digital"
                      name="productType"
                      value="digital"
                      checked={productType === 'digital'}
                      onChange={() => setProductType('digital')}
                      className="mr-3 h-5 w-5"
                    />
                    <label htmlFor="digital" className="flex flex-col">
                      <span className="font-medium">Digital Copy - 
                        {!timerExpired ? (
                          <span> <span className="line-through text-gray-500">
                            ${prices.original.digital.toFixed(2)}
                          </span> ${prices.discounted.digital.toFixed(2)}</span>
                        ) : (
                          <span> ${prices.discounted.digital.toFixed(2)}</span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">Instant download access</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bundle"
                      name="productType"
                      value="bundle"
                      checked={productType === 'bundle'}
                      onChange={() => setProductType('bundle')}
                      className="mr-3 h-5 w-5"
                    />
                    <label htmlFor="bundle" className="flex flex-col">
                      <span className="font-medium">Bundle (Digital + Physical) - <span className="text-green-500 font-bold">Save 5%</span></span>
                      <span className="text-sm text-gray-600">Get both formats at a special discount!</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center relative">
                    <input
                      type="radio"
                      id="dual-books"
                      name="productType"
                      value="dual-books"
                      checked={productType === 'dual-books'}
                      onChange={() => setProductType('dual-books')}
                      className="mr-3 h-5 w-5"
                    />
                    <label htmlFor="dual-books" className="flex flex-col">
                      <div className="flex items-center">
                        <span className="font-medium">Both Books Bundle (Elevate Higher + Swaggerism) - 
                          {!timerExpired ? (
                            <span> <span className="line-through text-gray-500">
                              ${prices.original.dualBooks.toFixed(2)}
                            </span> <span className="text-green-500 font-bold">${prices.discounted.dualBooks.toFixed(2)}</span></span>
                          ) : (
                            <span> <span className="text-green-500 font-bold">${prices.discounted.dualBooks.toFixed(2)}</span></span>
                          )}
                        </span>
                        <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">10% OFF</span>
                      </div>
                      <span className="text-sm text-gray-600">Get both physical books with FREE shipping!</span>
                    </label>
                    <div className="absolute -right-2 -top-2">
                      <span className="bg-yellow-400 text-xs font-bold text-black px-2 py-0.5 rounded-full transform rotate-3 shadow">BEST VALUE</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 border p-3 rounded-md bg-gray-50">
                  <h4 className="font-medium text-sm mb-2">Cover Type:</h4>
                  <div className="flex space-x-4">
                    <div 
                      className={`border p-2 rounded-md cursor-pointer ${coverType === 'softcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
                      onClick={() => handleCoverTypeChange('softcover')}
                    >
                      <span className="text-sm">Softcover</span>
                    </div>
                    <div 
                      className={`border p-2 rounded-md cursor-pointer ${coverType === 'hardcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
                      onClick={() => handleCoverTypeChange('hardcover')}
                    >
                      <span className="text-sm">Hardcover (+$5.00)</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      required
                    />
                  </div>
                  
                  {(productType === 'physical' || productType === 'dual-books') && (
                    <>
                      <div>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
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
                        <input
                          type="text"
                          name="address1"
                          value={formData.address1}
                          onChange={handleChange}
                          placeholder="Address Line 1"
                          className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="address2"
                          value={formData.address2}
                          onChange={handleChange}
                          placeholder="Address Line 2 (optional)"
                          className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="ZIP Code"
                            className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State/Province"
                          className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                          required
                        />
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium">Shipping Information:</p>
                        <ul className="list-disc pl-5 mt-1 text-gray-600">
                          {productType === 'dual-books' ? (
                            <li className="text-green-600 font-medium">FREE shipping and handling on both books bundle!</li>
                          ) : (
                            <>
                              <li>USA & Canada: $11.99 + $2.98 handling</li>
                              <li>Europe: $14.99+ $3.98 handling</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                  
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
            
            <div className="bg-gradient-to-br from-brand-gray/50 to-white p-8 md:p-12 flex items-center">
              <div>
                <div className="mb-8 flex justify-center">
                  {productType === 'dual-books' ? (
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
                  ) : (
                    <div className="relative w-64">
                      <div className="absolute -inset-1 bg-gradient-to-br from-brand-purple to-brand-red opacity-20 blur-sm rounded-lg"></div>
                      <img 
                        src="2222222222.png" 
                        alt="Elevate Higher book" 
                        className="relative max-w-full h-[400px] shadow-xl rounded-lg" 
                      />
                    </div>
                  )}
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
