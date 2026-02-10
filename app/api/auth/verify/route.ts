import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const rawToken = req.nextUrl.searchParams.get("token");

    if (!rawToken) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    const token = rawToken.trim();

    // 1️⃣ Fetch only valid candidates
    const activeTokens = await prisma.email_verification_tokens.findMany({
      where: {
        expires_at: { gt: new Date() },
        used: false,
      },
    });

    let matchedRecord: {
      id: string;
      user_id: string | null;
    } | null = null;

    for (const record of activeTokens) {
      const isMatch = await bcrypt.compare(token, record.token_hash);

      if (isMatch) {
        matchedRecord = record;
        break;
      }
    }

    if (!matchedRecord || !matchedRecord.user_id) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 2️⃣ Atomic update
    await prisma.$transaction([
      prisma.users.update({
        where: { id: matchedRecord.user_id },
        data: {
          is_verified: true,
          onboarding_step: "EMAIL_VERIFIED",
        },
      }),

      prisma.email_verification_tokens.update({
        where: { id: matchedRecord.id },
        data: { used: true },
      }),
    ]);

    // 3️⃣ Create JWT
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("Missing JWT_SECRET in env");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const authToken = jwt.sign(
      { userId: matchedRecord.user_id },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Email verified successfully!",
      token: authToken,
    });

  } catch (err) {
    console.error("Verify email error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
