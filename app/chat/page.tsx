'use client';

import {
    Button,
    Flex,
    Img,
    Input,
    Text,
    useColorModeValue,
    Select,
    NumberInput,
    NumberInputField,
    VStack,
    Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Bg from '@/public/img/chat/bg-image.png';
import { useRouter } from 'next/navigation';

export default function Chat() {
    const router = useRouter();
    const [prompt, setPrompt] = useState('');
    const [questionNbr, setQuestionNbr] = useState(5);
    const [difficulty, setDifficulty] = useState('intermediate');
    const [questionType, setQuestionType] = useState('mcq');
    const [loading, setLoading] = useState<boolean>(false);

    const borderColor = useColorModeValue('gray.300', 'whiteAlpha.300');
    const inputColor = useColorModeValue('navy.800', 'white');
    const textColor = useColorModeValue('navy.800', 'white');
    const placeholderColor = useColorModeValue('gray.500', 'whiteAlpha.600');
    const bgColor = useColorModeValue('gray.50', 'gray.800');

    const handleGenerateQuiz = async () => {
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('usertoken') || '{}');

            if (!user || !user.id) {
                throw new Error('User not logged in');
            }

            const response = await fetch('/api/quiz/createquiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    prompt,
                    title: `Quiz: ${prompt}`,
                    questionNbr,
                    difficulty,
                    questionType,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create quiz');
            }

            const { quizId } = data;

            router.push(`/quiz?quizId=${quizId}&prompt=${encodeURIComponent(prompt)}`);
        } catch (error) {
            console.error('Error generating quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const usertoken = localStorage.getItem('usertoken');
        if (!usertoken) {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <Flex
            w="100%"
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg={bgColor}
            position="relative"
        >
            <Img
                src={Bg.src}
                position="absolute"
                w="350px"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                opacity={0.1}
                zIndex={-1}
            />
            <Box
                w={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }}
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                p={8}
                zIndex={1}
            >
                {/* Title */}
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    mb={6}
                    color={textColor}
                >
                    Configurez votre Quiz SQL
                </Text>

                {/* Form */}
                <VStack spacing={4} align="stretch">
                    {/* Prompt Input */}
                    <Input
                        placeholder="Entrez votre requête SQL, ex: Les jointures en SQL"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        minH="54px"
                        borderColor={borderColor}
                        _focus={{ borderColor: 'blue.500' }}
                        color={inputColor}
                        _placeholder={{ color: placeholderColor }}
                        required
                    />

                    {/* Number of Questions */}
                    <Box>
                        <Text fontWeight="bold" mb={2} color={textColor}>
                            Nombre de questions
                        </Text>
                        <NumberInput
                            value={questionNbr}
                            onChange={(valueString) => setQuestionNbr(Number(valueString))}
                            min={1}
                            max={50}
                        >
                            <NumberInputField borderColor={borderColor} />
                        </NumberInput>
                    </Box>

                    {/* Difficulty */}
                    <Box>
                        <Text fontWeight="bold" mb={2} color={textColor}>
                            Difficulté
                        </Text>
                        <Select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            borderColor={borderColor}
                        >
                            <option value="beginner">Débutant</option>
                            <option value="intermediate">Intermédiaire</option>
                            <option value="advanced">Avancé</option>
                        </Select>
                    </Box>

                    {/* Question Type */}
                    <Box>
                        <Text fontWeight="bold" mb={2} color={textColor}>
                            Type de questions
                        </Text>
                        <Select
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            borderColor={borderColor}
                        >
                            <option value="mcq">QCM</option>
                            <option value="open-ended">Questions ouvertes</option>
                        </Select>
                    </Box>

                    {/* Submit Button */}
                    <Button
                        colorScheme="blue"
                        size="lg"
                        isLoading={loading}
                        onClick={handleGenerateQuiz}
                        _hover={{ bg: 'blue.600' }}
                        borderRadius="md"
                    >
                        Générer le Quiz
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
}
