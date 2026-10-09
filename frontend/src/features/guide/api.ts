import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '@/shared/api/httpClient';
import { queryKeys } from '@/shared/api/queryKeys';

export type RecommendationKind = 'NEXT_STAR' | 'RETRY' | 'CONSTELLATION' | 'STREAK' | 'EXPLORE' | 'POLISH';

export interface Recommendation {
  kind: RecommendationKind;
  title: string;
  reason: string;
  lessonSlug: string | null;
  lessonTitle: string | null;
  priority: number;
}

export interface Guide {
  source: 'AI' | 'RULES';
  model: string | null;
  aiConfigured: boolean;
  generatedAt: string;
  recommendations: Recommendation[];
}

export const KIND_META: Record<RecommendationKind, { icon: string; label: string }> = {
  NEXT_STAR: { icon: 'star', label: 'Sıradaki yıldız' },
  RETRY: { icon: 'refresh', label: 'Tekrar dene' },
  CONSTELLATION: { icon: 'sparkle', label: 'Takımyıldız' },
  STREAK: { icon: 'flame', label: 'Seri' },
  EXPLORE: { icon: 'compass', label: 'Keşif' },
  POLISH: { icon: 'polish', label: 'Kusursuzluk' },
};

export const useGuide = () => useQuery({ queryKey: queryKeys.guide, queryFn: () => http.get<Guide>('/guide') });

export function useRefreshGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => http.post<Guide>('/guide/refresh'),
    onSuccess: (guide) => queryClient.setQueryData(queryKeys.guide, guide),
  });
}
