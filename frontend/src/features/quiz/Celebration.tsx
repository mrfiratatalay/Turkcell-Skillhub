import Box from '@mui/material/Box';
import { motion, useReducedMotion } from 'motion/react';
import { accent, gold } from '@/app/theme/tokens';

const SPARKS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  const distance = 120 + (i % 3) * 35;
  return { id: i, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, color: i % 3 === 0 ? accent.neon : gold };
});

/** A burst of tiny stars when a star lights up. Skipped entirely for reduced-motion users. */
export function Celebration() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
      {SPARKS.map((spark) => (
        <motion.svg
          key={spark.id}
          width="16"
          height="16"
          viewBox="-1 -1 2 2"
          style={{ position: 'absolute', filter: `drop-shadow(0 0 6px ${spark.color})` }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: spark.x, y: spark.y, scale: [0, 1.4, 0.6], opacity: [1, 1, 0] }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 + (spark.id % 4) * 0.05 }}
        >
          <path d="M0,-1 L0.24,-0.24 L1,0 L0.24,0.24 L0,1 L-0.24,0.24 L-1,0 L-0.24,-0.24 Z" style={{ fill: spark.color }} />
        </motion.svg>
      ))}
    </Box>
  );
}
