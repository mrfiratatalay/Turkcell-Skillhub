// Type definitions for Turkcell SkillHub

export interface User {
  user_id: string;
  name: string;
  city: string;
  university: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced';
  total_points: number;
  badge_count: number;
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
}

export interface Lesson {
  lesson_id: string;
  category_id: string;
  title: string;
  duration_min: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  video_url?: string;
  description?: string;
}

export interface QuizQuestion {
  question_id: string;
  lesson_id: string;
  question_text: string;
  correct_answer: string;
  options: string[];
}

export interface QuizResult {
  result_id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  completed_at: string;
}

export interface Badge {
  badge_id: string;
  user_id: string;
  name: string;
  awarded_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  rank: number;
  total_points: number;
  city: string;
  name?: string;
}

export interface UserProgress {
  user: User;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
  averageScore: number;
  recentQuizResults: QuizResult[];
  badges: Badge[];
}
