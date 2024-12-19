'use client';
// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Image, Text, Box } from '@chakra-ui/react';
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Flex align="center" justify="center" py={6}>
        <Image
          src="favicon.svg" // Replace with your logo path in the public folder
          alt="ASK BASE LOGO"
          boxSize="56px" // Equivalent to w-14 h-14
          mr={3}
        />
        <Text fontSize="2xl" fontWeight="bold">
          ASK<Box as="span" color="#F9C650">.Base</Box>
        </Text>
      </Flex>
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
