import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { user_id, role } = await req.json(); // use snake_case
    if (!user_id || !role) {
      return NextResponse.json(
        { error: "user_id & role required" },
        { status: 400 }
      );
    }

    await prisma.users.update({
      where: { id: user_id },
      data: { role, onboarding_step: "COMPLETED" }, // snake_case
    });

    return NextResponse.json({ message: "Role set, onboarding complete!" });
  } catch (err: any) {
    console.error("Error updating role:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
