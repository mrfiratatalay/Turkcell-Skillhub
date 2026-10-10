import type { Components, Theme } from '@mui/material/styles';
import { accent, gold, ink, line, outline, signal, surface, tint } from '../tokens';

// Alerts also float as toasts, so each tint is layered over an opaque card color.
const tinted = (color: string) => `linear-gradient(${color}, ${color}), ${surface.card}`;

/** Progress, skeletons, alerts and navigation chrome. */
export const feedback: Components<Omit<Theme, 'components'>> = {
  MuiLinearProgress: {
    styleOverrides: {
      root: { height: 6, borderRadius: 99, backgroundColor: line.default },
      bar: { borderRadius: 99 },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: { backgroundColor: tint.skeleton, borderRadius: 14 },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        alignItems: 'center',
        color: ink.primary,
        variants: [
          {
            props: { variant: 'standard', severity: 'error' },
            style: { background: tinted(signal.errorTint), border: `1px solid ${signal.errorLine}` },
          },
          {
            props: { variant: 'standard', severity: 'success' },
            style: { background: tinted(signal.successTint), border: `1px solid ${signal.successLine}` },
          },
          {
            props: { variant: 'standard', severity: 'info' },
            style: { background: surface.card, border: `1px solid ${line.default}`, '& .MuiAlert-icon': { color: accent.neon } },
          },
          {
            props: { variant: 'standard', severity: 'warning' },
            style: { background: tinted(tint.gold), border: `1px solid ${outline.reward}` },
          },
        ],
      },
    },
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: { height: 68, background: surface.sidebar, boxShadow: `0 -1px 0 ${line.hairline}` },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        color: ink.muted,
        minWidth: 0,
        padding: '6px 4px',
        '&.Mui-selected': { color: accent.gold },
        '& .MuiBottomNavigationAction-label': { fontSize: 11, fontWeight: 600, marginTop: 2 },
        '& .MuiBottomNavigationAction-label.Mui-selected': { fontSize: 11 },
      },
    },
  },
  MuiTabs: {
    styleOverrides: { indicator: { backgroundColor: gold, height: 3, borderRadius: 3 } },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'none', fontWeight: 600, color: ink.secondary, '&.Mui-selected': { color: ink.primary } },
    },
  },
  MuiAccordion: {
    defaultProps: { disableGutters: true, elevation: 0 },
    styleOverrides: {
      root: {
        background: surface.card,
        border: `1px solid ${line.default}`,
        borderRadius: '16px !important',
        '&::before': { display: 'none' },
        marginBottom: 12,
      },
    },
  },
};
