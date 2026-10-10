import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { accent, ink, line, outline, surface } from '@/app/theme/tokens';
import type { Badge } from '@/shared/domain/types';
import { formatDate } from '@/shared/lib/format';
import { AppIcon } from '@/shared/ui/icons';

const FACE = {
  position: 'absolute',
  inset: 0,
  borderRadius: '20px',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  p: 2,
  overflow: 'hidden',
} as const;

/** `color` at `percent`% opacity; works for CSS-variable colors, unlike hex alpha suffixes. */
const fade = (color: string, percent: number) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/** A collectible card: tap to flip, hover for a holographic sheen. Locked badges keep their secret. */
export function BadgeCard({ badge }: { badge: Badge }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const tone = badge.tier === 'GOLD' ? accent.gold : accent.neon;
  // Only an earned badge lights up its edge; the rest wait on a plain ink card.
  const edge = !badge.earned ? line.default : badge.tier === 'GOLD' ? outline.reward : outline.neon;

  return (
    <ButtonBase
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${badge.name} rozeti${badge.earned ? ', kazanıldı' : ', kilitli'}. Detay için çevir.`}
      sx={{ display: 'block', width: '100%', aspectRatio: '3 / 4', borderRadius: '20px', perspective: 900,
        '&:focus-visible': { outline: `2px solid ${accent.neon}`, outlineOffset: 3 } }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        <Box sx={{ ...FACE, border: `1px solid ${edge}`,
          background: badge.earned
            ? `radial-gradient(circle at 50% 35%, ${fade(tone, 15)}, transparent 62%), ${surface.card}`
            : surface.card,
          '&::after': { content: '""', position: 'absolute', inset: '-40%', transform: 'translateX(-60%)',
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%)',
            transition: 'transform .7s' },
          '.MuiButtonBase-root:hover &::after': { transform: 'translateX(60%)' } }}>
          <Box sx={{ display: 'grid', justifyItems: 'center', gap: 1.25 }}>
            {badge.earned ? (
              <AppIcon name={badge.icon} sx={{ fontSize: 64, color: tone, filter: `drop-shadow(0 0 10px ${fade(tone, 40)})` }} />
            ) : (
              <Typography sx={{ fontSize: 64, fontWeight: 800, lineHeight: 1, color: fade(accent.neon, 70) }}>
                ?
              </Typography>
            )}
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: badge.earned ? ink.primary : ink.secondary }}>
              {badge.name}
            </Typography>
            <Typography variant="body2" sx={{ color: badge.earned ? tone : ink.muted, fontSize: 12, fontWeight: 600 }}>
              {badge.earned && badge.awardedAt ? formatDate(badge.awardedAt) : badge.secret ? 'Gizli' : 'Kilitli'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...FACE, transform: 'rotateY(180deg)', border: `1px solid ${edge}`, background: surface.raised }}>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="overline" sx={{ color: tone }}>{badge.earned ? 'Kazanıldı' : 'Nasıl kazanılır?'}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>
              {badge.earned ? badge.description : badge.hint}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </ButtonBase>
  );
}
