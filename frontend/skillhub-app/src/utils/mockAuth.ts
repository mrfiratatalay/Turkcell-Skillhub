// Mock Authentication with LocalStorage
// Only for Login/Register - Other data comes from Backend API

import { User } from '../types';

const STORAGE_KEY = 'skillhub_users';
const CURRENT_USER_KEY = 'skillhub_current_user';

// Get all users from localStorage
export const getAllUsers = (): (User & { email: string; password: string })[] => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    if (!users) return [];
    return JSON.parse(users);
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users: (User & { email: string; password: string })[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Generate unique user ID
const generateUserId = (): string => {
  const users = getAllUsers();
  const maxId = users.length > 0 
    ? Math.max(...users.map(u => parseInt(u.userId.replace('U', '')))) 
    : 0;
  return `U${maxId + 1}`;
};

// Register new user (Mock - LocalStorage only)
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  city: string;
  university: string;
}): User => {
  const users = getAllUsers();

  // Check if email already exists
  const existingUser = users.find(u => u.email?.toLowerCase() === data.email.toLowerCase().trim());
  if (existingUser) {
    throw new Error('Bu e-posta adresi zaten kullanılıyor!');
  }

  // Create new user
  const newUser: User & { email: string; password: string } = {
    userId: generateUserId(),
    name: data.name,
    email: data.email.trim().toLowerCase(),
    password: data.password, // In real app, this should be hashed
    city: data.city,
    university: data.university,
    skillLevel: 'Beginner',
    totalPoints: 0,
    badgeCount: 0,
  };

  // Save to localStorage
  users.push(newUser);
  saveUsers(users);

  // Remove password from returned user object (security)
  const { password: _, ...userWithoutPassword } = newUser;

  // Set as current user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem('authToken', 'mock-token-' + newUser.userId);
  localStorage.setItem('currentUserId', newUser.userId);

  return userWithoutPassword as User;
};

// Login user (Mock - LocalStorage only)
export const loginUser = (email: string, password: string): User => {
  const users = getAllUsers();

  // Find user
  const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase().trim() && u.password === password);
  
  if (!user) {
    throw new Error('E-posta veya şifre hatalı!');
  }

  // Remove password from returned user object (security)
  const { password: _, ...userWithoutPassword } = user;

  // Set as current user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem('authToken', 'mock-token-' + user.userId);
  localStorage.setItem('currentUserId', user.userId);

  return userWithoutPassword as User;
};

// Get current user
export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error reading current user from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem(CURRENT_USER_KEY);
    return null;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUserId');
};

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Helper function to create email from name
const createEmailFromName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/\s+/g, '') // Remove spaces
    + '@skillhub.com';
};

// Clear all users (for testing/debugging)
export const clearAllUsers = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUserId');
};

