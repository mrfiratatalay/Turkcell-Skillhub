import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import { memo, useMemo } from 'react';
import { fonts, neon } from '@/app/theme/tokens';

const fall = keyframes`from { transform: translateY(-55%); } to { transform: translateY(55%); }`;
const twinkle = keyframes`from { opacity: .45; } to { opacity: 1; }`;

const STARS = [
  'radial-gradient(1.2px 1.2px at 12% 18%, #fff, transparent)',
  'radial-gradient(1px 1px at 72% 12%, #fff, transparent)',
  'radial-gradient(1.4px 1.4px at 38% 64%, #cfe3ff, transparent)',
  'radial-gradient(1px 1px at 86% 58%, #fff, transparent)',
  'radial-gradient(1px 1px at 55% 35%, #fff, transparent)',
  'radial-gradient(1.3px 1.3px at 22% 84%, #fff, transparent)',
  'radial-gradient(0.9px 0.9px at 93% 88%, #cfe3ff, transparent)',
].join(',');

/** Seeded so the rain looks identical on every render (no layout shift, no flicker). */
function rainColumns(count: number) {
  let seed = 20251120;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: Array.from({ length: 36 }, () => (random() > 0.5 ? '1' : '0')).join(''),
    duration: 22 + random() * 26,
    delay: -random() * 40,
  }));
}

/**
 * The Code Night backdrop: night gradient (from the body), twinkling stars and a faint binary rain.
 * Decorative only: hidden from assistive tech, frozen when the user prefers reduced motion.
 */
export const NightSky = memo(function NightSky({ rain = 0.07 }: { rain?: number }) {
  const columns = useMemo(() => rainColumns(16), []);
  return (
    <Box aria-hidden sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: STARS,
          backgroundSize: '340px 340px',
          animation: `${twinkle} 6s ease-in-out infinite alternate`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', opacity: rain }}>
        {columns.map((column) => (
          <Box
            key={column.id}
            component="span"
            sx={{
              fontFamily: fonts.mono,
              fontSize: 13,
              lineHeight: 1.3,
              color: neon[300],
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '2px',
              animation: `${fall} ${column.duration}s linear ${column.delay}s infinite`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            {column.text}
          </Box>
        ))}
      </Box>
    </Box>
  );
});
