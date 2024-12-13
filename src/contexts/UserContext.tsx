import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id?: string;
  email?: string;
  username?: string;
  // Add more fields as necessary
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void; // Add logout to the context
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
