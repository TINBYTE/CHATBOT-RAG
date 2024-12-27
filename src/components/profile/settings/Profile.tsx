'use client'

import {
  Box,
  Text,
  useColorModeValue,
  Container,
  VStack,
  Avatar,
  AvatarBadge,
  Image,
  SlideFade
} from '@chakra-ui/react';

interface SettingsProps {
  name: string;
  avatar: string;
  banner: string;
  role?: string;
  isOnline?: boolean;
}

export default function Settings({ 
  name, 
  avatar, 
  banner, 
  role = "User", 
  isOnline = true 
}: SettingsProps) {
  // Chakra Color Mode
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColorPrimary = useColorModeValue('gray.900', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.xl" py={8}>
      <SlideFade in={true} offsetY="20px">
        <VStack
          spacing={0}
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="xl"
          overflow="hidden"
          border="1px"
          borderColor={borderColor}
        >
          {/* Banner Image */}
          <Box position="relative" w="full" h={{ base: "150px", md: "200px" }}>
            <Image
              src={banner}
              alt="Profile Banner"
              objectFit="cover"
              w="full"
              h="full"
              fallbackSrc="https://via.placeholder.com/1000x300"
            />
          </Box>

          {/* Avatar Section */}
          <Box 
            position="relative" 
            mt="-50px"
            mb={6}
            zIndex={1}
          >
            <Avatar
              size="2xl"
              name={name}
              src={avatar}
              border="4px solid"
              borderColor={cardBg}
              boxShadow="lg"
            >
              {isOnline && (
                <AvatarBadge
                  boxSize="1.25em"
                  bg="green.500"
                  border="4px solid white"
                />
              )}
            </Avatar>
          </Box>

          {/* Profile Info */}
          <VStack spacing={2} px={8} pb={8}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color={textColorPrimary}
            >
              {name}
            </Text>
            <Text
              fontSize="md"
              color={textColorSecondary}
              textAlign="center"
            >
              {role}
            </Text>
          </VStack>
        </VStack>
      </SlideFade>
    </Container>
  );
}