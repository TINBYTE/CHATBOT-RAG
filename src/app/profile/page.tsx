'use client'


// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
// Assets
import banner from '@/public/img/auth/banner.png';
import profile from '@/public/img/crm/vbz.png';

// Custom components
import Info from '@/components/admin/main/profile/settings/Info';
import Password from '@/components/admin/main/profile/settings/Password';
import Profile from '@/components/admin/main/profile/settings/Profile';

import { UserProvider, useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Settings() {
    const router = useRouter();
    const { user } = useUser();
    useEffect(() => {
        const usertoken = localStorage.getItem('usertoken');
        if (!usertoken) {
            router.push('/auth/login');
        }
    }, [router]);

     {/*<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex direction="column" flex="1">
                
                <Profile name={user?.username || 'Guest'} avatar={profile.src} banner={banner.src} />
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} flex="1" mt="20px">
                
                <Flex direction="column" flex="1" mr={{ base: '0', md: '10px' }} mb={{ base: '10px', md: '0' }}>
                    <Info />
                </Flex>
                <Flex direction="column" flex="1" ml={{ base: '0', md: '10px' }}>
                    <Password />
                </Flex>
            </Flex>
        </Box>*/}
    return (
       
        
      (  <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
  <Flex
    direction="column"
    align="center" // Centers the content horizontally
    justify="center" // Centers the content vertically
    minH="calc(100vh - 130px)" // Ensures the content takes up the full viewport height, minus the top padding
  >
    {/* Top Section */}
    <Flex direction="column" w={{ base: '90%', md: '70%', lg: '50%' }} mb="20px">
      <Profile name={user?.username || 'Guest'} avatar={profile.src} banner={banner.src} />
    </Flex>

    {/* Bottom Section */}
    <Flex
      direction={{ base: 'column', md: 'row' }}
      w={{ base: '90%', md: '70%', lg: '50%' }}
      gap="10px"
    >
      <Flex direction="column" flex="1" mb={{ base: '10px', md: '0' }}>
        <Info />
      </Flex>
      <Flex direction="column" flex="1">
        <Password />
      </Flex>
    </Flex>
  </Flex>
</Box>
    )

    );
}
