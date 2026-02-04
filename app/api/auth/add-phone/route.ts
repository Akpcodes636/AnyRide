import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { user_id, phone } = await req.json(); // match snake_case
    if (!user_id || !phone) {
      return NextResponse.json(
        { error: "user_id & phone required" },
        { status: 400 }
      );
    }

    // Save phone as unverified
    await prisma.users.update({
      where: { id: user_id },
      data: { phone, phone_verified: false },
    });

    // Create OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const otp_hash = await bcrypt.hash(otp, 10); // match snake_case
    const expires_at = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes

    await prisma.phone_otps.create({
      data: {
        user_id,
        code_hash: otp_hash,
        expires_at,
        attempts: 0,
      },
    });

    // TODO: send SMS via Twilio / Termii / Africa’s Talking
    // sendSMS(phone, `Your AnyRide OTP is: ${otp}`);

    return NextResponse.json({ message: "OTP sent to phone!" });
  } catch (err: any) {
    console.error("Error sending OTP:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
