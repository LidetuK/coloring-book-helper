
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";
import { Resend } from "https://esm.sh/resend@2.0.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    
    const { customerEmail, customerName, productType } = paymentIntent.metadata;
    
    console.log(`Processing successful payment for ${customerEmail}, product: ${productType}`);
    
    let responseMessage = "";
    
    if (productType === "digital") {
      // Send email with download link for digital product
      const downloadLink = "https://drive.google.com/file/d/1D8jRMfIN4RjKpDFUZ4zqULWdKt6aBcV7/view?usp=sharing";
      
      try {
        // Send email with download link
        if (resend) {
          const { data, error } = await resend.emails.send({
            from: "Book Downloads <orders@yourdomain.com>",
            to: customerEmail,
            subject: "Your Digital Book Download Link",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #3b82f6;">Your Book Download is Ready!</h1>
                <p>Hello ${customerName},</p>
                <p>Thank you for purchasing the digital copy of "Elevate Higher"!</p>
                <p>You can download your book by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${downloadLink}" 
                     style="background-color: #3b82f6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                     Download Your Book
                  </a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4b5563;">${downloadLink}</p>
                <p>This link will remain active, so you can download your book at any time.</p>
                <p>If you have any questions or need assistance, please reply to this email.</p>
                <p>Happy reading!</p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem;">
                  <p>© 2025 Your Company. All rights reserved.</p>
                </div>
              </div>
            `,
          });
          
          console.log("Email sending response:", data, error);
          
          if (error) {
            console.error("Error sending email:", error);
          }
        }
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // We'll continue the process even if email fails
      }
      
      responseMessage = "Your digital book purchase was successful! We've sent an email with download instructions to your inbox. Please check your email (including spam/junk folders) for your download link.";
      
    } else {
      responseMessage = "Your physical book order was successful! It will be shipped to the address you provided within 14-25 business days.";
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
