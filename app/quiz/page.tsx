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
import { useRouter } from 'next/navigation';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [quizData, setQuizData] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quizConfig = JSON.parse(localStorage.getItem('quizConfig') || '{}');
  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const API_BASE_URL = 'http://localhost:8000/Exam/newexam';

  // Fetch quiz data from API
  useEffect(() => {
    if (Object.keys(quizConfig).length === 0) {
      router.push('/chat');
      return;
    }

    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/Exam/newexam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: quizConfig.query || '',
            question_nbr: quizConfig.question_nbr || 0,
            difficulty: quizConfig.difficulty || '',
            question_type: quizConfig.question_type || '',
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch quiz data');

        const data = await response.json();
        setQuizData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswer = () => {
    if (!currentQuestion) return;

    setIsAnswered(true);
    const isCorrect = selectedOption === currentQuestion.question_data.correct_answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestionIndex + 1,
        userResponse: selectedOption,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizCompleted(true);
      saveQuizResults();
    }
  };

  const saveQuizResults = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('usertoken') || '{}');
      const response = await fetch('/api/quiz/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizData,
          userId: user.id,
          score: (score / quizData.questions.length) * 100,
          passed: score >= quizData.questions.length / 2,
          userAnswers,
        }),
      });

      if (!response.ok) throw new Error('Failed to save quiz results');
      console.log('Quiz and results saved successfully');
    } catch (err) {
      console.error('Error saving quiz results:', err);
    }
  };

  if (loading) return <Box textAlign="center">Loading quiz...</Box>;
  if (error) return <Box textAlign="center" color="red.500">{error}</Box>;

  return (
    <Box p={6} maxW="600px" mx="auto" bg="gray.50" borderRadius="lg" shadow="md">
      <Heading fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        {quizData?.title || 'Quiz'}
      </Heading>
      {!quizCompleted && currentQuestion ? (
        <VStack spacing={6} align="stretch">
          <Text fontSize="lg">{currentQuestion.question_data.question}</Text>
          <RadioGroup onChange={setSelectedOption} value={selectedOption || undefined}>
            <Stack spacing={4}>
              {Object.entries(currentQuestion.question_data.options).map(([key, option]) => (
                <Radio key={key} value={key} isDisabled={isAnswered}>
                  {option as string}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Progress value={(score / quizData.questions.length) * 100} colorScheme="teal" />
          <Button onClick={handleAnswer} isDisabled={!selectedOption || isAnswered}>
            Submit Answer
          </Button>
        </VStack>
      ) : (
        <Alert status="success">
          <AlertIcon />
          Quiz completed! Your score is {score}/{quizData.questions.length}.
        </Alert>
      )}
    </Box>
  );
};

export default QuizPage;
