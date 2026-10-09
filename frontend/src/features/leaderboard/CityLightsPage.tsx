import CloseRounded from '@mui/icons-material/CloseRounded';
import PlaceRounded from '@mui/icons-material/PlaceRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { gold } from '@/app/theme/tokens';
import { AsyncView, EmptyState, SkeletonBlock } from '@/shared/ui/AsyncView';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SectionTitle } from '@/shared/ui/SectionTitle';
import { useCityLights, useLeaderboard } from './api';
import { CityRanking } from './CityRanking';
import { Podium } from './Podium';
import { RankingList } from './RankingList';
import { TurkeyNightMap } from './TurkeyNightMap';

export default function CityLightsPage() {
  const [cityId, setCityId] = useState<number | null>(null);
  const lights = useCityLights();
  const board = useLeaderboard(cityId);
  const cityName = lights.data?.cities.find((c) => c.cityId === cityId)?.name;

  return (
    <>
      <PageHeader
        title="Şehir"
        highlight="Işıkları"
        subtitle={lights.data
          ? `${lights.data.totalLearners} öğrenci, ${lights.data.activeCities} şehir parlıyor. Öğrendikçe şehrin daha parlak yanar.`
          : 'Türkiye gece haritasında şehrini parlat.'}
      />
      <AsyncView query={lights} skeleton={<SkeletonBlock height={380} />}>
        {(data) => (
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2.2fr) 1fr' } }}>
            <Card sx={{ p: { xs: 1.5, sm: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TurkeyNightMap cities={data.cities} selectedCityId={cityId} onSelect={setCityId} />
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                Bir şehre dokunarak o şehrin sıralamasını gör
              </Typography>
            </Card>
            <Box>
              <SectionTitle>Şehirler</SectionTitle>
              <CityRanking cities={data.cities} selectedCityId={cityId} onSelect={setCityId} />
            </Box>
          </Box>
        )}
      </AsyncView>

      <Box component="section" sx={{ mt: 6 }}>
        <SectionTitle
          action={cityName && (
            <Chip icon={<PlaceRounded />} label={cityName} onDelete={() => setCityId(null)} deleteIcon={<CloseRounded />}
              sx={{ '& .MuiChip-icon': { color: gold } }} />
          )}
        >
          {cityName ? `${cityName} sıralaması` : 'Türkiye sıralaması'}
        </SectionTitle>
        <AsyncView query={board} skeleton={<SkeletonBlock height={300} />}>
          {(data) =>
            data.entries.length === 0 ? (
              <EmptyState title="Bu şehirde henüz ışık yok" description="İlk yıldızı yakan sen ol!" />
            ) : (
              <Box sx={{ display: 'grid', gap: 5 }}>
                <Podium entries={data.entries} />
                <RankingList
                  entries={data.entries.length >= 3 ? data.entries.slice(3) : data.entries}
                  me={data.entries.length >= 3 && data.entries.slice(0, 3).some((e) => e.me) ? null : data.me}
                />
              </Box>
            )
          }
        </AsyncView>
      </Box>
    </>
  );
}
