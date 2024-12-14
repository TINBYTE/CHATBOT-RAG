'use client'
// Chakra imports
import { Flex, Select, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '@/components/card/Card';
import { NextAvatar } from '@/components/image/Avatar';
import { Image } from '@/components/image/Image';

export default function Settings(props: {
  name: string;
  avatar: string;
  banner: string;
}) {
  const { name, avatar, banner } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
      <Card mb="20px" alignItems="center">
          <Image src={banner} borderRadius="16px" alt="" />
          <NextAvatar
              mx="auto"
              src={avatar}
              h="87px"
              w="87px"
              mt="-43px"
              mb="15px"
          />
          <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700">
              {name}
          </Text>
      </Card>
  );
}
