import { ApiError } from '@/shared/api/ApiError';
import type { Me } from '@/features/me/api';
import { currentAccount, login, profileFields, register } from './auth';
import { DEMO_CITIES, DEMO_LESSONS } from './catalog';
import { guide } from './guide';
import { findLesson, lessonCard, lessonDetail, lessonQuiz, sky, submitAttempt } from './lessons';
import { badgeViews, progressSummary, xpHistory } from './progress';
import { cityLights, leaderboard, rankingEntries } from './rankings';
import { checkAborted, copyUser, invalid, objectBody, queryInteger } from './requests';
import { persistDemoData } from './state';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
}

/** Same request contract as the API transport; every demo response is produced locally. */
export async function handleDemoRequest<T>(path: string, { method = 'GET', body, signal }: RequestOptions = {}): Promise<T> {
  checkAborted(signal);
  const url = new URL(path, 'https://skillhub.demo');
  const route = url.pathname.replace(/\/$/, '') || '/';
  if (route === '/cities' && method === 'GET') {
    const cities: unknown = DEMO_CITIES.map(({ id, name }) => ({ id, name }));
    return cities as T;
  }
  if (route === '/auth/login' && method === 'POST') {
    const session: unknown = await login(body, signal);
    return session as T;
  }
  if (route === '/auth/register' && method === 'POST') {
    const session: unknown = await register(body, signal);
    return session as T;
  }
  const account = currentAccount();
  let response: unknown;
  if (route === '/me' && method === 'GET') {
    response = {
      user: copyUser(account.user), progress: progressSummary(account),
      rank: rankingEntries(account).find((entry) => entry.me)?.rank ?? null,
    } satisfies Me;
  } else if (route === '/me' && method === 'PATCH') {
    const profile = profileFields(objectBody(body));
    account.user = { ...account.user, ...profile };
    persistDemoData();
    response = copyUser(account.user);
  } else if (route === '/me/xp-history' && method === 'GET') {
    response = xpHistory(account, queryInteger(url.searchParams, 'days', 30, 1, 365));
  } else if (route === '/me/attempts' && method === 'GET') {
    const limit = queryInteger(url.searchParams, 'limit', 8, 1, 100);
    response = [...account.attempts].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).slice(0, limit)
      .map((attempt) => ({ ...attempt }));
  } else if (route === '/sky' && method === 'GET') {
    response = sky(account);
  } else if (route === '/lessons' && method === 'GET') {
    const category = url.searchParams.get('category');
    const difficulty = url.searchParams.get('difficulty');
    const query = url.searchParams.get('q')?.trim().toLocaleLowerCase('tr-TR') ?? '';
    response = DEMO_LESSONS.filter((lesson) => (!category || lesson.categorySlug === category)
      && (!difficulty || lesson.difficulty === difficulty)
      && (!query || `${lesson.title} ${lesson.summary}`.toLocaleLowerCase('tr-TR').includes(query)))
      .map((lesson) => lessonCard(account, lesson));
  } else if (route === '/leaderboard' && method === 'GET') {
    const cityId = url.searchParams.has('cityId') ? queryInteger(url.searchParams, 'cityId', 61, 1, 81) : null;
    response = leaderboard(account, cityId, queryInteger(url.searchParams, 'limit', 50, 1, 100));
  } else if (route === '/leaderboard/cities' && method === 'GET') {
    response = cityLights(account);
  } else if (route === '/badges' && method === 'GET') {
    const badges = badgeViews(account);
    response = { badges, total: badges.length, earnedCount: badges.filter((badge) => badge.earned).length };
  } else if ((route === '/guide' && method === 'GET') || (route === '/guide/refresh' && method === 'POST')) {
    response = guide(account);
  } else {
    const match = route.match(/^\/lessons\/([^/]+)(?:\/(quiz|attempts))?$/);
    if (!match) throw new ApiError(404, 'Sayfa bulunamadı', 'Bu işlem demo modunda bulunmuyor.');
    let slug: string;
    try { slug = decodeURIComponent(match[1]); }
    catch { invalid('Ders adresi geçersiz.'); }
    const lesson = findLesson(slug);
    if (!match[2] && method === 'GET') response = lessonDetail(account, lesson);
    else if (match[2] === 'quiz' && method === 'GET') response = lessonQuiz(account, lesson);
    else if (match[2] === 'attempts' && method === 'POST') response = submitAttempt(account, lesson, body);
    else throw new ApiError(405, 'İşlem desteklenmiyor', 'Bu istek demo modunda desteklenmiyor.');
  }
  return response as T;
}
