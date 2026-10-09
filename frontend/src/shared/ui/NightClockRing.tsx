import Box from '@mui/material/Box';
import { useId } from 'react';
import { fonts, gold, ink, neon } from '@/app/theme/tokens';

interface NightClockRingProps {
  /** 0..1 progress through the whole night (17:00 → 07:00). */
  progress: number;
  time: string;
  caption?: string;
  size?: number;
}

/** "Gece Saati" dial: a neon ring that turns gold as dawn approaches. */
export function NightClockRing({ progress, time, caption, size = 180 }: NightClockRingProps) {
  const gradientId = useId();
  const glowId = useId();
  const circumference = 2 * Math.PI * 50;
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <Box
      component="svg"
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Gece Saati ${time}${caption ? `, ${caption}` : ''}`}
      sx={{ width: size, height: size, display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={neon[300]} />
          <stop offset="100%" stopColor={gold} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(172,227,253,.12)" strokeWidth="7" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
        return (
          <circle key={i} cx={60 + Math.cos(angle) * 39} cy={60 + Math.sin(angle) * 39} r="1.1" fill={ink.muted} />
        );
      })}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - clamped)}
        transform="rotate(-90 60 60)"
        filter={`url(#${glowId})`}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)' }}
      />
      <text x="60" y={caption ? 63 : 67} textAnchor="middle" fill="#fff"
        style={{ font: `800 22px ${fonts.display}` }}>
        {time}
      </text>
      {caption && (
        <text x="60" y="77" textAnchor="middle" fill={ink.secondary}
          style={{ font: `700 6px ${fonts.mono}`, letterSpacing: '.4px' }}>
          {caption.toLocaleUpperCase('tr-TR')}
        </text>
      )}
    </Box>
  );
}
