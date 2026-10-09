import type { Components, Theme } from '@mui/material/styles';
import { glass, glow, gold, ink, neon, signal } from '../tokens';

/** Progress, skeletons, alerts and navigation chrome. */
export const feedback: Components<Omit<Theme, 'components'>> = {
  MuiLinearProgress: {
    styleOverrides: {
      root: { height: 8, borderRadius: 99, backgroundColor: 'rgba(172, 227, 253, 0.14)' },
      bar: { borderRadius: 99, boxShadow: `0 0 14px ${gold}` },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: { backgroundColor: 'rgba(172, 227, 253, 0.08)', borderRadius: 14 },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        backdropFilter: 'blur(10px)',
        alignItems: 'center',
        color: ink.primary,
        variants: [
          {
            props: { variant: 'standard', severity: 'error' },
            style: { background: 'rgba(255, 122, 147, 0.12)', boxShadow: `0 0 0 1px ${signal.error}55` },
          },
          {
            props: { variant: 'standard', severity: 'success' },
            style: { background: 'rgba(94, 230, 168, 0.12)', boxShadow: `0 0 0 1px ${signal.success}55` },
          },
          {
            props: { variant: 'standard', severity: 'info' },
            style: { background: glass.surface, boxShadow: glow.neon },
          },
          {
            props: { variant: 'standard', severity: 'warning' },
            style: { background: 'rgba(253, 196, 11, 0.10)', boxShadow: `0 0 0 1px ${gold}55` },
          },
        ],
      },
    },
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: {
        height: 68,
        background: 'rgba(1, 11, 75, 0.82)',
        backdropFilter: 'blur(16px)',
        boxShadow: `0 -1px 0 ${glass.hairline}, 0 -10px 30px rgba(1, 7, 40, 0.5)`,
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        color: ink.muted,
        minWidth: 0,
        padding: '6px 4px',
        '&.Mui-selected': { color: gold },
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
      root: { textTransform: 'none', fontWeight: 600, color: ink.secondary, '&.Mui-selected': { color: neon[100] } },
    },
  },
  MuiAccordion: {
    defaultProps: { disableGutters: true, elevation: 0 },
    styleOverrides: {
      root: {
        background: glass.surface,
        borderRadius: '16px !important',
        boxShadow: glow.neon,
        '&::before': { display: 'none' },
        marginBottom: 12,
      },
    },
  },
};
