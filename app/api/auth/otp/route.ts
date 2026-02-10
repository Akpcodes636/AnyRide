import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { sendEmail } from "@/sendgrid/emailService";

// TODO: integrate SMS provider here. For now, sending via email for dev testing.
async function sendSms(phone: string, message: string, email?: string) {
  console.log(`📲 Sending SMS to ${phone}: ${message}`);
  
  if (email) {
    console.log(`📧 Sending fallback email to ${email}`);
    await sendEmail(
      email,
      "Your AnyRide OTP Code",
      `<div style="font-family: sans-serif;">
        <h2>Verification Code</h2>
        <p>Your one-time password is:</p>
        <h1 style="letter-spacing: 5px; background: #eee; padding: 10px; display: inline-block;">${message.replace(/\D/g, "")}</h1>
        <p>Enter this code in the app to verify your phone number.</p>
       </div>`
    ).catch(e => console.error("Failed to send fallback email:", e));
  }
}

export async function POST(req: NextRequest) {
  try {
    // 🔐 get user from JWT
    const { userId } = getAuthUser(req);

    // fetch user
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        phone: true,
        email: true,
        phone_verified: true,
      },
    });

    if (!user?.phone) {
      return NextResponse.json(
        { error: "No phone number on record" },
        { status: 400 }
      );
    }

    if (user.phone_verified) {
      return NextResponse.json(
        { error: "Phone already verified" },
        { status: 400 }
      );
    }

    // ⛔ invalidate old OTPs
    await prisma.phone_otps.deleteMany({
      where: { user_id: userId },
    });

    // 🔢 generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    const hash = await bcrypt.hash(otp, 10);

    const expires = new Date(Date.now() + 1000 * 60 * 5); // 5 min

    await prisma.phone_otps.create({
      data: {
        user_id: userId,
        code_hash: hash,
        expires_at: expires,
        attempts: 0,
      },
    });

    // 📲 send SMS (and email fallback)
    await sendSms(user.phone, `Your AnyRide verification code is: ${otp}`, user.email);

    return NextResponse.json({
      message: "OTP sent to phone number",
    });
  } catch (err: any) {
    console.error("Generate OTP error:", err.message);

    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
