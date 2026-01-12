import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'organization' | 'manager' | 'collector' | 'client' | 'auditor';

export interface AuthUser {
  id: string;
  email: string;
  organizationSubdomain: string;
  organizationName: string;
  role: UserRole;
  name: string;
  phone?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, subdomain: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  setDemoUser: (orgName: string, role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Restore user from localStorage on mount
    const stored = localStorage.getItem('procollector_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, subdomain: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, subdomain })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const user = data.data.user;
        const authUser: AuthUser = {
          id: user.id,
          email: user.email,
          organizationSubdomain: user.organization?.subdomain || subdomain,
          organizationName: user.organization?.name || subdomain.charAt(0).toUpperCase() + subdomain.slice(1),
          role: user.role,
          name: user.name,
          phone: user.phone,
          isDemo: false
        };

        localStorage.setItem('procollector_user', JSON.stringify(authUser));
        localStorage.setItem('procollector_auth_token', data.data.token);
        setUser(authUser);
        setIsLoading(false);
        return true;
      } else {
        console.error('Login failed:', data.error);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const setDemoUser = (orgName: string, role: UserRole) => {
    const demoUser: AuthUser = {
      id: `demo-${Date.now()}`,
      email: `demo@${orgName.toLowerCase().replace(/\s+/g, '')}.com`,
      organizationSubdomain: orgName.toLowerCase().replace(/\s+/g, ''),
      organizationName: orgName,
      role,
      name: `${orgName} Demo User`,
      isDemo: true
    };

    localStorage.setItem('procollector_user', JSON.stringify(demoUser));
    localStorage.setItem('procollector_auth_token', 'demo-token-' + Date.now());
    
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem('procollector_user');
    localStorage.removeItem('procollector_auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading, setDemoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
