'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Quiz, QuizAttempt } from '@/app/types/db';
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
  Spinner,
  Badge,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
  Progress,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaHistory, FaTrash, FaEye } from 'react-icons/fa';

interface QuizWithAttempts extends Quiz {
  attempts: QuizAttempt[];
}

const QuizHistoryPage = () => {
  const [quizzes, setQuizzes] = useState<QuizWithAttempts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const toast = useToast();
  const router = useRouter();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (!user?.id) {
          throw new Error('User ID is required');
        }

        const response = await fetch(`/api/quiz/getUserQuiz?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch quizzes');
        const data = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchQuizzes();
  }, [user?.id]);

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      const response = await fetch(`/api/quiz/deleteQuiz`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId }),
      });

      if (!response.ok) throw new Error('Failed to delete quiz');

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== Number(quizId))
      );
      toast({
        title: 'Quiz deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: 'Error deleting quiz',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getQuizStats = (quiz: QuizWithAttempts) => {
    const attempts = quiz.attempts || [];
    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter(a => a.passed).length;
    const averageScore = attempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / (totalAttempts || 1);
    return { totalAttempts, passedAttempts, averageScore };
  };

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" color="blue.500" />
          <Text fontSize="lg">Loading your quiz history...</Text>
        </VStack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Box textAlign="center" p={8} bg="red.50" borderRadius="lg">
          <Icon as={FaHistory} w={8} h={8} color="red.500" mb={4} />
          <Text color="red.500" fontSize="lg">{error}</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="xl" color="blue.600">
            Quiz History
          </Heading>
          <Badge colorScheme="blue" p={2} borderRadius="md">
            Total Quizzes: {quizzes.length}
          </Badge>
        </Flex>

        {quizzes.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="300px"
            bg={bgColor}
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
            p={8}
          >
            <Icon as={FaHistory} w={12} h={12} color="gray.400" mb={4} />
            <Text fontSize="xl" color="gray.500">
              No quiz history available yet.
            </Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => router.push('/chat')}
            >
              Create Your First Quiz
            </Button>
          </Flex>
        ) : (
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            {quizzes.map((quiz) => {
              const stats = getQuizStats(quiz);
              return (
                <Box
                  key={quiz.id}
                  bg={bgColor}
                  borderRadius="xl"
                  border="1px"
                  borderColor={borderColor}
                  p={6}
                  shadow="md"
                  _hover={{ shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  <VStack align="stretch" spacing={4}>
                    <Flex justify="space-between" align="center">
                      <Heading as="h3" size="md" color="blue.600">
                        {quiz.title}
                      </Heading>
                      <Badge
                        colorScheme={stats.totalAttempts > 0 ? 'green' : 'gray'}
                      >
                        {stats.totalAttempts} Attempts
                      </Badge>
                    </Flex>

                    <Text noOfLines={2} color="gray.600">
                      {quiz.prompt}
                    </Text>

                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Stat>
                        <StatLabel>Average Score</StatLabel>
                        <StatNumber>{stats.averageScore.toFixed(1)}%</StatNumber>
                        <Progress
                          value={stats.averageScore}
                          colorScheme="blue"
                          size="sm"
                          mt={2}
                        />
                      </Stat>
                      <Stat>
                        <StatLabel>Pass Rate</StatLabel>
                        <StatNumber>
                          {((stats.passedAttempts / stats.totalAttempts) * 100 || 0).toFixed(1)}%
                        </StatNumber>
                        <StatHelpText>
                          {stats.passedAttempts} of {stats.totalAttempts} passed
                        </StatHelpText>
                      </Stat>
                    </Grid>

                    <Divider />

                    <HStack spacing={4} justify="flex-end">
                      <Button
                        leftIcon={<FaEye />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/history/details?quizId=${quiz.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        leftIcon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuiz(quiz.id.toString())}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              );
            })}
          </Grid>
        )}
      </VStack>
    </Box>
  );
};

export default QuizHistoryPage;