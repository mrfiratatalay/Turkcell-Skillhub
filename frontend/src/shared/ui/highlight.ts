import { highlight } from '@/app/theme/tokens';

/**
 * Highlighted title words ("ve yıldızlar"): gold text at night; by day, ink text over a gold marker
 * stroke, because gold text on a light background is unreadable (1.6:1).
 */
export const highlightSx = {
  color: highlight.text,
  backgroundImage: `linear-gradient(transparent 58%, ${highlight.marker} 58%, ${highlight.marker} 90%, transparent 90%)`,
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
} as const;
