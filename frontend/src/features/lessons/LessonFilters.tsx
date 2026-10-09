import SearchRounded from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { gold, night } from '@/app/theme/tokens';
import type { Constellation } from '@/features/sky/api';
import type { Difficulty } from '@/shared/domain/types';
import { AppIcon } from '@/shared/ui/icons';
import type { LessonFilter } from './api';

interface LessonFiltersProps {
  filter: LessonFilter;
  constellations: Constellation[];
  onChange: (filter: LessonFilter) => void;
}

export function LessonFilters({ filter, constellations, onChange }: LessonFiltersProps) {
  const chips: { slug: string | null; label: string; icon: string }[] = [
    { slug: null, label: 'Tüm gökyüzü', icon: 'sparkle' },
    ...constellations.map((c) => ({ slug: c.slug, label: `${c.name} · ${c.completed}/${c.total}`, icon: c.icon })),
  ];

  return (
    <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 } }}>
        {chips.map((chip) => {
          const selected = filter.category === chip.slug;
          return (
            <Chip
              key={chip.slug ?? 'all'}
              icon={<AppIcon name={chip.icon} />}
              label={chip.label}
              clickable
              onClick={() => onChange({ ...filter, category: chip.slug })}
              variant={selected ? 'filled' : 'outlined'}
              sx={{
                flexShrink: 0,
                height: 38,
                px: 0.5,
                ...(selected && { background: gold, color: night[900], '& .MuiChip-icon': { color: night[900] } }),
              }}
            />
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <ToggleButtonGroup
          exclusive
          value={filter.difficulty ?? 'ALL'}
          onChange={(_, value: Difficulty | 'ALL' | null) =>
            value && onChange({ ...filter, difficulty: value === 'ALL' ? null : value })}
          aria-label="Zorluk"
        >
          <ToggleButton value="ALL">Hepsi</ToggleButton>
          <ToggleButton value="BEGINNER">Başlangıç</ToggleButton>
          <ToggleButton value="INTERMEDIATE">Orta</ToggleButton>
          <ToggleButton value="ADVANCED">İleri</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          placeholder="Ders ara: Python, güvenlik, pitch…"
          value={filter.q}
          onChange={(e) => onChange({ ...filter, q: e.target.value })}
          size="small"
          sx={{ flex: 1, minWidth: 220 }}
          slotProps={{
            input: { startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> },
            htmlInput: { 'aria-label': 'Ders ara' },
          }}
        />
      </Box>
    </Box>
  );
}
