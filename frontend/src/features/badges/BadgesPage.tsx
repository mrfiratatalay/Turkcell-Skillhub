import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { accent } from '@/app/theme/tokens';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useBadges } from './api';
import { BadgeCard } from './BadgeCard';

export default function BadgesPage() {
  const badges = useBadges();
  return (
    <>
      <PageHeader
        title="Rozet"
        highlight="koleksiyonu"
        subtitle="Her rozet gecenin bir hikâyesi. Kartlara dokunarak çevir; bazılarının sırrı ancak kazanınca açılır."
      />
      <AsyncView query={badges} skeleton={<SkeletonBlock height={260} count={2} />}>
        {(data) => (
          <>
            <Card sx={{ p: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Typography sx={{ fontSize: 40, fontWeight: 800, color: accent.gold, lineHeight: 1 }}>
                {data.earnedCount}
                <Box component="span" sx={{ fontSize: 22, color: 'text.secondary' }}>/{data.total}</Box>
              </Typography>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  {data.earnedCount === data.total ? 'Koleksiyon tamam! Efsanesin.' : `${data.total - data.earnedCount} rozet daha seni bekliyor`}
                </Typography>
                <LinearProgress variant="determinate" value={(data.earnedCount / data.total) * 100}
                  aria-label="Rozet koleksiyonu ilerlemesi" />
              </Box>
            </Card>
            <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 },
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}>
              {data.badges.map((badge) => (
                <BadgeCard key={badge.code} badge={badge} />
              ))}
            </Box>
          </>
        )}
      </AsyncView>
    </>
  );
}
