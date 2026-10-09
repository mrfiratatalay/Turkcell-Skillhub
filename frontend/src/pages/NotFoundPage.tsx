import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { fonts, gold, neon } from '@/app/theme/tokens';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { NightSky } from '@/shared/ui/NightSky';

export default function NotFoundPage() {
  useDocumentTitle('Kayıp yıldız');
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3, position: 'relative' }}>
      <NightSky rain={0.1} />
      <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 520 }}>
        <Typography sx={{ fontFamily: fonts.mono, color: neon[300], letterSpacing: '.3em', fontWeight: 700 }}>
          &lt;404/&gt;
        </Typography>
        <Box component="svg" viewBox="0 0 24 24" sx={{ width: 96, height: 96, my: 3, opacity: 0.55,
          filter: `drop-shadow(0 0 18px ${neon[500]})` }} aria-hidden>
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6Z" fill="none" stroke={neon[100]}
            strokeWidth="1.2" strokeDasharray="3 2" />
        </Box>
        <Typography variant="h3" component="h1">
          Bu yıldız henüz <Box component="span" sx={{ color: gold }}>haritada yok.</Box>
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, mb: 4 }}>
          Aradığın sayfa gökyüzünde kaybolmuş olabilir. Rotanı ana gökyüzüne çevirelim.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" size="large">
          Gökyüzüne dön
        </Button>
      </Box>
    </Box>
  );
}
