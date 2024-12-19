import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import the Prisma client

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

    // Fetch quizzes for the user using Prisma
    const quizzes = await prisma.quiz.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' },
      include: {
        questions: true, // Optional: Include related questions
      },
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
