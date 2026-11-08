import { motion, MotionValue, useTransform } from 'framer-motion';

export const CURSOR_NAMES = ['design', 'dev', 'qa', 'ops'] as const;
export type CursorName = (typeof CURSOR_NAMES)[number];

const TONES: Record<CursorName, { fill: string; text: string; stroke?: string }> = {
  design: { fill: 'hsl(var(--signal))', text: 'hsl(var(--paper))' },
  dev: { fill: 'hsl(var(--ink))', text: 'hsl(var(--paper))' },
  qa: { fill: 'hsl(210 14% 42%)', text: 'hsl(48 24% 96%)' },
  ops: { fill: 'hsl(var(--paper))', text: 'hsl(var(--ink))', stroke: 'hsl(var(--ink))' },
};

interface CursorProps {
  name: CursorName;
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  /** 0 = pointer arrow, 1 = closed hand (holding something) */
  grab: MotionValue<number>;
}

/** A labelled "collaborator" cursor. Its tip sits at (x, y). Purely decorative. */
export function Cursor({ name, x, y, opacity, grab }: CursorProps) {
  const tone = TONES[name];
  const arrow = useTransform(grab, (g) => 1 - g);
  const press = useTransform(grab, (g) => 1 - g * 0.08);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 select-none"
      style={{ x, y, opacity }}
    >
      <motion.div style={{ scale: press }} className="relative origin-top-left">
        {/* arrow */}
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          style={{ opacity: arrow }}
          className="absolute left-0 top-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
        >
          <path
            d="M2 1.5 L2 17.5 L6.4 13.4 L9.3 20 L12.4 18.6 L9.6 12.2 L15.6 12.2 Z"
            fill={tone.fill}
            stroke={tone.stroke ?? 'hsl(var(--paper))'}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </motion.svg>
        {/* closed hand */}
        <motion.svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          style={{ opacity: grab }}
          className="absolute -left-3 -top-3 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
        >
          <path
            d="M7 10.5V9a1.5 1.5 0 0 1 3 0v-.5a1.5 1.5 0 0 1 3 0V9a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.6-2.2L5 15.2a1.6 1.6 0 0 1 2.4-2.1L7 12.6z"
            fill={tone.fill}
            stroke={tone.stroke ?? 'hsl(var(--paper))'}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </motion.svg>
        <span
          className="absolute left-4 top-[18px] whitespace-nowrap rounded-[3px] px-1.5 py-[3px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] shadow-sm"
          style={{ background: tone.fill, color: tone.text, boxShadow: tone.stroke ? `inset 0 0 0 1px ${tone.stroke}` : undefined }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
}
