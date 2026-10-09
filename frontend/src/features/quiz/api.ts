import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { progressKeys, queryKeys } from '@/shared/api/queryKeys';
import type { Badge, LessonRef, NightClock } from '@/shared/domain/types';

export interface QuizOption {
  id: number;
  label: string;
}

export interface QuizQuestion {
  id: number;
  position: number;
  prompt: string;
  options: QuizOption[];
}

export interface Quiz {
  lessonSlug: string;
  lessonTitle: string;
  passingScore: number;
  xpReward: number;
  bestScore: number | null;
  questions: QuizQuestion[];
}

export interface ReviewItem {
  questionId: number;
  prompt: string;
  options: QuizOption[];
  selectedOptionId: number;
  correctOptionId: number;
  correct: boolean;
  explanation: string;
}

export interface AttemptResult {
  attemptId: string;
  lessonSlug: string;
  lessonTitle: string;
  score: number;
  correctCount: number;
  questionCount: number;
  passed: boolean;
  passingScore: number;
  previousBestScore: number | null;
  xpEarned: number;
  totalXp: number;
  nightClockBefore: NightClock;
  nightClockAfter: NightClock;
  leveledUp: boolean;
  newBadges: Badge[];
  unlockedLessons: LessonRef[];
  review: ReviewItem[];
}

export const useQuiz = (slug: string) =>
  useQuery({ queryKey: queryKeys.quiz(slug), queryFn: () => http.get<Quiz>(`/lessons/${slug}/quiz`), staleTime: 0 });

/** Submitting a quiz can change almost everything the learner sees, so it refreshes all progress views. */
export function useSubmitAttempt(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: Record<number, number>) =>
      http.post<AttemptResult>(`/lessons/${slug}/attempts`, {
        answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId: Number(questionId), optionId })),
      }),
    onSuccess: () => {
      progressKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
      queryClient.invalidateQueries({ queryKey: queryKeys.quiz(slug) });
    },
  });
}
