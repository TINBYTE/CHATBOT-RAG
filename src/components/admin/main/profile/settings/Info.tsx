'use client'
// Chakra imports
import { Button, Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import InputField from '@/components/fields/InputField';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';

export default function Settings() {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';

	const { user } = useUser();

	const [email, setEmail] = useState(user?.email || 'Gest@example.com');
	const [username, setUsername] = useState(user?.username || 'Gest')


	return (
		<FormControl>
			<Card>
				<Flex direction='column' mb='40px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Account Settings
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change user account information
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<InputField 
						mb='25px' 
						me='30px' 
						id='username' 
						label='Username' 
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
					<InputField
						mb='25px'
						id='email'
						label='Email Address'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					<InputField mb='25px' me='30px' id='first_name' label='First Name' placeholder='John' />
					<InputField mb='25px' id='last_name' label='Last Name' placeholder='Doe' />
				</SimpleGrid>
				<Flex justify='center' mt='25px'>
					<Button variant='brand' minW='183px' fontSize='sm' fontWeight='500'>
						Save changes
					</Button>
				</Flex>
			</Card>
		</FormControl>
	);
}
