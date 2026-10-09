import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { gold, neon } from '@/app/theme/tokens';
import type { ProgressSummary } from '@/features/me/api';
import { formatNumber } from '@/shared/lib/format';
import { NightClockRing } from '@/shared/ui/NightClockRing';

const LEVELS = 8;

/** The level system told as one Code Night: every level is two hours of the night. */
export function NightClockCard({ progress }: { progress: ProgressSummary }) {
  const clock = progress.nightClock;
  const toNext = clock.nextLevelXp === null ? 0 : clock.nextLevelXp - progress.totalXp;
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',
      gap: 3, height: '100%' }}>
      <NightClockRing progress={clock.nightProgress} time={clock.time} caption={clock.dawn ? 'Şafak' : 'Gece Saati'} size={176} />
      <Box sx={{ flex: 1, width: '100%', minWidth: 0 }}>
        <Typography variant="overline" sx={{ color: neon[300] }}>
          Seviye {clock.level}/{LEVELS}
        </Typography>
        <Typography variant="h4" component="p" sx={{ mt: 0.5 }}>
          {clock.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          {clock.dawn
            ? 'Gecenin sonunu gördün. Şafak senin! 🌅'
            : `Gece 17:00'de başladı; senin saatin ${clock.time}. Her XP saati ileri alır.`}
        </Typography>
        <Box sx={{ mt: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: gold, fontWeight: 700 }}>
              {formatNumber(progress.totalXp)} XP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {clock.nextLevelXp === null ? 'Son seviye' : `Sonraki seviyeye ${formatNumber(toNext)} XP`}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={Math.round(clock.levelProgress * 100)}
            aria-label="Seviye ilerlemesi" />
        </Box>
      </Box>
    </Card>
  );
}
