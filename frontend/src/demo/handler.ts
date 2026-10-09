import { ApiError } from '@/shared/api/ApiError';
import { sessionStore } from '@/shared/auth/sessionStore';
import type { Session } from '@/shared/auth/sessionStore';
import type { CategoryRef, LessonRef, LessonStatus, SessionUser } from '@/shared/domain/types';
import type { Guide, Recommendation } from '@/features/guide/api';
import type { CityLights, Leaderboard, LeaderboardEntry } from '@/features/leaderboard/api';
import type { LessonCardData, LessonDetail } from '@/features/lessons/api';
import type { Me } from '@/features/me/api';
import type { AttemptResult, Quiz, ReviewItem } from '@/features/quiz/api';
import type { Sky } from '@/features/sky/api';
import { DEMO_CATEGORIES, DEMO_CITIES, DEMO_LESSONS } from './catalog';
import type { DemoLesson } from './catalog';
import { awardBadges, badgeViews, completedLessons, nightClock, progressSummary, streaks, totalXp, xpHistory } from './progress';
import { DEMO_EMAIL, DEMO_PASSWORD, DEMO_USER_ID, demoDatabase, makeId, persistDemoData } from './state';
import type { DemoAccount, DemoCredential } from './state';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
}

const PASSING_SCORE = 70;

function invalid(detail: string, fields: Record<string, string> = {}): never {
  throw new ApiError(400, 'Geçersiz bilgi', detail, fields);
}

function objectBody(body: unknown): Record<string, unknown> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) invalid('Gönderilen bilgiler okunamadı.');
  return body as Record<string, unknown>;
}

function copyUser(user: SessionUser): SessionUser {
  return { ...user, city: { ...user.city } };
}

function createSession(account: DemoAccount): Session {
  // This credential is valid only for the local adapter; it cannot authenticate with the backend.
  return {
    token: `demo:${account.user.id}:${makeId()}`,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    user: copyUser(account.user),
  };
}

function currentAccount(): DemoAccount {
  const session = sessionStore.get();
  const prefix = session && `demo:${session.user.id}:`;
  const account = session && demoDatabase().accounts.find((entry) => entry.user.id === session.user.id);
  if (!session || !prefix || !session.token.startsWith(prefix)
    || !Number.isFinite(Date.parse(session.expiresAt)) || Date.parse(session.expiresAt) <= Date.now() || !account) {
    sessionStore.set(null);
    throw new ApiError(401, 'Oturum gerekli', 'Demoyu kullanmak için tekrar giriş yap.');
  }
  return account;
}

function checkAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new DOMException('İstek iptal edildi.', 'AbortError');
}

function bytesHex(bytes: Uint8Array): string {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function passwordHash(password: string, saltHex: string, iterations: number): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new ApiError(503, 'Yerel kayıt kullanılamıyor', 'Bu tarayıcı yerel hesap için güvenli şifrelemeyi desteklemiyor. Demo hesabıyla giriş yapabilirsin.');
  }
  const salt = Uint8Array.from(saltHex.match(/.{2}/g) ?? [], (byte) => parseInt(byte, 16));
  const key = await globalThis.crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await globalThis.crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return bytesHex(new Uint8Array(hash));
}

async function createCredential(password: string): Promise<DemoCredential> {
  if (!globalThis.crypto?.subtle) {
    throw new ApiError(503, 'Yerel kayıt kullanılamıyor', 'Bu tarayıcı yerel hesap için güvenli şifrelemeyi desteklemiyor. Demo hesabıyla giriş yapabilirsin.');
  }
  const salt = bytesHex(globalThis.crypto.getRandomValues(new Uint8Array(16)));
  const iterations = 120_000;
  return { salt, iterations, hash: await passwordHash(password, salt, iterations) };
}

