import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useDeferredValue, useState } from 'react';
import { neon } from '@/app/theme/tokens';
import { useSky } from '@/features/sky/api';
import { AsyncView, EmptyState, SkeletonBlock } from '@/shared/ui/AsyncView';
import { AppIcon } from '@/shared/ui/icons';
import { PageHeader } from '@/shared/ui/PageHeader';
import { type LessonCardData, type LessonFilter, useLessons } from './api';
import { LessonCard } from './LessonCard';
import { LessonFilters } from './LessonFilters';

const GRID = { display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' } };
const EMPTY: LessonFilter = { category: null, difficulty: null, q: '' };

function Grid({ lessons }: { lessons: LessonCardData[] }) {
  return (
    <Box sx={GRID}>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.slug} lesson={lesson} />
      ))}
    </Box>
  );
}

export default function LessonsPage() {
  const [filter, setFilter] = useState<LessonFilter>(EMPTY);
  const deferred = useDeferredValue(filter);
  const lessons = useLessons(deferred);
  const sky = useSky();
  const constellations = sky.data?.constellations ?? [];
  const grouped = !deferred.category && !deferred.difficulty && !deferred.q.trim();

  return (
    <>
      <PageHeader
        title="Dersler"
        highlight="ve yıldızlar"
        subtitle="17 ders, 4 takımyıldız. Kilidi açık her yıldız keşfini bekliyor; bitirdiklerin altın gibi parlar."
      />
      <LessonFilters filter={filter} constellations={constellations} onChange={setFilter} />
      <AsyncView query={lessons} skeleton={<SkeletonBlock height={220} count={3} />}>
        {(data) => {
          if (data.length === 0) {
            return (
              <EmptyState title="Bu kriterlerde yıldız bulunamadı" description="Filtreleri gevşetip tekrar dene."
                action={<Button variant="outlined" onClick={() => setFilter(EMPTY)}>Filtreleri temizle</Button>} />
            );
          }
          if (!grouped) return <Grid lessons={data} />;
          return (
            <Box sx={{ display: 'grid', gap: 6 }}>
              {constellations.map((c) => (
                <Box component="section" key={c.slug}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
                    <AppIcon name={c.icon} sx={{ color: neon[300] }} />
                    <Typography variant="h5" component="h2">{c.name}</Typography>
                    <Typography variant="overline" sx={{ color: neon[300] }}>{c.constellation} takımyıldızı</Typography>
                    <Box sx={{ ml: { sm: 'auto' }, width: { xs: '100%', sm: 220 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LinearProgress variant="determinate" value={(c.completed / c.total) * 100} sx={{ flex: 1 }}
                        aria-label={`${c.name} ilerlemesi`} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.completed}/{c.total}</Typography>
                    </Box>
                  </Box>
                  <Grid lessons={data.filter((l) => l.category.slug === c.slug)} />
                </Box>
              ))}
            </Box>
          );
        }}
      </AsyncView>
    </>
  );
}
