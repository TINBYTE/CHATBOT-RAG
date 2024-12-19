'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Progress,
  Heading,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId');
  const prompt = searchParams.get('prompt');

  const staticQuizData = {
    title: 'SQL Basics Quiz',
    questions: [
      {
        id: 1,
        questionText: 'Which SQL keyword is used to retrieve data from a database?',
        questionType: 'mcq',
        options: [
          { id: 1, optionText: 'INSERT' },
          { id: 2, optionText: 'DELETE' },
          { id: 3, optionText: 'SELECT' },
          { id: 4, optionText: 'UPDATE' },
        ],
        correctOption: 3,
        explanation: 'The SELECT statement is used to retrieve data from a database.',
      },
      // Additional questions...
    ],
  };

  const [quizData] = useState(staticQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(20);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  useEffect(() => {
    const usertoken = localStorage.getItem('usertoken');
    if (!usertoken) {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    if (quizCompleted) return;

    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, quizCompleted]);

  const handleAnswer = () => {
    setIsAnswered(true);
    const isCorrect = selectedOption === currentQuestion.correctOption;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        userResponse: currentQuestion.options.find((option: any) => option.id === selectedOption)?.optionText,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizCompleted(true);
      saveQuizResults();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(20);
    }
  };

  const saveQuizResults = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('usertoken') || '{}');

      const response = await fetch('/api/quiz/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizData: {
            title: quizData.title,
            prompt,
            questions: quizData.questions.map((question) => ({
              questionText: question.questionText,
              questionType: question.questionType,
              correctOption: question.correctOption,
              explanation: question.explanation,
              options: question.options.map((option) => ({
                id: option.id,
                optionText: option.optionText,
              })),
            })),
          },
          userId: user.id,
          score: (score / quizData.questions.length) * 100,
          passed: score >= quizData.questions.length / 2,
          userAnswers: userAnswers.map((answer) => ({
            questionId: answer.questionId,
            userResponse: answer.userResponse,
            isCorrect: answer.isCorrect,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz results');
      }

      console.log('Quiz and results saved successfully');
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  return (
    <Box p={6} maxW="600px" mx="auto" bg="gray.50" borderRadius="lg" shadow="md">
      <Heading fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        {quizData?.title || 'Loading Quiz...'}
      </Heading>

      {!quizCompleted && quizData ? (
        <VStack spacing={6} align="stretch">
          <Text fontSize="lg" fontWeight="semibold">
            {currentQuestion.questionText}
          </Text>
          <RadioGroup
            onChange={(value) => setSelectedOption(parseInt(value, 10))}
            value={selectedOption !== null ? selectedOption.toString() : undefined}
          >
            <Stack spacing={4} direction="column">
              {currentQuestion.options.map((option: any) => (
                <Radio key={option.id} value={option.id.toString()} isDisabled={isAnswered}>
                  {option.optionText}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <Progress value={(timer / 20) * 100} colorScheme="teal" size="sm" borderRadius="md" />

          <Stack direction="row" spacing={4} justify="center">
            <Button
              colorScheme="blue"
              onClick={handleAnswer}
              isDisabled={isAnswered || selectedOption === null}
            >
              Submit Answer
            </Button>
            <Button
              colorScheme="green"
              onClick={handleNextQuestion}
              isDisabled={!isAnswered || currentQuestionIndex === quizData.questions.length - 1}
            >
              Next Question
            </Button>
          </Stack>
        </VStack>
      ) : (
        <VStack spacing={6}>
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            Quiz completed! Your score is {score}/{quizData?.questions.length}.
          </Alert>
          <Button colorScheme="blue" onClick={() => router.push('/chat')} size="lg">
            Go to Chat
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default QuizPage;
