import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Lock, CreditCard, Shield, Mail, Truck, Download, Calendar, Gift } from "lucide-react";

const stripePromise = loadStripe("pk_test_51Gx2sVCNjyaQ14tCaqL6XpRPHLRMtzOK8vjEx6WrqHsA4g6PwjQrMJbjgIkpUCj9Rll9t6wPhYfQt35w0qZ0zvrX003sS4B1yS");

const countries = [
  { value: "us", label: "United States", region: "northAmerica" },
  { value: "gb", label: "United Kingdom", region: "europe" },
  { value: "fr", label: "France", region: "europe" },
  { value: "de", label: "Germany", region: "europe" },
  { value: "it", label: "Italy", region: "europe" },
  { value: "es", label: "Spain", region: "europe" },
  { value: "pt", label: "Portugal", region: "europe" },
  { value: "be", label: "Belgium", region: "europe" },
  { value: "nl", label: "Netherlands", region: "europe" },
  { value: "lu", label: "Luxembourg", region: "europe" },
  { value: "ch", label: "Switzerland", region: "europe" },
  { value: "at", label: "Austria", region: "europe" },
  { value: "se", label: "Sweden", region: "europe" },
  { value: "no", label: "Norway", region: "europe" },
  { value: "dk", label: "Denmark", region: "europe" },
  { value: "fi", label: "Finland", region: "europe" },
  { value: "ie", label: "Ireland", region: "europe" },
  { value: "pl", label: "Poland", region: "europe" },
  { value: "cz", label: "Czech Republic", region: "europe" },
  { value: "sk", label: "Slovakia", region: "europe" },
  { value: "hu", label: "Hungary", region: "europe" },
  { value: "ro", label: "Romania", region: "europe" },
  { value: "bg", label: "Bulgaria", region: "europe" },
  { value: "hr", label: "Croatia", region: "europe" },
  { value: "si", label: "Slovenia", region: "europe" },
  { value: "gr", label: "Greece", region: "europe" },
  { value: "ee", label: "Estonia", region: "europe" },
  { value: "lv", label: "Latvia", region: "europe" },
  { value: "lt", label: "Lithuania", region: "europe" },
];

const orderFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  productType: z.enum(["elevate_digital", "elevate_physical", "swaggerism_physical_preorder", "both_digital", "both_physical", "both_mix"]),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const CheckoutForm = ({ clientSecret, orderDetails, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h3 className="font-medium mb-2">Card Details</h3>
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
          }}
        />
      </div>
      
      <div className="flex items-center space-x-2 text-sm">
        <Lock className="h-4 w-4" />
        <span>Secure payment via Stripe</span>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || !elements || isProcessing} 
        className="w-full py-3 text-lg font-bold"
      >
        {isProcessing ? "Processing..." : `Pay ${orderDetails.totalPrice}`}
      </Button>
      
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </form>
  );
};

const OrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailUsed, setEmailUsed] = useState("");
  const [productTypeOrdered, setProductTypeOrdered] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      productType: "elevate_digital",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "us",
      agreeTerms: false,
    },
  });

  const productType = form.watch("productType");
  const country = form.watch("country");

  const needsShipping = 
    productType === "elevate_physical" || 
    productType === "swaggerism_physical_preorder" || 
    productType === "both_physical" || 
    productType === "both_mix";

  useEffect(() => {
    if (!needsShipping) {
      form.setValue("address", "");
      form.setValue("city", "");
      form.setValue("state", "");
      form.setValue("zipCode", "");
      form.setValue("country", "us");
    }
    
    if (needsShipping) {
      orderFormSchema.extend({
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State/Province is required"),
        zipCode: z.string().min(1, "Zip/Postal code is required"),
        country: z.string().min(1, "Country is required"),
      });
    }
  }, [productType, form, needsShipping]);

  const calculatePrice = () => {
    const prices = {
      elevate_digital: 9.99,
      elevate_physical: 29.99,
      swaggerism_physical_preorder: 29.99,
      both_digital: 18.99,
      both_physical: 50.99,
      both_mix: 35.99,
    };
    
    const originalPrices = {
      elevate_digital: 14.99,
      elevate_physical: 39.99,
      swaggerism_physical_preorder: 39.99,
      both_digital: 29.98,
      both_physical: 79.98,
      both_mix: 54.98,
    };
    
    let basePrice = prices[productType];
    let originalPrice = originalPrices[productType];
    let shippingCost = 0;
    
    if (needsShipping) {
      const isFreeShipping = 
        productType === "swaggerism_physical_preorder" || 
        (productType === "both_physical" || productType === "both_mix");
      
      if (!isFreeShipping) {
        const selectedCountry = countries.find(c => c.value === country);
        if (selectedCountry) {
          if (selectedCountry.region === "northAmerica") {
            shippingCost = 11.99 + 2.98;
          } else if (selectedCountry.region === "europe") {
            shippingCost = 14.99 + 3.98;
          }
        }
      }
    }
    
    return {
      basePrice,
      originalPrice,
      shippingCost,
      totalPrice: (basePrice + shippingCost).toFixed(2)
    };
  };

  const onSubmit = async (data: OrderFormValues) => {
    setIsLoading(true);
    
    try {
      const pricing = calculatePrice();
      
      const shippingAddress = (data.productType === "elevate_physical" || data.productType === "swaggerism_physical_preorder" || data.productType === "both_physical" || data.productType === "both_mix") ? {
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      } : undefined;
      
      const response = await supabase.functions.invoke("create-payment", {
        body: {
          amount: parseFloat(pricing.totalPrice),
          currency: "usd",
          productType: data.productType,
          customerEmail: data.email,
          customerName: `${data.firstName} ${data.lastName}`,
          shippingAddress
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setClientSecret(response.data.clientSecret);
      setOrderDetails({
        ...data,
        ...pricing
      });
      setShowPaymentForm(true);
      
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("There was a problem processing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (data) => {
    setOrderComplete(true);
    setSuccessMessage(data.message || "Your order has been received!");
    
    if (data.email) {
      setEmailUsed(data.email);
    }
    
    if (data.productType) {
      setProductTypeOrdered(data.productType);
    }
    
    if (data.downloadLink) {
      setDownloadLink(data.downloadLink);
    }
    
    form.reset();
  };

  if (orderComplete) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Order Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mb-4">{successMessage}</p>
            {(productTypeOrdered === "digital" || productTypeOrdered === "bundle") && downloadLink && (
              <div className="mb-4 p-4 bg-blue-50 rounded-md w-full">
                <div className="flex items-center mb-2">
                  <Download className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Download Your Book</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Your book is ready to download. Click the button below to get your copy.
                  We've also sent the download link to your email ({emailUsed}).
                </p>
                <a 
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Now
                </a>
              </div>
            )}
            {(productTypeOrdered === "physical" || productTypeOrdered === "bundle") && (
              <div className="mb-4 p-4 bg-blue-50 rounded-md">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Shipping Information</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your book will be shipped to the address you provided within the next 14-25 business days.
                  You'll receive a shipping confirmation email when your order is dispatched.
                </p>
              </div>
            )}
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setOrderComplete(false)}>
            Place Another Order
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (showPaymentForm && clientSecret && orderDetails) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              {orderDetails.productType === "digital" 
                ? "Digital Book - $9.99" 
                : orderDetails.productType === "physical"
                ? `Physical Book - $29.99 + ${orderDetails.shippingCost.toFixed(2)} shipping`
                : `Bundle (Digital + Physical) - $${orderDetails.basePrice.toFixed(2)} + ${orderDetails.shippingCost.toFixed(2)} shipping`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium">Order Summary</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span>
                    {orderDetails.productType === "digital" 
                      ? "Digital Book" 
                      : orderDetails.productType === "physical"
                      ? "Physical Book"
                      : "Digital + Physical Bundle (5% discount)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span>
                    {orderDetails.productType === "bundle" 
                      ? <span>${orderDetails.basePrice.toFixed(2)} <span className="text-xs text-gray-500">(5% discount applied)</span></span>
                      : <span>${orderDetails.basePrice.toFixed(2)}</span>
                    }
                  </span>
                </div>
                {(orderDetails.productType === "physical" || orderDetails.productType === "bundle") && (
                  <div className="flex justify-between">
                    <span>Shipping & Handling:</span>
                    <span>${orderDetails.shippingCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>${orderDetails.totalPrice}</span>
                </div>
              </div>
            </div>
            
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                clientSecret={clientSecret} 
                orderDetails={orderDetails} 
                onSuccess={handlePaymentSuccess} 
              />
            </Elements>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentForm(false)}
              disabled={isLoading}
            >
              Back to Order Form
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const getProductLabel = (type: string) => {
    switch(type) {
      case "elevate_digital": return "Elevate Higher - Digital";
      case "elevate_physical": return "Elevate Higher - Physical";
      case "swaggerism_physical_preorder": return "Swaggerism My Religion - Physical (Pre-order)";
      case "both_digital": return "Both Books - Digital Bundle";
      case "both_physical": return "Both Books - Physical Bundle";
      case "both_mix": return "Both Books - Digital + Physical Mix";
      default: return type;
    }
  };

  return (
    <section id="order" className="py-10 md:py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-6">
              <img 
                src="/download (2).png" 
                alt="Elevate Higher" 
                className="w-32 h-auto object-contain mx-auto md:mx-0"
              />
              <img 
                src="/2-removebg-preview (1).png" 
                alt="Swaggerism My Religion" 
                className="w-32 h-auto object-contain mx-auto md:mx-0"
              />
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold mt-4 md:mt-6">
              Choose Your <span className="text-primary">Transformation</span> Package
            </h3>
            <p className="text-gray-600 mt-2 md:mt-4 text-sm md:text-base">
              Select one book or get both for maximum impact and savings.
            </p>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-4">Available Options:</h4>
              
              <div className="space-y-4 text-left">
                <div className="border-b pb-4">
                  <h5 className="font-medium text-theme-purple-dark mb-2">Elevate Higher</h5>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">1</div>
                      <div className="ml-2">
                        <span className="font-medium">Digital: <span className="line-through text-gray-500">$14.99</span> $9.99</span>
                        <p className="text-sm text-gray-600">Instant access via email</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">2</div>
                      <div className="ml-2">
                        <span className="font-medium">Physical: <span className="line-through text-gray-500">$39.99</span> $29.99 + Shipping</span>
                        <p className="text-sm text-gray-600">Delivered to your doorstep</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <h5 className="font-medium text-theme-purple-dark mb-2">Swaggerism My Religion</h5>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">3</div>
                      <div className="ml-2">
                        <span className="font-medium">Physical (Pre-order): <span className="line-through text-gray-500">$39.99</span> $29.99</span>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                          <p className="text-sm text-gray-600">Launches July 15th - FREE shipping for pre-orders!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-green-600 mb-2">Bundle Options (Best Value)</h5>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">4</div>
                      <div className="ml-2">
                        <span className="font-medium">Both Digital: <span className="text-green-500 font-bold">Save 5%</span></span>
                        <p className="text-sm text-gray-600">Get both books in digital format</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">5</div>
                      <div className="ml-2">
                        <span className="font-medium">Both Physical: <span className="text-green-500 font-bold">Save 15%</span></span>
                        <p className="text-sm text-gray-600">Get both physical books with FREE shipping on Swaggerism</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">6</div>
                      <div className="ml-2">
                        <span className="font-medium">Mix (Digital + Physical): <span className="text-green-500 font-bold">Save 10%</span></span>
                        <p className="text-sm text-gray-600">Get Elevate digital + Swaggerism physical</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Order Your Books Now
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Book Selection</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="p-4 border rounded-md">
                            <h4 className="font-medium text-theme-purple-dark mb-2">Elevate Higher</h4>
                            <div className="space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="elevate_digital" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Digital - <span className="line-through text-gray-500">$14.99</span> $9.99
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="elevate_physical" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Physical - <span className="line-through text-gray-500">$39.99</span> $29.99 + Shipping
                                </FormLabel>
                              </FormItem>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-md">
                            <h4 className="font-medium text-theme-purple-dark mb-2">Swaggerism My Religion</h4>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="swaggerism_physical_preorder" />
                              </FormControl>
                              <div>
                                <FormLabel className="font-normal">
                                  Physical (Pre-order) - <span className="line-through text-gray-500">$39.99</span> $29.99
                                </FormLabel>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  FREE shipping on pre-orders before July 15!
                                </p>
                              </div>
                            </FormItem>
                          </div>
                          
                          <div className="p-4 border rounded-md bg-green-50">
                            <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full w-fit mb-2">BEST VALUE</div>
                            <h4 className="font-medium text-green-700 mb-2">Bundle Options</h4>
                            <div className="space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="both_digital" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Both Digital - <span className="text-green-600 font-medium">$18.99</span> (Save 5%)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="both_physical" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Both Physical - <span className="text-green-600 font-medium">$50.99</span> (Save 15%)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="both_mix" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Mix (Digital + Physical) - <span className="text-green-600 font-medium">$35.99</span> (Save 10%)
                                </FormLabel>
                              </FormItem>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {needsShipping && (
                  <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                    <h3 className="font-medium">Shipping Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
