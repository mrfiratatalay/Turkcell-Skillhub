import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';
import type { CategoryRef, Difficulty, LessonRef, LessonStatus } from '@/shared/domain/types';

export interface LessonCardData {
  slug: string;
  title: string;
  summary: string;
  category: CategoryRef;
  difficulty: Difficulty;
  durationMin: number;
  xpReward: number;
  questionCount: number;
  status: LessonStatus;
  bestScore: number | null;
  missingPrerequisites: string[];
}

export interface LessonDetail extends Omit<LessonCardData, 'missingPrerequisites'> {
  objectives: string[];
  paragraphs: string[];
  videoId: string | null;
  attempts: number;
  prerequisites: LessonRef[];
  unlockPath: LessonRef[];
  unlocks: LessonRef[];
}

export interface LessonFilter {
  category: string | null;
  difficulty: Difficulty | null;
  q: string;
}

function toQuery(filter: LessonFilter): string {
  const params = new URLSearchParams();
  if (filter.category) params.set('category', filter.category);
  if (filter.difficulty) params.set('difficulty', filter.difficulty);
  if (filter.q.trim()) params.set('q', filter.q.trim());
  const query = params.toString();
  return query ? `?${query}` : '';
}

export const useLessons = (filter: LessonFilter) =>
  useQuery({
    queryKey: queryKeys.lessons(filter),
    queryFn: () => http.get<LessonCardData[]>(`/lessons${toQuery(filter)}`),
    placeholderData: keepPreviousData,
  });

export const useLesson = (slug: string) =>
  useQuery({ queryKey: queryKeys.lesson(slug), queryFn: () => http.get<LessonDetail>(`/lessons/${slug}`) });
