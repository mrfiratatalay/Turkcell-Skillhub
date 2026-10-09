/** Every server-state key in one place, so a quiz attempt can refresh exactly what it changed. */
export const queryKeys = {
  me: ['me'] as const,
  sky: ['sky'] as const,
  lessons: (filter: object) => ['lessons', filter] as const,
  lessonsAll: ['lessons'] as const,
  lesson: (slug: string) => ['lesson', slug] as const,
  lessonAll: ['lesson'] as const,
  quiz: (slug: string) => ['quiz', slug] as const,
  badges: ['badges'] as const,
  leaderboard: (cityId: number | null) => ['leaderboard', cityId] as const,
  leaderboardAll: ['leaderboard'] as const,
  cityLights: ['city-lights'] as const,
  guide: ['guide'] as const,
  xpHistory: ['xp-history'] as const,
  attempts: ['attempts'] as const,
  cities: ['cities'] as const,
};

/** Everything a finished quiz can change. */
export const progressKeys = [
  queryKeys.me,
  queryKeys.sky,
  queryKeys.lessonsAll,
  queryKeys.lessonAll,
  queryKeys.badges,
  queryKeys.leaderboardAll,
  queryKeys.cityLights,
  queryKeys.guide,
  queryKeys.xpHistory,
  queryKeys.attempts,
];
