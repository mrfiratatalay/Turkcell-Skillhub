import Box from '@mui/material/Box';
import { useId } from 'react';
import { fonts, gold, ink, line } from '@/app/theme/tokens';

/** Warm amber the gold arc turns into as the night moves towards dawn. */
const DAWN = '#FF9F43';

interface NightClockRingProps {
  /** 0..1 progress through the whole night (17:00 → 07:00). */
  progress: number;
  time: string;
  caption?: string;
  size?: number;
}

/** "Gece Saati" dial: a gold arc that warms towards dawn as the night advances. */
export function NightClockRing({ progress, time, caption, size = 180 }: NightClockRingProps) {
  const gradientId = useId();
  const circumference = 2 * Math.PI * 50;
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <Box
      component="svg"
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Gece Saati ${time}${caption ? `, ${caption}` : ''}`}
      sx={{ width: size, height: size, display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gold} />
          <stop offset="100%" stopColor={DAWN} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="none" stroke={line.default} strokeWidth="7" />
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
        return (
          <circle key={i} cx={60 + Math.cos(angle) * 39} cy={60 + Math.sin(angle) * 39} r="1.1" fill={ink.muted}
            opacity="0.7" />
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
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)' }}
      />
      <text x="60" y={caption ? 63 : 67} textAnchor="middle" fill={ink.primary}
        style={{ font: `800 22px ${fonts.display}` }}>
        {time}
      </text>
      {caption && (
        <text x="60" y="77" textAnchor="middle" fill={ink.muted}
          style={{ font: `700 6px ${fonts.mono}`, letterSpacing: '.4px' }}>
          {caption.toLocaleUpperCase('tr-TR')}
        </text>
      )}
    </Box>
  );
}
