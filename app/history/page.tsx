'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Quiz } from '@/app/types/db';
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  useToast,
  Divider,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const QuizHistoryPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();

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

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== Number(quizId))
      );
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

  const handleViewDetails = (quizId: string) => {
    router.push(`/history/details?quizId=${quizId}`);
  };

  return (
    <VStack align="start" spacing={6} p={6} w="100%">
      <Heading as="h2" size="lg">
        Your Quiz History
      </Heading>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : quizzes.length === 0 ? (
          <Flex w="100%" h="200px" align="center" justify="center">
              <Text fontSize="xl" color="gray.500">
                  No quiz history yet.
              </Text>
            </Flex>

      ) : (
        <VStack spacing={4} w="100%">
          {quizzes.map((quiz) => (
            <Box
              key={quiz.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              w="100%"
              shadow="md"
              _hover={{ shadow: 'lg' }}
            >
              <HStack justify="space-between" align="center">
                <Heading as="h3" size="md">
                  {quiz.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {new Date(quiz.createdAt).toLocaleDateString()} {new Date(quiz.createdAt).toLocaleTimeString()}
                </Text>
              </HStack>
              <Text mt={2}>Prompt: {quiz.prompt}</Text>
              <Divider my={4} />
              <HStack spacing={4} justify="flex-end">
                <Button
                  colorScheme="blue"
                  onClick={() => handleViewDetails(quiz.id.toString())}
                  size="sm"
                >
                  Details
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteQuiz(quiz.id.toString())}
                  size="sm"
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default QuizHistoryPage;