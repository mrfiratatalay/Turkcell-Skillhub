// API contracts shared by several features. Feature-specific shapes live next to their feature.

export type LessonStatus = 'COMPLETED' | 'AVAILABLE' | 'LOCKED';
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface CityRef {
  id: number;
  name: string;
}

export interface SessionUser {
  id: string;
  displayName: string;
  email: string;
  city: CityRef;
  university: string | null;
  memberSince: string;
}

export interface NightClock {
  level: number;
  title: string;
  time: string;
  levelProgress: number;
  nightProgress: number;
  levelStartXp: number;
  nextLevelXp: number | null;
  dawn: boolean;
}

export interface CategoryRef {
  slug: string;
  name: string;
  constellation: string;
  icon: string;
}

export interface LessonRef {
  slug: string;
  title: string;
  status: LessonStatus;
}

export interface Badge {
  code: string;
  name: string;
  description: string | null;
  hint: string;
  icon: string;
  tier: 'GOLD' | 'NEON';
  secret: boolean;
  earned: boolean;
  awardedAt: string | null;
}
