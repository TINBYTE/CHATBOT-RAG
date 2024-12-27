import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Stack,
  Badge,
  Divider,
  Button,
  Heading,
  Container,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Icon,
  Flex,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

interface ExamFeedbackProps {
  questions: any[];
  userResponses: { questionId: number; userResponse: string; isCorrect: boolean }[];
  quizData: any;
  score: number;
  userId: number;
  onReset: () => void;
}

const ExamFeedback: React.FC<ExamFeedbackProps> = ({ 
  questions, 
  userResponses, 
  quizData, 
  score, 
  userId, 
  onReset 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const correctBg = useColorModeValue('green.50', 'green.900');
  const incorrectBg = useColorModeValue('red.50', 'red.900');

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
      onReset();
    } catch (error) {
      console.error('Error saving quiz:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const scorePercentage = Math.round((score / questions.length) * 100);
  const isPassed = score >= questions.length / 2;

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
        <CardHeader bg={cardBgColor} py={6}>
          <VStack spacing={4}>
            <Heading as="h2" size="lg" color="teal.600">
              {quizData.title}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Completed on {formattedDate} at {today.toLocaleTimeString()}
            </Text>
            
            <StatGroup width="full" px={4}>
              <Stat textAlign="center">
                <StatLabel fontSize="md">Score</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {score}/{questions.length}
                </StatNumber>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel fontSize="md">Percentage</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {scorePercentage}%
                </StatNumber>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel fontSize="md">Status</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {isPassed ? 'PASSED' : 'FAILED'}
                </StatNumber>
              </Stat>
            </StatGroup>
            
            <Progress
              value={scorePercentage}
              colorScheme={isPassed ? 'green' : 'red'}
              width="full"
              borderRadius="full"
              size="lg"
            />
          </VStack>
        </CardHeader>

        <CardBody>
          <VStack spacing={6}>
            {questions.map((question, index) => {
              const userAnswer = userResponses.find((res) => res.questionId === index + 1);
              const isCorrect = userAnswer?.isCorrect;

              let userOptionText = "Not Answered";
              if(userAnswer?.userResponse) {
                const optionKeys = Object.keys(question.question_data.options);
                const userOptionIndex = parseInt(userAnswer.userResponse, 10) - 1;
                if (userOptionIndex >= 0 && userOptionIndex < optionKeys.length) {
                  const userOptionKey = optionKeys[userOptionIndex];
                  userOptionText = question.question_data.options[userOptionKey] || "Not Answered";
                }
              }

              return (
                <Box
                  key={index}
                  width="full"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  bg={isCorrect ? correctBg : incorrectBg}
                  position="relative"
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                >
                  <Flex align="center" mb={4}>
                    <Icon
                      as={isCorrect ? CheckCircleIcon : WarningIcon}
                      w={6}
                      h={6}
                      color={isCorrect ? 'green.500' : 'red.500'}
                      mr={2}
                    />
                    <Heading size="md" color={isCorrect ? 'green.600' : 'red.600'}>
                      Question {index + 1}
                    </Heading>
                  </Flex>

                  <Text fontWeight="medium" mb={4}>
                    {question.question_data.question}
                  </Text>

                  <Stack spacing={3}>
                    <Flex align="center">
                      <Badge
                        colorScheme={isCorrect ? 'green' : 'red'}
                        px={2}
                        py={1}
                        borderRadius="full"
                        mr={2}
                      >
                        Your Answer
                      </Badge>
                      <Text>{userOptionText}</Text>
                    </Flex>

                    <Flex align="center">
                      <Badge
                        colorScheme="blue"
                        px={2}
                        py={1}
                        borderRadius="full"
                        mr={2}
                      >
                        Correct Answer
                      </Badge>
                      <Text>{question.question_data.options[question.question_data.correct_answer]}</Text>
                    </Flex>

                    <Box mt={2}>
                      <Text fontWeight="medium" color="gray.600">
                        Explanation:
                      </Text>
                      <Text color="gray.700">
                        {question.question_data.explanation}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </VStack>

          <Flex justify="center" mt={8}>
            <Tooltip label="Save your results and start a new exam" placement="top">
              <Button
                colorScheme="blue"
                size="lg"
                isLoading={isProcessing}
                onClick={handleSaveAndReset}
                loadingText="Saving..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Save and Start New Exam
              </Button>
            </Tooltip>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ExamFeedback;