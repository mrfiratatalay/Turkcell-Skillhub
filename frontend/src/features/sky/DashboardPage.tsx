import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { onNight } from '@/app/theme/tokens';
import { type Me, useMe } from '@/features/me/api';
import { firstName, greeting } from '@/shared/lib/format';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SectionTitle } from '@/shared/ui/SectionTitle';
import { SkyWindow } from '@/shared/ui/SkyWindow';
import { useSky } from './api';
import { DashboardHighlights } from './DashboardHighlights';
import { DashboardStats } from './DashboardStats';
import { NightClockCard } from './NightClockCard';
import { SkyLegend, SkyMap } from './SkyMap';

function subtitleFor(me: Me): string {
  const p = me.progress;
  if (p.completedLessons === 0) return 'Gece yeni başlıyor. Gökyüzündeki parlayan yıldızlardan birine dokun ve ilk dersini aç.';
  if (p.streakDays > 0 && !p.activeToday) return `${p.streakDays} günlük serin var. Bugün bir quiz çözerek alevi canlı tut.`;
  if (p.nightClock.dawn) return 'Şafağa ulaştın. Yıldızlarını kusursuzlaştırıp şehrini zirveye taşı.';
  return `Gece Saati ${p.nightClock.time}. ${p.totalLessons - p.completedLessons} yıldız daha seni bekliyor.`;
}

export default function DashboardPage() {
  const me = useMe();
  const sky = useSky();
  const hello = greeting();

  return (
    <>
      <PageHeader
        title={`${hello.text},`}
        highlight={me.data ? `${firstName(me.data.user.displayName)} ${hello.emoji}` : hello.emoji}
        subtitle={me.data ? subtitleFor(me.data) : ' '}
      />
      <AsyncView query={me} skeleton={<SkeletonBlock height={230} />}>
        {(data) => (
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1.35fr 1fr' } }}>
            <NightClockCard progress={data.progress} />
            <DashboardStats me={data} />
          </Box>
        )}
      </AsyncView>

      <Box component="section" sx={{ mt: 5 }}>
        <SectionTitle action={<SkyLegend />}>Gökyüzü haritan</SectionTitle>
        <AsyncView query={sky} skeleton={<SkeletonBlock height={420} />}>
          {(data) => (
            <SkyWindow sx={{ p: { xs: 1.5, sm: 3 } }}>
              <SkyMap sky={data} />
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: onNight.secondary }}>
                {data.completed}/{data.total} yıldız yandı · Bir yıldıza dokunarak dersine git
              </Typography>
            </SkyWindow>
          )}
        </AsyncView>
      </Box>

      <Box component="section" sx={{ mt: 5 }}>
        <DashboardHighlights />
      </Box>
    </>
  );
}
