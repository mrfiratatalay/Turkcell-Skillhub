import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import { motion } from 'motion/react';
import { fonts, gold, ink, neon } from '@/app/theme/tokens';
import { difficultyLabel, statusLabel } from '@/shared/lib/labels';
import type { Star } from './api';

const pulse = keyframes`0%, 100% { transform: scale(.85); opacity: .35; } 50% { transform: scale(1.25); opacity: .85; }`;

const SPARKLE = 'M0,-1 L0.24,-0.24 L1,0 L0.24,0.24 L0,1 L-0.24,0.24 L-1,0 L-0.24,-0.24 Z';

function shortTitle(title: string) {
  const head = title.split(':')[0];
  return head.length > 24 ? `${head.slice(0, 22)}…` : head;
}

interface SkyStarProps {
  star: Star;
  index: number;
  reduceMotion: boolean;
  onOpen: (slug: string) => void;
}

/** One lesson on the sky. Keyboard and screen-reader friendly: it behaves like a link. */
export function SkyStar({ star, index, reduceMotion, onOpen }: SkyStarProps) {
  const size = 9 + (star.xpReward - 100) / 25;
  const lit = star.status === 'COMPLETED';
  const open = star.status === 'AVAILABLE';
  const labelColor = lit ? '#FFE58A' : open ? '#fff' : ink.muted;
  const tooltip = (
    <>
      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{star.title}</Typography>
      <Typography sx={{ fontSize: 12, color: ink.secondary }}>
        {statusLabel[star.status]} · {difficultyLabel[star.difficulty]} · {star.xpReward} XP
        {star.bestScore !== null ? ` · En iyi %${star.bestScore}` : ''}
      </Typography>
    </>
  );

  return (
    <Tooltip title={tooltip} arrow placement="top">
      <motion.g
        role="link"
        tabIndex={0}
        aria-label={`${star.title}, ${statusLabel[star.status]}`}
        onClick={() => onOpen(star.slug)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(star.slug)}
        style={{ cursor: 'pointer', outline: 'none' }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 + index * 0.05, duration: 0.5, ease: 'easeOut' }}
      >
        <circle cx={star.x} cy={star.y} r={size + 16} fill="transparent" />
        {lit && <circle cx={star.x} cy={star.y} r={size * 2.4} fill="url(#sky-lit-halo)" />}
        {open && (
          <circle
            cx={star.x}
            cy={star.y}
            r={size * 2}
            fill="url(#sky-open-halo)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: reduceMotion ? 'none' : `${pulse} 2.6s ease-in-out ${index * 0.2}s infinite`,
            }}
          />
        )}
        {lit ? (
          <path d={SPARKLE} transform={`translate(${star.x} ${star.y}) scale(${size * 1.25})`} fill={gold}
            filter="url(#sky-glow)" />
        ) : (
          <circle
            cx={star.x}
            cy={star.y}
            r={open ? size * 0.62 : size * 0.38}
            fill={open ? '#fff' : 'rgba(132,148,196,.45)'}
            stroke={open ? neon[300] : 'none'}
            strokeWidth={open ? 2.5 : 0}
            filter={open ? 'url(#sky-glow)' : undefined}
          />
        )}
        <text x={star.x} y={star.y + size + 20} textAnchor="middle" fill={labelColor}
          style={{ font: `600 12px ${fonts.display}`, opacity: star.status === 'LOCKED' ? 0.75 : 1 }}>
          {shortTitle(star.title)}
        </text>
      </motion.g>
    </Tooltip>
  );
}
