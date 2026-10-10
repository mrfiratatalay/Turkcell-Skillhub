import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import AutoGraphRounded from '@mui/icons-material/AutoGraphRounded';
import PlaceRounded from '@mui/icons-material/PlaceRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import heroLarge from '@/assets/hero-night-1536.webp';
import heroSmall from '@/assets/hero-night-900.webp';
import { atmosphere, gold, neon, onNight, surface } from '@/app/theme/tokens';
import { Logo } from '@/shared/ui/Logo';
import { ThemeModeToggle } from '@/shared/ui/ThemeModeToggle';

const FEATURES = [
  { icon: <AutoGraphRounded />, title: 'Gökyüzü Haritası', text: 'Her ders bir yıldız; bitirdikçe takımyıldızın yanar.' },
  { icon: <AccessTimeRounded />, title: 'Gece Saati', text: "17:00'de başla, XP kazandıkça şafağa ilerle." },
  { icon: <PlaceRounded />, title: 'Şehir Işıkları', text: 'Şehrin için öğren, Türkiye haritasında parla.' },
];

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
          // Dark fades keep the copy legible; the seam fade melts into the night canvas (none by day).
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: {
              xs: `linear-gradient(180deg, transparent 72%, ${atmosphere.heroSeam} 100%),
                linear-gradient(180deg, rgba(${NIGHT_RGB}, .45) 0%, rgba(${NIGHT_RGB}, .05) 32%, rgba(${NIGHT_RGB}, .82) 100%)`,
              md: `linear-gradient(90deg, transparent calc(100% - 96px), ${atmosphere.heroSeam} 100%),
                linear-gradient(0deg, rgba(${NIGHT_RGB}, .85) 0%, transparent 52%),
                linear-gradient(90deg, rgba(${NIGHT_RGB}, .5) 0%, transparent 45%)`,
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
        <Box sx={{ maxWidth: 520, mt: { xs: 4, md: 0 } }}>
          <Chip
            label="🏆 Turkcell Code Night 2025 · Trabzon 1.si"
            variant="outlined"
            sx={{ mb: 2.5, borderColor: 'rgba(253, 196, 11, 0.7)', color: onNight.primary,
              background: `rgba(${NIGHT_RGB}, .4)`, backdropFilter: 'blur(6px)' }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 64 }, textShadow: '0 2px 24px rgba(0, 0, 0, .45)' }}>
            Her ders bir{' '}
            <Box component="span" sx={{ color: gold }}>
              yıldız.
            </Box>
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1.5, fontSize: { md: 19 }, color: '#D5DCEB' }}>
            Gökyüzünü sen aydınlat. 17:00&apos;de başla, şafakta usta ol.
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'grid' }, gap: 2, mt: 4 }}>
            {FEATURES.map((feature) => (
              <Box key={feature.title} sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
                <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: '12px', display: 'grid', placeItems: 'center',
                  color: neon[300], border: '1px solid rgba(92, 163, 238, 0.45)', background: `rgba(${NIGHT_RGB}, .45)` }}>
                  {feature.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#C3CADA' }}>
                    {feature.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
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
