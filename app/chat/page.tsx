'use client';

import React, { useState } from 'react';
import { Box, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import ExamForm from '@/components/exam/ExamForm';
import ExamDisplay from '@/components/exam/ExamDisplay';
import ExamFeedback from '@/components/exam/ExamFeedBack';

const ChatPage: React.FC = () => {
    const textColor = useColorModeValue('navy.700', 'white');
  const [examData, setExamData] = useState<any | null>(null);
  const [userResponses, setUserResponses] = useState<
    { questionId: number; userResponse: string; isCorrect: boolean }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const userToken = localStorage.getItem('usertoken');
  const userId = userToken ? JSON.parse(userToken).id : null;

  const handleGenerateExam = async (formData: {
    query: string;
    question_nbr: number;
    difficulty: string;
    question_type: string;
  }) => {
    try {
      const response = await fetch('http://localhost:8000/Exam/newexam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch exam');
      }
  
      const data = await response.json();
      setExamData({ ...data, prompt: formData.query, title: "Exam : " + formData.query });
      setQuizCompleted(false);
      setUserResponses([]);
      setScore(0);
    } catch (error) {
      console.error('Error generating exam:', error);
      throw error; // Re-throw the error to be handled by the form
    }
  };

  const handleCompleteExam = (responses: { questionId: number; userResponse: string; isCorrect: boolean }[]) => {
    setUserResponses(responses);
    const correctAnswers = responses.filter((response) => response.isCorrect).length;
    setScore(correctAnswers);
    setQuizCompleted(true);
  };

  const handleResetExam = () => {
    setExamData(null);
    setQuizCompleted(false);
    setUserResponses([]);
    setScore(0);
  };

  return (
    <Box p={4}>
      <VStack spacing={6}>
        {!examData ? (
          <ExamForm onSubmit={handleGenerateExam} />
        ) : !quizCompleted ? (
          <ExamDisplay
            examData={examData}
            onComplete={(responses) => handleCompleteExam(responses)}
          />
        ) : (
          <ExamFeedback
            questions={examData.questions}
            userResponses={userResponses}
            quizData={examData}
            score={score}
            userId={userId}
            onReset={handleResetExam} // Pass reset handler
          />
        )}
      </VStack>
    </Box>
  );
};

export default ChatPage;