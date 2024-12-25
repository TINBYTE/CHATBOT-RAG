import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from '@chakra-ui/react';

interface ExamFormProps {
  onSubmit: (formData: {
    query: string;
    question_nbr: number;
    difficulty: string;
    question_type: string;
  }) => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    query: '',
    question_nbr: 1,
    difficulty: 'intermediate',
    question_type: 'mcq',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (valueAsString: string, valueAsNumber: number) => {
    setFormData({ ...formData, question_nbr: valueAsNumber });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Prompt</FormLabel>
          <Input
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Enter your SQL query"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Number of Questions</FormLabel>
          <NumberInput
            min={1}
            max={50}
            value={formData.question_nbr}
            onChange={handleNumberChange}
          >
            <NumberInputField name="question_nbr" />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Difficulty</FormLabel>
          <Select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Question Type</FormLabel>
          <Select name="question_type" value={formData.question_type} onChange={handleChange}>
            <option value="mcq">Multiple Choice</option>
            <option value="open-ended">Open-Ended</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" w="full">
          Generate Exam
        </Button>
      </VStack>
    </Box>
  );
};

export default ExamForm;
