import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from '@chakra-ui/react';

interface ExamFormProps {
  onSubmit: (formData: {
    query: string;
    question_nbr: number;
    difficulty: string;
    question_type: string;
  }) => Promise<void>;
}

interface FormErrors {
  query?: string;
  question_nbr?: string;
  difficulty?: string;
  question_type?: string;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    query: '',
    question_nbr: 1,
    difficulty: '',
    question_type: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.query.trim()) {
      newErrors.query = 'SQL query is required';
    }
    
    if (!formData.question_nbr || formData.question_nbr < 1) {
      newErrors.question_nbr = 'Number of questions is required';
    }
    
    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }
    
    if (!formData.question_type) {
      newErrors.question_type = 'Question type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNumberChange = (valueAsNumber: number) => {
    setFormData(prev => ({ ...prev, question_nbr: valueAsNumber }));
    if (errors.question_nbr) {
      setErrors(prev => ({ ...prev, question_nbr: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        await onSubmit(formData);
        toast({
          title: 'Exam generated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Failed to generate exam',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: 'Please fill all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.md" py={8}>
      <Card
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <CardHeader pb={0}>
          <Heading size="lg" mb={2}>Generate SQL Exam</Heading>
          <Text color="gray.600" fontSize="md">
            Create custom SQL questions based on your requirements
          </Text>
        </CardHeader>

        <CardBody>
          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <FormControl isRequired isInvalid={!!errors.query} isDisabled={isLoading}>
                <FormLabel fontWeight="medium">SQL Query</FormLabel>
                <Input
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Enter your SQL query"
                  size="lg"
                  variant="filled"
                  _focus={{
                    borderColor: 'blue.400',
                    bg: 'white',
                  }}
                />
                <FormHelperText>
                  The SQL query that will be used to generate questions
                </FormHelperText>
                <FormErrorMessage>{errors.query}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.question_nbr} isDisabled={isLoading}>
                <FormLabel fontWeight="medium">Number of Questions</FormLabel>
                <NumberInput
                  min={1}
                  max={10}
                  value={formData.question_nbr}
                  onChange={(_, valueAsNumber) => handleNumberChange(valueAsNumber)}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Choose between 1 and 10 questions
                </FormHelperText>
                <FormErrorMessage>{errors.question_nbr}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.difficulty} isDisabled={isLoading}>
                <FormLabel fontWeight="medium">Difficulty Level</FormLabel>
                <Select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  size="lg"
                  variant="filled"
                  placeholder="Select difficulty level"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
                <FormHelperText>
                  Select the complexity level of the questions
                </FormHelperText>
                <FormErrorMessage>{errors.difficulty}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.question_type} isDisabled={isLoading}>
                <FormLabel fontWeight="medium">Question Type</FormLabel>
                <Select
                  name="question_type"
                  value={formData.question_type}
                  onChange={handleChange}
                  size="lg"
                  variant="filled"
                  placeholder="Select question type"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="open-ended">Open-Ended</option>
                </Select>
                <FormHelperText>
                  Choose the format of the questions
                </FormHelperText>
                <FormErrorMessage>{errors.question_type}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                height="50px"
                width="full"
                mt={4}
                isLoading={isLoading}
                loadingText="Generating Exam..."
                spinner={<Spinner size="sm" />}
                disabled={isLoading}
                _hover={{
                  transform: isLoading ? 'none' : 'translateY(-2px)',
                  boxShadow: isLoading ? 'none' : 'lg',
                }}
                transition="all 0.2s"
              >
                {isLoading ? 'Generating Exam...' : 'Generate Exam'}
              </Button>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ExamForm;