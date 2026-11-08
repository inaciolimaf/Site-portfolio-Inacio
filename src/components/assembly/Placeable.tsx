import { ReactNode, useId, useMemo, useRef } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useMotionPrefs } from '@/context/MotionPrefs';
import { useInViewPlay } from '@/hooks/useInViewPlay';
import { Cursor, CURSOR_NAMES, CursorName } from './Cursor';

interface Offset {
  x: number;
  y: number;
}

interface PlaceableProps {
  children: ReactNode;
  /** which collaborator cursor carries this element (default: picked per element) */
  cursor?: CursorName;
  /** where the element sits before it is placed (default: picked per element) */
  from?: Offset & { rotate?: number; scale?: number };
  /** where the cursor comes from, relative to the grab point */
  enter?: Offset;
  /** extra delay (s) on top of the global stagger */
  delay?: number;
  className?: string;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// phase boundaries inside a placement: approach → drag → leave
const GRAB = 0.34;
const DROP = 0.8;
const DURATION = 0.8; // s

/**
 * Global stagger: placements that are triggered together (a whole section
 * entering the screen) start one after another instead of all at once, so
 * the page looks like a team of cursors assembling it, not a swarm.
 */
const STAGGER = 70; // ms
const MAX_WAIT = 400; // ms — fast scrolling never leaves things waiting long
let nextSlot = 0;
function claimSlot() {
  const now = performance.now();
  const at = Math.min(now + MAX_WAIT, Math.max(now, nextSlot));
  nextSlot = at + STAGGER;
  return (at - now) / 1000;
}

/** Small deterministic PRNG, so every element gets a stable, distinct move. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Wraps an element so a ghost cursor walks in, grabs it from a "misplaced"
 * position, drags it into its real place and leaves. Scroll only *triggers*
 * it, once: the move plays on its own and the element then stays in place
 * for the rest of the visit (only a reload plays it again).
 *
 * The real content is in the DOM from the start and only moved with
 * transforms, so layout, SEO and screen readers are unaffected.
 */
export function Placeable(props: PlaceableProps) {
  const { animated, touch } = useMotionPrefs();
  if (!animated) return <div className={props.className}>{props.children}</div>;
  return <ActivePlaceable {...props} damp={touch ? 0.5 : 1} />;
}

function ActivePlaceable({ children, cursor, from, enter, delay = 0, className, damp }: PlaceableProps & { damp: number }) {
  const id = useId();
  const auto = useMemo(() => {
    const r = seeded(id);
    const side = r() < 0.5 ? -1 : 1;
    return {
      cursor: CURSOR_NAMES[Math.floor(r() * CURSOR_NAMES.length)],
      from: {
        x: side * (36 + r() * 64),
        y: (r() < 0.7 ? 1 : -1) * (14 + r() * 30),
        rotate: side * (0.8 + r() * 1.8),
      },
      enter: { x: side * (130 + r() * 70), y: 90 + r() * 60 },
    };
  }, [id]);

  const name = cursor ?? auto.cursor;
  const f: Offset & { rotate?: number; scale?: number } = from ?? auto.from;
  const e = enter ?? auto.enter;
  const fx = f.x * damp;
  const fy = f.y * damp;
  const ex = e.x * damp;
  const ey = e.y * damp;

  const ref = useRef<HTMLDivElement>(null);
  // grab point inside the element, measured when the move starts
  const grip = useRef({ x: 40, y: 14 });
  const progress = useMotionValue(0);

  // plays once, the first time any part shows up; then it stays in place
  useInViewPlay(ref, () => {
    const el = ref.current;
    if (el) grip.current = { x: Math.min(120, el.offsetWidth * 0.35), y: Math.min(16, el.offsetHeight * 0.5) };
    animate(progress, 1, { duration: DURATION, delay: claimSlot() + delay, ease: 'linear' });
  });

  // how far the element still is from its place (1 = fully misplaced)
  const rest = useTransform(progress, (t) => 1 - ease(clamp((t - GRAB) / (DROP - GRAB))));
  const x = useTransform(rest, (r) => fx * r);
  const y = useTransform(rest, (r) => fy * r);
  const rotate = useTransform(rest, (r) => (f.rotate ?? 0) * r);
  const scale = useTransform(rest, (r) => lerp(1, f.scale ?? 1, r));

  const cursorPos = (axis: 'x' | 'y') => (t: number) => {
    const g = grip.current[axis];
    const o = axis === 'x' ? fx : fy;
    const en = axis === 'x' ? ex : ey;
    if (t < GRAB) {
      const s = ease(t / GRAB);
      // a slightly curved, hand-made approach path
      const wobble = Math.sin(Math.PI * s) * 22 * (axis === 'x' ? 0.4 : -1);
      return lerp(o + g + en, o + g, s) + wobble;
    }
    if (t < DROP) return o * (1 - ease((t - GRAB) / (DROP - GRAB))) + g;
    const s = ease((t - DROP) / (1 - DROP));
    return lerp(g, g + (axis === 'x' ? en * 0.6 : -110), s);
  };
  const cx = useTransform(progress, cursorPos('x'));
  const cy = useTransform(progress, cursorPos('y'));
  const opacity = useTransform(progress, (t) => (t <= 0 || t >= 1 ? 0 : Math.min(1, t / 0.06, (1 - t) / 0.1)));
  const grab = useTransform(progress, (t) => (t > GRAB - 0.02 && t < DROP + 0.02 ? 1 : 0));

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <motion.div style={{ x, y, rotate, scale }} className="origin-top-left">
        {children}
      </motion.div>
      <Cursor name={name} x={cx} y={cy} opacity={opacity} grab={grab} />
    </div>
  );
}
