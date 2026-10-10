import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { ReactNode } from 'react';
import heroLarge from '@/assets/hero-night-1536.webp';
import heroSmall from '@/assets/hero-night-900.webp';
import { atmosphere, onNight, surface } from '@/app/theme/tokens';
import { Logo } from '@/shared/ui/Logo';
import { ThemeModeToggle } from '@/shared/ui/ThemeModeToggle';

/** The night canvas as an RGB triplet: the hero stays a night window in both color schemes. */
const NIGHT_RGB = '13, 18, 34';

/**
 * "Outside is the night, inside is a warm room": the Codex-generated Black Sea night is a window on one
 * side; the form sits in a calm, lamp-lit panel (daylight in the light scheme) on the other.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { md: '1.2fr 1fr' }, background: surface.canvas }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 340, md: '100vh' },
          backgroundImage: { xs: `url(${heroSmall})`, md: `url(${heroLarge})` },
          backgroundSize: 'cover',
          backgroundPosition: { xs: 'center 30%', md: 'center' },
          // On phones the window gets rounded lower corners; they only show by day, when there is no seam fade.
          borderRadius: { xs: '0 0 28px 28px', md: 0 },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 3, md: 6 },
          color: onNight.primary,
          // Light fades keep the logo and the badge legible; the seam fade melts into the night canvas (none by day).
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: {
              xs: `linear-gradient(180deg, transparent 72%, ${atmosphere.heroSeam} 100%),
                linear-gradient(180deg, rgba(${NIGHT_RGB}, .45) 0%, rgba(${NIGHT_RGB}, .05) 32%, rgba(${NIGHT_RGB}, .6) 100%)`,
              md: `linear-gradient(90deg, transparent calc(100% - 96px), ${atmosphere.heroSeam} 100%),
                linear-gradient(0deg, rgba(${NIGHT_RGB}, .6) 0%, transparent 34%),
                linear-gradient(180deg, rgba(${NIGHT_RGB}, .35) 0%, transparent 22%)`,
            },
          },
          '& > *': { position: 'relative', zIndex: 1 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Logo size={26} tone="onNight" />
          <Box sx={{ display: { md: 'none' } }}>
            <ThemeModeToggle tone="onNight" />
          </Box>
        </Box>
        {/* The photo carries the mood; the only words on it are the championship. */}
        <Box sx={{ mt: { xs: 4, md: 0 } }}>
          <Chip
            label="🏆 Turkcell Code Night 2025 · Trabzon 1.si"
            variant="outlined"
            sx={{ height: { xs: 36, md: 42 }, px: { md: 0.75 }, fontSize: { xs: 14, md: 16 }, fontWeight: 700,
              borderColor: 'rgba(253, 196, 11, 0.7)', color: onNight.primary,
              background: `rgba(${NIGHT_RGB}, .45)`, backdropFilter: 'blur(6px)' }}
          />
        </Box>
      </Box>
      <Box
        component="main"
        sx={{ position: 'relative', display: 'grid', placeItems: 'center', p: { xs: 2.5, sm: 4, md: 6 },
          background: 'radial-gradient(circle at 50% 42%, rgba(253, 196, 11, 0.06), transparent 58%)' }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 24, right: 24 }}>
          <ThemeModeToggle />
        </Box>
        <Box sx={{ width: '100%', maxWidth: 420 }}>{children}</Box>
      </Box>
    </Box>
  );
}