async function login(body: unknown, signal?: AbortSignal): Promise<Session> {
  const request = objectBody(body);
  const email = typeof request.email === 'string' ? request.email.trim().toLowerCase() : '';
  const password = typeof request.password === 'string' ? request.password : '';
  if (!email || !password) invalid('E-posta ve şifreyi gir.');
  const account = demoDatabase().accounts.find((entry) => entry.user.email.toLowerCase() === email);
  let matches = false;
  if (account?.user.id === DEMO_USER_ID) matches = email === DEMO_EMAIL && password === DEMO_PASSWORD;
  else if (account?.credential) {
    matches = await passwordHash(password, account.credential.salt, account.credential.iterations) === account.credential.hash;
  }
  checkAborted(signal);
  if (!account || !matches) {
    throw new ApiError(401, 'Giriş yapılamadı', 'E-posta veya şifre yanlış. Bu demoda yalnızca bu tarayıcıda oluşturduğun hesaplar ve demo hesabı kullanılabilir.');
  }
  persistDemoData();
  return createSession(account);
}

function profileFields(request: Record<string, unknown>): Pick<SessionUser, 'displayName' | 'city' | 'university'> {
  const errors: Record<string, string> = {};
  const displayName = typeof request.displayName === 'string' ? request.displayName.trim() : '';
  if (displayName.length < 2 || displayName.length > 40) errors.displayName = 'Ad soyad 2-40 karakter olmalı.';
  const city = DEMO_CITIES.find((entry) => entry.id === request.cityId);
  if (!city) errors.cityId = 'Şehir seçmelisin.';
  const university = typeof request.university === 'string' ? request.university.trim() : '';
  if (university.length > 120) errors.university = 'Üniversite adı çok uzun.';
  if (Object.keys(errors).length > 0 || !city) invalid('Bilgilerini kontrol edip tekrar dene.', errors);
  return { displayName, city: { id: city.id, name: city.name }, university: university || null };
}

async function register(body: unknown, signal?: AbortSignal): Promise<Session> {
  const request = objectBody(body);
  const profile = profileFields(request);
  const email = typeof request.email === 'string' ? request.email.trim().toLowerCase() : '';
  const password = typeof request.password === 'string' ? request.password : '';
  const errors: Record<string, string> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errors.email = 'Geçerli bir e-posta gir.';
  if (password.length < 8 || password.length > 72) errors.password = 'Şifre 8-72 karakter olmalı.';
  if (Object.keys(errors).length > 0) invalid('Bilgilerini kontrol edip tekrar dene.', errors);
  if (demoDatabase().accounts.some((entry) => entry.user.email.toLowerCase() === email)) {
    throw new ApiError(409, 'Hesap zaten var', 'Bu e-posta bu tarayıcıdaki demoda kayıtlı.', { email: 'Bu e-posta zaten kullanılıyor.' });
  }
  const credential = await createCredential(password);
  checkAborted(signal);
  // Recheck after asynchronous hashing so two submissions cannot create duplicate accounts.
  if (demoDatabase().accounts.some((entry) => entry.user.email.toLowerCase() === email)) {
    throw new ApiError(409, 'Hesap zaten var', 'Bu e-posta bu tarayıcıdaki demoda kayıtlı.', { email: 'Bu e-posta zaten kullanılıyor.' });
  }
  const account: DemoAccount = {
    user: { id: makeId(), email, ...profile, memberSince: new Date().toISOString() },
    credential, bestScores: {}, attempts: [], badgeAwards: {},
  };
  demoDatabase().accounts.push(account);
  persistDemoData();
  return createSession(account);
}

function findLesson(slug: string): DemoLesson {
  const lesson = DEMO_LESSONS.find((entry) => entry.slug === slug);
  if (!lesson) throw new ApiError(404, 'Ders bulunamadı', 'Bu yıldız demo kataloğunda bulunmuyor.');
  return lesson;
}

function lessonStatus(account: DemoAccount, lesson: DemoLesson): LessonStatus {
  // Every module is accessible to portfolio visitors, including advanced prerequisite chains.
  return (account.bestScores[lesson.slug] ?? 0) >= PASSING_SCORE ? 'COMPLETED' : 'AVAILABLE';
}

