import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get('quizId');

  if (!quizId) {
    return NextResponse.json({ error: 'Quiz ID is required' }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        questions: {
          include: {
            options: true,
            answers: true,
          },
        },
        attempts: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    const attempt = quiz.attempts[0]; // Assuming a single attempt for now

    return NextResponse.json({
      title: quiz.title,
      created_at: quiz.createdAt,
      score: attempt.score,
      passed: attempt.passed,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText,
        correctAnswer: q.options.find((o) => o.optionIndex === q.correctOption)?.optionText,
        userResponse: attempt.answers.find((a) => a.questionId === q.id)?.userResponse,
      })),
    });
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
