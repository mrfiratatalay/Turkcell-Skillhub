import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import ReplayRounded from '@mui/icons-material/ReplayRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { glow, gold, ink, neon } from '@/app/theme/tokens';
import { isDemoMode } from '@/shared/config/runtime';
import type { LessonRef } from '@/shared/domain/types';
import { NightClockRing } from '@/shared/ui/NightClockRing';
import { StatusChip } from '@/shared/ui/LessonChips';
import type { LessonDetail } from './api';

function RefList({ title, items }: { title: string; items: LessonRef[] }) {
  if (items.length === 0) return null;
  return (
    <Box>
      <Typography variant="overline" sx={{ color: neon[300] }}>{title}</Typography>
      <Box sx={{ display: 'grid', gap: 1, mt: 0.5 }}>
        {items.map((item) => (
          <Box key={item.slug} component={RouterLink} to={`/dersler/${item.slug}`}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, textDecoration: 'none',
              color: 'inherit', p: 1, borderRadius: '12px', '&:hover': { background: 'rgba(92,163,238,.10)' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            <StatusChip status={item.status} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** The decision panel: start, retry, or see exactly which stars unlock this one. */
export function LessonActionCard({ lesson }: { lesson: LessonDetail }) {
  const quizUrl = `/dersler/${lesson.slug}/quiz`;
  const remainingXp = lesson.bestScore === null ? lesson.xpReward
    : lesson.xpReward - Math.round((lesson.xpReward * lesson.bestScore) / 100);

  return (
    <Card sx={{ p: 3, display: 'grid', gap: 2.5, position: { lg: 'sticky' }, top: { lg: 32 },
      boxShadow: lesson.status === 'COMPLETED' ? glow.gold : glow.neon }}>
      {lesson.status === 'LOCKED' ? (
        <>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <LockRounded sx={{ color: ink.muted, fontSize: 32 }} />
            <Box>
              <Typography variant="h6">Bu yıldız henüz kilitli</Typography>
              <Typography variant="body2" color="text.secondary">Önce şu yıldızları yakmalısın:</Typography>
            </Box>
          </Box>
          <Box component="ol" sx={{ m: 0, pl: 3, display: 'grid', gap: 1 }}>
            {lesson.unlockPath.map((step) => (
              <li key={step.slug}>
                <Box component={RouterLink} to={`/dersler/${step.slug}`} sx={{ color: neon[100], fontWeight: 600 }}>
                  {step.title}
                </Box>
              </li>
            ))}
          </Box>
          {lesson.unlockPath[0] && (
            <Button component={RouterLink} to={`/dersler/${lesson.unlockPath[0].slug}`} variant="outlined"
              endIcon={<ArrowForwardRounded />}>
              İlk adıma git
            </Button>
          )}
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <NightClockRing progress={(lesson.bestScore ?? 0) / 100} time={lesson.bestScore === null ? '—' : `%${lesson.bestScore}`}
              caption="En iyi" size={96} />
            <Box>
              <Typography variant="h6">{lesson.status === 'COMPLETED' ? 'Yıldız yandı ✦' : 'Quiz seni bekliyor'}</Typography>
              <Typography variant="body2" color="text.secondary">
                {lesson.questionCount} soru · %70 ile geçersin
                {lesson.attempts > 0 ? ` · ${lesson.attempts} deneme` : ''}
              </Typography>
              <Typography variant="body2" sx={{ color: gold, fontWeight: 700, mt: 0.5 }}>
                {remainingXp > 0 ? `+${remainingXp} XP kazanılabilir` : 'Tüm XP toplandı'}
              </Typography>
            </Box>
          </Box>
          <Button component={RouterLink} to={quizUrl} variant="contained" size="large"
            startIcon={lesson.attempts > 0 ? <ReplayRounded /> : <PlayArrowRounded />}>
            {lesson.attempts > 0 ? 'Quiz’i tekrar çöz' : 'Quiz’e başla'}
          </Button>
        </>
      )}
      <RefList title={isDemoMode ? 'Önerilen önceki dersler' : 'Ön koşullar'} items={lesson.prerequisites} />
      <RefList title={isDemoMode ? 'Sonraki yıldızlar' : 'Bu yıldız şunları açar'} items={lesson.unlocks} />
      {isDemoMode && (
        <Typography variant="body2" color="text.secondary">
          Demoda tüm ders ve quizler açık. İstediğin yıldızdan başlayabilirsin.
        </Typography>
      )}
      <Typography variant="body2" sx={{ color: ink.muted, textAlign: 'center' }}>
        XP yalnızca en iyi skorunu geçtiğinde artar.
      </Typography>
    </Card>
  );
}
