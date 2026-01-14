// import { connectDB } from "@/lib/connectDb";
import { connectDB } from "@/lib/connectDB";
import Waitlist from "@/model/waitlist";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as Yup from "yup";


export const waitListSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  emailAddress: Yup.string()
    .trim()
    .required("Email address is required")
    .email("Please enter a valid email address"),
    userType: Yup.string().required("Please select an option"),

});


// Create nodemailer transporter for Zoho Mail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your Zoho email
      pass: process.env.EMAIL_PASS, // your Zoho app password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};


export const getAnyRideConfirmationEmailHTML = (username: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to AnyRide</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }

      .header {
        background: linear-gradient(340deg, #010418 30%, #48050e 60%, #980400 100%);
        padding: 32px;
        text-align: center;
      }

      .logo {
        max-width: 140px;
      }

      .hero-text {
        color: #ffffff;
        font-size: 26px;
        font-weight: bold;
        margin: 24px 0 0;
        line-height: 1.2;
      }

      .content {
        padding: 32px;
      }

      .greeting {
        font-size: 16px;
        margin-bottom: 16px;
      }

      .username {
        font-weight: bold;
        color: #dc2626;
      }

      .paragraph {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #374151;
      }

      .features {
        margin: 24px 0;
        padding-left: 0;
        list-style: none;
      }

      .features li {
        margin-bottom: 12px;
        font-size: 15px;
      }

      .cta-button {
        display: inline-block;
        background-color: #dc2626;
        color: #ffffff;
        text-decoration: none;
        padding: 14px 24px;
        border-radius: 999px;
        font-weight: bold;
        margin-top: 10px;
      }

      .divider {
        height: 1px;
        background-color: #e5e7eb;
        margin: 32px 0;
      }

      .footer {
        background-color: #f9fafb;
        padding: 24px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
      }

      .socials a {
        display: inline-block;
        margin: 0 6px;
      }

      .socials img {
        width: 28px;
        height: 28px;
      }

      .support {
        margin-top: 12px;
      }

      .support a {
        color: #2563eb;
        text-decoration: none;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <img
        //   src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/anyride-logo.png"
          src="https://res.cloudinary.com/dqqeeocay/image/upload/v1767270594/Logo_xdub68.png"
          alt="AnyRide"
          class="logo"
        />
        <h1 class="hero-text">
          You're officially on the AnyRide list 🚗
        </h1>
      </div>

      <!-- Content -->
      <div class="content">
        <p class="greeting">
          Hey <span class="username">${username}</span>,
        </p>

        <p class="paragraph">
          Thanks for signing up for <strong>AnyRide</strong>!  
          You’re now one step closer to safer, faster, and more flexible rides — on your terms.
        </p>

        <p class="paragraph">
          Here’s what you can expect when we launch:
        </p>

        <ul class="features">
          <li>🚕 Reliable rides, when you need them</li>
          <li>🛵 Multiple ride options for every trip</li>
          <li>💸 Transparent pricing — no surprises</li>
          <li>🕒 Drivers and riders fully in control</li>
        </ul>

        <p class="paragraph">
          We’ll notify you as soon as early access opens.
          Until then, stay ready — your next ride just got better.
        </p>

        <a href="#" class="cta-button">Visit AnyRide</a>

        <div class="divider"></div>

        <!-- Socials -->
        <div class="socials">
          <a href="#">
            <img src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/instagram.png" />
          </a>
          <a href="#">
            <img src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/twitter.png" />
          </a>
          <a href="#">
            <img src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/linkedin.png" />
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>
          AnyRide is building a smarter way to move — for riders, drivers, and partners.
        </p>

        <p class="support">
          Need help? Reach us at
          <a href="mailto:support@anyride.com">support@anyride.com</a>
        </p>

        <p>
          You’re receiving this email because you signed up for AnyRide.
          <br />
          <a href="#">Unsubscribe</a>
        </p>
      </div>
    </div>
  </body>
</html>
  `;
};


const schema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  userType: Yup.string().required(),

  agreePrivacy: Yup.boolean().oneOf([true]),
  agreeTerms: Yup.boolean().oneOf([true]),
  consentSMS: Yup.boolean().oneOf([true]),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    await schema.validate(body, { abortEarly: false });

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

    const exists = await Waitlist.findOne({ emailAddress: email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already on waitlist" },
        { status: 400 }
      );
    }

    await Waitlist.create({
      firstName,
      lastName,
      emailAddress: email,
      userType,
      agreePrivacy,
      agreeTerms,
      consentSMS,
    });

    return NextResponse.json(
      { message: "Joined waitlist successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Invalid request" },
      { status: 400 }
    );
  }
}



