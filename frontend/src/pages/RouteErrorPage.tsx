import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useRouteError } from 'react-router';
import { accent, fonts } from '@/app/theme/tokens';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { AppBackdrop } from '@/shared/ui/AppBackdrop';
import { highlightSx } from '@/shared/ui/highlight';

/** After a redeploy an open tab may request a code chunk that no longer exists; a reload fixes it. */
function isStaleChunk(error: unknown): boolean {
  return error instanceof Error
    && /dynamically imported module|importing a module script failed/i.test(error.message);
}

/**
 * Last line of defence for rendering errors: a calm page with a way forward,
 * instead of a blank screen or the router's developer error page.
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const stale = isStaleChunk(error);
  useDocumentTitle(stale ? 'Yeni sürüm' : 'Bir şeyler ters gitti');
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3, position: 'relative' }}>
      <AppBackdrop />
      <Box role="alert" sx={{ position: 'relative', textAlign: 'center', maxWidth: 560 }}>
        <Typography sx={{ fontFamily: fonts.mono, color: accent.neon, letterSpacing: '.3em', fontWeight: 700 }}>
          &lt;{stale ? 'güncelleme' : 'hata'}/&gt;
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mt: 3 }}>
          {stale ? 'Gökyüzü ' : 'Bir bulut '}
          <Box component="span" sx={highlightSx}>{stale ? 'güncellendi.' : 'gökyüzünü kapattı.'}</Box>
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, mb: 4 }}>
          {stale
            ? 'SkillHub’ın yeni bir sürümü yayınlandı. Sayfayı yenilediğinde kaldığın yerden devam edersin.'
            : 'Beklenmeyen bir hata oluştu. Sayfayı yenilemek çoğu zaman yeter; olmazsa ana gökyüzüne dön.'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" onClick={() => window.location.reload()}>
            Sayfayı yenile
          </Button>
          {/* A full page load, not client-side navigation: start again from a clean state. */}
          <Button variant="outlined" size="large" href="/">
            Gökyüzüne dön
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
