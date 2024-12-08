'use client';
// Chakra Imports
import { Button, Icon, useColorMode } from '@chakra-ui/react';
// Custom Icons
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { isWindowAvailable } from '@/utils/navigation';

export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      {...rest}
      h="60px"
      w="60px"
      zIndex="99"
      bgGradient="linear(to-b, brand.400, brand.600)"
      position="fixed"
      variant="no-effects"
      left={
        isWindowAvailable() && document.documentElement.dir === 'rtl'
          ? '35px'
          : ''
      }
      right={
        isWindowAvailable() && document.documentElement.dir === 'rtl'
          ? ''
          : '35px'
      }
      bottom="30px"
      border="0px solid"
      borderColor="#6A53FF"
      borderRadius="50px"
      onClick={toggleColorMode}
      display="flex"
      p="0px"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        h="24px"
        w="24px"
        color="white"
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
