import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Instantiate Prisma Client

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password, email } = body;

        if (!username || !password || !email) {
            return NextResponse.json({ message: 'Username, password, and email are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                passwordHash: hashedPassword,
                email,
            },
        });
        return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
    } catch (error:any) {
        console.error('Error during user registration:', error);
        if (error.code === 'P2002') { // Prisma error code for unique constraint violation
            return NextResponse.json({ message: 'Username or Email already taken' }, { status: 400 });
        }
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}