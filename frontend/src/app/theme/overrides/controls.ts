import type { Components, Theme } from '@mui/material/styles';
import { fonts, glass, glow, gold, ink, neon, night, radius } from '../tokens';

/** Buttons, chips and form fields. */
export const controls: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: radius.control,
        padding: '11px 22px',
        fontSize: 15,
        transition: 'transform .15s ease, box-shadow .15s ease, background-color .15s ease',
        '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 3 },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              color: night[900],
              boxShadow: glow.goldButton,
              '&:hover': { backgroundColor: gold, transform: 'translateY(-2px)', boxShadow: '0 12px 36px rgba(253,196,11,.5)' },
            },
          },
        ],
      },
      sizeLarge: { padding: '14px 28px', fontSize: 16 },
      sizeSmall: { padding: '7px 14px', fontSize: 13 },
      outlined: {
        color: ink.primary,
        borderColor: glass.line,
        background: glass.surface,
        boxShadow: glow.neon,
        '&:hover': { borderColor: neon[100], background: glass.raised, transform: 'translateY(-2px)' },
      },
      text: { color: neon[100], '&:hover': { background: 'rgba(92,163,238,.10)' } },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: { '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 2 } },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: radius.pill, fontWeight: 600, fontSize: 13 },
      outlined: { borderColor: glass.line, color: neon[100], background: 'rgba(2, 20, 110, 0.25)' },
      filled: { background: 'rgba(92, 163, 238, 0.16)', color: ink.primary },
      colorPrimary: { color: night[900] },
      clickable: { '&:hover': { boxShadow: glow.neon } },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: { background: glass.surface, borderRadius: radius.control, boxShadow: glow.neon, padding: 4, gap: 4 },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        border: 0,
        borderRadius: '10px !important',
        color: ink.secondary,
        textTransform: 'none',
        fontWeight: 600,
        padding: '6px 14px',
        '&.Mui-selected': { background: gold, color: night[900], '&:hover': { background: gold } },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: radius.control,
        background: 'rgba(1, 13, 60, 0.55)',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: glass.line },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: neon[100] },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: gold, borderWidth: 2 },
        '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(253, 196, 11, 0.12)' },
      },
      input: { padding: '14px 16px' },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { color: ink.secondary, '&.Mui-focused': { color: gold } },
    },
  },
  MuiFormHelperText: {
    styleOverrides: { root: { marginLeft: 4, fontSize: 13 } },
  },
  MuiAutocomplete: {
    styleOverrides: {
      paper: { background: glass.strong, boxShadow: glow.neon, borderRadius: radius.control },
      option: { '&[aria-selected="true"]': { background: 'rgba(253, 196, 11, 0.16) !important' } },
    },
  },
  MuiSwitch: {
    styleOverrides: { track: { backgroundColor: neon[300] } },
  },
  MuiTypography: {
    variants: [{ props: { variant: 'overline' }, style: { fontFamily: fonts.mono } }],
  },
};
