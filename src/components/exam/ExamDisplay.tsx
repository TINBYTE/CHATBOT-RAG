// ExamDisplay.tsx
import React, { useState, useEffect } from 'react';
import {
  VStack,
  Button,
  Container,
  Progress,
  Text,
  Flex,
  useColorModeValue,
  Icon,
  Card,
} from '@chakra-ui/react';
import { ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';
import QuestionCard from './QuestionCard';

interface ExamDisplayProps {
  examData: any;
  onComplete: (responses: { questionId: number; userResponse: string; isCorrect: boolean }[]) => void;
}

const ExamDisplay: React.FC<ExamDisplayProps> = ({ examData, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<
    { questionId: number; userResponse: string; isCorrect: boolean }[]
  >([]);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);

  // Reset selected option when question index changes
  useEffect(() => {
    setSelectedOptionKey(null);
  }, [currentQuestionIndex]);

  const currentQuestion = examData.questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / examData.questions.length) * 100;
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleNextQuestion = () => {
    if (!selectedOptionKey) return;

    const correctOptionKey = currentQuestion.question_data.correct_answer;
    const correctOptionIndex = Object.keys(currentQuestion.question_data.options).indexOf(correctOptionKey) + 1;
    const userOptionIndex = Object.keys(currentQuestion.question_data.options).indexOf(selectedOptionKey) + 1;
    const isCorrect = String(userOptionIndex) === String(correctOptionIndex);

    const updatedResponses = [
      ...userResponses,
      {
        questionId: currentQuestionIndex + 1,
        userResponse: String(userOptionIndex),
        isCorrect,
      },
    ];

    if (currentQuestionIndex === examData.questions.length - 1) {
      onComplete(updatedResponses);
    } else {
      setUserResponses(updatedResponses);
      setCurrentQuestionIndex((prev) => prev + 1);
      // selectedOptionKey will be reset by the useEffect
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Card
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
        p={6}
      >
        <VStack spacing={6} width="100%">
          <Flex width="100%" justify="space-between" align="center" mb={2}>
            <Text fontSize="lg" fontWeight="medium" color="gray.600">
              Question {currentQuestionIndex + 1} of {examData.questions.length}
            </Text>
            <Text fontSize="md" color="blue.500" fontWeight="semibold">
              Progress: {Math.round(progressValue)}%
            </Text>
          </Flex>
          
          <Progress
            value={progressValue}
            size="sm"
            width="100%"
            colorScheme="blue"
            borderRadius="full"
            hasStripe
            isAnimated
          />

          <QuestionCard
            key={currentQuestionIndex} // Add key to force re-render
            question={currentQuestion}
            selectedOption={selectedOptionKey}
            onSelectOption={setSelectedOptionKey}
          />

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleNextQuestion}
            isDisabled={!selectedOptionKey}
            rightIcon={currentQuestionIndex === examData.questions.length - 1 
              ? <Icon as={CheckIcon} />
              : <Icon as={ChevronRightIcon} />
            }
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            {currentQuestionIndex === examData.questions.length - 1 ? 'Submit Exam' : 'Next Question'}
          </Button>
        </VStack>
      </Card>
    </Container>
  );
};

export default ExamDisplay;