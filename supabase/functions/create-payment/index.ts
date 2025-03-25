
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  currency: string;
  productType: "digital" | "physical";
  customerEmail: string;
  customerName: string;
  shippingAddress?: {
    address: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      amount,
      currency,
      productType,
      customerEmail,
      customerName,
      shippingAddress
    }: PaymentRequest = await req.json();

    console.log(`Processing ${productType} book payment for ${customerEmail}`);
    
    // Set appropriate description based on product type
    let description = "";
    if (productType === "digital") {
      description = "Digital Book - Elevate Higher - Immediate Access";
    } else {
      description = "Physical Book - Elevate Higher - Will be shipped";
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      description: description,
      metadata: {
        customerName,
        customerEmail,
        productType,
        ...(shippingAddress && {
          shippingAddress: JSON.stringify(shippingAddress)
        })
      },
      receipt_email: customerEmail,
    });

    console.log(`Payment intent created: ${paymentIntent.id}`);

    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
