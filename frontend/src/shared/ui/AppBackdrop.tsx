import Box from '@mui/material/Box';
import { memo } from 'react';
import { atmosphere } from '@/app/theme/tokens';

const STARS = [
  'radial-gradient(1.2px 1.2px at 8% 22%, rgba(255,255,255,.55), transparent)',
  'radial-gradient(1px 1px at 27% 9%, rgba(255,255,255,.45), transparent)',
  'radial-gradient(1.3px 1.3px at 46% 31%, rgba(207,227,255,.5), transparent)',
  'radial-gradient(1px 1px at 63% 14%, rgba(255,255,255,.4), transparent)',
  'radial-gradient(1.1px 1.1px at 81% 36%, rgba(255,255,255,.5), transparent)',
  'radial-gradient(0.9px 0.9px at 93% 7%, rgba(207,227,255,.45), transparent)',
].join(',');

const fadeOut = 'linear-gradient(180deg, #000 0%, transparent 34%)';

interface AppBackdropProps {
  /** 0..1 progress through the learner's night (17:00 → 07:00): the dawn brightens as it grows. */
  dawn?: number;
  /** Lift the horizon above the mobile bottom navigation. */
  withBottomNav?: boolean;
}

/**
 * The calm backdrop behind every page: a few faint stars near the top (night scheme only) and a warm
 * dawn on the horizon. The real night sky only appears inside "windows" (see SkyWindow). Decorative only.
 */
export const AppBackdrop = memo(function AppBackdrop({ dawn = 0, withBottomNav = false }: AppBackdropProps) {
  const strength = (0.035 + 0.05 * Math.min(1, Math.max(0, dawn))).toFixed(3);
  return (
    <Box aria-hidden sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: STARS, backgroundSize: '460px 320px',
        maskImage: fadeOut, WebkitMaskImage: fadeOut, opacity: atmosphere.stars }} />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: withBottomNav ? { xs: 'calc(68px + env(safe-area-inset-bottom))', md: 0 } : 0,
          height: { xs: 160, md: 240 },
          background: `radial-gradient(ellipse 60% 100% at 50% 100%, rgba(253, 196, 11, ${strength}) 0%, transparent 72%)`,
        }}
      />
    </Box>
  );
});
