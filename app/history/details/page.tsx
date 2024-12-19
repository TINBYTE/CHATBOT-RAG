'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  Badge,
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
    return <Text>Loading...</Text>;
  }

  return (
    <VStack align="start" spacing={4} p={4}>
      <Heading as="h2" size="lg">
        {quizDetails.title}
      </Heading>
      <Text fontSize="sm" color="gray.600">
        Created on: {new Date(quizDetails.created_at).toLocaleString()}
      </Text>
      <Text>Score: {quizDetails.score}%</Text>
      <Text>Passed: {quizDetails.passed ? 'Yes' : 'No'}</Text>
      <Heading as="h3" size="md" mt={4}>
        Questions
      </Heading>
      <Stack spacing={4}>
        {quizDetails.questions.map((question: any, index: number) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontWeight="bold">{question.questionText}</Text>
            <Text>Your Response: {question.userResponse}</Text>
            <Text>
              Correct Answer: <Badge colorScheme="green">{question.correctAnswer}</Badge>
            </Text>
          </Box>
        ))}
      </Stack>
    </VStack>
  );
};

export default QuizDetailsPage;
