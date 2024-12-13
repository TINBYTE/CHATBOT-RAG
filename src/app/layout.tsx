'use client'
import React, {ReactNode} from "react";
import AppWrappers from "./AppWrappers";
import { UserProvider } from '@/contexts/UserContext';
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <html lang="en">
          <body id={'root'}>
              <AppWrappers>
                <UserProvider>
                  {children}
                </UserProvider>
              </AppWrappers>
          </body>
      </html>
  );
}
