'use client';
// Chakra imports
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
//import Footer from ''; // Ensure the path is correct or the file exists
import FixedPlugin from '@/components/fixedPlugin/FixedPlugin';
// Custom components
// Assets
import { FaChevronLeft } from 'react-icons/fa';
import NavLink from '@/components/link/NavLink';
import { PropsWithChildren } from 'react';
import Footer from '@/components/footer/FooterAuthDefault';

interface DefaultAuthLayoutProps extends PropsWithChildren {
  children: JSX.Element;
  illustrationBackground: string;
}

export default function DefaultAuthLayout(props: DefaultAuthLayoutProps) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: 'initial',
          md: 'unset',
          lg: '100vh',
          xl: '97vh',
        }}
        w="100%"
        maxW={{ md: '66%', lg: '1313px' }}
        mx="auto"
        pt={{ sm: '50px', md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
        justifyContent="start"
        direction="column"
      >
        <NavLink
          href="/admin/dashboards/default"
          styles={{
            width: 'fit-content',
            marginTop: '40px',
          }}
        >
          <Flex
            align="center"
            ps={{ base: '25px', lg: '0px' }}
            pt={{ lg: '0px', xl: '0px' }}
            w="fit-content"
          >
            <Icon
              as={FaChevronLeft}
              me="12px"
              h="13px"
              w="8px"
              color="secondaryGray.600"
            />
            <Text ms="0px" fontSize="sm" color="secondaryGray.600">
              Back to Dashboard
            </Text>
          </Flex>
        </NavLink>
        {children}
        <Box
          display={{ base: 'none', md: 'block' }}
          h="100%"
          minH="100vh"
          w={{ lg: '50vw', '2xl': '44vw' }}
          position="absolute"
          right="0px"
          bgGradient="linear(to-b, brand.400, brand.600)"
          borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="end"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
          />
        </Box>
        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}
