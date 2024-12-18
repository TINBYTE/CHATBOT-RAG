'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Quiz } from '../types/db';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

const QuizHistoryPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Assuming user object is provided by UserContext
  const toast = useToast();

  // Fetch quizzes from the server
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (!user?.id) {
          throw new Error('User ID is required');
        }

        const response = await fetch(`/api/quiz/getUserQuiz?userId=${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }

        const data = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    if (user?.id) {
      fetchQuizzes();
    }
  }, [user?.id]);

  // Delete a quiz by its ID
  const handleDeleteQuiz = async (quizId: string) => {
    try {
      const response = await fetch(`/api/quiz/deleteQuiz`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }

      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
      toast({
        title: 'Quiz deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: 'Error deleting quiz.',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack align="start" spacing={4} p={4}>
      <Heading as="h2" size="lg">
        Your Quizzes
      </Heading>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} w="100%">
          {quizzes.map((quiz) => (
            <GridItem key={quiz.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                shadow="md"
                _hover={{ shadow: 'lg' }}
              >
                <Heading as="h3" size="md" mb={2}>
                  {quiz.title}
                </Heading>
                <Text>Prompt: {quiz.prompt}</Text>
                <Text fontSize="sm" color="gray.600">
                  Created on: {new Date(quiz.created_at).toLocaleString()}
                </Text>
                <Button
                  colorScheme="red"
                  mt={4}
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  size="sm"
                >
                  Delete
                </Button>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
};

export default QuizHistoryPage;
