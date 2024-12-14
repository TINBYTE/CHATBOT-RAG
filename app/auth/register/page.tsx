'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import Link from '@/components/link/Link';
import CenteredAuth from '@/components/auth/variants/CenteredAuthLayout/page';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();
  
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [alert, setAlert] = useState<{ visible: boolean; type: 'success' | 'error' | 'info' | 'warning' | undefined; message: string }>({ visible: false, type: undefined, message: '' });
  const [loading, setLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert({ visible: true, type: 'success', message: 'User registered successfully!' });
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        setAlert({ visible: true, type: 'error', message: data.message.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ visible: true, type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };



  return (
    <CenteredAuth
      cardTop={{ base: '140px', md: '5vh' }}
      cardBottom={{ base: '50px', lg: '50px' }}
    >
      <>
        {alert.visible && (
          <Alert status={alert.type} mb="4">
            <AlertIcon />
            <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}:</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <Flex
          maxW="max-content"
          mx={{ base: 'auto', lg: '0px' }}
          me="auto"
          justifyContent="center"
          px={{ base: '20px', md: '0px' }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading
              color={textColor}
              fontSize={{ base: '34px', lg: '36px' }}
              mb="10px"
            >
              Sign Up
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your username, email and password to sign up!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: '100%', md: '420px' }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: 'auto', lg: 'unset' }}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
          >
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Username<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  type="text"
                  placeholder="bydevmar"
                  mb="24px"
                  size="lg"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />

                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  type="email"
                  placeholder="mail@fpo.com"
                  mb="24px"
                  size="lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: '0px', md: '4px' }}
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>

                <Button
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  type="submit"
                  isDisabled={loading}
                >
                  {loading ? 'Signing up...' : 'Create my account'}
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="sm">
                Already a member?
                <Link href="/auth/login">
                  <Text
                    color={textColorBrand}
                    as="span"
                    ms="5px"
                    fontWeight="500"
                  >
                    Sign in

                  </Text>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </>
    </CenteredAuth>
  );
}

export default Register;
