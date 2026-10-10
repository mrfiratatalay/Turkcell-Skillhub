import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { Link as RouterLink } from 'react-router';
import { gold, neon, outline } from '@/app/theme/tokens';
import { NightClockRing } from '@/shared/ui/NightClockRing';
import { AppIcon } from '@/shared/ui/icons';
import { SectionTitle } from '@/shared/ui/SectionTitle';
import type { AttemptResult } from './api';
import { Celebration } from './Celebration';
import { ReviewList } from './ReviewList';

function xpMessage(result: AttemptResult): string {
  if (result.xpEarned > 0) return `+${result.xpEarned} XP`;
  if (result.previousBestScore !== null) return `Rekorun %${result.previousBestScore}: XP, rekoru geçince artar`;
  return 'Bu sefer XP yok';
}

export function QuizResult({ result, onRetry }: { result: AttemptResult; onRetry: () => void }) {
  const reduceMotion = useReducedMotion();
  const clockMoved = result.nightClockBefore.time !== result.nightClockAfter.time;
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Card sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', display: 'grid', justifyItems: 'center', gap: 2,
        ...(result.passed && { borderColor: outline.reward }) }}>
        <Box sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
          {result.passed && <Celebration />}
          <NightClockRing progress={result.score / 100} time={`%${result.score}`} caption="Skor" size={200} />
        </Box>
        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 32, md: 42 } }}>
          {result.passed ? 'Yıldız yandı! ✦' : 'Az kaldı!'}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
          {result.passed
            ? `${result.correctCount}/${result.questionCount} doğru. ${result.lessonTitle} artık gökyüzünde parlıyor.`
            : `${result.correctCount}/${result.questionCount} doğru. Geçmek için %${result.passingScore} gerekiyor; açıklamalara göz atıp tekrar dene.`}
        </Typography>
        <Typography sx={{ color: gold, fontWeight: 800, fontSize: result.xpEarned > 0 ? 34 : 16 }}>
          {xpMessage(result)}
        </Typography>
        {clockMoved && (
          <Chip icon={<AutoAwesomeRounded />} variant="outlined"
            label={`Gece Saati ${result.nightClockBefore.time} → ${result.nightClockAfter.time}`}
            sx={{ '& .MuiChip-icon': { color: gold } }} />
        )}
        {result.leveledUp && (
          <Typography sx={{ color: neon[300], fontWeight: 700 }}>
            Yeni seviye: {result.nightClockAfter.title} 🌙
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
          <Button component={RouterLink} to="/gokyuzu" variant="contained" size="large">Gökyüzüne dön</Button>
          <Button component={RouterLink} to={`/dersler/${result.lessonSlug}`} variant="outlined" size="large">Derse dön</Button>
          <Button onClick={onRetry} variant="text" size="large">Tekrar çöz</Button>
        </Box>
      </Card>

      {result.newBadges.length > 0 && (
        <Box component="section">
          <SectionTitle>Yeni rozet{result.newBadges.length > 1 ? 'ler' : ''}</SectionTitle>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, perspective: 800 }}>
            {result.newBadges.map((badge, i) => (
              <motion.div key={badge.code} initial={reduceMotion ? false : { rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.25, duration: 0.6 }}>
                <Card sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center',
                  borderColor: badge.tier === 'GOLD' ? outline.reward : outline.neon }}>
                  <AppIcon name={badge.icon} sx={{ fontSize: 42, color: badge.tier === 'GOLD' ? gold : neon[300] }} />
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{badge.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{badge.description}</Typography>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      )}

      {result.unlockedLessons.length > 0 && (
        <Box component="section">
          <SectionTitle>Gökyüzünde yeni yıldızlar belirdi</SectionTitle>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {result.unlockedLessons.map((lesson) => (
              <Chip key={lesson.slug} component={RouterLink} to={`/dersler/${lesson.slug}`} clickable
                icon={<AutoAwesomeRounded />} label={lesson.title} variant="outlined"
                sx={{ height: 40, '& .MuiChip-icon': { color: neon[300] } }} />
            ))}
          </Box>
        </Box>
      )}

      <Box component="section">
        <SectionTitle>Cevapların</SectionTitle>
        <ReviewList review={result.review} />
      </Box>
    </Box>
  );
}
