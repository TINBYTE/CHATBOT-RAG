import { Icon } from '@chakra-ui/react';
import {
  MdAddCircle,
  MdInsertChartOutlined,
} from 'react-icons/md';

// Auth Imports
import { IRoute } from '@/types/navigation';

import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';

const token = Cookies.get('accessJWT');
let userType: string | null = null;

if ( token ) {
  try {
    const decodedToken = decodeJwt(token);
    userType = decodedToken.userType as string;
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}

const routes: IRoute[] = [
  
  {
    name: 'CHAT',
    path: '/chat',
    icon: <Icon as={MdAddCircle} width="20px" height="20px" color="inherit" />,
    collapse: false ,
  },
  {
    name: 'History Chat',
    path: '/history',
    icon: <Icon as={MdInsertChartOutlined} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Chat 1',
        layout: '/history-chat',
        path: '/chat1',
      },
      {
        name: 'Chat 2',
        layout: '/history-chat',
        path: '/chat-2',
      },
      {
        name: 'Chat 3',
        layout: '/history-chat',
        path: '/chat-3',
      },
    ],
  }
];  

export default routes;