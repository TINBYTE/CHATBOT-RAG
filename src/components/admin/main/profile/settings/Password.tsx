'use client'
// Chakra imports
import { Button, Flex, FormControl, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import InputField from '@/components/fields/InputField';
import { useEffect, useState } from 'react';

export default function Settings() {
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'secondaryGray.600';
    const toast = useToast();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

	const [email, setEmail] = useState('admin@gmail.com');

    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        if (token) {
            try {
                const userData = JSON.parse(token);
                setEmail(userData.email);
            } catch (error) {
                console.error('Failed to parse user token', error);
            }
        }
    }, []);

    const handleChangePassword = async () => {
		console.log('oldPassword:', oldPassword);
		
        if (newPassword !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'New password and confirmation do not match.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch('/api/profile/setpassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while changing the password.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <FormControl>
            <Card>
                <Flex direction='column' mb='40px' ms='10px'>
                    <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                        Change password
                    </Text>
                    <Text fontSize='md' color={textColorSecondary}>
                        Here you can set your new password
                    </Text>
                </Flex>
                <FormControl>
                    <Flex flexDirection='column'>
                        <InputField mb='25px' id='old' label='Old Password' placeholder='@john123' type='password' value={oldPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)} />
                        <InputField mb='25px' id='new' label='New Password' placeholder='@john123' type='password' value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                        <InputField mb='25px' id='confirm' label='New Password Confirmation' placeholder='@john123' type='password' value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                    </Flex>
                </FormControl>
                <Flex justifyContent='center'>
                    <Button variant='brand' minW='183px' fontSize='sm' fontWeight='500' onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </Flex>
            </Card>
        </FormControl>
    );
}
