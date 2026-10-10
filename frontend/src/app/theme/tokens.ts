// "Sakin Gece" design tokens (concept and brief: tasarim/sakin-gece/).
// Brand colors are measured from the official Turkcell Code Night visuals. Working surfaces use a
// desaturated ink navy instead, so the brand light (gold, neon, the night sky) is what stands out.

/** Brand night. Reserved for "windows" onto the sky: the login hero, the sky map, the city-lights map. */
export const night = {
  950: '#020C33',
  900: '#010D3C',
  800: '#010B4B',
  700: '#011472',
} as const;

export const neon = {
  600: '#011CCB',
  500: '#0263CC',
  300: '#5CA3EE',
  100: '#ACE3FD',
} as const;

/** The single primary accent: primary actions, XP, lit stars, the active page. */
export const gold = '#FDC40B';

/** Calm ink-navy layers, darkest to lightest. */
export const surface = {
  sidebar: '#0A0E1B',
  canvas: '#0D1222',
  input: '#11172A',
  card: '#141B30',
  raised: '#1B2440',
  avatar: '#24304F',
} as const;

export const line = {
  hairline: '#1A2135',
  default: '#232B42',
  input: '#262F48',
  strong: '#2C3654',
  hover: '#3A4566',
} as const;

export const ink = {
  primary: '#EEF2FA',
  secondary: '#AEB6C8',
  /** 5.2:1 on the canvas and 4.7:1 on cards; keep it off raised surfaces. */
  muted: '#7D879E',
} as const;

export const signal = {
  success: '#5EE6A8',
  error: '#FF7A93',
} as const;

/** Translucent fills for chips, icon wells and selected rows. */
export const tint = {
  gold: 'rgba(253, 196, 11, 0.12)',
  neon: 'rgba(92, 163, 238, 0.10)',
  hover: 'rgba(174, 182, 200, 0.06)',
} as const;

/** Light is a reward: only earned or selected things get a gold or neon outline, never a glow. */
export const outline = {
  reward: 'rgba(253, 196, 11, 0.45)',
  neon: 'rgba(92, 163, 238, 0.45)',
} as const;

export const shadow = {
  card: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  floating: '0 18px 48px rgba(3, 6, 16, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  goldButton: '0 6px 20px rgba(253, 196, 11, 0.18)',
  goldButtonHover: '0 10px 28px rgba(253, 196, 11, 0.28)',
  focusRing: '0 0 0 3px rgba(92, 163, 238, 0.25)',
} as const;

export const scrim = 'rgba(5, 8, 18, 0.72)';

export const fonts = {
  display: '"Outfit Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, "SFMono-Regular", monospace',
} as const;

export const radius = {
  card: 20,
  control: 14,
  pill: 999,
} as const;
