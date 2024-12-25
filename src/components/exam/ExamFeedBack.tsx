import React, { useState } from 'react';
import { Box, Text, VStack, Stack, Badge, Divider, Button } from '@chakra-ui/react';

interface ExamFeedbackProps {
  questions: any[];
  userResponses: { questionId: number; userResponse: string; isCorrect: boolean }[];
  quizData: any;
  score: number;
  userId: number; // Assuming user ID is passed as a prop
  onReset: () => void; // Function to reset the exam
}

const ExamFeedback: React.FC<ExamFeedbackProps> = ({ questions, userResponses, quizData, score, userId, onReset }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveAndReset = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/quiz/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizData,
          userId,
          score: (score / questions.length) * 100,
          passed: score >= questions.length / 2,
          userAnswers: userResponses,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz');
      }

      // Reset the quiz after successful save
      onReset();
    } catch (error) {
      console.error('Error saving quiz:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.50">
      <Text fontSize="xl" fontWeight="bold" mb={6} textAlign="center" color="teal.600">
        Exam Feedback
      </Text>
      <VStack spacing={4} align="stretch">
        {questions.map((question, index) => {
          const userAnswer = userResponses.find((res) => res.questionId === index + 1);
          const isCorrect = userAnswer?.isCorrect;
          return (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg={isCorrect ? 'green.50' : 'red.50'}
              shadow="sm"
            >
              <Text fontWeight="bold" color={isCorrect ? 'green.600' : 'red.600'}>
                Question {index + 1}: {question.question_data.question}
              </Text>
              <Stack spacing={2} mt={2}>
                <Text>
                  <Badge colorScheme={isCorrect ? 'green' : 'red'}>Your Answer:</Badge>{' '}
                  {question.question_data.options[userAnswer?.userResponse as keyof typeof question.question_data.options] || 'Not Answered'}
                </Text>
                <Text>
                  <Badge colorScheme="blue">Correct Answer:</Badge>{' '}
                  {question.question_data.options[question.question_data.correct_answer]}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  <Badge colorScheme="purple">Explanation:</Badge> {question.question_data.explanation}
                </Text>
              </Stack>
              <Divider mt={4} />
            </Box>
          );
        })}
      </VStack>
    <Button
      colorScheme="blue"
      mt={6}
      isLoading={isProcessing}
      onClick={handleSaveAndReset}
      alignSelf="center"
    >
      Save and Reset Exam
    </Button>
    </Box>
  );
};

export default ExamFeedback;
