import type { Badge, NightClock } from '@/shared/domain/types';
import type { ProgressSummary, XpDay } from '@/features/me/api';
import { DEMO_BADGES, DEMO_CATEGORIES, DEMO_LESSONS } from './catalog';
import { activityDate, offsetDate } from './state';
import type { DemoAccount } from './state';

const THRESHOLDS = [0, 150, 400, 700, 1050, 1450, 1900, 2350];
const TITLES = ['Alacakaranlık', 'Akşam Yıldızı', 'Gece Çöktü', 'Gece Yarısına Doğru',
  'Gece Yarısı Geçti', 'Derin Gece', 'Tan Ağarıyor', 'Şafak'];

export function totalXp(account: DemoAccount): number {
  return DEMO_LESSONS.reduce((sum, lesson) => sum + Math.round(lesson.xpReward
    * (account.bestScores[lesson.slug] ?? 0) / 100), 0);
}

export function nightClock(total: number): NightClock {
  const xp = Math.max(0, total);
  let index = 0;
  THRESHOLDS.forEach((threshold, position) => { if (xp >= threshold) index = position; });
  const dawn = index === THRESHOLDS.length - 1;
  const levelStartXp = THRESHOLDS[index];
  const nextLevelXp = dawn ? null : THRESHOLDS[index + 1];
  const levelProgress = nextLevelXp === null ? 1 : (xp - levelStartXp) / (nextLevelXp - levelStartXp);
  const minute = (17 * 60 + index * 120 + Math.floor(levelProgress * 120)) % (24 * 60);
  return {
    level: index + 1, title: TITLES[index],
    time: dawn ? '07:00' : `${Math.floor(minute / 60).toString().padStart(2, '0')}:${(minute % 60).toString().padStart(2, '0')}`,
    levelProgress, nightProgress: Math.min(1, xp / THRESHOLDS.at(-1)!), levelStartXp, nextLevelXp, dawn,
  };
}

function activeDays(account: DemoAccount): Set<string> {
  return new Set(account.attempts.map((attempt) => activityDate(attempt.completedAt)));
}

export function streaks(account: DemoAccount, today = activityDate()): { current: number; longest: number; activeToday: boolean } {
  const days = activeDays(account);
  let cursor = days.has(today) ? today : offsetDate(today, -1);
  let current = 0;
  while (days.has(cursor)) {
    current++;
    cursor = offsetDate(cursor, -1);
  }
  let longest = 0;
  let run = 0;
  let previous: string | null = null;
  for (const day of [...days].sort()) {
    run = previous !== null && offsetDate(previous, 1) === day ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  }
  return { current, longest, activeToday: days.has(today) };
}

export function completedLessons(account: DemoAccount): number {
  return DEMO_LESSONS.filter((lesson) => (account.bestScores[lesson.slug] ?? 0) >= 70).length;
}

export function badgeViews(account: DemoAccount): Badge[] {
  return DEMO_BADGES.map((badge) => {
    const awardedAt = account.badgeAwards[badge.code] ?? null;
    const earned = awardedAt !== null;
    return {
      code: badge.code, name: badge.secret && !earned ? 'Gizli rozet' : badge.name,
      description: badge.secret && !earned ? null : badge.description,
      hint: badge.hint, icon: badge.secret && !earned ? 'lock' : badge.icon,
      tier: badge.tier, secret: badge.secret, earned, awardedAt,
    };
  });
}

export function awardBadges(account: DemoAccount, trigger: { at: string; passed: boolean; failedBefore: boolean }): Badge[] {
  const completed = DEMO_LESSONS.filter((lesson) => (account.bestScores[lesson.slug] ?? 0) >= 70);
  const streak = streaks(account, activityDate(trigger.at)).current;
  const hour = Number(new Intl.DateTimeFormat('en', { timeZone: 'Europe/Istanbul', hour: 'numeric', hourCycle: 'h23' })
    .format(new Date(trigger.at)));
  const earned = new Set<string>();
  if (completed.length > 0) earned.add('ILK_YILDIZ');
  if (Object.values(account.bestScores).includes(100)) earned.add('KUSURSUZ');
  if (streak >= 3) earned.add('ALEV_SERISI');
  if (streak >= 7) earned.add('KESINTISIZ_HAFTA');
  if (new Set(completed.map((lesson) => lesson.categorySlug)).size >= 3) earned.add('MERAKLI_GEZGIN');
  if (trigger.passed && trigger.failedBefore) earned.add('AZIMLI');
  if (hour < 5) earned.add('GECE_KUSU');
  if (nightClock(totalXp(account)).dawn) earned.add('SAFAK');
  const categoryBadges: Record<string, string> = {
    yazilim: 'KOD_AVCISI', 'yapay-zeka': 'SINIR_AGI', 'siber-guvenlik': 'KALKAN', girisimcilik: 'ROKET',
  };
  for (const category of DEMO_CATEGORIES) {
    const lessons = DEMO_LESSONS.filter((lesson) => lesson.categorySlug === category.slug);
    if (lessons.length > 0 && lessons.every((lesson) => (account.bestScores[lesson.slug] ?? 0) >= 70)
      && categoryBadges[category.slug]) earned.add(categoryBadges[category.slug]);
  }
  const newCodes: string[] = [];
  for (const badge of DEMO_BADGES) {
    if (earned.has(badge.code) && !account.badgeAwards[badge.code]) {
      account.badgeAwards[badge.code] = trigger.at;
      newCodes.push(badge.code);
    }
  }
  return badgeViews(account).filter((badge) => newCodes.includes(badge.code));
}

export function progressSummary(account: DemoAccount): ProgressSummary {
  const total = totalXp(account);
  const streak = streaks(account);
  return {
    totalXp: total, nightClock: nightClock(total), completedLessons: completedLessons(account),
    totalLessons: DEMO_LESSONS.length, badgeCount: badgeViews(account).filter((badge) => badge.earned).length,
    totalBadges: DEMO_BADGES.length, streakDays: streak.current, longestStreak: streak.longest,
    attemptCount: account.attempts.length, activeToday: streak.activeToday,
  };
}

export function xpHistory(account: DemoAccount, days: number): XpDay[] {
  const today = activityDate();
  const since = offsetDate(today, -(days - 1));
  const perDay = new Map<string, number>();
  for (const attempt of account.attempts) {
    const day = activityDate(attempt.completedAt);
    perDay.set(day, (perDay.get(day) ?? 0) + attempt.xpEarned);
  }
  let running = totalXp(account) - [...perDay].filter(([day]) => day >= since && day <= today)
    .reduce((sum, [, xp]) => sum + xp, 0);
  return Array.from({ length: days }, (_, index) => {
    const date = offsetDate(since, index);
    const xp = perDay.get(date) ?? 0;
    running += xp;
    return { date, xp, cumulativeXp: running };
  });
}
