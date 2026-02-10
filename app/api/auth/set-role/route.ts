// app/api/auth/set-role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuthUser(req); // 🔐 get userId from JWT

    const body = await req.json();
    const { role } = body;

    if (!role) {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }

    // ✅ update user role and mark onboarding complete
    await prisma.users.update({
      where: { id: userId },
      data: { role, onboarding_step: "COMPLETED" },
    });

    return NextResponse.json({ message: "Role set, onboarding complete!" });
  } catch (err: any) {
    console.error("Error updating role:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
