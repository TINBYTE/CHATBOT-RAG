import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import CryptoJS from 'crypto-js';
type User = {
  id: string;
  username: string;
  email: string;
  // Add any other properties of the user object
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'fallback-key';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const encryptedToken = localStorage.getItem('token');
    if (encryptedToken) {
      try {
        const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);
        if (decryptedToken) {
          fetch('/api/profile/getuser', {
            headers: { Authorization: `Bearer ${decryptedToken}` },
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to fetch user data');
              console.log("ressssssssssssssssssssssssssssss",res);
              
              return res.json();
            })
            .then((userData) => setUser(userData))
            .catch(() => localStorage.removeItem('token'));
        }
      } catch {
        console.error('Failed to decrypt token');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
