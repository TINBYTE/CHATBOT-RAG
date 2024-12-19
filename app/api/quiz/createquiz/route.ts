import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, prompt, title } = body;

    // Validate request body
    if (!userId || !prompt || !title) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Create the quiz using Prisma
    const newQuiz = await prisma.quiz.create({
        data: {
          userId: parseInt(userId), // ensure userId is a number
          prompt: prompt,
          title: title,
        },
    });

    return NextResponse.json({ message: 'Quiz created successfully', quizId: newQuiz.id }, { status: 200 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}