'use client';
import React, { ReactNode } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import initialTheme from '@/theme/theme';
import { useState } from 'react';
import { ConfiguratorContext } from '@/contexts/ConfiguratorContext';

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {
  const [mini, setMini] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  return (
    // @ts-ignore
    <NoSSR>
      <ConfiguratorContext.Provider
        value={{
          mini,
          setMini,
          theme,
          setTheme,
          hovered,
          setHovered,
          contrast,
          setContrast,
        }}
      >
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ConfiguratorContext.Provider>
    </NoSSR>
  );
}
