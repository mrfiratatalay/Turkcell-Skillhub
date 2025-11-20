// Backend API Service - Turkcell SkillHub
import axios, { AxiosError } from 'axios';
import {
  User,
  Category,
  Lesson,
  QuizQuestion,
  QuizResult,
  Badge,
  LeaderboardEntry,
  UserProgress,
  QuizSubmitRequest,
  QuizSubmitResponse,
} from '../types';
import { showError, showWarning } from '../utils/toast';

// Backend Base URL - application.yml'den
const API_BASE_URL = 'http://localhost:8080/api';

// Axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Request interceptor - Auth token eklemek için
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Gelişmiş hata yönetimi
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Network error
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        showError('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
      } else if (error.message === 'Network Error') {
        showError('Bağlantı hatası! Backend çalışıyor mu kontrol edin.');
      } else {
        showError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
      return Promise.reject(error);
    }

    // HTTP error responses
    const status = error.response.status;
    const data: any = error.response.data;

    switch (status) {
      case 400:
        showError(data?.message || 'Geçersiz istek!');
        break;
      case 401:
        showWarning('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserId');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        break;
      case 403:
        showError('Bu işlem için yetkiniz yok!');
        break;
      case 404:
        showError(data?.message || 'İstenen kaynak bulunamadı!');
        break;
      case 409:
        showWarning(data?.message || 'Çakışma hatası!');
        break;
      case 500:
        showError('Sunucu hatası! Lütfen daha sonra tekrar deneyin.');
        break;
      case 503:
        showError('Servis şu an kullanılamıyor. Lütfen daha sonra deneyin.');
        break;
      default:
        showError(data?.message || `Hata: ${status}`);
    }

    return Promise.reject(error);
  }
);

// ==================== Category API ====================
// GET /categories
export const categoryAPI = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  // GET /categories/{categoryId}
  getCategoryById: async (categoryId: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${categoryId}`);
    return response.data;
  },
};

// ==================== Lesson API ====================
export const lessonAPI = {
  // GET /lessons?categoryId={categoryId}
  getAllLessons: async (categoryId?: string): Promise<Lesson[]> => {
    const params = categoryId ? { categoryId } : {};
    const response = await apiClient.get<Lesson[]>('/lessons', { params });
    return response.data;
  },

  // GET /lessons?categoryId={categoryId}
  getLessonsByCategory: async (categoryId: string): Promise<Lesson[]> => {
    const response = await apiClient.get<Lesson[]>('/lessons', {
      params: { categoryId },
    });
    return response.data;
  },

  // GET /lessons/{lessonId}
  getLessonById: async (lessonId: string): Promise<Lesson> => {
    const response = await apiClient.get<Lesson>(`/lessons/${lessonId}`);
    return response.data;
  },
};

// ==================== Quiz API ====================
export const quizAPI = {
  // GET /quiz/lesson/{lessonId}
  getQuizByLesson: async (lessonId: string): Promise<QuizQuestion[]> => {
    const response = await apiClient.get<QuizQuestion[]>(`/quiz/lesson/${lessonId}`);
    return response.data;
  },

  // POST /quiz/submit
  submitQuiz: async (request: QuizSubmitRequest): Promise<QuizSubmitResponse> => {
    const response = await apiClient.post<QuizSubmitResponse>('/quiz/submit', request);
    return response.data;
  },
};

// ==================== User API ====================
export const userAPI = {
  // GET /users/{userId}/progress
  getUserProgress: async (userId: string): Promise<UserProgress> => {
    const response = await apiClient.get<UserProgress>(`/users/${userId}/progress`);
    return response.data;
  },
};

// ==================== Leaderboard API ====================
export const leaderboardAPI = {
  // GET /leaderboard?city={city}
  getLeaderboard: async (city?: string): Promise<LeaderboardEntry[]> => {
    const params = city ? { city } : {};
    const response = await apiClient.get<LeaderboardEntry[]>('/leaderboard', { params });
    return response.data;
  },
};

// ==================== Badge API ====================
export const badgeAPI = {
  // Kullanıcı rozetleri UserProgress'ten gelir, ancak gerekirse:
  getUserBadges: async (userId: string): Promise<Badge[]> => {
    // Backend'de ayrı bir endpoint yoksa, UserProgress'ten alınır
    const progress = await userAPI.getUserProgress(userId);
    return progress.badges;
  },
};

// ==================== Auth API (Mock - Backend'de yok) ====================
// NOT: Backend'de auth endpoint'leri yok, bu yüzden mock olarak bırakıyoruz
// Gerçek projede backend'e auth endpoint'leri eklenmeli
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // MOCK: Backend'de auth endpoint'i olmadığı için demo amaçlı U1 kullanıcısını döndürüyoruz
    try {
      const progress = await userAPI.getUserProgress('U1');
      const token = 'mock-token-' + Date.now();
      localStorage.setItem('currentUserId', progress.user.userId);
      localStorage.setItem('authToken', token);
      return { user: progress.user, token };
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    city: string;
    university: string;
  }): Promise<{ user: User; token: string }> => {
    // MOCK: Backend'de register endpoint'i olmadığı için demo amaçlı user döndürüyoruz
    const mockUser: User = {
      userId: 'U_NEW_' + Date.now(),
      name: userData.name,
      city: userData.city,
      university: userData.university,
      skillLevel: 'BEGINNER',
      totalPoints: 0,
      badgeCount: 0,
    };
    const token = 'mock-token-' + Date.now();
    localStorage.setItem('currentUserId', mockUser.userId);
    localStorage.setItem('authToken', token);
    return { user: mockUser, token };
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('authToken');
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) return null;
    try {
      const progress = await userAPI.getUserProgress(userId);
      return progress.user;
    } catch (error) {
      return null;
    }
  },
};

export default apiClient;
