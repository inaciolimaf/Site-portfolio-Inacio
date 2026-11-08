import { RefObject, useEffect, useRef } from 'react';

/**
 * Scroll as a *trigger*, never as a scrubber — and only once per page load.
 *
 * `onEnter` fires the first time the element shows up in the viewport. After
 * that the element keeps its final state for good: scrolling back up or down
 * never replays it (only a reload does).
 */
export function useInViewPlay(
  ref: RefObject<Element>,
  onEnter: () => void,
  { enabled = true, margin = '0px' }: { enabled?: boolean; margin?: string } = {}
) {
  const enter = useRef(onEnter);
  enter.current = onEnter;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        enter.current();
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, margin]);
}
