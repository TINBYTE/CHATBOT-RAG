import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import Prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quizData, userId, score, passed, userAnswers } = body;

    if (!quizData || !userId || score === undefined || passed === undefined || !userAnswers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the quiz
    const quiz = await prisma.quiz.create({
      data: {
        userId: Number(userId),
        prompt: quizData.prompt,
        title: quizData.title,
        questions: {
          create: quizData.questions.map((question: any) => ({
            questionText: question.questionText,
            questionType: question.questionType,
            correctOption: question.correctOption,
            explanation: question.explanation,
            options: {
              create: question.options.map((option: any) => ({
                optionText: option.optionText,
                optionIndex: option.id,
              })),
            },
          })),
        },
      },
    });

    // Save the quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId: Number(userId),
        score,
        passed,
        answers: {
          create: userAnswers.map((answer: any) => ({
            questionId: answer.questionId,
            userResponse: answer.userResponse,
            isCorrect: answer.isCorrect,
          })),
        },
      },
    });

    return NextResponse.json({ message: 'Quiz and results saved successfully', quiz, attempt });
  } catch (error) {
    console.error('Error saving quiz data:', error);
    return NextResponse.json({ error: 'Failed to save quiz data' }, { status: 500 });
  }
}
