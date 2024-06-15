import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Axios from 'axios';
import DefaultProfileIcon from '../../components/DefaultProfileIcon'; // Sesuaikan jalur impor

interface AuthContextProps {
  children: ReactNode;
}

interface User {
  email: string;
  photoURL?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/auth/login/user', {
        email,
        password,
      });
      setUser({ email, photoURL: response.data.photoURL });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
