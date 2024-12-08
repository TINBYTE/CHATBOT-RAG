"use client"
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import FixedPlugin from "@/components/fixedPlugin/FixedPlugin";
import AuthNavbar from "@/components/navbar/NavbarAuth";
import HeaderLinks from "@/components/navbar/NavbarLinksAdmin";
import Footer from "@/components/footer/FooterAuthCentered";

export default function HeroSection() {
  const { isOpen, onToggle } = useDisclosure();

  //
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  let menuBg = useColorModeValue('white', 'navy.800');

  return (
    <Box minH="100vh" bg={menuBg}>
      {/* Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        py={7}
        px={4}
        bg={menuBg}
        shadow="md"
        borderRadius={'5%'}
      >
        <Image src="/favicon.ico" h={9} alt="Logo" />
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={12}
          color="gray.900"
        >
          {['Product', 'Features', 'Pricing', 'Company'].map((item) => (
            <Link key={item} fontSize="sm" fontWeight="medium" href="/+{}" color={textColor}>
              {item}
            </Link>
          ))}
        </Flex>

        <Flex display={{ base: "none", md: "flex" }} gap={8} align="center">
          <Link href="/auth/register">
            <Text
              color={textColorBrand}
              as="span"
              ms="5px"
              fontWeight="500"
            >
              Sign Up
            </Text>
          </Link>
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
        </Flex>

        <Button
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant="ghost"
        >
          <HamburgerIcon />
        </Button>

        {isOpen && (
          <Box
            pos="absolute"
            top="100%"
            w="full"
            bg="white"
            shadow="md"
            p={4}
            rounded="xl"
            zIndex={1}
          >
            <Stack spacing={3}>
              {['Product', 'Features', 'Pricing', 'Company'].map((item) => (
                <Link
                  key={item} fontSize="sm" fontWeight="medium" href="#" color={textColorBrand}>
                  {item}
                </Link>
              ))}
              <Button variant="ghost" fontSize="sm" color="black">
                Log In
              </Button>
              <Button
                bg="purple.500"
                color="white"
                px={4}
                py={2}
                rounded="xl"
                _hover={{ bg: "purple.600" }}
                _focus={{ bg: "purple.700" }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        )}
      </Flex>

      {/* Hero Section */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        my={12}
        px={4}
        mx="auto"
        maxW="container.lg"
      >
        {/* Text Section */}
        <Box textAlign={{ base: "center", lg: "left" }} mb={8}>
          <Flex
            justify={{ base: "center", lg: "flex-start" }}
            align="center"
            mb={4}
          >
            <Image src="/favicon.ico" h={10} alt="logo" />
            <Text ml={2} mt={4} fontSize="md" fontWeight="bold" color={textColor}>
              Ultimate Quiz Generator
            </Text>
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight="extrabold"
            mb={8}
            color="textColor"
            lineHeight="short"
          >
            Elevate your learning experience with ASK-RAG: Your ultimate quiz and feedback platform
          </Heading>

          <Text
            fontSize="base"
            fontWeight="medium"
            color={textColorDetails}
            mb={10}
            maxW="lg"
          >
            Save countless hours building a platform from scratch. ASK-RAG delivers the fastest, most intuitive, and cutting-edge solution for quizzes and feedback. Try it now!
          </Text>

          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={4}
          >
            <Link 
              href="/chat" 
              bg="purple.500" 
              px={10} 
              rounded="xl" py={4} 
              _hover={{ bg: "purple.600" }}
              _focus={{ bg: "purple.700" }}
              >
              <Text

                color={textColor}
                as="span"
                ms="5px"
                fontWeight="500"
              >
                CHAT NOW
              </Text>
            </Link>

          </Flex>
        </Box>


      </Flex>
      <FixedPlugin />
      <Footer />
    </Box>
  );
}
