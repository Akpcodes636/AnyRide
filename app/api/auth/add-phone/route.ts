import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number required" },
        { status: 400 }
      );
    }

    // ✅ Extract user from JWT
    const { userId } = getAuthUser(req);

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        phone,
        phone_verified: false,
      },
    });

    return NextResponse.json({
      message: "Phone saved successfully",
      phone: user.phone,
    });
  } catch (err: any) {
    console.error("Add phone error:", err.message);

    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

