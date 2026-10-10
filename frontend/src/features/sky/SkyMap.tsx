import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { fonts, gold, ink, neon } from '@/app/theme/tokens';
import { isDemoMode } from '@/shared/config/runtime';
import type { Sky, Star } from './api';
import { SkyStar } from './SkyStar';

const WIDTH = 1000;
const HEIGHT = 620;

/** Deterministic background dust so the sky looks the same on every visit. */
function dust(count: number) {
  let seed = 61;
  const random = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({ id: i, x: random() * WIDTH, y: random() * HEIGHT,
    r: 0.4 + random() * 0.9, o: 0.15 + random() * 0.45 }));
}

/** "Gökyüzü Haritası": constellations = categories, stars = lessons, lines = prerequisites. */
export function SkyMap({ sky }: { sky: Sky }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion() ?? false;
  const background = useMemo(() => dust(140), []);
  const stars = useMemo(() => new Map<string, Star>(sky.constellations.flatMap((c) => c.stars.map((s) => [s.slug, s]))), [sky]);
  const open = (slug: string) => navigate(`/dersler/${slug}`);
  let starIndex = 0;

  return (
    <Box sx={{ overflowX: 'auto', mx: { xs: -1, sm: 0 }, WebkitOverflowScrolling: 'touch' }}>
      <Box
        component="svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label={`Gökyüzü haritası: ${sky.completed}/${sky.total} yıldız yandı`}
        sx={{ display: 'block', width: '100%', minWidth: 720, height: 'auto' }}
      >
        <defs>
          <filter id="sky-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="sky-lit-halo">
            <stop offset="0%" stopColor={gold} stopOpacity="0.45" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sky-open-halo">
            <stop offset="0%" stopColor={neon[100]} stopOpacity="0.35" />
            <stop offset="100%" stopColor={neon[300]} stopOpacity="0" />
          </radialGradient>
        </defs>

        {background.map((d) => (
          <circle key={d.id} cx={d.x} cy={d.y} r={d.r} fill="#fff" opacity={d.o} />
        ))}

        {sky.constellations.map((c) => {
          const xs = c.stars.map((s) => s.x);
          const ys = c.stars.map((s) => s.y);
          const x = (Math.min(...xs) + Math.max(...xs)) / 2;
          // Upper constellations are titled above, lower ones below, so titles never collide with star labels.
          const lowerHalf = Math.min(...ys) > HEIGHT / 2 - 40;
          const y = lowerHalf ? Math.max(...ys) + 52 : Math.max(28, Math.min(...ys) - 48);
          return (
            <text key={c.slug} x={x} y={y} textAnchor="middle" fill={neon[300]}
              style={{ font: `700 12px ${fonts.mono}`, letterSpacing: '2.5px' }}>
              {c.constellation.toLocaleUpperCase('tr-TR')} · {c.completed}/{c.total}
            </text>
          );
        })}

        {sky.links.map((link, i) => {
          const from = stars.get(link.from);
          const to = stars.get(link.to);
          if (!from || !to) return null;
          return (
            <motion.line
              key={`${link.from}-${link.to}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={link.lit ? gold : neon[300]}
              strokeOpacity={link.lit ? 0.75 : 0.3}
              strokeWidth={link.lit ? 2.2 : 1.4}
              strokeDasharray={link.lit ? undefined : link.crossConstellation ? '2 8' : '5 7'}
              strokeLinecap="round"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.8 }}
            />
          );
        })}

        {sky.constellations.flatMap((c) =>
          c.stars.map((star) => (
            <SkyStar key={star.slug} star={star} index={starIndex++} reduceMotion={reduceMotion} onOpen={open} />
          )),
        )}
      </Box>
      <Typography variant="body2" sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'center', color: ink.muted,
        position: 'sticky', left: 0, width: '100%', mt: 0.5 }}>
        ← Haritayı kaydırarak keşfet →
      </Typography>
    </Box>
  );
}

export function SkyLegend() {
  const items = [
    { label: 'Yanan yıldız', color: gold },
    { label: 'Keşfe açık', color: ink.primary },
    ...(!isDemoMode ? [{ label: 'Kilitli', color: ink.muted }] : []),
  ];
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
      {items.map((item) => (
        <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
          <Typography variant="body2" sx={{ color: ink.secondary }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
