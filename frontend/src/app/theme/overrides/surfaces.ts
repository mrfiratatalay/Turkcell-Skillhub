import type { Components, Theme } from '@mui/material/styles';
import { fonts, glass, glow, gold, ink, night, radius } from '../tokens';

/** Cards, dialogs and floating layers share the "neon glass" look of the Code Night visuals. */
export const surfaces: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
      body: {
        minHeight: '100vh',
        backgroundColor: night[900],
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(2, 99, 204, 0.35), transparent 70%),
          linear-gradient(180deg, ${night[950]} 0%, ${night[900]} 45%, ${night[800]} 100%)`,
        backgroundAttachment: 'fixed',
      },
      '::selection': { background: gold, color: night[900] },
      '*::-webkit-scrollbar': { width: 10, height: 10 },
      '*::-webkit-scrollbar-thumb': { background: 'rgba(92, 163, 238, 0.28)', borderRadius: 8 },
      '*::-webkit-scrollbar-track': { background: 'transparent' },
      a: { color: 'inherit' },
    },
  },
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        background: glass.surface,
        borderRadius: radius.card,
        boxShadow: glow.neon,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'visible',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: { root: { padding: 24, '&:last-child': { paddingBottom: 24 } } },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        background: glass.strong,
        borderRadius: radius.card,
        boxShadow: glow.neonStrong,
        backdropFilter: 'blur(18px)',
      },
      backdrop: { backgroundColor: 'rgba(1, 7, 40, 0.72)' },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: { background: glass.strong, boxShadow: glow.neon, borderRadius: radius.control },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: { background: glass.strong, boxShadow: glow.neon, borderRadius: radius.control },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        background: glass.strong,
        boxShadow: glow.neon,
        borderRadius: 10,
        fontSize: 13,
        padding: '8px 12px',
        color: ink.primary,
      },
      arrow: { color: night[900] },
    },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: glass.hairline } },
  },
  MuiAvatar: {
    styleOverrides: {
      root: { fontWeight: 800, fontFamily: fonts.display },
    },
  },
};
