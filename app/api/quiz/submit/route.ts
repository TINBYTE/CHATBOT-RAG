import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { quizId, userId, score, passed, userAnswers } = body;

        // Validate request body
        if (!quizId || !userId || score === undefined || passed === undefined || !Array.isArray(userAnswers)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        // Start transaction
        const createAttempt = await prisma.$transaction(async (tx) => {
        // Insert the quiz attempt into the `quiz_attempts` table
         const attempt = await tx.quizAttempt.create({
              data: {
                quizId: parseInt(quizId),
                userId: parseInt(userId),
                score: parseFloat(String(score)),
                passed: passed,
              },
          });


        // Insert user answers into the `user_answers` table
        const userAnswersPromises = userAnswers.map(async (answer: any) => {
          const { questionId, userResponse, isCorrect } = answer;
          return await tx.userAnswer.create({
              data: {
                  attemptId: attempt.id,
                  questionId: parseInt(questionId),
                  userResponse: userResponse,
                  isCorrect: isCorrect,
              },
          });
        });


       await Promise.all(userAnswersPromises);

       return attempt
      })

        return NextResponse.json({ message: 'Quiz results saved successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error saving quiz results:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}