import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import the Prisma client

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { quizId } = body;

    if (!quizId) {
      return NextResponse.json(
        { error: 'Quiz ID is required' },
        { status: 400 }
      );
    }

    // Delete the quiz using Prisma
    await prisma.quiz.delete({
      where: { id: Number(quizId) },
    });

    return NextResponse.json(
      { message: 'Quiz deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to delete quiz' },
      { status: 500 }
    );
  }
}
