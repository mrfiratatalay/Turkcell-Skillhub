import PlaceRounded from '@mui/icons-material/PlaceRounded';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { CityRef } from '@/shared/domain/types';
import { useCities } from './api';

interface CityAutocompleteProps {
  value: number | null;
  onChange: (cityId: number | null) => void;
  error?: string;
}

/** All 81 provinces, searchable with Turkish-aware matching ("istanbul" finds "İstanbul"). */
export function CityAutocomplete({ value, onChange, error }: CityAutocompleteProps) {
  const cities = useCities();
  const options = cities.data ?? [];
  const selected = options.find((c) => c.id === value) ?? null;
  return (
    <Autocomplete<CityRef>
      options={options}
      loading={cities.isPending}
      value={selected}
      onChange={(_, city) => onChange(city?.id ?? null)}
      getOptionLabel={(city) => city.name}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      filterOptions={(list, state) => {
        const needle = state.inputValue.toLocaleLowerCase('tr-TR').trim();
        return list.filter((c) => c.name.toLocaleLowerCase('tr-TR').includes(needle));
      }}
      noOptionsText="Şehir bulunamadı"
      loadingText="Şehirler yükleniyor…"
      renderOption={(props, city) => {
        const { key, ...rest } = props;
        return (
          <Box component="li" key={key} {...rest} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <PlaceRounded fontSize="small" sx={{ color: 'secondary.main' }} />
            {city.name}
            <Box component="span" sx={{ ml: 'auto', color: 'text.secondary', fontSize: 12 }}>
              {String(city.id).padStart(2, '0')}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Şehir" required error={Boolean(error)} helperText={error ?? 'Şehir Işıkları sıralamasında bu ili temsil edeceksin.'} />
      )}
    />
  );
}
