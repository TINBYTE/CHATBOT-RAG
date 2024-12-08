'use client'

import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from '@/components/link/Link';

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white');
  return (
      <Flex
          w={{ base: '100%', xl: '1170px' }}
          maxW={{ base: '90%', xl: '1170px' }}
          zIndex="1.5"
          flexDirection={{
              base: 'column',
              xl: 'row',
          }}
          alignItems={{
              base: 'center',
              xl: 'start',
          }}
          justifyContent="center"
          px={{ base: '0px', xl: '0px' }}
          pb="30px"
          mx="auto"
      >
          <Text
              color={textColor}
              textAlign={{
                  base: 'center',
                  xl: 'start',
              }}
              mb={{ base: '20px', xl: '0px' }}
          >
              {' '}
              &copy; {new Date().getFullYear()}
              <Text as="span" fontWeight="500" ms="4px">
                  MASD TEAM.
              </Text>
          </Text>
          
      </Flex>
  );
}
