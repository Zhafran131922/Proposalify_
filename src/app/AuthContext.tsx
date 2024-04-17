// context/AuthContext.tsx

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import app from '@/app/firebase';
import DefaultProfileIcon from '../../components/DefaultProfileIcon';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  user: User | null;
  userProfileIcon: React.ReactNode;
  signOutUser: () => Promise<void>; // Tambahkan properti signOutUser
}

const auth = getAuth(app);

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfileIcon, setUserProfileIcon] = useState<React.ReactNode>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
  
      if (authUser && authUser.photoURL) {
        console.log("User Photo URL:", authUser.photoURL);
        setUserProfileIcon(<img src={authUser.photoURL} alt="Profile" className="h-6 w-6 rounded-full" />);
      } else {
        setUserProfileIcon(<DefaultProfileIcon />);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const signOutUser = async () => {
    await signOut(auth);
  };

  const contextValue: AuthContextValue = {
    user,
    userProfileIcon,
    signOutUser, 
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}