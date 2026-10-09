import type { SessionUser } from '@/shared/domain/types';
import type { AttemptRecord } from '@/features/me/api';
import { DEMO_CITIES, DEMO_LESSONS } from './catalog';

export const DEMO_EMAIL = 'demo@skillhub.dev';
export const DEMO_PASSWORD = 'gece2025';
export const DEMO_USER_ID = 'demo-visitor';
const STORAGE_KEY = 'skillhub.demo.data.v1';
const VERSION = 1;

export interface DemoCredential {
  salt: string;
  hash: string;
  iterations: number;
}

export interface DemoAccount {
  user: SessionUser;
  credential: DemoCredential | null;
  bestScores: Record<string, number>;
  attempts: AttemptRecord[];
  badgeAwards: Record<string, string>;
}

interface DemoDatabase {
  version: number;
  accounts: DemoAccount[];
}

/** Calendar activity follows the same time zone as the full-stack application. */
export function activityDate(at: string | Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(typeof at === 'string' ? new Date(at) : at);
  const part = (name: string) => parts.find((entry) => entry.type === name)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function offsetDate(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function makeId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function initialAccount(): DemoAccount {
  const today = activityDate();
  const now = new Date().toISOString();
  const joined = `${offsetDate(today, -35)}T09:00:00Z`;
  const city = DEMO_CITIES.find((entry) => entry.id === 61) ?? DEMO_CITIES[0];
  const account: DemoAccount = {
    user: {
      id: DEMO_USER_ID, displayName: 'Deniz Yıldız', email: DEMO_EMAIL,
      city: { id: city.id, name: city.name }, university: 'Karadeniz Teknik Üniversitesi', memberSince: joined,
    },
    credential: null,
    bestScores: {},
    attempts: [],
    badgeAwards: {},
  };
  // A visitor starts in a lived-in sky, while a newly registered local account starts at 17:00.
  const software = DEMO_LESSONS.filter((lesson) => lesson.categorySlug === 'yazilim').slice(0, 3);
  const otherCategories = [...new Set(DEMO_LESSONS.map((lesson) => lesson.categorySlug))]
    .filter((slug) => slug !== 'yazilim')
    .map((slug) => DEMO_LESSONS.find((lesson) => lesson.categorySlug === slug)!);
  const completed = [...software, ...otherCategories].slice(0, 6);
  const offsets = [-8, -5, -4, -2, -1, 0];
  completed.forEach((lesson, index) => {
    const correctCount = index % 2 === 0 ? lesson.questions.length : Math.max(1, lesson.questions.length - 1);
    const score = Math.round(correctCount * 100 / lesson.questions.length);
    const at = offsets[index] === 0 ? now : `${offsetDate(today, offsets[index])}T16:00:00Z`;
    account.bestScores[lesson.slug] = score;
    account.attempts.push({
      attemptId: `seed-${lesson.slug}`, lessonSlug: lesson.slug, lessonTitle: lesson.title,
      categorySlug: lesson.categorySlug, score, passed: score >= 70,
      xpEarned: Math.round(lesson.xpReward * score / 100), completedAt: at,
    });
  });
  const retry = DEMO_LESSONS.find((lesson) => !completed.includes(lesson));
  if (retry) {
    const score = Math.round(Math.floor(retry.questions.length * 0.6) * 100 / retry.questions.length);
    account.bestScores[retry.slug] = score;
    account.attempts.push({
      attemptId: `seed-${retry.slug}`, lessonSlug: retry.slug, lessonTitle: retry.title,
      categorySlug: retry.categorySlug, score, passed: false,
      xpEarned: Math.round(retry.xpReward * score / 100), completedAt: now,
    });
  }
  const firstAt = account.attempts[0]?.completedAt ?? joined;
  account.badgeAwards.ILK_YILDIZ = firstAt;
  account.badgeAwards.KUSURSUZ = firstAt;
  account.badgeAwards.ALEV_SERISI = now;
  if (otherCategories.length >= 2) account.badgeAwards.MERAKLI_GEZGIN = now;
  return account;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function restoreAccount(value: unknown): DemoAccount | null {
  if (!isRecord(value) || !isRecord(value.user)) return null;
  const user = value.user;
  if (typeof user.id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(user.id)
    || typeof user.email !== 'string' || typeof user.displayName !== 'string'
    || !validDate(user.memberSince) || !isRecord(user.city)
    || (user.university !== null && typeof user.university !== 'string')) return null;
  const savedCity = user.city;
  const city = DEMO_CITIES.find((entry) => entry.id === savedCity.id);
  if (!city) return null;
  let credential: DemoCredential | null = null;
  if (user.id !== DEMO_USER_ID) {
    if (!isRecord(value.credential)) return null;
    const saved = value.credential;
    if (typeof saved.salt !== 'string' || !/^[0-9a-f]{32}$/.test(saved.salt)
      || typeof saved.hash !== 'string' || !/^[0-9a-f]{64}$/.test(saved.hash)
      || saved.iterations !== 120_000) return null;
    credential = { salt: saved.salt, hash: saved.hash, iterations: saved.iterations };
  }
  if (!isRecord(value.bestScores) || !Array.isArray(value.attempts)
    || value.attempts.length > 5_000 || !isRecord(value.badgeAwards)) return null;
  const bestScores: Record<string, number> = {};
  for (const lesson of DEMO_LESSONS) {
    const score = value.bestScores[lesson.slug];
    if (typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 100) {
      bestScores[lesson.slug] = score;
    }
  }
  const attempts: AttemptRecord[] = [];
  for (const saved of value.attempts) {
    if (!isRecord(saved)) return null;
    const lesson = DEMO_LESSONS.find((entry) => entry.slug === saved.lessonSlug);
    if (!lesson || typeof saved.attemptId !== 'string' || !validDate(saved.completedAt)
      || typeof saved.score !== 'number' || !Number.isInteger(saved.score) || saved.score < 0 || saved.score > 100
      || typeof saved.xpEarned !== 'number' || !Number.isInteger(saved.xpEarned)
      || saved.xpEarned < 0 || saved.xpEarned > lesson.xpReward) return null;
    attempts.push({
      attemptId: saved.attemptId, lessonSlug: lesson.slug, lessonTitle: lesson.title,
      categorySlug: lesson.categorySlug, score: saved.score, passed: saved.score >= 70,
      xpEarned: saved.xpEarned, completedAt: saved.completedAt,
    });
  }
  const badgeAwards: Record<string, string> = {};
  for (const [code, at] of Object.entries(value.badgeAwards)) {
    if (/^[A-Z_]+$/.test(code) && validDate(at)) badgeAwards[code] = at;
  }
  return {
    user: {
      id: user.id, email: user.email, displayName: user.displayName, university: user.university,
      city: { id: city.id, name: city.name }, memberSince: user.memberSince,
    },
    credential, bestScores, attempts, badgeAwards,
  };
}

let current: DemoDatabase | null = null;

export function demoDatabase(): DemoDatabase {
  if (current) return current;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (isRecord(parsed) && parsed.version === VERSION && Array.isArray(parsed.accounts)) {
      const accounts = parsed.accounts.map(restoreAccount).filter((entry): entry is DemoAccount => entry !== null);
      const unique = accounts.filter((entry, index) => accounts.findIndex((other) => other.user.id === entry.user.id
        || other.user.email.toLowerCase() === entry.user.email.toLowerCase()) === index);
      if (!unique.some((account) => account.user.id === DEMO_USER_ID)) unique.unshift(initialAccount());
      current = { version: VERSION, accounts: unique };
    }
  } catch {
    // Corrupt, unavailable, or blocked storage gets a fresh in-memory portfolio demo.
  }
  current ??= { version: VERSION, accounts: [initialAccount()] };
  return current;
}

export function persistDemoData(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoDatabase()));
  } catch {
    // Browser-only mutations still work for the current tab when persistence is unavailable.
  }
}

export function resetDemoData(): void {
  current = { version: VERSION, accounts: [initialAccount()] };
  persistDemoData();
}
