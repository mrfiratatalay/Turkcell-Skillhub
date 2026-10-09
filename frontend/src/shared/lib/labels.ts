import type { Difficulty, LessonStatus } from '@/shared/domain/types';

export const difficultyLabel: Record<Difficulty, string> = {
  BEGINNER: 'Başlangıç',
  INTERMEDIATE: 'Orta',
  ADVANCED: 'İleri',
};

export const statusLabel: Record<LessonStatus, string> = {
  COMPLETED: 'Yandı',
  AVAILABLE: 'Keşfe açık',
  LOCKED: 'Kilitli',
};
