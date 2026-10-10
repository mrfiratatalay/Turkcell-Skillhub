import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'motion/react';
import { fonts, gold, ink, neon, night } from '@/app/theme/tokens';
import { formatNumber } from '@/shared/lib/format';
import type { CityTotal } from './api';
import { MAP_HEIGHT, MAP_WIDTH, projectToMap, TURKEY_PATH } from './turkeyGeometry';

interface TurkeyNightMapProps {
  cities: CityTotal[];
  selectedCityId: number | null;
  onSelect: (cityId: number | null) => void;
}

/** Türkiye seen from orbit at night: every province is a light, learners make it shine. */
export function TurkeyNightMap({ cities, selectedCityId, onSelect }: TurkeyNightMapProps) {
  const reduceMotion = useReducedMotion();
  const maxXp = Math.max(1, ...cities.map((c) => c.xp));
  const lit = cities.filter((c) => c.learners > 0);
  const top = new Set(lit.slice(0, 3).map((c) => c.cityId));
  const summary = lit.slice(0, 3).map((c) => `${c.rank}. ${c.name}`).join(', ');

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="group"
      aria-label={`Şehir ışıkları haritası. En parlak şehirler: ${summary}`}
      sx={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <defs>
        <radialGradient id="city-light">
          <stop offset="0%" stopColor="#FFF4C2" stopOpacity="1" />
          <stop offset="25%" stopColor={gold} stopOpacity="0.85" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night[700]} stopOpacity="0.55" />
          <stop offset="100%" stopColor={night[800]} stopOpacity="0.9" />
        </linearGradient>
        <filter id="coast-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path d={TURKEY_PATH} fill="none" stroke={neon[500]} strokeWidth="6" opacity="0.25" filter="url(#coast-glow)" />
      <path d={TURKEY_PATH} fill="url(#land)" stroke={neon[300]} strokeWidth="1.2" strokeOpacity="0.6" />

      {cities.filter((c) => c.learners === 0).map((city) => {
        const p = projectToMap(city.latitude, city.longitude);
        return <circle key={city.cityId} cx={p.x} cy={p.y} r="1.8" fill={neon[100]} opacity="0.35" />;
      })}

      {lit.map((city, i) => {
        const p = projectToMap(city.latitude, city.longitude);
        const radius = 8 + 26 * Math.sqrt(city.xp / maxXp);
        const selected = city.cityId === selectedCityId;
        return (
          <Tooltip
            key={city.cityId}
            arrow
            title={
              <>
                <Typography sx={{ fontWeight: 700 }}>{city.rank}. {city.name}</Typography>
                <Typography sx={{ fontSize: 12, color: ink.secondary }}>
                  {city.learners} öğrenci · {formatNumber(city.xp)} XP
                </Typography>
              </>
            }
          >
            <motion.g
              role="button"
              tabIndex={0}
              aria-label={`${city.name}: ${city.learners} öğrenci, ${formatNumber(city.xp)} XP`}
              aria-pressed={selected}
              onClick={() => onSelect(selected ? null : city.cityId)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(selected ? null : city.cityId)}
              style={{ cursor: 'pointer', outline: 'none' }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.7 }}
            >
              <circle cx={p.x} cy={p.y} r={radius} fill="url(#city-light)" />
              <circle cx={p.x} cy={p.y} r="2.6" fill="#FFF8DC" />
              {selected && <circle cx={p.x} cy={p.y} r={radius * 0.7} fill="none" stroke={neon[100]} strokeWidth="2" />}
              {(top.has(city.cityId) || selected) && (
                <text x={p.x} y={p.y - radius * 0.55 - 6} textAnchor="middle" fill="#fff" stroke={night[900]}
                  strokeWidth="4" paintOrder="stroke" style={{ font: `700 15px ${fonts.display}` }}>
                  {city.name}
                </text>
              )}
            </motion.g>
          </Tooltip>
        );
      })}
    </Box>
  );
}
