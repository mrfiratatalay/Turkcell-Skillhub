import type { Guide, Recommendation } from '@/features/guide/api';
import { DEMO_CATEGORIES, DEMO_LESSONS } from './catalog';
import type { DemoLesson } from './catalog';
import { lessonStatus, PASSING_SCORE } from './lessons';
import { streaks } from './progress';
import type { DemoAccount } from './state';

/** The rule-based Gece Rehberi of the full-stack app, computed from the visitor's demo progress. */
export function guide(account: DemoAccount): Guide {
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
