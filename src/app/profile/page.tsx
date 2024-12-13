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

import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Settings() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    const { user } = useUser();
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex direction="column" flex="1">
                {/* Top Flex - Takes all the space */}
                <Profile name={user?.username || 'Guest'} avatar={profile.src} banner={banner.src} />
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} flex="1" mt="20px">
                {/* Bottom Flexes - Share the space */}
                <Flex direction="column" flex="1" mr={{ base: '0', md: '10px' }} mb={{ base: '10px', md: '0' }}>
                    <Info />
                </Flex>
                <Flex direction="column" flex="1" ml={{ base: '0', md: '10px' }}>
                    <Password />
                </Flex>
            </Flex>
        </Box>


    );
}
