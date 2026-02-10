import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuthUser(req);
    const { pin } = await req.json();

    if (!pin) {
      return NextResponse.json({ error: "PIN required" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user || !user.pin_hash) {
      return NextResponse.json({ error: "PIN not set" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(pin, user.pin_hash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }

    return NextResponse.json({ message: "PIN verified" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
