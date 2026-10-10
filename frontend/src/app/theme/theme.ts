import { createTheme, type PaletteOptions } from '@mui/material/styles';
import { controls } from './overrides/controls';
import { feedback } from './overrides/feedback';
import { surfaces } from './overrides/surfaces';
import { COLOR_SCHEME_ATTRIBUTE, darkScheme, lightScheme, type SchemeTokens } from './schemes';
import { fonts, gold, ink, onGold } from './tokens';

/** MUI's own palette needs raw colors (it derives channels from them), so it reads the scheme values. */
function palette(scheme: SchemeTokens, mode: 'light' | 'dark'): PaletteOptions {
  return {
    mode,
    primary: { main: gold, contrastText: onGold },
    secondary: { main: scheme.accent.neon, contrastText: mode === 'dark' ? onGold : '#FFFFFF' },
    success: { main: scheme.signal.success },
    error: { main: scheme.signal.error },
    warning: { main: scheme.accent.gold },
    info: { main: scheme.accent.neon },
    background: { default: scheme.surface.canvas, paper: scheme.surface.card },
    text: { primary: scheme.ink.primary, secondary: scheme.ink.secondary, disabled: scheme.ink.muted },
    divider: scheme.line.default,
  };
}

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: COLOR_SCHEME_ATTRIBUTE },
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: { palette: palette(darkScheme, 'dark') },
    light: { palette: palette(lightScheme, 'light') },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: fonts.display,
    h1: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05 },
    h2: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.08 },
    h3: { fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.12 },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { color: ink.secondary, lineHeight: 1.6 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0 },
    overline: { fontFamily: fonts.mono, fontWeight: 700, letterSpacing: '0.2em', lineHeight: 1.6 },
  },
  components: { ...surfaces, ...controls, ...feedback },
});
