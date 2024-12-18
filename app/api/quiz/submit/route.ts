import { NextResponse } from 'next/server';
import CreateConnectionDB from '@/app/api/utils/db'; // Adjust the path if needed
import { ResultSetHeader } from 'mysql2'; // Import the correct type

export async function POST(req: Request) {
    const connection = await CreateConnectionDB();

    try {
        const body = await req.json();
        const { quizId, userId, score, passed, userAnswers } = body;

        // Validate request body
        if (!quizId || !userId || score === undefined || passed === undefined || !Array.isArray(userAnswers)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        // Start transaction
        await connection.beginTransaction();

        // Insert the quiz attempt into the `quiz_attempts` table
        const [attemptResult] = await connection.execute<ResultSetHeader>(
            `INSERT INTO quiz_attempts (quiz_id, user_id, score, passed) VALUES (?, ?, ?, ?)`,
            [quizId, userId, score, passed]
        );

        const attemptId = attemptResult.insertId; // Correctly access the insertId property

        // Insert user answers into the `user_answers` table
        const userAnswersPromises = userAnswers.map((answer: any) => {
            const { questionId, userResponse, isCorrect } = answer;
            return connection.execute(
                `INSERT INTO user_answers (attempt_id, question_id, user_response, is_correct) VALUES (?, ?, ?, ?)`,
                [attemptId, questionId, userResponse, isCorrect]
            );
        });

        await Promise.all(userAnswersPromises);

        // Commit the transaction
        await connection.commit();

        return NextResponse.json({ message: 'Quiz results saved successfully!' }, { status: 200 });
    } catch (error) {
        // Rollback transaction in case of error
        await connection.rollback();
        console.error('Error saving quiz results:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await connection.end(); // Ensure the connection is closed
    }
}
