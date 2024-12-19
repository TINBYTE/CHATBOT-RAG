import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Generate JWT (example)
    const token = 'your-jwt-token'; // Replace with actual JWT generation logic

    return NextResponse.json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}