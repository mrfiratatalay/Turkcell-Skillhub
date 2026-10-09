// Design tokens measured from the official Turkcell Code Night visuals (see tasarim/stil-taslagi.html).

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

export const gold = '#FDC40B';

export const ink = {
  primary: '#FFFFFF',
  secondary: '#A9B8E0',
  muted: '#8494C4',
} as const;

export const signal = {
  success: '#5EE6A8',
  error: '#FF7A93',
} as const;

export const glass = {
  surface: 'rgba(2, 20, 110, 0.30)',
  raised: 'rgba(6, 28, 130, 0.45)',
  strong: 'rgba(1, 13, 60, 0.92)',
  line: 'rgba(92, 163, 238, 0.45)',
  hairline: 'rgba(172, 227, 253, 0.14)',
} as const;

export const glow = {
  neon: '0 0 0 1px rgba(92, 163, 238, 0.45), 0 0 24px rgba(2, 99, 204, 0.40), inset 0 0 24px rgba(2, 99, 204, 0.14)',
  neonStrong: '0 0 0 1px rgba(172, 227, 253, 0.75), 0 0 32px rgba(2, 99, 204, 0.65)',
  gold: '0 0 0 1px rgba(253, 196, 11, 0.75), 0 0 28px rgba(253, 196, 11, 0.30)',
  goldButton: '0 8px 30px rgba(253, 196, 11, 0.35)',
} as const;

export const fonts = {
  display: '"Outfit Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, "SFMono-Regular", monospace',
} as const;

export const radius = {
  card: 20,
  control: 14,
  pill: 999,
} as const;
