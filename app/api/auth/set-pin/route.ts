import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuthUser(req);
    const { pin } = await req.json();

    if (!pin || pin.length !== 4) {
      return NextResponse.json(
        { error: "PIN must be 4 digits" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pin, salt);

    await prisma.users.update({
      where: { id: userId },
      data: { 
        pin_hash: hash,
        onboarding_step: "PIN_SET" // Optional: update step
      },
    });

    return NextResponse.json({ message: "PIN set successfully" });
  } catch (err: any) {
    console.error("Set PIN error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
