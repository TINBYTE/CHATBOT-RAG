import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import CreateConnectionDB from '@/app/api/utils/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
   
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Database connection
    const connection = await CreateConnectionDB();
    const [rows]: any = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    

    // Check if user exists
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const user = rows[0];
    const hashedPassword = user.password_hash;


    

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Generate JWT (example)
    const token = 'your-jwt-token'; // Replace with actual JWT generation logic

    return NextResponse.json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
