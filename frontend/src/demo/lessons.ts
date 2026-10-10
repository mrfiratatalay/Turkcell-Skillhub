import { ApiError } from '@/shared/api/ApiError';
import type { CategoryRef, LessonRef, LessonStatus } from '@/shared/domain/types';
import type { LessonCardData, LessonDetail } from '@/features/lessons/api';
import type { AttemptResult, Quiz, ReviewItem } from '@/features/quiz/api';
import type { Sky } from '@/features/sky/api';
import { DEMO_CATEGORIES, DEMO_LESSONS } from './catalog';
import type { DemoLesson } from './catalog';
import { awardBadges, completedLessons, nightClock, totalXp } from './progress';
import { invalid, objectBody } from './requests';
import { makeId, persistDemoData } from './state';
import type { DemoAccount } from './state';

export const PASSING_SCORE = 70;

export function findLesson(slug: string): DemoLesson {
  const lesson = DEMO_LESSONS.find((entry) => entry.slug === slug);
  if (!lesson) throw new ApiError(404, 'Ders bulunamadı', 'Bu yıldız demo kataloğunda bulunmuyor.');
  return lesson;
}

export function lessonStatus(account: DemoAccount, lesson: DemoLesson): LessonStatus {
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

export function lessonCard(account: DemoAccount, lesson: DemoLesson): LessonCardData {
  return {
    slug: lesson.slug, title: lesson.title, summary: lesson.summary, category: categoryRef(lesson),
    difficulty: lesson.difficulty, durationMin: lesson.durationMin, xpReward: lesson.xpReward,
    questionCount: lesson.questions.length, status: lessonStatus(account, lesson),
    bestScore: account.bestScores[lesson.slug] ?? null, missingPrerequisites: [],
  };
}

export function lessonDetail(account: DemoAccount, lesson: DemoLesson): LessonDetail {
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

export function lessonQuiz(account: DemoAccount, lesson: DemoLesson): Quiz {
  return {
    lessonSlug: lesson.slug, lessonTitle: lesson.title, passingScore: PASSING_SCORE, xpReward: lesson.xpReward,
    bestScore: account.bestScores[lesson.slug] ?? null,
    questions: lesson.questions.map((question) => ({
      id: question.id, position: question.position, prompt: question.prompt,
      options: question.options.map((option) => ({ id: option.id, label: option.label })),
    })),
  };
}

export function submitAttempt(account: DemoAccount, lesson: DemoLesson, body: unknown): AttemptResult {
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

export function sky(account: DemoAccount): Sky {
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
