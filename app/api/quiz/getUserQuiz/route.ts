import { NextResponse } from 'next/server'; 
import CreateConnectionDB from '@/app/api/utils/db';
import { Quiz } from '@/app/types/db';
import { RowDataPacket, FieldPacket } from 'mysql2';

export async function GET(req: Request) {
  try {
    // Get user ID from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId in query parameters' },
        { status: 400 }
      );
    }

    // Create a database connection
    const connection = await CreateConnectionDB();

    try {
      const [queryResult]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
        `SELECT * FROM quizzes WHERE user_id = 31 ORDER BY created_at DESC`
      );

      // Extract the rows from the query result
      const quizzes: Quiz[] = queryResult as Quiz[];

      // Return the quizzes as a JSON response
      return NextResponse.json(quizzes, { status: 200 });
    } catch (error) {
      console.error('Error fetching user quizzes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user quizzes' },
        { status: 500 }
      );
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
