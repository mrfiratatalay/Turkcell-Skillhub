// Frontend-only demo catalog, sourced from backend migration V2 through V7.
// Keep lesson and quiz content aligned with the full-stack application's seed data.
import { YAZILIM_LESSONS } from './lessons/yazilim';
import { YAPAY_ZEKA_LESSONS } from './lessons/yapay-zeka';
import { SIBER_GUVENLIK_LESSONS } from './lessons/siber-guvenlik';
import { GIRISIMCILIK_LESSONS } from './lessons/girisimcilik';
import { YAZILIM_QUESTIONS } from './questions/yazilim';
import { YAPAY_ZEKA_QUESTIONS } from './questions/yapay-zeka';
import { SIBER_GUVENLIK_QUESTIONS } from './questions/siber-guvenlik';
import { GIRISIMCILIK_QUESTIONS } from './questions/girisimcilik';
import type { DemoLesson, DemoLessonDetails, DemoQuestion } from './types';

export type { DemoBadge, DemoCategory, DemoCity, DemoLesson, DemoQuestion, DemoQuestionOption } from './types';
export { DEMO_BADGES } from './badges';
export { DEMO_CATEGORIES } from './categories';
export { DEMO_CITIES } from './cities';

const LESSON_DETAILS: readonly DemoLessonDetails[] = [
  ...YAZILIM_LESSONS,
  ...YAPAY_ZEKA_LESSONS,
  ...SIBER_GUVENLIK_LESSONS,
  ...GIRISIMCILIK_LESSONS,
];

export const DEMO_QUESTIONS: readonly DemoQuestion[] = [
  ...YAZILIM_QUESTIONS,
  ...YAPAY_ZEKA_QUESTIONS,
  ...SIBER_GUVENLIK_QUESTIONS,
  ...GIRISIMCILIK_QUESTIONS,
];

export const DEMO_LESSONS: readonly DemoLesson[] = LESSON_DETAILS.map((lesson) => ({
  ...lesson,
  questions: DEMO_QUESTIONS.filter((question) => question.lessonId === lesson.id),
}));
