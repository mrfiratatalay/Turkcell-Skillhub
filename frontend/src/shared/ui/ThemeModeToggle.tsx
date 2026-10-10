import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { ink, line, onNight, surface } from '@/app/theme/tokens';
import { useResolvedScheme } from '@/app/theme/useResolvedScheme';

interface ThemeModeToggleProps {
  /** `onNight` keeps the button light when it sits on a night window (the login hero). */
  tone?: 'auto' | 'onNight';
}

const TONES = {
  auto: {
    color: ink.secondary,
    background: surface.card,
    border: `1px solid ${line.default}`,
    '&:hover': { background: surface.raised, borderColor: line.strong, color: ink.primary },
  },
  onNight: {
    color: onNight.primary,
    background: 'rgba(13, 18, 34, 0.4)',
    border: '1px solid rgba(238, 242, 250, 0.22)',
    backdropFilter: 'blur(6px)',
    '&:hover': { background: 'rgba(13, 18, 34, 0.6)', borderColor: 'rgba(238, 242, 250, 0.4)' },
  },
} as const;

/** Switches between the night (dark) and dawn (light) schemes; the choice is remembered per browser. */
export function ThemeModeToggle({ tone = 'auto' }: ThemeModeToggleProps) {
  const { setMode } = useColorScheme();
  const scheme = useResolvedScheme();
  const next = scheme === 'dark' ? 'light' : 'dark';
  const label = next === 'light' ? 'Açık temaya geç' : 'Koyu temaya geç';
  return (
    <Tooltip title={label}>
      <IconButton onClick={() => setMode(next)} aria-label={label}
        sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: '12px', ...TONES[tone] }}>
        {next === 'light' ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
