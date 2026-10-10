import { useColorScheme } from '@mui/material/styles';

export type ResolvedScheme = 'light' | 'dark';

/**
 * The scheme actually on screen. Most UI follows the CSS variables on its own; this is only for the few
 * places that need a concrete value in JavaScript (chart colors, the browser's theme-color, the toggle).
 */
export function useResolvedScheme(): ResolvedScheme {
  const { mode, systemMode } = useColorScheme();
  const resolved = mode === 'system' ? systemMode : mode;
  return resolved === 'light' ? 'light' : 'dark';
}
