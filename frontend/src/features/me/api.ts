import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';
import { sessionStore } from '@/shared/auth/sessionStore';
import type { NightClock, SessionUser } from '@/shared/domain/types';

export interface ProgressSummary {
  totalXp: number;
  nightClock: NightClock;
  completedLessons: number;
  totalLessons: number;
  badgeCount: number;
  totalBadges: number;
  streakDays: number;
  longestStreak: number;
  attemptCount: number;
  activeToday: boolean;
}

export interface Me {
  user: SessionUser;
  progress: ProgressSummary;
  rank: number | null;
}

export interface XpDay {
  date: string;
  xp: number;
  cumulativeXp: number;
}

export interface AttemptRecord {
  attemptId: string;
  lessonSlug: string;
  lessonTitle: string;
  categorySlug: string;
  score: number;
  passed: boolean;
  xpEarned: number;
  completedAt: string;
}

export interface ProfileUpdate {
  displayName: string;
  cityId: number;
  university: string;
}

export const useMe = () => useQuery({ queryKey: queryKeys.me, queryFn: () => http.get<Me>('/me') });

export const useXpHistory = (days = 30) =>
  useQuery({ queryKey: [...queryKeys.xpHistory, days], queryFn: () => http.get<XpDay[]>(`/me/xp-history?days=${days}`) });

export const useAttempts = (limit = 8) =>
  useQuery({ queryKey: [...queryKeys.attempts, limit], queryFn: () => http.get<AttemptRecord[]>(`/me/attempts?limit=${limit}`) });

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (update: ProfileUpdate) => http.patch<SessionUser>('/me', update),
    onSuccess: (user) => {
      sessionStore.updateUser(user);
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboardAll });
      queryClient.invalidateQueries({ queryKey: queryKeys.cityLights });
    },
  });
}
