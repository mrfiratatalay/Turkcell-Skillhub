// "Sakin Gece" design tokens (concept and brief: tasarim/sakin-gece/).
// Brand colors are measured from the official Turkcell Code Night visuals and never change. Every other
// token is a CSS variable whose value comes from the active color scheme (schemes.ts).
import { cssVar, darkScheme, type SchemeTokens } from './schemes';

/** Brand night. Reserved for "windows" onto the sky: the login hero, the sky map, the city-lights map. */
export const night = {
  950: '#020C33',
  900: '#010D3C',
  800: '#010B4B',
  700: '#011472',
} as const;

/** Raw brand neon, for drawings inside the night windows. Text and icons use `accent.neon`. */
export const neon = {
  600: '#011CCB',
  500: '#0263CC',
  300: '#5CA3EE',
  100: '#ACE3FD',
} as const;

/** Brand gold as a fill: primary buttons, progress, lit stars. Gold text and icons use `accent.gold`. */
export const gold = '#FDC40B';

/** Text on a gold fill, in both schemes. */
export const onGold = '#0D1222';

/** Text inside the night windows, which stay dark in both schemes. */
export const onNight = {
  primary: '#EEF2FA',
  secondary: '#AEB6C8',
  muted: '#7D879E',
} as const;

type TokenGroup<G extends keyof SchemeTokens> = { readonly [K in keyof SchemeTokens[G]]: string };

function scheme<G extends keyof SchemeTokens>(group: G): TokenGroup<G> {
  return Object.fromEntries(Object.keys(darkScheme[group]).map((key) => [key, cssVar(group, key)])) as TokenGroup<G>;
}

/** Ink-navy layers by night, paper-white layers by day. */
export const surface = scheme('surface');
export const line = scheme('line');
export const ink = scheme('ink');
export const accent = scheme('accent');
export const signal = scheme('signal');
/** Translucent fills for chips, icon wells, selected rows and skeletons. */
export const tint = scheme('tint');
/** Light is a reward: only earned or selected things get a gold or neon outline, never a glow. */
export const outline = scheme('outline');
export const shadow = scheme('shadow');
export const medal = scheme('medal');
export const highlight = scheme('highlight');
export const atmosphere = scheme('atmosphere');

export const fonts = {
  display: '"Outfit Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, "SFMono-Regular", monospace',
} as const;

export const radius = {
  card: 20,
  control: 14,
  pill: 999,
} as const;
