import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import StarOutlineRounded from '@mui/icons-material/StarOutlineRounded';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';
import { gold, ink, neon, tint } from '@/app/theme/tokens';
import type { Difficulty, LessonStatus } from '@/shared/domain/types';
import { difficultyLabel, statusLabel } from '@/shared/lib/labels';

const STATUS_STYLE: Record<LessonStatus, { color: string; background: string; icon: ReactElement }> = {
  COMPLETED: { color: gold, background: tint.gold, icon: <CheckCircleRounded /> },
  AVAILABLE: { color: neon[300], background: tint.neon, icon: <StarOutlineRounded /> },
  LOCKED: { color: ink.muted, background: 'rgba(125, 135, 158, 0.10)', icon: <LockRounded /> },
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
        '& .MuiChip-icon': { color: style.color, fontSize: 16 },
      }}
    />
  );
}

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  return <Chip size="small" variant="outlined" label={difficultyLabel[difficulty]} />;
}
