import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { showInfo } from '../utils/toast';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  initializeDemoUsers,
} from '../utils/mockAuth';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  city: string;
  university: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize demo users for testing
    initializeDemoUsers();

    // Check if user is already logged in (from localStorage)
    const currentUser = getCurrentUser();
    if (currentUser) {
    setUser(currentUser);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const loggedInUser = loginUser(email, password);
    setUser(loggedInUser);
  };

  const register = async (userData: RegisterData) => {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = registerUser(userData);
    setUser(newUser);
  };

  const logout = async () => {
    logoutUser();
    setUser(null);
    showInfo('Başarıyla çıkış yaptınız. Görüşmek üzere! 👋');
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

