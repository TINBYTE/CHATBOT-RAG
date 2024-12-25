import React from 'react';
import { Box, Text, VStack, RadioGroup, Radio, Stack } from '@chakra-ui/react';

interface QuestionCardProps {
  question: any;
  selectedOption: number | null;
  onSelectOption: (value: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelectOption }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold">{question.question_data.question}</Text>
        <RadioGroup value={selectedOption !== null ? String(selectedOption) : undefined} onChange={(value)=> onSelectOption(Number(value))}>
          <Stack spacing={2}>
            {Object.entries(question.question_data.options).map(([key, value], index) => (
              <Radio key={key} value={(index + 1).toString()}>
                {value as string}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </VStack>
    </Box>
  );
};

export default QuestionCard;