// Initialize with database users if empty
export const initializeDemoUsers = (): void => {
  try {
    // Clear old demo users first (to ensure fresh start)
    const existingUsers = getAllUsers();
    const hasOldDemoUsers = existingUsers.some(u => 
      u.email?.includes('@test.com') || 
      (existingUsers.length > 0 && existingUsers.length < 15)
    );
    
    if (hasOldDemoUsers) {
      clearAllUsers();
    }
    
    const users = getAllUsers();
    
    if (users.length === 0) {
    // Database'deki tüm kullanıcılar (users.csv'den)
    const demoUsers: (User & { email: string; password: string })[] = [
      {
        userId: 'U1',
        name: 'Ayşe',
        email: createEmailFromName('Ayşe'),
        password: '123456',
        city: 'Istanbul',
        university: 'ITU',
        skillLevel: 'Beginner',
        totalPoints: 120,
        badgeCount: 2,
      },
      {
        userId: 'U2',
        name: 'Ali',
        email: createEmailFromName('Ali'),
        password: '123456',
        city: 'Ankara',
        university: 'METU',
        skillLevel: 'Intermediate',
        totalPoints: 250,
        badgeCount: 3,
      },
      {
        userId: 'U3',
        name: 'Deniz',
        email: createEmailFromName('Deniz'),
        password: '123456',
        city: 'Izmir',
        university: 'Ege University',
        skillLevel: 'Advanced',
        totalPoints: 400,
        badgeCount: 4,
      },
      {
        userId: 'U4',
        name: 'Mehmet',
        email: createEmailFromName('Mehmet'),
        password: '123456',
        city: 'Trabzon',
        university: 'KTU',
        skillLevel: 'Beginner',
        totalPoints: 80,
        badgeCount: 1,
      },
      {
        userId: 'U5',
        name: 'Zeynep',
        email: createEmailFromName('Zeynep'),
        password: '123456',
        city: 'Istanbul',
        university: 'Bogazici',
        skillLevel: 'Advanced',
        totalPoints: 550,
        badgeCount: 5,
      },
      {
        userId: 'U6',
        name: 'Burak',
        email: createEmailFromName('Burak'),
        password: '123456',
        city: 'Ankara',
        university: 'Hacettepe',
        skillLevel: 'Intermediate',
        totalPoints: 320,
        badgeCount: 3,
      },
      {
        userId: 'U7',
        name: 'Elif',
        email: createEmailFromName('Elif'),
        password: '123456',
        city: 'Izmir',
        university: 'DEU',
        skillLevel: 'Beginner',
        totalPoints: 95,
        badgeCount: 1,
      },
      {
        userId: 'U8',
        name: 'Can',
        email: createEmailFromName('Can'),
        password: '123456',
        city: 'Istanbul',
        university: 'YTU',
        skillLevel: 'Advanced',
        totalPoints: 480,
        badgeCount: 4,
      },
      {
        userId: 'U9',
        name: 'Selin',
        email: createEmailFromName('Selin'),
        password: '123456',
        city: 'Antalya',
        university: 'Akdeniz University',
        skillLevel: 'Intermediate',
        totalPoints: 210,
        badgeCount: 2,
      },
      {
        userId: 'U10',
        name: 'Murat',
        email: createEmailFromName('Murat'),
        password: '123456',
        city: 'Bursa',
        university: 'Uludag University',
        skillLevel: 'Beginner',
        totalPoints: 150,
        badgeCount: 2,
      },
      {
        userId: 'U11',
        name: 'Aylin',
        email: createEmailFromName('Aylin'),
        password: '123456',
        city: 'Eskisehir',
        university: 'Anadolu University',
        skillLevel: 'Advanced',
        totalPoints: 390,
        badgeCount: 3,
      },
      {
        userId: 'U12',
        name: 'Emre',
        email: createEmailFromName('Emre'),
        password: '123456',
        city: 'Konya',
        university: 'Selcuk University',
        skillLevel: 'Intermediate',
        totalPoints: 275,
        badgeCount: 3,
      },
      {
        userId: 'U13',
        name: 'Gamze',
        email: createEmailFromName('Gamze'),
        password: '123456',
        city: 'Adana',
        university: 'Cukurova University',
        skillLevel: 'Beginner',
        totalPoints: 110,
        badgeCount: 1,
      },
      {
        userId: 'U14',
        name: 'Onur',
        email: createEmailFromName('Onur'),
        password: '123456',
        city: 'Kayseri',
        university: 'Erciyes University',
        skillLevel: 'Advanced',
        totalPoints: 425,
        badgeCount: 4,
      },
      {
        userId: 'U15',
        name: 'Beste',
        email: createEmailFromName('Beste'),
        password: '123456',
        city: 'Trabzon',
        university: 'RTEÜ',
        skillLevel: 'Intermediate',
        totalPoints: 300,
        badgeCount: 3,
      },
    ];
    
    saveUsers(demoUsers);
    }
  } catch (error) {
    console.error('Error initializing demo users:', error);
    // Continue even if initialization fails
  }
};

