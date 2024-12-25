import React from 'react';
import { Box, Text, VStack, RadioGroup, Radio, Stack } from '@chakra-ui/react';

interface QuestionCardProps {
  question: any;
  selectedOption: string | null;
  onSelectOption: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelectOption }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold">{question.question_data.question}</Text>
        <RadioGroup value={selectedOption || ''} onChange={onSelectOption}>
          <Stack spacing={2}>
            {Object.entries(question.question_data.options).map(([key, value]) => (
              <Radio key={key} value={key}>
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
