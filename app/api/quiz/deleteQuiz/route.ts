import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust according to your Prisma setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { quizId } = req.body;

      if (!quizId) {
        return res.status(400).json({ error: 'Quiz ID is required' });
      }

      // Delete quiz from database
      await prisma.quiz.delete({
        where: { id: quizId },
      });

      return res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      return res.status(500).json({ error: 'Failed to delete quiz' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
