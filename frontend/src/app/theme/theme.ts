import { createTheme } from '@mui/material/styles';
import { controls } from './overrides/controls';
import { feedback } from './overrides/feedback';
import { surfaces } from './overrides/surfaces';
import { fonts, glass, gold, ink, neon, night, signal } from './tokens';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: gold, contrastText: night[900] },
    secondary: { main: neon[300], contrastText: night[900] },
    success: { main: signal.success, contrastText: night[900] },
    error: { main: signal.error },
    warning: { main: gold },
    info: { main: neon[300] },
    background: { default: night[900], paper: night[800] },
    text: { primary: ink.primary, secondary: ink.secondary, disabled: ink.muted },
    divider: glass.hairline,
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
