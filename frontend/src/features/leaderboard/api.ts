import { useQuery } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  cityId: number;
  cityName: string;
  xp: number;
  completedLessons: number;
  level: number;
  levelTitle: string;
  me: boolean;
}

export interface Leaderboard {
  entries: LeaderboardEntry[];
  me: LeaderboardEntry | null;
  cityId: number | null;
}

export interface CityTotal {
  cityId: number;
  name: string;
  latitude: number;
  longitude: number;
  learners: number;
  xp: number;
  rank: number;
}

export interface CityLights {
  cities: CityTotal[];
  totalLearners: number;
  activeCities: number;
}

export const useLeaderboard = (cityId: number | null) =>
  useQuery({
    queryKey: queryKeys.leaderboard(cityId),
    queryFn: () => http.get<Leaderboard>(`/leaderboard?limit=50${cityId ? `&cityId=${cityId}` : ''}`),
  });

export const useCityLights = () =>
  useQuery({ queryKey: queryKeys.cityLights, queryFn: () => http.get<CityLights>('/leaderboard/cities') });
