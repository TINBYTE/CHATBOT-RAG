'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import CenteredAuth from '@/components/auth/variants/CenteredAuthLayout/page';
import NavLink from '@/components/link/NavLink';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
//import CryptoJS from 'crypto-js';

const Login: React.FC = () => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setUser } = useUser();
  //const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'fallback-key';

  useEffect(() => {
    const usertoken = localStorage.getItem('usertoken');
    if (usertoken) {
      try {
        //const decryptedToken = CryptoJS.AES.decrypt(authtoken, encryptionKey).toString(CryptoJS.enc.Utf8);
        router.push('/chat');
      } catch (error) {
        console.error('Failed auth token', error);
      }
    }
  }, [router]);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [alert, setAlert] = useState<{ visible: boolean; type: 'success' | 'error' | 'info' | 'warning' | undefined; message: string }>({ visible: false, type: undefined, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setAlert({ visible: true, type: 'error', message: 'Invalid credentials!!!' });
        setLoading(false);
        return;
      }

      // Fetch user data
      const userResponse = await fetch(`/api/profile/getuser?email=${email}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      localStorage.setItem('usertoken', JSON.stringify(userData));
      setUser(userData);

      setAlert({ visible: true, type: 'success', message: 'Bienvenue!' });
      router.push('/chat');
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setAlert({ visible: true, type: 'error', message: err.message });
      } else {
        setAlert({ visible: true, type: 'error', message: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <CenteredAuth
      cardTop={{ base: '140px', md: '14vh' }}
      cardBottom={{ base: '50px', lg: 'auto' }}
    >
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        justifyContent="center"
        px={{ base: '20px', md: '0px' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
              {alert.visible && (
                <Alert status={alert.type} mb="4">
                  <AlertIcon />
                  <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}:</AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              )}
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
                ms={{ base: '0px', md: '0px' }}
                type="email"
                placeholder="mail@fpo.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
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
                  fontSize="sm"
                  ms={{ base: '0px', md: '4px' }}
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? 'text' : 'password'}
                  variant="auth"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </FormControl>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink href="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              isLoading={loading ? true : false}
            >
              Sign In
            </Button>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink href="/auth/register">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </CenteredAuth>
  );
}

export default Login;
