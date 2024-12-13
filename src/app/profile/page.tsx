'use client'


// Chakra imports
import { Box, Flex } from '@chakra-ui/react';
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
import CryptoJS from 'crypto-js';
export default function Settings() {
    const { user } = useUser();
    const router = useRouter();
    const { setUser } = useUser();
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'fallback-key';

    useEffect(() => {
        const encryptedToken = localStorage.getItem('token');
        if (!encryptedToken) {
          router.push('/auth/login');
        } else {
          try {
            const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);
            if (!decryptedToken) throw new Error('Decrypted token is empty');
            
            const user = JSON.parse(decryptedToken); // Ensure valid JSON
            setUser(user);
          } catch (error) {
            if (error instanceof Error) {
              console.error('Error decrypting or parsing token:', error.message);
            } else {
              console.error('Error decrypting or parsing token:', error);
            }
            localStorage.removeItem('token'); // Clear invalid token
            router.push('/auth/login');
          }
        }
      }, [router]);

    
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
