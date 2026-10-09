import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { glow, gold, ink, neon, night } from '@/app/theme/tokens';
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

/** A collectible card: tap to flip, hover for a holographic sheen. Locked badges keep their secret. */
export function BadgeCard({ badge }: { badge: Badge }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const accent = badge.tier === 'GOLD' ? gold : neon[100];
  const shadow = !badge.earned ? glow.neon : badge.tier === 'GOLD' ? glow.gold : glow.neonStrong;

  return (
    <ButtonBase
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${badge.name} rozeti${badge.earned ? ', kazanıldı' : ', kilitli'}. Detay için çevir.`}
      sx={{ display: 'block', width: '100%', aspectRatio: '3 / 4', borderRadius: '20px', perspective: 900,
        '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 3 } }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        <Box sx={{ ...FACE, boxShadow: shadow,
          background: badge.earned
            ? `radial-gradient(circle at 50% 35%, ${accent}33, transparent 60%), linear-gradient(160deg, #0a2a8a, ${night[800]})`
            : `linear-gradient(160deg, rgba(10,42,138,.55), ${night[800]})`,
          '&::after': { content: '""', position: 'absolute', inset: '-40%', transform: 'translateX(-60%)',
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%)',
            transition: 'transform .7s' },
          '.MuiButtonBase-root:hover &::after': { transform: 'translateX(60%)' } }}>
          <Box sx={{ display: 'grid', justifyItems: 'center', gap: 1.25 }}>
            {badge.earned ? (
              <AppIcon name={badge.icon} sx={{ fontSize: 64, color: accent, filter: `drop-shadow(0 0 14px ${accent})` }} />
            ) : (
              <Typography sx={{ fontSize: 64, fontWeight: 800, lineHeight: 1, color: neon[100],
                textShadow: `0 0 18px ${neon[500]}, 0 0 4px ${neon[300]}` }}>
                ?
              </Typography>
            )}
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: badge.earned ? '#fff' : ink.secondary }}>
              {badge.name}
            </Typography>
            <Typography variant="body2" sx={{ color: badge.earned ? accent : ink.muted, fontSize: 12, fontWeight: 600 }}>
              {badge.earned && badge.awardedAt ? formatDate(badge.awardedAt) : badge.secret ? 'Gizli' : 'Kilitli'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...FACE, transform: 'rotateY(180deg)', boxShadow: shadow,
          background: `linear-gradient(200deg, ${night[700]}, ${night[900]})` }}>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="overline" sx={{ color: accent }}>{badge.earned ? 'Kazanıldı' : 'Nasıl kazanılır?'}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>
              {badge.earned ? badge.description : badge.hint}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </ButtonBase>
  );
}
