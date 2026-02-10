// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/sendgrid/emailService";
import { WELCOME_EMAIL_TEMPLATE } from "@/sendgrid/emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const body: { email?: string } = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    // 1️⃣ Check if user exists
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 },
      );
    }

    // 2️⃣ Create email verification token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = await bcrypt.hash(token, 10);
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
    
    // Using check-email page logic from register flow
    const verificationUrl = `${baseUrl}/en/check-email?token=${token}`;

    // 4️⃣ Send login email (reusing welcome template for now as instructed to mirror register)
    // TODO: Might want a specific Login template later
    await sendEmail(
      email,
      "Login to your Anyride account",
      WELCOME_EMAIL_TEMPLATE(user.email.split("@")[0], verificationUrl),
    );

    console.log("Login token created:", token);

    return NextResponse.json({
      message: "Check your email for login link!",
      user,
    });
  } catch (error) {
    console.error("Error in /login:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
