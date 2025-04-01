
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
  productType: "digital" | "physical" | "bundle" | "dual-books";
  customerEmail: string;
  customerName: string;
  coverType?: "softcover" | "hardcover";
  freeOffer?: boolean;
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
      coverType = "softcover",
      freeOffer = false,
      shippingAddress
    }: PaymentRequest = await req.json();

    console.log(`Processing ${productType} book payment for ${customerEmail}`);
    console.log(`Free offer: ${freeOffer}`);
    
    // If this is a free offer, verify that it's valid (within 5 minutes of click)
    let actualAmount = amount;
    
    if (freeOffer) {
      // This would be validated in a production app
      console.log("Processing free book offer");
      actualAmount = 0;
    }
    
    // Set appropriate description based on product type
    let description = "";
    if (productType === "digital") {
      description = "Digital Book - Elevate Higher - Immediate Access";
    } else if (productType === "physical") {
      description = `Physical Book (${coverType}) - Elevate Higher - Will be shipped`;
    } else if (productType === "bundle") {
      description = `Bundle - Digital + Physical Book (${coverType}) - Elevate Higher`;
    } else if (productType === "dual-books") {
      description = `Both Books Bundle (${coverType}) - Elevate Higher + Swaggerism My Religion - 10% discount, free shipping`;
    }

    if (freeOffer) {
      description = `FREE: ${description}`;
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(actualAmount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      description: description,
      metadata: {
        customerName,
        customerEmail,
        productType,
        coverType,
        freeOffer: freeOffer ? "true" : "false",
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
