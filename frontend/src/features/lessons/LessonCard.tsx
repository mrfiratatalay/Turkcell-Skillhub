import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import QuizRounded from '@mui/icons-material/QuizRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { glow, gold, ink, neon } from '@/app/theme/tokens';
import { AppIcon } from '@/shared/ui/icons';
import { DifficultyChip, StatusChip } from '@/shared/ui/LessonChips';
import type { LessonCardData } from './api';

const SHADOW = {
  COMPLETED: '0 0 0 1px rgba(253,196,11,.55), 0 0 24px rgba(253,196,11,.18)',
  AVAILABLE: glow.neon,
  LOCKED: '0 0 0 1px rgba(132,148,196,.25)',
} as const;

function Meta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: ink.secondary, fontSize: 13,
      '& svg': { fontSize: 16, color: neon[300] } }}>
      {icon}
      {text}
    </Box>
  );
}

export function LessonCard({ lesson }: { lesson: LessonCardData }) {
  const locked = lesson.status === 'LOCKED';
  return (
    <Card
      component={RouterLink}
      to={`/dersler/${lesson.slug}`}
      sx={{
        p: 2.75,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: SHADOW[lesson.status],
        opacity: locked ? 0.78 : 1,
        transition: 'transform .2s ease, box-shadow .2s ease, opacity .2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: locked ? SHADOW.LOCKED : glow.neonStrong, opacity: 1 },
        '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 3 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: neon[300], minWidth: 0 }}>
          <AppIcon name={lesson.category.icon} sx={{ fontSize: 18 }} />
          <Typography variant="body2" noWrap sx={{ color: ink.secondary, fontWeight: 600 }}>
            {lesson.category.name}
          </Typography>
        </Box>
        <StatusChip status={lesson.status} />
      </Box>
      <Typography variant="h6" component="h3" sx={{ lineHeight: 1.3 }}>
        {lesson.title}
      </Typography>
      <Typography variant="body2" color="text.secondary"
        sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {lesson.summary}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mt: 'auto', pt: 0.5 }}>
        <Meta icon={<AccessTimeRounded />} text={`${lesson.durationMin} dk`} />
        <Meta icon={<BoltRounded />} text={`${lesson.xpReward} XP`} />
        <Meta icon={<QuizRounded />} text={`${lesson.questionCount} soru`} />
        <Box sx={{ ml: 'auto' }}>
          <DifficultyChip difficulty={lesson.difficulty} />
        </Box>
      </Box>
      {lesson.bestScore !== null && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography variant="body2" color="text.secondary">En iyi skorun</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: lesson.bestScore >= 70 ? gold : ink.secondary }}>
              %{lesson.bestScore}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={lesson.bestScore} aria-label="En iyi skor" />
        </Box>
      )}
      {locked && lesson.missingPrerequisites.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', color: ink.muted }}>
          <LockRounded sx={{ fontSize: 16, mt: '3px' }} />
          <Typography variant="body2">Önce: {lesson.missingPrerequisites.join(', ')}</Typography>
        </Box>
      )}
    </Card>
  );
}
