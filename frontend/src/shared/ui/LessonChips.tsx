import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';
import { gold, ink, neon } from '@/app/theme/tokens';
import type { Difficulty, LessonStatus } from '@/shared/domain/types';
import { difficultyLabel, statusLabel } from '@/shared/lib/labels';

const STATUS_STYLE: Record<LessonStatus, { color: string; background: string; icon: ReactElement }> = {
  COMPLETED: { color: gold, background: 'rgba(253,196,11,.12)', icon: <CheckCircleRounded /> },
  AVAILABLE: { color: neon[100], background: 'rgba(92,163,238,.14)', icon: <StarOutlineRounded /> },
  LOCKED: { color: ink.muted, background: 'rgba(132,148,196,.10)', icon: <LockRounded /> },
};

export function StatusChip({ status, size = 'small' }: { status: LessonStatus; size?: 'small' | 'medium' }) {
  const style = STATUS_STYLE[status];
  return (
    <Chip
      size={size}
      icon={style.icon}
      label={statusLabel[status]}
      sx={{
        color: style.color,
        background: style.background,
        boxShadow: `0 0 0 1px ${style.color}55`,
        '& .MuiChip-icon': { color: style.color, fontSize: 16 },
      }}
    />
  );
}

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  return <Chip size="small" variant="outlined" label={difficultyLabel[difficulty]} />;
}
