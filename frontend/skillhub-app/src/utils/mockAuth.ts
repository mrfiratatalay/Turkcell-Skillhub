// Mock Authentication with LocalStorage
// Only for Login/Register - Other data comes from Backend API

import { User } from '../types';

const STORAGE_KEY = 'skillhub_users';
const CURRENT_USER_KEY = 'skillhub_current_user';

// Get all users from localStorage
export const getAllUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
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
  const existingUser = users.find(u => u.email === data.email);
  if (existingUser) {
    throw new Error('Bu e-posta adresi zaten kullanılıyor!');
  }

  // Create new user
  const newUser: User = {
    userId: generateUserId(),
    name: data.name,
    email: data.email,
    password: data.password, // In real app, this should be hashed
    city: data.city,
    university: data.university,
    totalPoints: 0,
    level: 'Beginner',
  };

  // Save to localStorage
  users.push(newUser);
  saveUsers(users);

  // Set as current user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  localStorage.setItem('authToken', 'mock-token-' + newUser.userId);
  localStorage.setItem('currentUserId', newUser.userId);

  return newUser;
};

// Login user (Mock - LocalStorage only)
export const loginUser = (email: string, password: string): User => {
  const users = getAllUsers();

  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('E-posta veya şifre hatalı!');
  }

  // Set as current user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem('authToken', 'mock-token-' + user.userId);
  localStorage.setItem('currentUserId', user.userId);

  return user;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(CURRENT_USER_KEY);
  return userData ? JSON.parse(userData) : null;
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

// Initialize with demo users if empty
export const initializeDemoUsers = (): void => {
  const users = getAllUsers();
  
  if (users.length === 0) {
    const demoUsers: User[] = [
      {
        userId: 'U1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@test.com',
        password: '123456',
        city: 'Istanbul',
        university: 'Boğaziçi Üniversitesi',
        totalPoints: 850,
        level: 'Advanced',
      },
      {
        userId: 'U2',
        name: 'Ayşe Demir',
        email: 'ayse@test.com',
        password: '123456',
        city: 'Ankara',
        university: 'ODTÜ',
        totalPoints: 620,
        level: 'Intermediate',
      },
      {
        userId: 'U3',
        name: 'Mehmet Kaya',
        email: 'mehmet@test.com',
        password: '123456',
        city: 'Izmir',
        university: 'Ege Üniversitesi',
        totalPoints: 340,
        level: 'Beginner',
      },
    ];
    
    saveUsers(demoUsers);
  }
};

