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
    Container,
    Grid,
    CircularProgress,
    CircularProgressLabel,
    Card,
    CardHeader,
    CardBody,
    Icon,
    useColorModeValue,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoIcon, TimeIcon } from '@chakra-ui/icons';

const QuizDetailsPage = () => {
    const searchParams = useSearchParams();
    const quizId = searchParams.get('quizId');
    const [quizDetails, setQuizDetails] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Color mode values
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headerBg = useColorModeValue('blue.50', 'blue.900');
    const textColor = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await fetch(`/api/quiz/getQuizDetails?quizId=${quizId}`);
                if (!response.ok) throw new Error('Failed to fetch quiz details');
                const data = await response.json();
                setQuizDetails(data);
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            }
        };

        if (quizId) fetchQuizDetails();
    }, [quizId]);

    if (error) {
        return (
            <Container maxW="container.lg" py={8}>
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    borderRadius="lg"
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <Text mt={4} mb={1} fontSize="lg">
                        {error}
                    </Text>
                    <Text fontSize="sm">Please try again later</Text>
                </Alert>
            </Container>
        );
    }

    if (!quizDetails) {
        return (
            <Flex height="50vh" align="center" justify="center">
                <VStack spacing={4}>
                    <Spinner size="xl" thickness="4px" color="blue.500" />
                    <Text fontSize="lg" color={textColor}>
                        Loading quiz details...
                    </Text>
                </VStack>
            </Flex>
        );
    }

    const { title, created_at, score, passed, questions } = quizDetails;
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q: any) => q.isCorrect).length;

    return (
        <Container maxW="container.lg" py={8}>
            <Card
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="xl"
            >
                <CardHeader bg={headerBg} py={6}>
                    <VStack spacing={4}>
                        <Heading as="h2" size="lg" color={textColor}>
                            {title}
                        </Heading>
                        <Grid
                            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                            gap={6}
                            w="full"
                        >
                            <Stat textAlign="center">
                                <StatLabel>Score</StatLabel>
                                <StatNumber>
                                    <CircularProgress
                                        value={score}
                                        color={score >= 70 ? "green.400" : "red.400"}
                                        size="80px"
                                    >
                                        <CircularProgressLabel>{score}%</CircularProgressLabel>
                                    </CircularProgress>
                                </StatNumber>
                            </Stat>
                            
                            <Stat textAlign="center">
                                <StatLabel>Status</StatLabel>
                                <StatNumber>
                                    <Icon
                                        as={passed ? CheckCircleIcon : WarningIcon}
                                        w={10}
                                        h={10}
                                        color={passed ? "green.400" : "red.400"}
                                    />
                                </StatNumber>
                                <StatHelpText>{passed ? "Passed" : "Failed"}</StatHelpText>
                            </Stat>
                            
                            <Stat textAlign="center">
                                <StatLabel>Questions</StatLabel>
                                <StatNumber>{correctAnswers}/{totalQuestions}</StatNumber>
                                <StatHelpText>Correct Answers</StatHelpText>
                            </Stat>
                            
                            <Stat textAlign="center">
                                <StatLabel>Taken On</StatLabel>
                                <StatNumber>
                                    <Icon as={TimeIcon} w={10} h={10} color="blue.400" />
                                </StatNumber>
                                <StatHelpText>
                                    {new Date(created_at).toLocaleDateString()}
                                </StatHelpText>
                            </Stat>
                        </Grid>
                    </VStack>
                </CardHeader>

                <CardBody>
                    <VStack spacing={6} align="stretch">
                        {questions.map((question: any, index: number) => {
                            const isCorrect = question.isCorrect;
                            return (
                                <Card
                                    key={index}
                                    borderWidth="1px"
                                    borderColor={isCorrect ? 'green.200' : 'red.200'}
                                    borderRadius="lg"
                                    overflow="hidden"
                                    bg={isCorrect ? 'green.50' : 'red.50'}
                                    _dark={{
                                        bg: isCorrect ? 'green.900' : 'red.900',
                                        borderColor: isCorrect ? 'green.700' : 'red.700',
                                    }}
                                >
                                    <CardHeader bg={isCorrect ? 'green.100' : 'red.100'} py={3}>
                                        <Flex align="center" gap={2}>
                                            <Icon
                                                as={isCorrect ? CheckCircleIcon : WarningIcon}
                                                w={5}
                                                h={5}
                                                color={isCorrect ? 'green.500' : 'red.500'}
                                            />
                                            <Text fontWeight="bold">
                                                Question {index + 1}
                                            </Text>
                                        </Flex>
                                    </CardHeader>
                                    <CardBody>
                                        <Stack spacing={4}>
                                            <Text fontSize="lg" fontWeight="medium">
                                                {question.questionText}
                                            </Text>
                                            
                                            <Box>
                                                <Flex align="center" gap={2} mb={2}>
                                                    <Badge
                                                        colorScheme={isCorrect ? 'green' : 'red'}
                                                        px={2}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        Your Answer
                                                    </Badge>
                                                    <Text>{question.userResponse || 'Not Answered'}</Text>
                                                </Flex>
                                                
                                                <Flex align="center" gap={2}>
                                                    <Badge
                                                        colorScheme="blue"
                                                        px={2}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        Correct Answer
                                                    </Badge>
                                                    <Text>{question.correctAnswer}</Text>
                                                </Flex>
                                            </Box>
                                            
                                            {question.explanation && (
                                                <Box
                                                    mt={2}
                                                    p={4}
                                                    bg="gray.50"
                                                    borderRadius="md"
                                                    _dark={{ bg: 'gray.700' }}
                                                >
                                                    <Flex align="flex-start" gap={2}>
                                                        <Icon as={InfoIcon} w={5} h={5} color="blue.500" mt={1} />
                                                        <Text fontSize="sm">
                                                            {question.explanation}
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                            )}
                                        </Stack>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </VStack>
                </CardBody>
            </Card>
        </Container>
    );
};

export default QuizDetailsPage;