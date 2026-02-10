import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    // 🔐 get user from JWT
    const { userId } = getAuthUser(req);

    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "OTP code is required" },
        { status: 400 }
      );
    }

    const trimmedCode = code.trim();

    // 1️⃣ fetch active OTPs for this user
    const otps = await prisma.phone_otps.findMany({
      where: {
        user_id: userId,
        expires_at: { gt: new Date() },
      },
      orderBy: { created_at: "desc" }, // newest first
    });

    if (!otps.length) {
      return NextResponse.json(
        { error: "No active OTP found or OTP expired" },
        { status: 400 }
      );
    }

    let record = null;

    // 2️⃣ loop and compare with bcrypt
    for (const otp of otps) {
      if (otp.attempts! >= MAX_ATTEMPTS) continue; // skip if too many attempts

      if (await bcrypt.compare(trimmedCode, otp.code_hash)) {
        record = otp;
        break;
      }
    }

    if (!record) {
      // increment attempts for all active OTPs
      await Promise.all(
        otps.map((otp) =>
          prisma.phone_otps.update({
            where: { id: otp.id },
            data: { attempts: otp.attempts! + 1 },
          })
        )
      );

      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // 3️⃣ mark user verified
    await prisma.$transaction([
      prisma.users.update({
        where: { id: userId },
        data: { phone_verified: true },
      }),
      prisma.phone_otps.update({
        where: { id: record.id },
        data: { attempts: record.attempts! + 1 },
      }),
    ]);

    return NextResponse.json({ message: "Phone verified successfully!" });
  } catch (err: any) {
    console.error("Verify phone error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
