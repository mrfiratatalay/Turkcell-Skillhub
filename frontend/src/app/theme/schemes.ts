// The two color schemes of "Sakin Gece". Dark ("Gece") is the brand default; light ("Şafak") is daylight.
// Components never read these values directly: tokens.ts exposes them as CSS variables, so a scheme
// switch is a single attribute change on <html> with no React re-render.

/** `<html data-theme="light|dark">`; mirrored by the pre-paint script in index.html. */
export const COLOR_SCHEME_ATTRIBUTE = 'data-theme';
/** localStorage key of the chosen mode; mirrored by the pre-paint script in index.html. */
export const MODE_STORAGE_KEY = 'skillhub.theme';

const dark = {
  surface: {
    sidebar: '#0A0E1B', canvas: '#0D1222', input: '#11172A', card: '#141B30',
    raised: '#1B2440', raisedHover: '#222C4C', avatar: '#24304F',
  },
  line: { hairline: '#1A2135', default: '#232B42', input: '#262F48', strong: '#2C3654', hover: '#3A4566' },
  ink: { primary: '#EEF2FA', secondary: '#AEB6C8', muted: '#7D879E' },
  /** Gold and neon as text or icons. Gold fills (buttons, progress, stars) never change. */
  accent: { gold: '#FDC40B', neon: '#5CA3EE', flame: '#FF9F43' },
  signal: {
    success: '#5EE6A8', error: '#FF7A93',
    successTint: 'rgba(94, 230, 168, 0.10)', errorTint: 'rgba(255, 122, 147, 0.10)',
    successLine: 'rgba(94, 230, 168, 0.35)', errorLine: 'rgba(255, 122, 147, 0.35)',
  },
  tint: {
    gold: 'rgba(253, 196, 11, 0.12)', neon: 'rgba(92, 163, 238, 0.10)',
    hover: 'rgba(174, 182, 200, 0.06)', skeleton: 'rgba(174, 182, 200, 0.07)',
  },
  outline: { reward: 'rgba(253, 196, 11, 0.45)', neon: 'rgba(92, 163, 238, 0.45)' },
  shadow: {
    card: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    floating: '0 18px 48px rgba(3, 6, 16, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    goldButton: '0 6px 20px rgba(253, 196, 11, 0.18)',
    goldButtonHover: '0 10px 28px rgba(253, 196, 11, 0.28)',
    focusRing: '0 0 0 3px rgba(92, 163, 238, 0.25)',
  },
  medal: { gold: '#FDC40B', silver: '#C9D6F5', bronze: '#F2A65A' },
  /** Highlighted title words: gold text at night, a gold marker stroke by day. */
  highlight: { text: '#FDC40B', marker: 'transparent' },
  atmosphere: {
    scrim: 'rgba(5, 8, 18, 0.72)',
    bar: 'rgba(13, 18, 34, 0.88)',
    /** The color the login hero dissolves into; by day the night photo keeps a clean edge. */
    heroSeam: 'rgb(13, 18, 34)',
    stars: '1',
  },
};

export type SchemeTokens = { readonly [G in keyof typeof dark]: { readonly [K in keyof (typeof dark)[G]]: string } };

export const darkScheme: SchemeTokens = dark;

/** Contrast-checked against white and the light canvas: text ≥ 4.5:1, icons and outlines ≥ 3:1. */
export const lightScheme: SchemeTokens = {
  surface: {
    sidebar: '#FFFFFF', canvas: '#F3F5F9', input: '#FFFFFF', card: '#FFFFFF',
    raised: '#EDF0F6', raisedHover: '#E3E8F1', avatar: '#DCE3F0',
  },
  line: { hairline: '#E4E8F0', default: '#E0E5EE', input: '#D3DAE6', strong: '#C5CEDD', hover: '#A9B4C8' },
  ink: { primary: '#101828', secondary: '#46506A', muted: '#636D88' },
  accent: { gold: '#8F5E00', neon: '#1D63B8', flame: '#C2410C' },
  signal: {
    success: '#0F7B55', error: '#C2264B',
    successTint: 'rgba(15, 123, 85, 0.08)', errorTint: 'rgba(194, 38, 75, 0.07)',
    successLine: 'rgba(15, 123, 85, 0.35)', errorLine: 'rgba(194, 38, 75, 0.35)',
  },
  tint: {
    gold: 'rgba(253, 196, 11, 0.18)', neon: 'rgba(29, 99, 184, 0.08)',
    hover: 'rgba(16, 24, 40, 0.04)', skeleton: 'rgba(16, 24, 40, 0.06)',
  },
  outline: { reward: 'rgba(196, 140, 0, 0.55)', neon: 'rgba(29, 99, 184, 0.35)' },
  shadow: {
    card: '0 1px 2px rgba(16, 24, 40, 0.05)',
    floating: '0 18px 44px rgba(16, 24, 40, 0.14), 0 2px 6px rgba(16, 24, 40, 0.06)',
    goldButton: '0 6px 18px rgba(214, 160, 0, 0.28)',
    goldButtonHover: '0 10px 26px rgba(214, 160, 0, 0.36)',
    focusRing: '0 0 0 3px rgba(29, 99, 184, 0.22)',
  },
  medal: { gold: '#8F5E00', silver: '#5B6B8C', bronze: '#A1520F' },
  highlight: { text: '#101828', marker: 'rgba(253, 196, 11, 0.55)' },
  atmosphere: {
    scrim: 'rgba(16, 24, 40, 0.45)',
    bar: 'rgba(243, 245, 249, 0.88)',
    heroSeam: 'transparent',
    stars: '0',
  },
};

const kebab = (key: string) => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** `var(--sh-surface-card)` and so on: the only form in which components see a scheme value. */
export const cssVar = (group: string, key: string) => `var(--sh-${group}-${kebab(key)})`;

/** `{ '--sh-surface-card': '#141B30', … }`, ready to place under a color scheme selector. */
export function cssVariables(scheme: SchemeTokens): Record<string, string> {
  return Object.fromEntries(Object.entries(scheme).flatMap(([group, values]) =>
    Object.entries(values as Record<string, string>).map(([key, value]) => [`--sh-${group}-${kebab(key)}`, value])));
}

/** `[data-theme="light"]`; the default (dark) scheme also applies at `:root` before any attribute is set. */
export const schemeSelector = (scheme: 'light' | 'dark') =>
  `${scheme === 'dark' ? ':root, ' : ''}[${COLOR_SCHEME_ATTRIBUTE}="${scheme}"]`;
