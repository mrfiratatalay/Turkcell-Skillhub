import type { CityLights, Leaderboard, LeaderboardEntry } from '@/features/leaderboard/api';
import { DEMO_CITIES, DEMO_LESSONS } from './catalog';
import { completedLessons, nightClock, totalXp } from './progress';
import { demoDatabase } from './state';
import type { DemoAccount } from './state';

// Fictional peers mirror the full-stack seed. Browser-created learners are added to these demo rankings.
const PEERS = [
  ['Elif Demir', 34, 17], ['Mert Aydın', 6, 14], ['Kerem Öztürk', 61, 13], ['Zeynep Çelik', 35, 12],
  ['Ece Kurt', 41, 10], ['Selin Arslan', 7, 9], ['Nehir Erdem', 53, 8], ['Emre Şahin', 16, 8],
  ['Sude Yalçın', 61, 7], ['Defne Koç', 26, 7], ['Ada Yıldırım', 48, 6], ['Burak Yılmaz', 42, 6],
  ['İrem Aksoy', 55, 6], ['Barış Doğan', 52, 5], ['Melis Taş', 33, 5], ['Duru Aydoğan', 21, 5],
  ['Can Özdemir', 38, 5], ['Mira Şen', 17, 4], ['Kaan Çetin', 54, 4], ['Arda Polat', 27, 4],
  ['Yiğit Kılıç', 25, 4], ['Asya Keskin', 28, 3], ['Efe Aslan', 20, 3], ['Ela Korkmaz', 31, 3],
  ['Ozan Güneş', 65, 3], ['Lina Özkan', 22, 2], ['Tuna Ateş', 8, 2], ['Umut Bulut', 44, 2], ['Alp Uçar', 36, 1],
] as const;

export function rankingEntries(account: DemoAccount, cityId: number | null = null): LeaderboardEntry[] {
  const entries: Omit<LeaderboardEntry, 'rank'>[] = PEERS.map(([displayName, peerCityId, completed], index) => {
    const xp = DEMO_LESSONS.slice(0, completed).reduce((sum, lesson) => sum + lesson.xpReward, 0);
    const clock = nightClock(xp);
    return {
      userId: `demo-peer-${index}`, displayName, cityId: peerCityId,
      cityName: DEMO_CITIES.find((city) => city.id === peerCityId)!.name,
      xp, completedLessons: completed, level: clock.level, levelTitle: clock.title, me: false,
    };
  });
  for (const learner of demoDatabase().accounts) {
    const xp = totalXp(learner);
    const clock = nightClock(xp);
    entries.push({
      userId: learner.user.id, displayName: learner.user.displayName,
      cityId: learner.user.city.id, cityName: learner.user.city.name, xp,
      completedLessons: completedLessons(learner), level: clock.level, levelTitle: clock.title,
      me: learner.user.id === account.user.id,
    });
  }
  return entries.filter((entry) => cityId === null || entry.cityId === cityId)
    .sort((a, b) => b.xp - a.xp || b.completedLessons - a.completedLessons || a.userId.localeCompare(b.userId))
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export function leaderboard(account: DemoAccount, cityId: number | null, limit: number): Leaderboard {
  const entries = rankingEntries(account, cityId);
  return { entries: entries.slice(0, limit), me: entries.find((entry) => entry.me) ?? null, cityId };
}

export function cityLights(account: DemoAccount): CityLights {
  const learners = rankingEntries(account);
  const cities = DEMO_CITIES.map((city) => {
    const local = learners.filter((entry) => entry.cityId === city.id);
    return {
      cityId: city.id, name: city.name, latitude: city.latitude, longitude: city.longitude,
      learners: local.length, xp: local.reduce((sum, entry) => sum + entry.xp, 0), rank: 0,
    };
  }).sort((a, b) => b.xp - a.xp || b.learners - a.learners || a.cityId - b.cityId)
    .map((city, index) => ({ ...city, rank: index + 1 }));
  return { cities, totalLearners: learners.length, activeCities: cities.filter((city) => city.learners > 0).length };
}