function categoryRef(lesson: DemoLesson): CategoryRef {
  const category = DEMO_CATEGORIES.find((entry) => entry.id === lesson.categoryId)!;
  return { slug: category.slug, name: category.name, constellation: category.constellation, icon: category.icon };
}

function lessonRef(account: DemoAccount, lesson: DemoLesson): LessonRef {
  return { slug: lesson.slug, title: lesson.title, status: lessonStatus(account, lesson) };
}

function lessonCard(account: DemoAccount, lesson: DemoLesson): LessonCardData {
  return {
    slug: lesson.slug, title: lesson.title, summary: lesson.summary, category: categoryRef(lesson),
    difficulty: lesson.difficulty, durationMin: lesson.durationMin, xpReward: lesson.xpReward,
    questionCount: lesson.questions.length, status: lessonStatus(account, lesson),
    bestScore: account.bestScores[lesson.slug] ?? null, missingPrerequisites: [],
  };
}

function lessonDetail(account: DemoAccount, lesson: DemoLesson): LessonDetail {
  const { missingPrerequisites: _missing, ...card } = lessonCard(account, lesson);
  const path = new Set<string>();
  const visit = (current: DemoLesson) => {
    for (const slug of current.prerequisiteSlugs) {
      if (!path.has(slug)) {
        path.add(slug);
        visit(findLesson(slug));
      }
    }
  };
  visit(lesson);
  return {
    ...card, objectives: [...lesson.objectives], paragraphs: [...lesson.paragraphs], videoId: lesson.videoId,
    attempts: account.attempts.filter((attempt) => attempt.lessonSlug === lesson.slug).length,
    prerequisites: lesson.prerequisiteSlugs.map((slug) => lessonRef(account, findLesson(slug))),
    unlockPath: DEMO_LESSONS.filter((entry) => path.has(entry.slug) && lessonStatus(account, entry) !== 'COMPLETED')
      .map((entry) => lessonRef(account, entry)),
    unlocks: DEMO_LESSONS.filter((entry) => entry.prerequisiteSlugs.includes(lesson.slug)).map((entry) => lessonRef(account, entry)),
  };
}

function lessonQuiz(account: DemoAccount, lesson: DemoLesson): Quiz {
  return {
    lessonSlug: lesson.slug, lessonTitle: lesson.title, passingScore: PASSING_SCORE, xpReward: lesson.xpReward,
    bestScore: account.bestScores[lesson.slug] ?? null,
    questions: lesson.questions.map((question) => ({
      id: question.id, position: question.position, prompt: question.prompt,
      options: question.options.map((option) => ({ id: option.id, label: option.label })),
    })),
  };
}

