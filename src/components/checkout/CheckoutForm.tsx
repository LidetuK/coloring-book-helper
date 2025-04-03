
import { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CheckoutFormProps {
  clientSecret: string;
  orderDetails: any;
  onSuccess: (data: any) => void;
}

const CheckoutForm = ({ clientSecret, orderDetails, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${orderDetails.firstName} ${orderDetails.lastName}`,
            email: orderDetails.email,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        toast.error(error.message || "Payment failed");
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
    } catch (err: any) {
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

export default CheckoutForm;
