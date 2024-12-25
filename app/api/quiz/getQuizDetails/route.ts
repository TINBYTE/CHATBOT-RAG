import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get('quizId');

  if (!quizId) {
    return NextResponse.json({ error: 'Quiz ID is required' }, { status: 400 });
  }

  try {
    // Fetch quiz details with related data
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        questions: {
          include: {
            options: true,
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

    // Fetch the first attempt for now
    const attempt = quiz.attempts[0];

    if (!attempt) {
      return NextResponse.json({ error: 'No attempts found for this quiz' }, { status: 404 });
    }

    return NextResponse.json({
      title: quiz.title,
      prompt: quiz.prompt,
      created_at: quiz.createdAt,
      score: attempt.score,
      passed: attempt.passed,
      questions: quiz.questions.map((q) => {
        const userAnswer = attempt.answers.find((a) => a.questionId === q.id);
        const correctOption = q.options.find((o) => o.optionIndex === q.correctOption);

         // Find the user's chosen option text using optionIndex
            let userOption = 'Not Answered'
            if (userAnswer?.userResponse){
               const selectedOption = q.options.find((o)=> o.optionIndex === Number(userAnswer.userResponse))
               userOption = selectedOption?.optionText || 'Not Answered'
            }

        return {
          questionText: q.questionText,
          correctAnswer: correctOption?.optionText || 'Not Available',
          explanation: q.explanation || 'No explanation provided',
          userResponse: userOption,
          isCorrect: userAnswer?.isCorrect || false,
          options: q.options.map((o) => ({
            optionText: o.optionText,
            optionIndex: o.optionIndex,
          })),
        };
      }),
    });
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}