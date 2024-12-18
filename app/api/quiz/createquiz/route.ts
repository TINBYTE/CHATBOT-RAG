import { NextResponse } from 'next/server';
import CreateConnectionDB from '@/app/api/utils/db'; // Adjust path if needed

export async function POST(req: Request) {
    const connection = await CreateConnectionDB();

    try {
        const body = await req.json();
        const { userId, prompt, title } = body;

        // Validate request body
        if (!userId || !prompt || !title) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        // Insert the quiz into the `quizzes` table
        const [result] = await connection.execute(
            `INSERT INTO quizzes (user_id, prompt, title) VALUES (?, ?, ?)`,
            [userId, prompt, title]
        );

        const quizId = (result as any).insertId; // Get the auto-generated quiz ID

        return NextResponse.json({ message: 'Quiz created successfully', quizId }, { status: 200 });
    } catch (error) {
        console.error('Error creating quiz:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await connection.end(); // Ensure the connection is closed
    }
}
