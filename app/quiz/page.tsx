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
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId'); // Extract quizId from the URL
  const prompt = searchParams.get('prompt'); // Extract prompt from the URL

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
      {
        id: 2,
        questionText: 'What does the SQL JOIN operation do?',
        questionType: 'mcq',
        options: [
          { id: 1, optionText: 'Deletes rows from a table' },
          { id: 2, optionText: 'Combines rows from two or more tables' },
          { id: 3, optionText: 'Updates rows in a table' },
          { id: 4, optionText: 'Adds a new table to the database' },
        ],
        correctOption: 2,
        explanation: 'JOIN is used to combine rows from two or more tables.',
      },
      {
        id: 3,
        questionText: 'Which SQL clause is used to filter records?',
        questionType: 'mcq',
        options: [
          { id: 1, optionText: 'WHERE' },
          { id: 2, optionText: 'GROUP BY' },
          { id: 3, optionText: 'ORDER BY' },
          { id: 4, optionText: 'HAVING' },
        ],
        correctOption: 1,
        explanation: 'The WHERE clause is used to filter records in a query.',
      },
      {
        id: 4,
        questionText: 'What is the default sorting order in SQL?',
        questionType: 'mcq',
        options: [
          { id: 1, optionText: 'ASCENDING' },
          { id: 2, optionText: 'DESCENDING' },
          { id: 3, optionText: 'RANDOM' },
          { id: 4, optionText: 'NONE' },
        ],
        correctOption: 1,
        explanation: 'The default sorting order in SQL is ASCENDING.',
      },
      {
        id: 5,
        questionText: 'Which of the following is a valid SQL data type?',
        questionType: 'mcq',
        options: [
          { id: 1, optionText: 'STRING' },
          { id: 2, optionText: 'INTEGER' },
          { id: 3, optionText: 'FLOAT' },
          { id: 4, optionText: 'BOOLEAN' },
        ],
        correctOption: 2,
        explanation: 'INTEGER is a valid SQL data type.',
      },
    ],
  };

  const [quizData] = useState(staticQuizData); // Static data for quiz
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

        // Store the user's answer
        setUserAnswers((prev) => [
            ...prev,
            {
                questionId: currentQuestion.id,
                userResponse: currentQuestion.options.find((option:any) => option.id === selectedOption)?.optionText,
                isCorrect,
            },
        ]);

        if (currentQuestionIndex === quizData.questions.length - 1) {
            setQuizCompleted(true);
            saveQuizResults(); // Save quiz results after the last question
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

  const handleRedirectToChat = () => {
    router.push('/chat');
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
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {quizData?.title || 'Loading Quiz...'}
      </Text>

      {!quizCompleted && quizData ? (
        <VStack spacing={4} align="stretch">
          <Text>{currentQuestion.questionText}</Text>
          <RadioGroup
            onChange={(value) => setSelectedOption(parseInt(value, 10))}
            value={selectedOption !== null ? selectedOption.toString() : undefined}
          >
            <Stack direction="column">
              {currentQuestion.options.map((option: any, index: number) => (
                <Radio key={index} value={option.id.toString()} isDisabled={isAnswered}>
                  {option.optionText}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Progress value={(timer / 20) * 100} colorScheme="teal" size="sm" />

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
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Alert status="success">
            <AlertIcon />
            Quiz completed! Your score is {score}/{quizData?.questions.length}.
          </Alert>
          <Button colorScheme="blue" onClick={handleRedirectToChat}>
            Go to Chat
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default QuizPage;