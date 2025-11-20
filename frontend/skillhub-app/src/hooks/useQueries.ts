import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  userAPI,
  categoryAPI,
  lessonAPI,
  quizAPI,
  leaderboardAPI,
  badgeAPI,
} from '../services/api';

// User Progress
export const useUserProgress = (userId: string) => {
  return useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => userAPI.getUserProgress(userId),
    enabled: !!userId,
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryAPI.getAllCategories(),
  });
};

export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryAPI.getCategoryById(categoryId),
    enabled: !!categoryId,
  });
};

// Lessons
export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => lessonAPI.getAllLessons(),
  });
};

export const useLessonsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['lessons', 'category', categoryId],
    queryFn: () => lessonAPI.getLessonsByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useLesson = (lessonId: string) => {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonAPI.getLessonById(lessonId),
    enabled: !!lessonId,
  });
};

// Quiz
export const useQuiz = (lessonId: string) => {
  return useQuery({
    queryKey: ['quiz', lessonId],
    queryFn: () => quizAPI.getQuizByLesson(lessonId),
    enabled: !!lessonId,
  });
};

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: { userId: string; lessonId: string; answers: { questionId: string; answer: string }[] }) => 
      quizAPI.submitQuiz(request),
    onSuccess: (_, variables) => {
      // Invalidate relevant queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['userProgress', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['badges', variables.userId] });
    },
  });
};

// Leaderboard
export const useLeaderboard = (filters?: { city?: string; university?: string }) => {
  return useQuery({
    queryKey: ['leaderboard', filters],
    queryFn: () => leaderboardAPI.getLeaderboard(filters),
  });
};

// Badges
export const useBadges = (userId: string) => {
  return useQuery({
    queryKey: ['badges', userId],
    queryFn: () => badgeAPI.getUserBadges(userId),
    enabled: !!userId,
  });
};

