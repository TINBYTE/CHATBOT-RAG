import { NextRequest, NextResponse } from 'next/server';
import CreateConnectionDB from '../../utils/db';

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters from the URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Establish database connection
        const db = await CreateConnectionDB();
        const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
