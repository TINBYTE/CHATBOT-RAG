'use client'
// Chakra imports
import { Button, Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import InputField from '@/components/fields/InputField';
import { useState, useEffect } from 'react';

export default function Settings() {
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'secondaryGray.600';

    const [email, setEmail] = useState('Gest@example.com');
    const [username, setUsername] = useState('Gest');

    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        if (token) {
            try {
                const userData = JSON.parse(token);
                setEmail(userData.email);
                setUsername(userData.username);
            } catch (error) {
                console.error('Failed to parse user token', error);
            }
        }
    }, []);

    return (
        <FormControl >
            <Card pb="140px">
                <Flex direction='column' mb='40px' ms='10px'>
                    <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                        Account Settings
                    </Text>
                    <Text fontSize='md' color={textColorSecondary}>
                        Here you can change user account information
                    </Text>
                </Flex>
                <FormControl>
                    <Flex flexDirection='column'>
                        <InputField 
                            mb='25px' 
                            me='30px' 
                            id='username' 
                            label='Username' 
                            value={username}
                            isDisabled
                            />
                        <InputField
                            mb='25px'
                            id='email'
                            label='Email Address'
                            value={email}
                            isDisabled
                         />
                    </Flex>
                </FormControl>
            </Card>
        </FormControl>
    );
}
