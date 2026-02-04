// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Node Prisma client

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body: { email?: string; authProvider?: string } = await req.json();
    const { email, authProvider } = body;

    // Validate input
    if (!email || !authProvider) {
      return NextResponse.json(
        { error: 'Email and authProvider are required.' },
        { status: 400 }
      );
    }

    // 1️⃣ Check if user exists
    let user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
     user = await prisma.users.create({
     data: { email, auth_provider: authProvider },
   });

      console.log(`Created new user: ${user.id}`);
    } else {
      console.log(`User already exists: ${user.id}`);
    }

    // 2️⃣ Create email verification token
    const token = crypto.randomBytes(32).toString('hex'); // raw token
    const tokenHash = await bcrypt.hash(token, 10); // hashed for DB
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.email_verification_tokens.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      },
    });

    console.log('Email verification token created:', token); // for testing

    // 3️⃣ Return response (token only for testing, remove in production)
    return NextResponse.json({
      message: 'Check your email for verification link!',
      rawToken: token,
    });
  } catch (error) {
    console.error('Error in /register:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
