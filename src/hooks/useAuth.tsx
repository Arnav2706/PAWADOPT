// src/hooks/useAuth.tsx
// Custom hook for managing authentication state

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    if (token && userId && userName) {
      setUser({
        id: userId,
        name: userName,
        email: '', // Can be fetched from API if needed
        role: userRole || 'user',
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    
    setUser({
      id: response.userId,
      name: response.name,
      email: email,
      role: response.role || 'user',
    });
  };

  const register = async (name: string, email: string, password: string) => {
    await authAPI.register({ name, email, password });
    // Auto-login after registration
    await login(email, password);
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

// Example usage in a component:
/*
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => login('email', 'pass')}>Login</button>;
}
*/