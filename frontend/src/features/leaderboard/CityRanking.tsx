import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { accent, fonts, ink, tint } from '@/app/theme/tokens';
import { formatNumber } from '@/shared/lib/format';
import type { CityTotal } from './api';

interface CityRankingProps {
  cities: CityTotal[];
  selectedCityId: number | null;
  onSelect: (cityId: number | null) => void;
}

export function CityRanking({ cities, selectedCityId, onSelect }: CityRankingProps) {
  const lit = cities.filter((c) => c.learners > 0).slice(0, 8);
  const max = Math.max(1, ...lit.map((c) => c.xp));
  return (
    <Card sx={{ p: 1.5, display: 'grid', gap: 0.5, height: '100%', alignContent: 'start', gridTemplateColumns: 'minmax(0, 1fr)' }}>
      {lit.map((city) => {
        const selected = city.cityId === selectedCityId;
        return (
          <ButtonBase
            key={city.cityId}
            onClick={() => onSelect(selected ? null : city.cityId)}
            aria-pressed={selected}
            sx={{ display: 'grid', gridTemplateColumns: '34px minmax(0, 1fr)', gap: 1, alignItems: 'center', textAlign: 'left',
              p: 1.25, borderRadius: '12px', background: selected ? tint.gold : 'transparent',
              '&:hover': { background: selected ? tint.gold : tint.hover } }}
          >
            <Typography sx={{ fontFamily: fonts.mono, fontWeight: 800, color: city.rank <= 3 ? accent.gold : ink.secondary }}>
              {city.rank}
            </Typography>
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }} noWrap>{city.name}</Typography>
                <Typography variant="body2" sx={{ color: accent.gold, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {formatNumber(city.xp)} XP
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={(city.xp / max) * 100} sx={{ height: 5, mt: 0.75 }}
                aria-hidden />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mt: 0.5 }}>
                {city.learners} öğrenci
              </Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </Card>
  );
}
