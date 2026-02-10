import { connectDB } from "@/lib/connectDB";
import Waitlist from "@/model/waitlist";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import sgMail from "@sendgrid/mail";

/* ------------------ SENDGRID SETUP ------------------ */
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/* ------------------ VALIDATION ------------------ */
const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  userType: Yup.string().required(),
  agreePrivacy: Yup.boolean().oneOf([true]),
  agreeTerms: Yup.boolean().oneOf([true]),
  consentSMS: Yup.boolean().oneOf([true]),
});

/* ------------------ EMAIL TEMPLATE ------------------ */
export const getAnyRideConfirmationEmailHTML = (username: string) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to AnyRide</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body { margin:0; padding:0; background:#f4f6f8; font-family:Arial; }
      .container { max-width:600px; margin:auto; background:#fff; }
      .header { background:linear-gradient(340deg,#010418 30%,#48050e 60%,#980400 100%); padding:32px; text-align:center; }
      .hero-text { color:#fff; font-size:26px; font-weight:bold; }
      .content { padding:32px; }
      .username { font-weight:bold; color:#dc2626; }
      .cta-button { background:#dc2626; color:#fff; padding:14px 24px; border-radius:999px; text-decoration:none; display:inline-block; margin:16px 0; }
      .footer { background:#f9fafb; padding:24px; text-align:center; font-size:12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="hero-text">You're officially on the AnyRide list 🚗</h1>
      </div>
      <div class="content">
        <p>Hey <span class="username">${username}</span>,</p>
        <p>Thanks for signing up for <strong>AnyRide</strong>!</p>
        <p>We're building something amazing and you'll be among the first to know when we launch.</p>
        <a href="https://anyride.app" class="cta-button">Visit AnyRide</a>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} AnyRide. All rights reserved.</p>
        <p>support@anyride.app</p>
      </div>
    </div>
  </body>
</html>`;
};

/* ------------------ API HANDLER ------------------ */
export async function POST(req: NextRequest) {
  console.log("🔵 [START] Waitlist API request received");
  
  try {
    // Step 1: Connect to DB
    console.log("🔵 [STEP 1] Connecting to MongoDB...");
    await connectDB();
    // console.log("✅ [STEP 1] MongoDB connected");
    
    // Step 2: Parse request body
    console.log("🔵 [STEP 2] Parsing request body...");
    const body = await req.json();
    console.log("✅ [STEP 2] Body parsed:", {
      firstName: body.firstName,
      lastName: body.lastName,
      emailAddress: body.emailAddress,
      userType: body.userType,
      hasAgreePrivacy: !!body.agreePrivacy,
      hasAgreeTerms: !!body.agreeTerms,
      hasConsentSMS: !!body.consentSMS,
    });
    
    // Step 3: Validate
    // console.log("🔵 [STEP 3] Validating request...");
    try {
      await schema.validate(body, { abortEarly: false });
      // console.log("✅ [STEP 3] Validation passed");
    } catch (validationError: any) {
      console.error("❌ [STEP 3] Validation failed:", validationError.errors);
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validationError.errors 
        },
        { status: 400 }
      );
    }
    
    const {
      firstName,
      lastName,
      emailAddress,
      userType,
      agreePrivacy,
      agreeTerms,
      consentSMS,
    } = body;
    
    const email = emailAddress.trim().toLowerCase();
    // console.log("🔵 Normalized email:", email);
    
    // Step 4: Check for duplicate
    // console.log("🔵 [STEP 4] Checking for duplicate email...");
    const exists = await Waitlist.findOne({ emailAddress: email });
    if (exists) {
      console.log("❌ [STEP 4] Email already exists in waitlist");
      return NextResponse.json(
        { message: "Email already on waitlist" },
        { status: 400 }
      );
    }
    // console.log("✅ [STEP 4] Email is unique");
    
    // Step 5: Create waitlist entry
    // console.log("🔵 [STEP 5] Creating waitlist entry...");
    const waitlistEntry = await Waitlist.create({
      firstName,
      lastName,
      emailAddress: email,
      userType,
      agreePrivacy,
      agreeTerms,
      consentSMS,
    });
    // console.log("✅ [STEP 5] Waitlist entry created:", waitlistEntry._id);
    
    // Step 6: Send email
    // console.log("🔵 [STEP 6] Preparing to send email...");
    // console.log("🔵 SendGrid API Key present:", !!process.env.SENDGRID_API_KEY);
    // console.log("🔵 SendGrid API Key length:", process.env.SENDGRID_API_KEY?.length);
    // console.log("🔵 SendGrid From Email:", process.env.SENDGRID_FROM_EMAIL);
    // console.log("🔵 Recipient Email:", email);
    
    if (!process.env.SENDGRID_API_KEY) {
      console.error("❌ [STEP 6] SENDGRID_API_KEY not found in environment");
      return NextResponse.json(
        { message: "Joined waitlist successfully (email not configured)" },
        { status: 201 }
      );
    }
    
    if (!process.env.SENDGRID_FROM_EMAIL) {
      console.error("❌ [STEP 6] SENDGRID_FROM_EMAIL not found in environment");
      return NextResponse.json(
        { message: "Joined waitlist successfully (sender email not configured)" },
        { status: 201 }
      );
    }
    
    try {
      // console.log("🔵 [STEP 6] Sending email via SendGrid...");
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: "Welcome to AnyRide 🚗",
        html: getAnyRideConfirmationEmailHTML(firstName),
      };
      
      console.log("🔵 Email payload:", {
        to: msg.to,
        from: msg.from,
        subject: msg.subject,
        htmlLength: msg.html.length,
      });
      
      const response = await sgMail.send(msg);
      // console.log("✅ [STEP 6] Email sent successfully");
      // console.log("🔵 SendGrid response:", response[0].statusCode);
      
      // console.log("✅ [SUCCESS] Waitlist signup complete");
      return NextResponse.json(
        { message: "Joined waitlist successfully" },
        { status: 201 }
      );
      
    } catch (emailError: any) {
      console.error("❌ [STEP 6] SendGrid error:");
      console.error("Error code:", emailError.code);
      console.error("Error message:", emailError.message);
      console.error("Error response:", emailError.response?.body);
      
      // Still return success since user was added to waitlist
      return NextResponse.json(
        { 
          message: "Joined waitlist successfully (email notification failed)",
          emailError: emailError.message 
        },
        { status: 201 }
      );
    }
    
  } catch (err: any) {
    console.error("❌ [FATAL ERROR] Unhandled exception:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    
    return NextResponse.json(
      { 
        message: err.message || "Invalid request",
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 400 }
    );
  }
}