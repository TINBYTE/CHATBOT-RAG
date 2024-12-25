'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Text,
  VStack,
  Stack,
  Badge,
  Divider,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const QuizDetailsPage = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId'); // Get quiz ID from URL query
  const [quizDetails, setQuizDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`/api/quiz/getQuizDetails?quizId=${quizId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quiz details');
        }

        const data = await response.json();
        setQuizDetails(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    if (quizId) {
      fetchQuizDetails();
    }
  }, [quizId]);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!quizDetails) {
    return (
      <VStack align="center" justify="center" h="200px">
        <Spinner size="lg" />
        <Text>Loading quiz details...</Text>
      </VStack>
    );
  }

  const { title, created_at, score, passed, questions } = quizDetails;

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.50">
      {/* Header */}
      <VStack spacing={4} align="stretch" mb={6}>
        <Heading as="h2" size="lg" textAlign="center" color="teal.600">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Created on: {new Date(created_at).toLocaleString()}
        </Text>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Score: {score}%
        </Text>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" color={passed ? 'green.600' : 'red.600'}>
          Passed: {passed ? 'Yes' : 'No'}
        </Text>
      </VStack>

      {/* Questions */}
      <VStack spacing={6} align="stretch">
        {questions.map((question: any, index: number) => {
          const isCorrect = question.userResponse === question.correctAnswer;
          return (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg={isCorrect ? 'green.50' : 'red.50'}
              shadow="sm"
            >
              <Text fontWeight="bold" color={isCorrect ? 'green.600' : 'red.600'} mb={2}>
                Question {index + 1}: {question.questionText}
              </Text>
              <Stack spacing={2}>
                <Text>
                  <Badge colorScheme={isCorrect ? 'green' : 'red'}>Your Answer:</Badge>{' '}
                  {question.userResponse || 'Not Answered'}
                </Text>
                <Text>
                  <Badge colorScheme="blue">Correct Answer:</Badge>{' '}
                  {question.correctAnswer}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  <Badge colorScheme="purple">Explanation:</Badge> {question.explanation || 'No explanation provided'}
                </Text>
              </Stack>
              <Divider mt={4} />
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default QuizDetailsPage;
