import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router';
import { gold, neon, surface } from '@/app/theme/tokens';
import { useBadges } from '@/features/badges/api';
import { useGuide } from '@/features/guide/api';
import { RecommendationCard } from '@/features/guide/RecommendationCard';
import { AttemptList } from '@/features/me/AttemptList';
import { relativeTime } from '@/shared/lib/format';
import { AsyncView, EmptyState, SkeletonBlock } from '@/shared/ui/AsyncView';
import { AppIcon } from '@/shared/ui/icons';
import { SectionTitle } from '@/shared/ui/SectionTitle';

function GuidePreview() {
  const guide = useGuide();
  return (
    <Box>
      <SectionTitle action={<Button component={RouterLink} to="/rehber" size="small" variant="text">Tümü</Button>}>
        Gece Rehberi diyor ki
      </SectionTitle>
      <AsyncView query={guide} skeleton={<SkeletonBlock height={230} />}>
        {(data) =>
          data.recommendations[0] ? (
            <RecommendationCard recommendation={data.recommendations[0]} highlight />
          ) : (
            <EmptyState title="Gökyüzün tamamen aydınlık" description="Tüm yıldızları yaktın. Şafak senin!" />
          )
        }
      </AsyncView>
    </Box>
  );
}

function RecentBadges() {
  const badges = useBadges();
  return (
    <Box>
      <SectionTitle action={<Button component={RouterLink} to="/rozetler" size="small" variant="text">Koleksiyon</Button>}>
        Son rozetler
      </SectionTitle>
      <AsyncView query={badges} skeleton={<SkeletonBlock height={230} />}>
        {(data) => {
          const recent = data.badges.filter((b) => b.earned)
            .sort((a, b) => (b.awardedAt ?? '').localeCompare(a.awardedAt ?? '')).slice(0, 3);
          if (recent.length === 0) return <EmptyState title="Henüz rozet yok" description="İlk quiz'ini geçtiğinde İlk Yıldız rozeti seni bekliyor." />;
          return (
            <Card sx={{ p: 2.5, display: 'grid', gap: 2, gridTemplateColumns: 'minmax(0, 1fr)' }}>
              {recent.map((badge) => (
                <Box key={badge.code} sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
                  <Box sx={{ color: badge.tier === 'GOLD' ? gold : neon[300], display: 'grid', placeItems: 'center',
                    width: 44, height: 44, flexShrink: 0, borderRadius: '50%', background: surface.raised }}>
                    <AppIcon name={badge.icon} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700 }}>{badge.name}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {badge.awardedAt ? relativeTime(badge.awardedAt) : ''} · {badge.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Card>
          );
        }}
      </AsyncView>
    </Box>
  );
}

function RecentAttempts() {
  return (
    <Box>
      <SectionTitle>Son denemeler</SectionTitle>
      <AttemptList limit={4} />
    </Box>
  );
}

export function DashboardHighlights() {
  return (
    <Box sx={{ display: 'grid', gap: 3, alignItems: 'start', '& > *': { minWidth: 0 },
      gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
      <GuidePreview />
      <RecentBadges />
      <RecentAttempts />
    </Box>
  );
}
