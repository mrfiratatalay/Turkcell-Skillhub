import { useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Difficulty, LessonStatus } from '@/shared/domain/types';

export interface Star {
  slug: string;
  title: string;
  status: LessonStatus;
  x: number;
  y: number;
  difficulty: Difficulty;
  xpReward: number;
  bestScore: number | null;
}

export interface Constellation {
  slug: string;
  name: string;
  constellation: string;
  icon: string;
  description: string;
  completed: number;
  total: number;
  stars: Star[];
}

export interface SkyLink {
  from: string;
  to: string;
  crossConstellation: boolean;
  lit: boolean;
}

export interface Sky {
  constellations: Constellation[];
  links: SkyLink[];
  completed: number;
  total: number;
}

export const useSky = () => useQuery({ queryKey: queryKeys.sky, queryFn: () => http.get<Sky>('/sky') });
