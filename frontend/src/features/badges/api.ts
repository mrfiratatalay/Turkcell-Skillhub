import { useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Badge } from '@/shared/domain/types';

export interface BadgeCollection {
  earnedCount: number;
  total: number;
  badges: Badge[];
}

export const useBadges = () =>
  useQuery({ queryKey: queryKeys.badges, queryFn: () => http.get<BadgeCollection>('/badges') });
