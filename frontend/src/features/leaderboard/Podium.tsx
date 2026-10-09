import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { gold, ink, neon, night } from '@/app/theme/tokens';
import { formatNumber, initials } from '@/shared/lib/format';
import type { LeaderboardEntry } from './api';

const PLACES = [
  { place: 2, color: '#C9D6F5', height: 92 },
  { place: 1, color: gold, height: 128 },
  { place: 3, color: '#F2A65A', height: 72 },
];

/** Top three on holographic rings, like the phone on the Code Night Trabzon poster. */
export function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const reduceMotion = useReducedMotion();
  if (entries.length < 3) return null;
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'end', gap: { xs: 1, sm: 3 },
      maxWidth: 640, mx: 'auto', pt: 2 }}>
      {PLACES.map(({ place, color, height }, i) => {
        const entry = entries[place - 1];
        return (
          <motion.div key={entry.userId} initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
            <Box sx={{ display: 'grid', justifyItems: 'center', textAlign: 'center', gap: 1 }}>
              <Avatar sx={{ width: place === 1 ? 76 : 60, height: place === 1 ? 76 : 60, bgcolor: night[700],
                color, fontSize: place === 1 ? 26 : 20, boxShadow: `0 0 0 3px ${color}, 0 0 30px ${color}88` }}>
                {initials(entry.displayName)}
              </Avatar>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: 14, sm: 16 }, lineHeight: 1.2 }}>
                {entry.displayName}
                {entry.me && ' (Sen)'}
              </Typography>
              <Typography variant="body2" sx={{ color: ink.secondary, fontSize: 12 }}>{entry.cityName}</Typography>
              <Typography sx={{ color, fontWeight: 800 }}>{formatNumber(entry.xp)} XP</Typography>
              <Box sx={{ position: 'relative', width: '100%', height, mt: 0.5, borderRadius: '18px 18px 6px 6px',
                background: `linear-gradient(180deg, ${color}33, rgba(1,13,60,.2))`,
                boxShadow: `0 0 0 1px ${color}66, 0 0 24px ${color}33`, display: 'grid', placeItems: 'center' }}>
                <Typography sx={{ fontSize: 34, fontWeight: 800, color, textShadow: `0 0 18px ${color}` }}>{place}</Typography>
                <Box sx={{ position: 'absolute', bottom: -14, left: '6%', right: '6%', height: 22, borderRadius: '50%',
                  border: `2px solid ${neon[300]}`, boxShadow: `0 0 18px ${neon[500]}, inset 0 0 12px ${neon[500]}`,
                  opacity: 0.8 }} />
              </Box>
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
}
