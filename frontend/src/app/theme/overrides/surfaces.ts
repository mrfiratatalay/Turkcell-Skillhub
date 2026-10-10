import type { Components, Theme } from '@mui/material/styles';
import { fonts, gold, ink, line, radius, scrim, shadow, surface } from '../tokens';

/** Cards, dialogs and floating layers: flat ink surfaces with a hairline edge, never a glow. */
export const surfaces: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
      body: { minHeight: '100vh', backgroundColor: surface.canvas },
      '::selection': { background: gold, color: surface.canvas },
      '*::-webkit-scrollbar': { width: 10, height: 10 },
      '*::-webkit-scrollbar-thumb': { background: line.strong, borderRadius: 8 },
      '*::-webkit-scrollbar-thumb:hover': { background: line.hover },
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
        background: surface.card,
        border: `1px solid ${line.default}`,
        borderRadius: radius.card,
        boxShadow: shadow.card,
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
        background: surface.card,
        border: `1px solid ${line.strong}`,
        borderRadius: radius.card,
        boxShadow: shadow.floating,
      },
      backdrop: { backgroundColor: scrim },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: { background: surface.raised, border: `1px solid ${line.strong}`, boxShadow: shadow.floating, borderRadius: radius.control },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: { background: surface.raised, border: `1px solid ${line.strong}`, boxShadow: shadow.floating, borderRadius: radius.control },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        background: surface.raised,
        border: `1px solid ${line.strong}`,
        boxShadow: shadow.floating,
        borderRadius: 10,
        fontSize: 13,
        padding: '8px 12px',
        color: ink.primary,
      },
      arrow: { color: surface.raised, '&::before': { border: `1px solid ${line.strong}` } },
    },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: line.default } },
  },
  MuiAvatar: {
    styleOverrides: {
      root: { fontWeight: 800, fontFamily: fonts.display },
    },
  },
};
