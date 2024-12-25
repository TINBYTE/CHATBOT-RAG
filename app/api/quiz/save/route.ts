import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quizData, userId, score, passed, userAnswers } = body;

    if (!quizData || !userId || score === undefined || !userAnswers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the quiz and its questions
    const quiz = await prisma.quiz.create({
      data: {
        userId: parseInt(userId),
        title: quizData.title || 'Untitled Quiz',
        prompt: quizData.prompt || '',
        questions: {
          create: quizData.questions.map((q: any) => ({
            questionText: q.question_data.question,
            questionType: q.type,
            correctOption: Object.keys(q.question_data.options).indexOf(q.question_data.correct_answer) + 1,
            explanation: q.question_data.explanation || null,
            options: {
              create: Object.entries(q.question_data.options).map(([key, value], index) => ({
                optionText: value,
                optionIndex: index + 1, // Numeric index starting at 1
              })),
            },
          })),
        },
      },
      include: {
        questions: true, // Include created questions to retrieve their IDs
      },
    });

    // Map userAnswers to the correct question IDs
    const updatedUserAnswers = userAnswers.map((answer: any) => {
      const question = quiz.questions[answer.questionId - 1]; // Match by index
      return {
        questionId: question.id,
        userResponse: answer.userResponse,
        isCorrect: answer.isCorrect,
      };
    });

    // Create the quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId: parseInt(userId),
        score,
        passed,
        answers: {
          create: updatedUserAnswers,
        },
      },
    });

    return NextResponse.json({ message: 'Quiz and results saved successfully', attempt });
  } catch (error) {
    console.error('Error saving quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