function submitAttempt(account: DemoAccount, lesson: DemoLesson, body: unknown): AttemptResult {
  const request = objectBody(body);
  if (!Array.isArray(request.answers) || request.answers.length !== lesson.questions.length) {
    invalid('Quiz’i bitirmek için tüm soruları cevaplamalısın.');
  }
  const answers = new Map<number, number>();
  for (const item of request.answers) {
    const answer = objectBody(item);
    if (typeof answer.questionId !== 'number' || typeof answer.optionId !== 'number'
      || !Number.isInteger(answer.questionId) || !Number.isInteger(answer.optionId)) invalid('Cevaplar okunamadı.');
    if (answers.has(answer.questionId)) invalid('Bir soruya yalnızca bir kez cevap verilebilir.');
    answers.set(answer.questionId, answer.optionId);
  }
  const review: ReviewItem[] = lesson.questions.map((question) => {
    const selectedOptionId = answers.get(question.id);
    if (selectedOptionId === undefined || !question.options.some((option) => option.id === selectedOptionId)) {
      invalid('Seçilen şık bu soruya ait değil.');
    }
    return {
      questionId: question.id, prompt: question.prompt,
      options: question.options.map((option) => ({ id: option.id, label: option.label })),
      selectedOptionId, correctOptionId: question.correctOptionId,
      correct: selectedOptionId === question.correctOptionId, explanation: question.explanation,
    };
  });
  const correctCount = review.filter((answer) => answer.correct).length;
  const score = Math.round(correctCount * 100 / review.length);
  const passed = score >= PASSING_SCORE;
  const previousBestScore = account.bestScores[lesson.slug] ?? null;
  const failedBefore = account.attempts.some((attempt) => attempt.lessonSlug === lesson.slug && !attempt.passed);
  const xpBefore = totalXp(account);
  const xpEarned = Math.max(0, Math.round(lesson.xpReward * score / 100)
    - Math.round(lesson.xpReward * (previousBestScore ?? 0) / 100));
  const completedAt = new Date().toISOString();
  const attemptId = makeId();
  account.bestScores[lesson.slug] = Math.max(previousBestScore ?? 0, score);
  account.attempts.push({
    attemptId, lessonSlug: lesson.slug, lessonTitle: lesson.title, categorySlug: lesson.categorySlug,
    score, passed, xpEarned, completedAt,
  });
  const newBadges = awardBadges(account, { at: completedAt, passed, failedBefore });
  const clockBefore = nightClock(xpBefore);
  const clockAfter = nightClock(totalXp(account));
  persistDemoData();
  return {
    attemptId, lessonSlug: lesson.slug, lessonTitle: lesson.title, score, correctCount,
    questionCount: review.length, passed, passingScore: PASSING_SCORE, previousBestScore, xpEarned,
    totalXp: totalXp(account), nightClockBefore: clockBefore, nightClockAfter: clockAfter,
    leveledUp: clockAfter.level > clockBefore.level, newBadges,
    unlockedLessons: [],
    review,
  };
}

function sky(account: DemoAccount): Sky {
  return {
    constellations: DEMO_CATEGORIES.map((category) => {
      const lessons = DEMO_LESSONS.filter((lesson) => lesson.categoryId === category.id);
      return {
        slug: category.slug, name: category.name, constellation: category.constellation,
        icon: category.icon, description: category.description,
        completed: lessons.filter((lesson) => lessonStatus(account, lesson) === 'COMPLETED').length,
        total: lessons.length,
        stars: lessons.map((lesson) => ({
          slug: lesson.slug, title: lesson.title, status: lessonStatus(account, lesson), x: lesson.x, y: lesson.y,
          difficulty: lesson.difficulty, xpReward: lesson.xpReward, bestScore: account.bestScores[lesson.slug] ?? null,
        })),
      };
    }),
    links: DEMO_LESSONS.flatMap((lesson) => lesson.prerequisiteSlugs.map((slug) => ({
      from: slug, to: lesson.slug, crossConstellation: findLesson(slug).categoryId !== lesson.categoryId,
      lit: lessonStatus(account, lesson) === 'COMPLETED' && lessonStatus(account, findLesson(slug)) === 'COMPLETED',
    }))),
    completed: completedLessons(account), total: DEMO_LESSONS.length,
  };
}

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

