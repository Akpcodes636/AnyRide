import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  // 1️⃣ Get all unexpired tokens
  const tokenRecords = await prisma.email_verification_tokens.findMany({
    where: { expires_at: { gt: new Date() } }, // snake_case
  });

  // 2️⃣ Find matching token using async for-loop
  let record = null;
  for (const r of tokenRecords) {
    const match = await bcrypt.compare(token, r.token_hash); // snake_case
    if (match) {
      record = r;
      break;
    }
  }

  if (!record) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  // ✅ Check that record.user_id is not null
  if (!record.user_id) {
    return NextResponse.json({ error: 'Token has no associated user' }, { status: 400 });
  }

  // 3️⃣ Mark user verified
  await prisma.users.update({
    where: { id: record.user_id }, // now TypeScript is happy
    data: { is_verified: true },   // use exact column name from your schema
  });

  // 4️⃣ Delete token
  await prisma.email_verification_tokens.delete({ where: { id: record.id } });

  return NextResponse.json({ message: 'Email verified successfully!' });
}
