'use client';
// Chakra imports
import { Flex, useColorModeValue, Image, Text } from '@chakra-ui/react';



export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex justify="center" align="center" h="10%">
      <Image src="/favicon.ico" h="26px" w="26px" alt="Logo" />
      <Text ml="2" fontSize="lg" fontWeight="bold" color={logoColor}>
      RQG
      </Text>
    </Flex>
  
  );
}

export default SidebarBrand;
