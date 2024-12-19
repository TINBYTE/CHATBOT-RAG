'use client';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import Link from '@/components/link/Link';

import { Image } from '@/components/image/Image';

// Custom components
import { SidebarResponsive } from '@/components/sidebar/Sidebar';
import { SidebarContext } from '@/contexts/SidebarContext';

// Assets
import dropdownMain from '@/public/img/layout/dropdownMain.png';
import dropdown from '@/public/img/layout/dropdown.png';
import { GoChevronDown } from 'react-icons/go';
import routes from '@/routes';
import { IRoute } from '@/types/navigation';

export default function AuthNavbar(props: {
  logo?: JSX.Element | string;
  logoText?: string;
  secondary?: boolean;
  sidebarWidth?: any;
}) {
  const { logoText, sidebarWidth } = props;
  // Menu States
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  const {
    isOpen: isOpenMain,
    onOpen: onOpenMain,
    onClose: onCloseMain,
  } = useDisclosure();
  const {
    isOpen: isOpenNft,
    onOpen: onOpenNft,
    onClose: onCloseNft,
  } = useDisclosure();
  // Menus
  
  
  let authObject: any[] = []; // Initialize with an empty array or appropriate any[] value
  let mainObject: IRoute[] = []; // Initialize with an empty array or appropriate IRoute[] value
  let dashboardsObject: IRoute[] = []; // Initialize with an empty array or appropriate IRoute[] value
  let nftsObject: IRoute[] = []; // Initialize with an empty array or appropriate IRoute[] value
  let logoColor = useColorModeValue('white', 'white');
  // Chakra color mode

  const textColor = useColorModeValue('navy.700', 'white');
  let menuBg = useColorModeValue('white', 'navy.900');
  let mainText = '#fff';
  let navbarBg = 'none';
  let navbarShadow = 'initial';
  let bgButton = 'white';
  let colorButton = 'brand.500';
  let navbarPosition = 'absolute' as 'absolute';

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Stack
        direction="row"
        spacing="12px"
        alignItems="center"
        justify="center"
      >
        <Image src="favicon.svg" h="26px" w="26px" alt="Logo" />
      </Stack>
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW="175px"
        href={`${process.env.PUBLIC_URL}/#/`}
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <Image src="favicon.svg" h="26px" w="26px" alt="Logo" />
      </Link>
    );
  }
  const createNftsLinks = (routes: IRoute[]): any => {
    return routes.map((link, key) => {
      return (
        <Link
          key={key}
          href={link.layout + link.path}
          style={{ maxWidth: 'max-content' }}
        >
          <Text color="gray.400" fontSize="sm" fontWeight="500">
            {link.name}
          </Text>
        </Link>
      );
    });
  };
  const createDashboardsLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      return (
        <Link
          key={key}
          href={link.layout + link.path}
          style={{ maxWidth: 'max-content' }}
        >
          <Text color="gray.400" fontSize="sm" fontWeight="500">
            {link.name}
          </Text>
        </Link>
      );
    });
  };
  const createMainLinks = (routes: IRoute[]) => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxW="max-content">
            <Stack
              direction="row"
              spacing="0px"
              alignItems="center"
              cursor="default"
            >
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="sm"
                me="auto"
                color={textColor}
              >
                {link.name}
              </Text>
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {link.items && createMainLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <Link key={key} href={link.layout + link.path}>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              {link.name}
            </Text>
          </Link>
        );
      }
    });
  };
  const createAuthLinks = (routes: any[]) => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxW="max-content">
            <Stack
              direction="row"
              spacing="0px"
              alignItems="center"
              cursor="default"
            >
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="sm"
                me="auto"
                color={textColor}
              >
                {link.name}
              </Text>
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {createAuthLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <Link key={key} href={link.layout + link.path}>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              {link.name}
            </Text>
          </Link>
        );
      }
    });
  };
  const linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }} spacing="20px">
      <Stack
        direction="row"
        spacing="4px"
        alignItems="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenDashboards}
        onMouseLeave={onCloseDashboards}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Dashboards
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenDashboards}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid columns={1} gap="8px" w="150px">
              {dashboardsObject && createDashboardsLinks(dashboardsObject)}
            </SimpleGrid>
            <Image
              w="110px"
              h="110px"
              borderRadius="16px"
              src={dropdown}
              alt=""
            />
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        alignItems="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenNft}
        onMouseLeave={onCloseNft}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          NFTs
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenNft}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid columns={1} gap="8px" w="150px">
              {nftsObject && createNftsLinks(nftsObject)}
            </SimpleGrid>
            <Image
              w="110px"
              h="110px"
              borderRadius="16px"
              src={dropdown}
              alt=""
            />
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        alignItems="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenMain}
        onMouseLeave={onCloseMain}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Main Pages
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenMain}>
          <MenuList
            bg={menuBg}
            p="18px"
            ps="24px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid
              me="50px"
              columns={2}
              alignItems="start"
              minW="280px"
              gap="24px"
            >
              {createMainLinks(mainObject)}
            </SimpleGrid>
            <Image borderRadius="16px" src={dropdownMain} alt="" />
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        alignItems="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Authentications
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenAuth}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            top="30px"
            left="-10px"
            display="flex"
            w="max-content"
          >
            <SimpleGrid
              me="20px"
              columns={2}
              alignItems="start"
              minW="180px"
              gap="24px"
            >
              {createAuthLinks(authObject)}
            </SimpleGrid>
            <Image borderRadius="16px" src={dropdown} alt="" />
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top="16px"
        left="50%"
        transform="translate(-50%, 0px)"
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius="15px"
        px="16px"
        py="22px"
        mx="auto"
        width="1044px"
        maxW="90%"
        alignItems="center"
        zIndex="3"
      >
        <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }}>
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent="center"
            alignItems="center"
          >
            <SidebarResponsive routes={routes} />
          </Box>
          {linksAuth}
          <Link href="#">
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize="xs"
              variant="no-effects"
              borderRadius="50px"
              px="45px"
              display={{
                sm: 'none',
                lg: 'flex',
              }}
            >
              Buy Now
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}
