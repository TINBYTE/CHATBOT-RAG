import React, { useState } from 'react';
import { VStack, Button } from '@chakra-ui/react';
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
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const currentQuestion = examData.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    let selectedOption = null
        if(selectedOptionIndex) {
        selectedOption=  selectedOptionIndex
        }
   const correctOptionIndex = Object.keys(currentQuestion.question_data.options).indexOf(currentQuestion.question_data.correct_answer) + 1
    const isCorrect = selectedOption === correctOptionIndex;


    // Add the current question response
    const updatedResponses = [
      ...userResponses,
      {
        questionId: currentQuestionIndex + 1,
        userResponse: String(selectedOption),
        isCorrect,
      },
    ];

    // Check if it's the last question
    if (currentQuestionIndex === examData.questions.length - 1) {
      onComplete(updatedResponses); // Pass all responses, including the last one
    } else {
      setUserResponses(updatedResponses); // Update userResponses for intermediate questions
      setSelectedOptionIndex(null); // Reset selected option
      setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question
    }
  };

  return (
    <VStack spacing={4}>
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOptionIndex}
        onSelectOption={(index)=>setSelectedOptionIndex(index)}
      />
      <Button
        colorScheme="green"
        onClick={handleNextQuestion}
        isDisabled={!selectedOptionIndex}
      >
        {currentQuestionIndex === examData.questions.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </VStack>
  );
};

export default ExamDisplay;