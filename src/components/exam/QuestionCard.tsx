// QuestionCard.tsx
import React from 'react';
import {
  Box,
  Text,
  VStack,
  RadioGroup,
  Radio,
  Stack,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react';

interface QuestionCardProps {
  question: any;
  selectedOption: string | null;
  onSelectOption: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption, 
  onSelectOption 
}) => {
  const radioBg = useColorModeValue('white', 'gray.700');
  const radioHoverBg = useColorModeValue('gray.50', 'gray.600');
  const questionBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Card
      width="100%"
      bg={questionBg}
      borderRadius="lg"
      overflow="hidden"
    >
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue('gray.700', 'white')}
            lineHeight="tall"
          >
            {question.question_data.question}
          </Text>

          <RadioGroup
            value={selectedOption ?? ''}
            onChange={onSelectOption}
          >
            <Stack spacing={4}>
              {Object.entries(question.question_data.options).map(([key, value]) => (
                <Box
                  key={key}
                  position="relative"
                  width="100%"
                >
                  <Radio
                    value={key}
                    width="100%"
                    p={4}
                    bg={radioBg}
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{
                      bg: radioHoverBg,
                      transform: 'translateY(-2px)',
                      boxShadow: 'sm',
                    }}
                    transition="all 0.2s"
                  >
                    <Text fontSize="md" ml={2}>
                      {value as string}
                    </Text>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default QuestionCard;