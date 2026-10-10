import type { Components, Theme } from '@mui/material/styles';
import { accent, fonts, ink, line, onGold, outline, radius, shadow, signal, surface, tint } from '../tokens';

const focusVisible = { outline: `2px solid ${accent.neon}`, outlineOffset: 2 };

/** Buttons, chips and form fields. Gold fill is reserved for the one primary action on screen. */
export const controls: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: radius.control,
        padding: '11px 22px',
        fontSize: 15,
        transition: 'transform .15s ease, box-shadow .15s ease, background-color .15s ease, border-color .15s ease',
        '&:focus-visible': focusVisible,
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              color: onGold,
              boxShadow: shadow.goldButton,
              '&:hover': { backgroundColor: '#FFD03A', transform: 'translateY(-1px)', boxShadow: shadow.goldButtonHover },
            },
          },
        ],
      },
      sizeLarge: { padding: '14px 28px', fontSize: 16 },
      sizeSmall: { padding: '7px 14px', fontSize: 13 },
      outlined: {
        color: ink.primary,
        borderColor: line.strong,
        background: 'transparent',
        '&:hover': { borderColor: line.hover, background: tint.hover },
      },
      text: { color: accent.neon, '&:hover': { background: tint.neon } },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: { '&:focus-visible': focusVisible },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: { color: accent.neon, textDecorationColor: outline.neon, '&:hover': { textDecorationColor: accent.neon } },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: radius.pill,
        fontWeight: 600,
        fontSize: 13,
        // Only neutral chips are restyled; colored ones (e.g. the gold "Sen" chip) keep their palette.
        variants: [
          {
            props: { variant: 'filled', color: 'default' },
            style: { background: surface.raised, color: ink.primary, '&.MuiChip-clickable:hover': { background: surface.raisedHover } },
          },
          {
            props: { variant: 'outlined', color: 'default' },
            style: {
              borderColor: line.strong,
              color: ink.secondary,
              background: 'transparent',
              '&.MuiChip-clickable:hover': { borderColor: line.hover, background: tint.hover },
            },
          },
          {
            props: { color: 'default' },
            style: { '& .MuiChip-icon': { color: ink.secondary } },
          },
        ],
      },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: { background: surface.card, border: `1px solid ${line.default}`, borderRadius: radius.control, padding: 4, gap: 4 },
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
        '&:hover': { background: tint.hover, color: ink.primary },
        '&.Mui-selected': {
          background: surface.raised,
          color: ink.primary,
          boxShadow: `inset 0 0 0 1px ${outline.reward}`,
          '&:hover': { background: surface.raised },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: radius.control,
        background: surface.input,
        transition: 'box-shadow .15s ease',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: line.input },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: line.hover },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: accent.neon, borderWidth: 1 },
        '&.Mui-focused': { boxShadow: shadow.focusRing },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: signal.error },
      },
      input: { padding: '14px 16px', '&::placeholder': { color: ink.muted, opacity: 1 } },
    },
  },
  MuiInputAdornment: {
    styleOverrides: { root: { color: ink.muted } },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { color: ink.secondary, '&.Mui-focused': { color: accent.neon } },
    },
  },
  MuiFormHelperText: {
    styleOverrides: { root: { marginLeft: 4, fontSize: 13 } },
  },
  MuiAutocomplete: {
    styleOverrides: {
      paper: { background: surface.raised, border: `1px solid ${line.strong}`, boxShadow: shadow.floating, borderRadius: radius.control },
      option: { '&[aria-selected="true"]': { background: `${tint.gold} !important` } },
    },
  },
  MuiSwitch: {
    styleOverrides: { track: { backgroundColor: accent.neon } },
  },
  MuiTypography: {
    variants: [{ props: { variant: 'overline' }, style: { fontFamily: fonts.mono } }],
  },
};
