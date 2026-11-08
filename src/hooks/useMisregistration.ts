import { useEffect } from 'react';

/**
 * Print misregistration: while the page scrolls fast, the vermilion plate
 * "slips" a few pixels off the black one, then springs back when scrolling
 * stops. One rAF loop writes two CSS variables on <html>; CSS does the rest
 * (`.misreg` and `.misreg-text` in index.css), so React never re-renders.
 *
 *   --misreg    signed offset in px (clamped to ±MAX)
 *   --misreg-a  0..1 strength, used to fade the ghost copy in and out
 */
const MAX = 3.2;

export function useMisregistration(enabled: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    const clear = () => {
      root.style.setProperty('--misreg', '0');
      root.style.setProperty('--misreg-a', '0');
    };
    if (!enabled) {
      clear();
      return;
    }

    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let offset = 0;
    let written = 0;

    const tick = (t: number) => {
      const dt = Math.max(1, t - lastT);
      const y = window.scrollY;
      const velocity = (y - lastY) / dt; // px per ms
      lastY = y;
      lastT = t;

      // target offset follows velocity; ease towards it, decay to rest
      const target = Math.max(-MAX, Math.min(MAX, velocity * 2.6));
      offset += (target - offset) * 0.18;
      if (Math.abs(offset) < 0.02) offset = 0;

      if (Math.abs(offset - written) > 0.01) {
        written = offset;
        root.style.setProperty('--misreg', offset.toFixed(2));
        root.style.setProperty('--misreg-a', Math.min(1, Math.abs(offset) / MAX).toFixed(2));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clear();
    };
  }, [enabled]);
}
