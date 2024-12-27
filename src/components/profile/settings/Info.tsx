'use client'

import {
  Button,
  Flex,
  FormControl,
  Text,
  useColorModeValue,
  VStack,
  Container,
  Divider,
  useToast,
  Box,
  HStack,
  Icon
} from '@chakra-ui/react';
import { SettingsIcon, EmailIcon, InfoIcon } from '@chakra-ui/icons';
import Card from '@/components/card/Card';
import InputField from '@/components/fields/InputField';
import { useState, useEffect } from 'react';

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('gray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  const [email, setEmail] = useState('Guest@example.com');
  const [username, setUsername] = useState('Guest');
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if (token) {
      try {
        const userData = JSON.parse(token);
        setEmail(userData.email);
        setUsername(userData.username);
      } catch (error) {
        console.error('Failed to parse user token', error);
        toast({
          title: 'Error loading user data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [toast]);

  return (
    <Container maxW="container.lg" py={8}>
      <Card
        bg={cardBg}
        boxShadow="xl"
        borderRadius="2xl"
        p={{ base: 6, md: 8 }}
      >
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <Flex direction="column" gap={2}>
            <HStack spacing={3}>
              <SettingsIcon w={6} h={6} color={iconColor} />
              <Text fontSize="2xl" color={textColorPrimary} fontWeight="bold">
                Account Settings
              </Text>
            </HStack>
            <Text fontSize="md" color={textColorSecondary}>
              Here you can view your account information
            </Text>
          </Flex>

          <Divider borderColor={dividerColor} />

          {/* Form Section */}
          <FormControl as="form">
            <VStack spacing={6} align="stretch">
              {/* Username Field */}
              <Box>
                <HStack mb={2}>
                  <InfoIcon w={5} h={5} color={iconColor} />
                  <Text fontSize="md" fontWeight="medium" color={textColorPrimary}>
                    User Information
                  </Text>
                </HStack>
                <InputField
                  id="username"
                  label="Username"
                  value={username}
                  isDisabled
                  placeholder="Enter username"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderColor={dividerColor}
                  _disabled={{
                    opacity: 0.7,
                    cursor: 'not-allowed',
                    borderColor: dividerColor,
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <HStack mb={2}>
                  <EmailIcon w={5} h={5} color={iconColor} />
                  <Text fontSize="md" fontWeight="medium" color={textColorPrimary}>
                    Contact Information
                  </Text>
                </HStack>
                <InputField
                  id="email"
                  label="Email Address"
                  value={email}
                  isDisabled
                  placeholder="Enter email address"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderColor={dividerColor}
                  _disabled={{
                    opacity: 0.7,
                    cursor: 'not-allowed',
                    borderColor: dividerColor,
                  }}
                />
              </Box>
            </VStack>
          </FormControl>

          {/* Footer Section */}
          <Box pt={4}>
            <Text fontSize="sm" color={textColorSecondary}>
              This information is read-only and cannot be modified. Contact support if you need to update your account details.
            </Text>
          </Box>
        </VStack>
      </Card>
    </Container>
  );
}