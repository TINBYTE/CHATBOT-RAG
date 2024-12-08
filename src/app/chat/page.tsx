'use client';
/*eslint-disable*/

import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import { ChatBody, OpenAIModel } from '@/types/types';
import {
    Button,
    Flex,
    Img,
    Input,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Bg from '@/public/img/chat/bg-image.png';
import { useRouter } from 'next/navigation';
export default function Chat(props: { apiKeyApp: string }) {
    const router = useRouter();
    // Input States
    const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
    const [prompt, setPrompt] = useState('');
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // API Key
    // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const inputColor = useColorModeValue('navy.700', 'white');
    const iconColor = useColorModeValue('brand.500', 'white');
    const bgIcon = useColorModeValue(
        'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
        'whiteAlpha.200',
    );
    const brandColor = useColorModeValue('brand.500', 'white');
    const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
    const gray = useColorModeValue('gray.500', 'white');
    const buttonShadow = useColorModeValue(
        '14px 27px 45px rgba(112, 144, 176, 0.2)',
        'none',
    );
    const textColor = useColorModeValue('navy.700', 'white');
    const placeholderColor = useColorModeValue(
        { color: 'gray.500' },
        { color: 'whiteAlpha.600' },
    );

   

    
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputOnSubmit(event.target.value);
    };
const handleGenerateQuiz = () => {
    
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
            router.push(`/chat/quiz?prompt=${encodeURIComponent(prompt)}`);
        }, 1000);
    }, 2000);
};

    return (
        <Flex
            w="100%"
            pt={{ base: '70px', md: '0px' }}
            direction="column"
            position="relative"
        >
            <Img
                src={Bg.src}
                position={'absolute'}
                w="350px"
                left="50%"
                top="50%"
                transform={'translate(-50%, -50%)'}
            />
            <Flex
                direction="column"
                mx="auto"
                w={{ base: '100%', md: '100%', xl: '100%' }}
                minH={{ base: '75vh', '2xl': '85vh' }}
                maxW="1000px"
                justifyContent="center"
            >
                {/* Chat Input */}
                <Flex
                    ms={{ base: '0px', xl: '60px' }}
                    mt="20px"
                    justifySelf={'flex-end'}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Input
                        minH="54px"
                        h="100%"
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="45px"
                        p="15px 20px"
                        me={{ base: '0px', md: '10px' }}
                        mb={{ base: '10px', md: '0px' }}
                        fontSize="sm"
                        fontWeight="500"
                        _focus={{ borderColor: 'none' }}
                        color={inputColor}
                        _placeholder={placeholderColor}
                        placeholder="e.g., Create a quiz about SQL basics"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button
                        variant="primary"
                        py="20px"
                        px="16px"
                        fontSize="sm"
                        borderRadius="45px"
                        ms="auto"
                        mx={{ base: 'auto', md: '0' }} // Center the button when small
                        w={{ base: '100%', md: '210px' }} // Full width on small screens
                        h="54px"
                        _hover={{
                            boxShadow:
                                '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                            _disabled: {
                                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                            },
                        }}
                        onClick={handleGenerateQuiz}
                        isLoading={loading ? true : false}
                    >
                        Submit
                    </Button>

                </Flex>

                <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mt="20px"
                >
                    {loading && (
                        <Text mt="10px" color={textColor}>
                            Your Quiz is Generating ...
                        </Text>
                    )}
                </Flex>

            </Flex>
        </Flex>
    );
}
