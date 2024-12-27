'use client';

import { 
  Button, 
  Flex, 
  FormControl, 
  Text, 
  useColorModeValue, 
  useToast,
  Container,
  VStack,
  Box,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  useDisclosure,
  Alert,
  AlertIcon,
  Divider
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, LockIcon } from '@chakra-ui/icons';
import Card from '@/components/card/Card';
import InputField from '@/components/fields/InputField';
import { useEffect, useState } from 'react';

export default function Settings() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const cardBg = useColorModeValue('white', 'navy.800');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('admin@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  
  const { isOpen: showOldPassword, onToggle: toggleOldPassword } = useDisclosure();
  const { isOpen: showNewPassword, onToggle: toggleNewPassword } = useDisclosure();
  const { isOpen: showConfirmPassword, onToggle: toggleConfirmPassword } = useDisclosure();

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

  const validatePasswords = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all password fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirmation do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'New password must be at least 8 characters long.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePasswords()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/profile/setpassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Clear form after successful password change
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: 'Error',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while changing the password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Card bg={cardBg} boxShadow="xl" borderRadius="2xl">
        <VStack spacing={6} align="stretch" p={6}>
          <Flex align="center" gap={3}>
            <Icon as={LockIcon} w={6} h={6} color="blue.500" />
            <Box>
              <Heading size="md" color={textColorPrimary}>
                Change Password
              </Heading>
              <Text color={textColorSecondary} fontSize="sm" mt={1}>
                Ensure your account is secure with a strong password
              </Text>
            </Box>
          </Flex>

          <Divider borderColor={borderColor} />

          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm">
              Your password should be at least 8 characters long and include a mix of letters, numbers, and symbols.
            </Text>
          </Alert>

          <FormControl>
            <VStack spacing={4}>
              <InputGroup size="lg">
                <InputField
                  label="Current Password"
                  placeholder="Enter your current password"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={toggleOldPassword}
                    aria-label={showOldPassword ? 'Hide password' : 'Show password'}
                    icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>

              <InputGroup size="lg">
                <InputField
                  label="New Password"
                  placeholder="Enter your new password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={toggleNewPassword}
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>

              <InputGroup size="lg">
                <InputField
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={toggleConfirmPassword}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </VStack>
          </FormControl>

          <Flex justify="center" pt={4}>
            <Button
              colorScheme="blue"
              size="lg"
              width={{ base: 'full', md: 'auto' }}
              minW="200px"
              isLoading={isLoading}
              loadingText="Changing Password..."
              onClick={handleChangePassword}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Change Password
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Container>
  );
}