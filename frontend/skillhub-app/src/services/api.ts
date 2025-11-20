// Mock API service layer
import {
  mockUsers,
  mockCategories,
  mockLessons,
  mockQuizzes,
  mockQuizResults,
  mockBadges,
  mockLeaderboard,
} from '../data/mockData';
import { User, Category, Lesson, QuizQuestion, QuizResult, Badge, LeaderboardEntry, UserProgress } from '../types';

// Simulating API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(500);
    // For demo, return first user
    const user = mockUsers[0];
    localStorage.setItem('currentUserId', user.user_id);
    localStorage.setItem('authToken', 'mock-token-123');
    return { user, token: 'mock-token-123' };
  },

  register: async (userData: Partial<User>): Promise<{ user: User; token: string }> => {
    await delay(500);
    const newUser: User = {
      user_id: `U${mockUsers.length + 1}`,
      name: userData.name || 'New User',
      city: userData.city || 'Istanbul',
      university: userData.university || 'University',
      skill_level: userData.skill_level || 'Beginner',
      total_points: 0,
      badge_count: 0,
    };
    mockUsers.push(newUser);
    localStorage.setItem('currentUserId', newUser.user_id);
    localStorage.setItem('authToken', 'mock-token-123');
    return { user: newUser, token: 'mock-token-123' };
  },

  logout: async (): Promise<void> => {
    await delay(300);
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('authToken');
  },

  getCurrentUser: (): User | null => {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) return null;
    return mockUsers.find((u) => u.user_id === userId) || null;
  },
};

// User API
export const userAPI = {
  getUserProgress: async (userId: string): Promise<UserProgress> => {
    await delay(500);
    const user = mockUsers.find((u) => u.user_id === userId) || mockUsers[0];
    const userResults = mockQuizResults.filter((r) => r.user_id === userId);
    const userBadges = mockBadges.filter((b) => b.user_id === userId);
    
    const completedLessons = userResults.length;
    const totalLessons = mockLessons.length;
    const completionRate = (completedLessons / totalLessons) * 100;
    const averageScore = userResults.length > 0
      ? userResults.reduce((sum, r) => sum + r.score, 0) / userResults.length
      : 0;

    return {
      user,
      completedLessons,
      totalLessons,
      completionRate,
      averageScore,
      recentQuizResults: userResults.slice(-5),
      badges: userBadges,
    };
  },
};

// Categories API
export const categoryAPI = {
  getAllCategories: async (): Promise<Category[]> => {
    await delay(300);
    return mockCategories;
  },

  getCategoryById: async (categoryId: string): Promise<Category | undefined> => {
    await delay(300);
    return mockCategories.find((c) => c.category_id === categoryId);
  },
};

// Lessons API
export const lessonAPI = {
  getAllLessons: async (): Promise<Lesson[]> => {
    await delay(400);
    return mockLessons;
  },

  getLessonsByCategory: async (categoryId: string): Promise<Lesson[]> => {
    await delay(400);
    return mockLessons.filter((l) => l.category_id === categoryId);
  },

  getLessonById: async (lessonId: string): Promise<Lesson | undefined> => {
    await delay(300);
    return mockLessons.find((l) => l.lesson_id === lessonId);
  },
};

// Quiz API
export const quizAPI = {
  getQuizByLesson: async (lessonId: string): Promise<QuizQuestion[]> => {
    await delay(500);
    return mockQuizzes.filter((q) => q.lesson_id === lessonId);
  },

  submitQuiz: async (
    userId: string,
    lessonId: string,
    answers: Record<string, string>
  ): Promise<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    earnedPoints: number;
    newBadges: Badge[];
  }> => {
    await delay(700);
    
    const questions = mockQuizzes.filter((q) => q.lesson_id === lessonId);
    let correctCount = 0;
    
    questions.forEach((q) => {
      if (answers[q.question_id] === q.correct_answer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    const earnedPoints = score;
    
    // Add result to mock data
    const newResult: QuizResult = {
      result_id: `R${mockQuizResults.length + 1}`,
      user_id: userId,
      lesson_id: lessonId,
      score,
      completed_at: new Date().toISOString(),
    };
    mockQuizResults.push(newResult);
    
    // Update user points
    const user = mockUsers.find((u) => u.user_id === userId);
    if (user) {
      user.total_points += earnedPoints;
    }
    
    // Check for new badges
    const newBadges: Badge[] = [];
    const userResults = mockQuizResults.filter((r) => r.user_id === userId);
    const userBadges = mockBadges.filter((b) => b.user_id === userId);
    
    // Motivasyon Rozeti: 3 ders tamamlama
    if (userResults.length >= 3 && !userBadges.find((b) => b.name === 'Motivasyon Rozeti')) {
      const badge: Badge = {
        badge_id: `B${mockBadges.length + 1}`,
        user_id: userId,
        name: 'Motivasyon Rozeti',
        awarded_at: new Date().toISOString(),
      };
      mockBadges.push(badge);
      newBadges.push(badge);
      if (user) user.badge_count++;
    }
    
    // Uzman Rozeti: 10 quizden %80 üzeri
    const highScoreCount = userResults.filter((r) => r.score >= 80).length;
    if (highScoreCount >= 3 && !userBadges.find((b) => b.name === 'Uzman Rozeti')) {
      const badge: Badge = {
        badge_id: `B${mockBadges.length + 1}`,
        user_id: userId,
        name: 'Uzman Rozeti',
        awarded_at: new Date().toISOString(),
      };
      mockBadges.push(badge);
      newBadges.push(badge);
      if (user) user.badge_count++;
    }
    
    return {
      score,
      correctCount,
      totalQuestions: questions.length,
      earnedPoints,
      newBadges,
    };
  },
};

// Leaderboard API
export const leaderboardAPI = {
  getLeaderboard: async (filters?: { city?: string; university?: string }): Promise<LeaderboardEntry[]> => {
    await delay(400);
    
    let filteredLeaderboard = [...mockLeaderboard];
    
    if (filters?.city) {
      filteredLeaderboard = filteredLeaderboard.filter((entry) => entry.city === filters.city);
    }
    
    // Re-rank after filtering
    filteredLeaderboard = filteredLeaderboard
      .sort((a, b) => b.total_points - a.total_points)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
    
    return filteredLeaderboard;
  },
};

// Badges API
export const badgeAPI = {
  getUserBadges: async (userId: string): Promise<Badge[]> => {
    await delay(300);
    return mockBadges.filter((b) => b.user_id === userId);
  },
};

