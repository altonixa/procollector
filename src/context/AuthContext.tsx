import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'collector';
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Simulated authentication with demo credentials
      if (email === 'admin@gmail.com' && password === '123456') {
        const adminUser = {
          id: '1',
          email: 'admin@gmail.com',
          role: 'admin' as const,
          name: 'Admin User'
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        setUserRole('admin');
        return true;
      } else if (email === 'collector@gmail.com' && password === '123456') {
        const collectorUser = {
          id: '2',
          email: 'collector@gmail.com',
          role: 'collector' as const,
          name: 'Collector User'
        };
        setUser(collectorUser);
        setIsAuthenticated(true);
        setUserRole('collector');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}