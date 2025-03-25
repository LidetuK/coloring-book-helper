
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentIntentId } = await req.json();
    
    // Retrieve the payment intent to confirm payment and get details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== "succeeded") {
      throw new Error(`Payment not successful. Status: ${paymentIntent.status}`);
    }
    
    const { customerEmail, productType } = paymentIntent.metadata;
    
    // Here you would typically:
    // 1. For digital products: Send an email with download link
    // 2. For physical products: Store the order in a database and start fulfillment process
    
    console.log(`Processing successful payment for ${customerEmail}, product: ${productType}`);
    
    let responseMessage = "";
    
    if (productType === "digital") {
      responseMessage = "Your digital book purchase was successful! Check your email for download instructions.";
      // In a real implementation, you would send an email with download links here
    } else {
      responseMessage = "Your physical book order was successful! It will be shipped to the address you provided.";
      // In a real implementation, you would save this order to a database for fulfillment
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: responseMessage
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
    console.error("Error processing payment success:", error);
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
