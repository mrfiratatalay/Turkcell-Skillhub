import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ReplayRounded from '@mui/icons-material/ReplayRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { gold, ink, signal } from '@/app/theme/tokens';
import { relativeTime } from '@/shared/lib/format';
import { AsyncView, EmptyState, SkeletonBlock } from '@/shared/ui/AsyncView';
import { useAttempts } from './api';

/** Latest quiz attempts; shared by the dashboard and the profile. */
export function AttemptList({ limit }: { limit: number }) {
  const attempts = useAttempts(limit);
  return (
    <AsyncView query={attempts} skeleton={<SkeletonBlock height={200} />}>
      {(data) =>
        data.length === 0 ? (
          <EmptyState title="Henüz quiz çözmedin" description="Gökyüzündeki parlayan bir yıldıza dokunarak başla." />
        ) : (
          <Card sx={{ p: 2.5, display: 'grid', gap: 1.75, gridTemplateColumns: 'minmax(0, 1fr)' }}>
            {data.map((attempt) => (
              <Box key={attempt.attemptId} component={RouterLink} to={`/dersler/${attempt.lessonSlug}`}
                sx={{ display: 'flex', gap: 1.5, alignItems: 'center', textDecoration: 'none', color: 'inherit',
                  borderRadius: '12px', p: 0.5, '&:hover': { background: 'rgba(92,163,238,.08)' } }}>
                {attempt.passed
                  ? <CheckCircleRounded sx={{ color: signal.success }} />
                  : <ReplayRounded sx={{ color: ink.muted }} />}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>{attempt.lessonTitle}</Typography>
                  <Typography variant="body2" color="text.secondary">{relativeTime(attempt.completedAt)}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontWeight: 800 }}>%{attempt.score}</Typography>
                  {attempt.xpEarned > 0 && (
                    <Typography variant="body2" sx={{ color: gold, fontWeight: 700 }}>+{attempt.xpEarned} XP</Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Card>
        )
      }
    </AsyncView>
  );
}
