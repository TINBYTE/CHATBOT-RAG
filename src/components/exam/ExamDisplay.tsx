import React, { useState } from 'react';
import { VStack, Button, Text } from '@chakra-ui/react';
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = examData.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === currentQuestion.question_data.correct_answer;

    setUserResponses((prev) => [
      ...prev,
      {
        questionId: currentQuestionIndex + 1,
        userResponse: selectedOption || '',
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < examData.questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete(userResponses);
    }
  };

  return (
    <VStack spacing={4}>
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
      <Button
        colorScheme="green"
        onClick={handleNextQuestion}
        isDisabled={!selectedOption}
      >
        {currentQuestionIndex === examData.questions.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </VStack>
  );
};

export default ExamDisplay;
