// Shapes of the frontend-only demo catalog (seed data of the full-stack application).
import type { Difficulty } from '@/shared/domain/types';

export interface DemoCity {
  readonly id: number;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export interface DemoCategory {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly constellation: string;
  readonly description: string;
  readonly icon: string;
  readonly sortOrder: number;
}

export interface DemoBadge {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly hint: string;
  readonly icon: string;
  readonly tier: 'GOLD' | 'NEON';
  readonly secret: boolean;
  readonly sortOrder: number;
}

export interface DemoQuestionOption {
  readonly id: number;
  readonly position: number;
  readonly label: string;
  readonly isCorrect: boolean;
}

export interface DemoQuestion {
  readonly id: number;
  readonly lessonId: number;
  readonly position: number;
  readonly prompt: string;
  readonly explanation: string;
  readonly options: readonly DemoQuestionOption[];
  readonly correctOptionId: number;
}

export interface DemoLesson {
  readonly id: number;
  readonly slug: string;
  readonly categoryId: number;
  readonly categorySlug: string;
  readonly title: string;
  readonly summary: string;
  readonly objectives: readonly string[];
  readonly paragraphs: readonly string[];
  readonly videoId: string | null;
  readonly difficulty: Difficulty;
  readonly durationMin: number;
  readonly xpReward: number;
  readonly starX: number;
  readonly starY: number;
  readonly x: number;
  readonly y: number;
  readonly sortOrder: number;
  readonly prerequisiteIds: readonly number[];
  readonly prerequisiteSlugs: readonly string[];
  readonly questions: readonly DemoQuestion[];
}

/** A lesson as stored in the catalog files; its questions are attached by the catalog index. */
export type DemoLessonDetails = Omit<DemoLesson, 'questions'>;
