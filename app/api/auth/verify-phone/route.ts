import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { user_id, otp } = await req.json(); // snake_case
    if (!user_id || !otp) {
      return NextResponse.json(
        { error: "user_id & otp required" },
        { status: 400 }
      );
    }

    // Find latest valid OTP
    const record = await prisma.phone_otps.findFirst({
      where: { 
        user_id, 
        expires_at: { gt: new Date() } // snake_case
      },
      orderBy: { created_at: "desc" }, // snake_case
    });

    if (!record) {
      return NextResponse.json({ error: "OTP expired or not found" }, { status: 400 });
    }

    // Compare OTP
    const valid = await bcrypt.compare(otp, record.code_hash); // snake_case
    if (!valid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark phone verified
    await prisma.users.update({
      where: { id: user_id },
      data: { phone_verified: true }, // snake_case
    });

    // Optionally delete OTP
    await prisma.phone_otps.delete({ where: { id: record.id } }); // snake_case

    return NextResponse.json({ message: "Phone verified successfully!" });
  } catch (err: any) {
    console.error("Error verifying OTP:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
