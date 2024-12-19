import { Icon } from '@/lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';

// Auth Imports
import { IRoute } from './types/navigation';

import { Quiz } from '@/app/types/db';


const routes: IRoute[] = [
  {
    name: 'New Quiz',
    path: '/chat',
    icon: (
      <Icon as={MdAutoAwesome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'History',
    path: '/history',
    icon: (
      <Icon as={LuHistory} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Profile Settings',
    path: '/settings',
    icon: (
      <Icon as={MdOutlineManageAccounts} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  
  {
    name: 'Quiz',
    disabled: true,
    invisible: true,
    path: '/quiz',
    icon: (
      <Icon as={MdAutoAwesome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  
  
  {
    name: 'FAQs Content',
    disabled: true,
    path: '/faq',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  
];

export default routes;
