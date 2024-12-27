import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId in query parameters' },
        { status: 400 }
      );
    }

    // Fetch quizzes with attempts and questions
    const quizzes = await prisma.quiz.findMany({
      where: { 
        userId: Number(userId) 
      },
      orderBy: { 
        createdAt: 'desc' 
      },
      include: {
        questions: true,
        attempts: {
          select: {
            id: true,
            score: true,
            passed: true,
            attemptDate: true,
            answers: {
              select: {
                isCorrect: true,
                userResponse: true,
                question: {
                  select: {
                    questionText: true,
                    questionType: true,
                    correctOption: true,
                    options: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error('Error fetching user quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user quizzes' },
      { status: 500 }
    );
  }
}