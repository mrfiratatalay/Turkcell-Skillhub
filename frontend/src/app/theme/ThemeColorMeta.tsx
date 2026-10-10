import { useEffect } from 'react';
import { darkScheme, lightScheme } from './schemes';
import { useResolvedScheme } from './useResolvedScheme';

/** Keeps the mobile browser chrome (`<meta name="theme-color">`) in the canvas color of the active scheme. */
export function ThemeColorMeta() {
  const scheme = useResolvedScheme();
  useEffect(() => {
    const color = (scheme === 'light' ? lightScheme : darkScheme).surface.canvas;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  }, [scheme]);
  return null;
}
