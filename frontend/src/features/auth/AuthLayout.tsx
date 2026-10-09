import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import AutoGraphRounded from '@mui/icons-material/AutoGraphRounded';
import PlaceRounded from '@mui/icons-material/PlaceRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import heroLarge from '@/assets/hero-night-1536.webp';
import heroSmall from '@/assets/hero-night-900.webp';
import { gold, neon, night } from '@/app/theme/tokens';
import { Logo } from '@/shared/ui/Logo';
import { NightSky } from '@/shared/ui/NightSky';

const FEATURES = [
  { icon: <AutoGraphRounded />, title: 'Gökyüzü Haritası', text: 'Her ders bir yıldız; bitirdikçe takımyıldızın yanar.' },
  { icon: <AccessTimeRounded />, title: 'Gece Saati', text: "17:00'de başla, XP kazandıkça şafağa ilerle." },
  { icon: <PlaceRounded />, title: 'Şehir Işıkları', text: 'Şehrin için öğren, Türkiye haritasında parla.' },
];

/** Split hero: the Codex-generated Black Sea night on one side, the form on the other. */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', display: 'grid', gridTemplateColumns: { md: '1.1fr 1fr' } }}>
      <NightSky rain={0.1} />
      <Box
        component="section"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { xs: 300, md: '100vh' },
          backgroundImage: { xs: `url(${heroSmall})`, md: `url(${heroLarge})` },
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-end', md: 'space-between' },
          p: { xs: 3, md: 6 },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: {
              xs: `linear-gradient(180deg, rgba(1,13,60,.15) 0%, rgba(1,13,60,.55) 60%, ${night[900]} 100%)`,
              md: `linear-gradient(90deg, rgba(1,13,60,.78) 0%, rgba(1,13,60,.35) 55%, rgba(1,13,60,.55) 100%)`,
            },
          },
          '& > *': { position: 'relative', zIndex: 1 },
        }}
      >
        <Logo size={26} />
        <Box sx={{ maxWidth: 520, mt: { xs: 4, md: 0 } }}>
          <Chip
            label="🏆 Turkcell Code Night 2025 · Trabzon 1.si"
            variant="outlined"
            sx={{ mb: 2.5, borderColor: `${gold}aa`, color: '#fff', boxShadow: '0 0 16px rgba(253,196,11,.25)' }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 64 }, textShadow: '0 0 28px rgba(92,163,238,.45)' }}>
            Her ders bir{' '}
            <Box component="span" sx={{ color: gold }}>
              yıldız.
            </Box>
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1.5, fontSize: { md: 19 }, color: '#DCE6FF' }}>
            Gökyüzünü sen aydınlat. 17:00&apos;de başla, şafakta usta ol.
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'grid' }, gap: 2, mt: 4 }}>
            {FEATURES.map((feature) => (
              <Box key={feature.title} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
                <Box sx={{ color: neon[100], filter: `drop-shadow(0 0 8px ${neon[500]})`, mt: 0.25 }}>{feature.icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#C9D6F5' }}>
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
        sx={{ position: 'relative', zIndex: 1, display: 'grid', placeItems: 'center', p: { xs: 2, sm: 4, md: 6 } }}
      >
        <Box sx={{ width: '100%', maxWidth: 460 }}>{children}</Box>
      </Box>
    </Box>
  );
}
