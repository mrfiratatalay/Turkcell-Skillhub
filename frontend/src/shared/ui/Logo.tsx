import Box from '@mui/material/Box';
import { fonts, gold, ink, neon } from '@/app/theme/tokens';

/** Our own mark: a crescent and a spark, written as code. Inspired by, not copied from, Code Night. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, fontWeight: 800, fontSize: size, lineHeight: 1,
      color: ink.primary }}>
      <svg width={size * 1.25} height={size * 1.25} viewBox="0 0 48 48" aria-hidden>
        <path d="M30 4A20 20 0 1 0 44 34 16 16 0 1 1 30 4Z" fill={gold} />
        <path d="M40 8l1.4 3.6L45 13l-3.6 1.4L40 18l-1.4-3.6L35 13l3.6-1.4Z" fill="#fff" />
      </svg>
      <span>
        <Box component="span" sx={{ fontFamily: fonts.mono, color: neon[300] }}>
          &lt;
        </Box>
        Skill
        <Box component="span" sx={{ color: gold }}>
          Hub
        </Box>
      </span>
    </Box>
  );
}
