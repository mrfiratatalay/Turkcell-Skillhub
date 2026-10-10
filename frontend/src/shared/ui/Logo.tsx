import Box from '@mui/material/Box';
import { accent, fonts, gold, ink, neon, onNight } from '@/app/theme/tokens';

interface LogoProps {
  size?: number;
  /** `onNight` keeps the light colors when the logo sits on a night window (the login hero). */
  tone?: 'auto' | 'onNight';
}

/** Our own mark: a crescent and a spark, written as code. Inspired by, not copied from, Code Night. */
export function Logo({ size = 26, tone = 'auto' }: LogoProps) {
  const night = tone === 'onNight';
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, fontWeight: 800, fontSize: size, lineHeight: 1,
      color: night ? onNight.primary : ink.primary }}>
      <svg width={size * 1.25} height={size * 1.25} viewBox="0 0 48 48" aria-hidden>
        <path d="M30 4A20 20 0 1 0 44 34 16 16 0 1 1 30 4Z" fill={gold} />
        <path d="M40 8l1.4 3.6L45 13l-3.6 1.4L40 18l-1.4-3.6L35 13l3.6-1.4Z" style={{ fill: night ? '#fff' : ink.primary }} />
      </svg>
      <span>
        <Box component="span" sx={{ fontFamily: fonts.mono, color: night ? neon[300] : accent.neon }}>
          &lt;
        </Box>
        Skill
        <Box component="span" sx={{ color: night ? gold : accent.gold }}>
          Hub
        </Box>
      </span>
    </Box>
  );
}
