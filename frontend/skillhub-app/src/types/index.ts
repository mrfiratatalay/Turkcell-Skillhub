// Type definitions for Turkcell SkillHub - Backend API Uyumlu

// Backend CategoryDTO
export interface Category {
  categoryId: string;
  name: string;
  description: string;
}

// Backend LessonDTO
export interface Lesson {
  lessonId: string;
  categoryId: string;
  title: string;
  durationMin: number;
  difficulty: string;
  videoUrl?: string;
  description?: string;
}

// Backend QuizQuestionDTO
export interface QuizQuestion {
  questionId: string;
  lessonId: string;
  questionText: string;
  correctAnswer?: string; // Sadece sonuçta döner
  options: string[];
}

// Backend QuizResultDTO
export interface QuizResult {
  resultId: string;
  userId: string;
  lessonId: string;
  score: number;
  completedAt: string;
}

// Backend BadgeDTO
export interface Badge {
  badgeId: string;
  userId: string;
  name: string;
  awardedAt: string;
}

// Backend LeaderboardEntryDTO
export interface LeaderboardEntry {
  userId: string;
  rank: number;
  name: string; // Backend'den "name" olarak geliyor (userName değil!)
  totalPoints: number;
  city: string;
  // NOT: university field'ı backend'de YOK!
}

// Backend UserProgressResponse.UserBasicInfo
// Extended with email and password for mock authentication
export interface User {
  userId: string;
  name: string;
  city: string;
  university: string;
  skillLevel: string;
  totalPoints: number;
  badgeCount: number;
  email?: string; // For mock authentication only
  password?: string; // For mock authentication only
}

// Backend UserProgressResponse
export interface UserProgress {
  user: User;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
  averageScore: number;
  recentQuizResults: QuizResult[];
  badges: Badge[];
}

// Backend QuizSubmitRequest.QuizAnswer
export interface QuizAnswer {
  questionId: string;
  answer: string;
}

// Backend QuizSubmitRequest
export interface QuizSubmitRequest {
  userId: string;
  lessonId: string;
  answers: QuizAnswer[];
}

// Backend QuizSubmitResponse
export interface QuizSubmitResponse {
  resultId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  newBadges: Badge[];
  message: string;
}
