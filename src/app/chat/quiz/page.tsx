
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
import { useRouter } from 'next/navigation';

const quizData = {
  title: 'SQL Basics Quiz',
  questions: [
    {
      id: 1,
      text: 'Which SQL keyword is used to retrieve data from a database?',
      type: 'mcq',
      options: ['INSERT', 'DELETE', 'SELECT', 'UPDATE'],
      correct_option: 2,
      explanation: 'The SELECT statement is used to retrieve data from a database.',
    },
    {
      id: 2,
      text: 'What does the SQL JOIN operation do?',
      type: 'mcq',
      options: [
        'Deletes rows from a table',
        'Combines rows from two or more tables',
        'Updates rows in a table',
        'Adds a new table to the database',
      ],
      correct_option: 1,
      explanation: 'JOIN is used to combine rows from two or more tables.',
    },
  ],
};

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(20);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const currentQuestion = quizData.questions[currentQuestionIndex];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
    if (quizCompleted) return;

    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, quizCompleted , router]);

  const handleAnswer = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correct_option) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizCompleted(true);
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

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {quizData.title}
      </Text>

      {!quizCompleted ? (
        <VStack spacing={4} align="stretch">
          <Text>{currentQuestion.text}</Text>
          <RadioGroup
            onChange={(value) => setSelectedOption(parseInt(value, 10))}
            value={selectedOption !== null ? selectedOption.toString() : undefined}
          >
            <Stack direction="column">
              {currentQuestion.options.map((option, index) => (
                <Radio key={index} value={index.toString()} isDisabled={isAnswered}>
                  {option}
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
            Quiz completed! Your score is {score}/{quizData.questions.length}.
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
