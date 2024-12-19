import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { quizId: string } }) {
    try {
        const { quizId } = params;

        if (!quizId) {
            return NextResponse.json({ message: 'Quiz ID is required' }, { status: 400 });
        }

        // Fetch quiz from database using Prisma
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: parseInt(quizId),
            },
            include:{
                questions:{
                  include:{
                    options: true
                  }
                }
            }
        });

        if (!quiz) {
            return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
        }
        return NextResponse.json(quiz, { status: 200 });
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}