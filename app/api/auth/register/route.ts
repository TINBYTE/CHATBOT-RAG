import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import CreateConnectionDB from '../../utils/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password, email } = body;

        if (!username || !password || !email) {
            return NextResponse.json({ message: 'Username, password, and email are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const db = await CreateConnectionDB();

        await db.execute(
            'INSERT INTO users (username, password_hash , email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error during user registration:', error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
