import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import CreateConnectionDB from '@/app/api/utils/db';

export async function PUT(request: Request) {
  try {
    const { email, oldPassword, newPassword } = await request.json();

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json({ message: 'Email, old password, and new password are required!' }, { status: 400 });
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

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, hashedPassword);

    if (!isOldPasswordValid) {
      return NextResponse.json({ message: 'Invalid old password.' }, { status: 401 });
    }

    // Hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await connection.execute('UPDATE users SET password_hash = ? WHERE email = ?', [newHashedPassword, email]);

    return NextResponse.json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}