function rankingEntries(account: DemoAccount, cityId: number | null = null): LeaderboardEntry[] {
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

function leaderboard(account: DemoAccount, cityId: number | null, limit: number): Leaderboard {
  const entries = rankingEntries(account, cityId);
  return { entries: entries.slice(0, limit), me: entries.find((entry) => entry.me) ?? null, cityId };
}

function cityLights(account: DemoAccount): CityLights {
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

function guide(account: DemoAccount): Guide {
  const recommendations: Recommendation[] = [];
  const available = DEMO_LESSONS.filter((lesson) => lessonStatus(account, lesson) === 'AVAILABLE');
  const add = (kind: Recommendation['kind'], title: string, reason: string, lesson: DemoLesson | null, priority: number) => {
    recommendations.push({ kind, title, reason, lessonSlug: lesson?.slug ?? null, lessonTitle: lesson?.title ?? null, priority });
  };
  const difficulty = { BEGINNER: 0, INTERMEDIATE: 1, ADVANCED: 2 };
  const next = [...available].sort((a, b) => difficulty[a.difficulty] - difficulty[b.difficulty]
    || b.prerequisiteSlugs.length - a.prerequisiteSlugs.length)[0];
  if (next) add('NEXT_STAR', 'Sıradaki yıldızın', `${next.title} seni bekliyor. En iyi skorunu geliştirerek ${next.xpReward} XP’ye kadar kazanabilirsin.`, next, 100);
  const retry = available.filter((lesson) => account.bestScores[lesson.slug] !== undefined)
    .sort((a, b) => account.bestScores[a.slug] - account.bestScores[b.slug])[0];
  if (retry) add('RETRY', 'Yarım kalan yıldızı yak', `${retry.title} dersinde en iyi skorun %${account.bestScores[retry.slug]}. %70 ile yıldızı yakabilirsin.`, retry, 90);
  const streak = streaks(account);
  if (streak.current > 0 && !streak.activeToday) add('STREAK', 'Serini koru', `${streak.current} günlük serin var. Bugün bir quiz çözerek serini sürdürebilirsin.`, null, 85);
  const categoryProgress = DEMO_CATEGORIES.map((category) => {
    const lessons = DEMO_LESSONS.filter((lesson) => lesson.categoryId === category.id);
    return { category, lessons, completed: lessons.filter((lesson) => lessonStatus(account, lesson) === 'COMPLETED').length };
  });
  const nearComplete = categoryProgress.filter((entry) => entry.completed > 0 && entry.completed < entry.lessons.length)
    .sort((a, b) => (a.lessons.length - a.completed) - (b.lessons.length - b.completed))[0];
  if (nearComplete) {
    const lesson = nearComplete.lessons.find((entry) => lessonStatus(account, entry) === 'AVAILABLE')!;
    add('CONSTELLATION', `${nearComplete.category.constellation} takımyıldızını tamamla`, `${nearComplete.category.name} alanında ${nearComplete.lessons.length - nearComplete.completed} yıldız kaldı. Hepsini tamamlayarak özel rozetini kazanabilirsin.`, lesson, 80);
  }
  const unexplored = categoryProgress.find((entry) => entry.completed === 0);
  if (unexplored) add('EXPLORE', 'Yeni bir takımyıldız keşfet', `${unexplored.category.name} alanında henüz tamamladığın ders yok. İlk yıldızından başlayabilirsin.`, unexplored.lessons[0], 70);
  const polish = DEMO_LESSONS.filter((lesson) => (account.bestScores[lesson.slug] ?? 0) >= PASSING_SCORE
    && account.bestScores[lesson.slug] < 100).sort((a, b) => account.bestScores[a.slug] - account.bestScores[b.slug])[0];
  if (polish) add('POLISH', 'Kusursuzluğa bir adım', `${polish.title} dersinde en iyi skorun %${account.bestScores[polish.slug]}. %100 ile kalan XP’yi toplayabilirsin.`, polish, 60);
  if (recommendations.length === 0) {
    add('POLISH', 'Gökyüzün tamamlandı', 'Tüm yıldızları en iyi skorla tamamladın. İstediğin quiz’i tekrar çözerek bilgilerini tazeleyebilirsin.', DEMO_LESSONS[0] ?? null, 60);
  }
  return {
    source: 'RULES', model: null, aiConfigured: false, generatedAt: new Date().toISOString(),
    recommendations: recommendations.sort((a, b) => b.priority - a.priority).slice(0, 3),
  };
}

function queryInteger(params: URLSearchParams, key: string, fallback: number, min: number, max: number): number {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const value = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isInteger(value) || value < min || value > max) invalid('İstek parametreleri geçersiz.');
  return value;
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
