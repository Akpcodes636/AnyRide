// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Node Prisma client
import { sendEmail } from "@/sendgrid/emailService";
import { WELCOME_EMAIL_TEMPLATE } from "@/sendgrid/emailTemplate";
// import { sendEmail, WELCOME_EMAIL_TEMPLATE } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body: { email?: string; authProvider?: string } = await req.json();
    const { email, authProvider } = body;

    // Validate input
    if (!email || !authProvider) {
      return NextResponse.json(
        { error: "Email and authProvider are required." },
        { status: 400 },
      );
    }

    // 1️⃣ Check if user exists
    let user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.users.create({
        data: { email, auth_provider: authProvider },
      });

      console.log(`Created new user: ${user.id}`);
    } else {
      console.log(`User already exists: ${user.id}`);
    }
    
    // Check if user was just created (within last second) to determine flag
    // Or better, return explicit flag from the logic above.
    const isExistingUser = user.created_at && user.created_at < new Date(Date.now() - 5000);

    // 2️⃣ Create email verification token
    const token = crypto.randomBytes(32).toString("hex"); // raw token
    const tokenHash = await bcrypt.hash(token, 10); // hashed for DB
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.email_verification_tokens.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      },
    });
    // 3️⃣ Build verification URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_APP_URL in env");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 },
      );
    }

    const verificationUrl = `${baseUrl}/en/check-email?token=${token}`;

    // 4️⃣ Send verification email
    await sendEmail(
      email,
      "Verify your Anyride account",
      WELCOME_EMAIL_TEMPLATE(user.email.split("@")[0], verificationUrl),
    );
    
    console.log("Email verification token created:", token); // for testing

    return NextResponse.json({
      message: "Check your email for verification link!",
      user,
      isExistingUser,
    });
  } catch (error) {
    console.error("Error in /register:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
