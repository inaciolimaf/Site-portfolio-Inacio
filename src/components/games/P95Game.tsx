import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { useMotionPrefs } from '@/context/MotionPrefs';
import { GameShell, dropTargetAt } from './GameShell';

/**
 * "Derrube o p95" — replays the CNA+ optimisation: three slow endpoints, three
 * fixes. Drag a fix onto the endpoint it solves (or tap the fix, then the
 * endpoint). Each right match drops the p95, from 1.8 s down to 350 ms.
 */

type Fix = 'n1' | 'index' | 'cache';

interface Endpoint {
  fix: Fix;
  route: string;
  symptom: { pt: string; en: string };
  slow: number; // ms
  fast: number; // ms
  saves: number; // p95 ms removed when fixed
}

const ENDPOINTS: Endpoint[] = [
  {
    fix: 'n1',
    route: 'GET /courses',
    symptom: { pt: '1 query por aula do curso', en: '1 query per lesson in the course' },
    slow: 2400,
    fast: 300,
    saves: 700,
  },
  {
    fix: 'index',
    route: 'GET /progress/:student',
    symptom: { pt: 'seq scan em 2M de linhas', en: 'seq scan over 2M rows' },
    slow: 1900,
    fast: 280,
    saves: 450,
  },
  {
    fix: 'cache',
    route: 'GET /catalog',
    symptom: { pt: 'mesma resposta recalculada a cada request', en: 'same response recomputed on every request' },
    slow: 1200,
    fast: 120,
    saves: 300,
  },
];

const TOOLS: { fix: Fix; label: { pt: string; en: string } }[] = [
  { fix: 'index', label: { pt: 'criar índice', en: 'add index' } },
  { fix: 'n1', label: { pt: 'corrigir N+1', en: 'fix N+1' } },
  { fix: 'cache', label: { pt: 'cache Redis', en: 'Redis cache' } },
];

const START = 1800;
const TARGET = 350;

export default function P95Game() {
  const { locale } = useLocale();
  const pt = locale === 'pt';
  const [fixed, setFixed] = useState<Set<Fix>>(new Set());
  const [selected, setSelected] = useState<Fix | null>(null);
  const [miss, setMiss] = useState<{ route: string; n: number } | null>(null);
  // a drag ends with a click on the same chip; ignore that click
  const dragged = useRef(false);

  const p95 = START - ENDPOINTS.filter((e) => fixed.has(e.fix)).reduce((s, e) => s + e.saves, 0);
  const done = fixed.size === ENDPOINTS.length;

  const apply = (tool: Fix, route: string) => {
    const ep = ENDPOINTS.find((e) => e.route === route);
    if (!ep || fixed.has(ep.fix)) return;
    if (ep.fix === tool) {
      setFixed((s) => new Set(s).add(tool));
      setMiss(null);
    } else {
      setMiss({ route, n: Date.now() });
    }
    setSelected(null);
  };

  const status = done
    ? pt
      ? `✓ p95 em ${TARGET} ms — o mesmo resultado que entreguei no CNA+.`
      : `✓ p95 at ${TARGET} ms — the same result I shipped at CNA+.`
    : miss
      ? pt
        ? `✗ essa correção não resolve ${miss.route}. p95 continua em ${p95} ms.`
        : `✗ that fix doesn't solve ${miss.route}. p95 still at ${p95} ms.`
      : pt
        ? `p95 atual: ${p95} ms · alvo: ${TARGET} ms`
        : `current p95: ${p95} ms · target: ${TARGET} ms`;

  return (
    <GameShell
      title={pt ? 'Derrube o p95' : 'Bring the p95 down'}
      hint={
        pt
          ? 'Arraste cada correção até o endpoint que ela resolve — ou toque na correção e depois no endpoint.'
          : 'Drag each fix onto the endpoint it solves — or tap the fix, then the endpoint.'
      }
      status={status}
      done={done}
      onSkip={() => setFixed(new Set(ENDPOINTS.map((e) => e.fix)))}
      onReset={() => {
        setFixed(new Set());
        setSelected(null);
        setMiss(null);
      }}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_180px]">
        <div className="space-y-2">
          {ENDPOINTS.map((ep) => (
            <EndpointRow
              key={ep.route}
              ep={ep}
              fixed={fixed.has(ep.fix)}
              shake={miss?.route === ep.route ? miss.n : 0}
              armed={selected !== null && !fixed.has(ep.fix)}
              onPick={() => selected && apply(selected, ep.route)}
            />
          ))}
        </div>
        <Gauge value={p95} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 label-mono text-muted-foreground">{pt ? 'correções' : 'fixes'}</span>
        {TOOLS.filter((t) => !fixed.has(t.fix)).map((t) => (
          <motion.button
            key={t.fix}
            drag
            dragSnapToOrigin
            dragMomentum={false}
            whileDrag={{ scale: 1.06, rotate: -2, zIndex: 20 }}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={(e) => {
              setTimeout(() => (dragged.current = false), 0);
              const pe = e as PointerEvent;
              const route = dropTargetAt(pe.clientX, pe.clientY, 'route');
              if (route) apply(t.fix, route);
            }}
            onClick={() => !dragged.current && setSelected((s) => (s === t.fix ? null : t.fix))}
            aria-pressed={selected === t.fix}
            className={`relative cursor-grab touch-none border px-3 py-1.5 font-mono text-xs uppercase tracking-wider active:cursor-grabbing ${
              selected === t.fix
                ? 'border-[hsl(var(--signal))] bg-[hsl(var(--signal))] text-[hsl(var(--paper))]'
                : 'border-[hsl(var(--ink))] bg-background hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]'
            }`}
          >
            {t.label[locale]}
          </motion.button>
        ))}
        {done && <span className="label-mono text-muted-foreground">{pt ? 'tudo aplicado' : 'all applied'}</span>}
      </div>
    </GameShell>
  );
}

function EndpointRow({
  ep,
  fixed,
  shake,
  armed,
  onPick,
}: {
  ep: Endpoint;
  fixed: boolean;
  shake: number;
  armed: boolean;
  onPick: () => void;
}) {
  const { locale } = useLocale();
  const latency = fixed ? ep.fast : ep.slow;
  return (
    <motion.button
      type="button"
      data-route={ep.route}
      onClick={onPick}
      disabled={fixed}
      key={shake}
      animate={shake ? { x: [0, -7, 7, -4, 4, 0] } : undefined}
      transition={{ duration: 0.35 }}
      className={`block w-full border text-left transition-colors ${
        fixed
          ? 'border-border'
          : armed
            ? 'border-dashed border-[hsl(var(--signal))] hover:bg-[hsl(var(--signal))]/[0.06]'
            : 'border-border'
      }`}
    >
      <div className="flex items-baseline justify-between gap-3 px-3 pt-2">
        <code className="font-mono text-xs">{ep.route}</code>
        <span
          className={`font-mono text-xs tabular-nums ${fixed ? 'text-muted-foreground' : 'text-[hsl(var(--signal))]'}`}
        >
          {latency} ms
        </span>
      </div>
      <p className={`px-3 text-xs ${fixed ? 'text-muted-foreground line-through' : 'text-foreground/70'}`}>
        {ep.symptom[locale]}
      </p>
      <Flow latency={latency} fixed={fixed} />
    </motion.button>
  );
}

/** Requests travelling through the endpoint: slow endpoints = slow dots. */
function Flow({ latency, fixed }: { latency: number; fixed: boolean }) {
  const { animated } = useMotionPrefs();
  const canvas = useRef<HTMLCanvasElement>(null);
  const latencyRef = useRef(latency);
  latencyRef.current = latency;

  useEffect(() => {
    const c = canvas.current;
    if (!c || !animated) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    const h = 14;
    const resize = () => {
      w = c.clientWidth;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const styles = getComputedStyle(document.documentElement);
    const color = (v: string) => `hsl(${styles.getPropertyValue(v).trim()})`;
    const dots: { x: number; jitter: number }[] = [];
    let last = performance.now();
    let spawn = 0;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);

    const frame = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      if (visible) {
        spawn -= dt;
        if (spawn <= 0) {
          dots.push({ x: 0, jitter: Math.random() * 6 - 3 });
          spawn = 260 + Math.random() * 160;
        }
        const speed = w / (latencyRef.current * 1.3); // px per ms
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color('--border');
        ctx.fillRect(0, h / 2, w, 1);
        ctx.fillStyle = latencyRef.current > 600 ? color('--signal') : color('--ink');
        for (let i = dots.length - 1; i >= 0; i--) {
          dots[i].x += speed * dt;
          if (dots[i].x > w) dots.splice(i, 1);
          else ctx.fillRect(dots[i].x, h / 2 - 1.5 + dots[i].jitter * 0.3, 6, 3);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [animated]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className={`mt-1 block h-[14px] w-full ${fixed ? 'opacity-60' : ''}`}
    />
  );
}

/** Big p95 readout + a bar against the target. */
function Gauge({ value }: { value: number }) {
  const { locale } = useLocale();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${Math.round(v)}`);
  const width = useTransform(mv, (v) => `${(v / START) * 100}%`);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [value, mv]);
  const ok = value <= TARGET;

  return (
    <div className="flex flex-col justify-between border border-border p-3" aria-hidden="true">
      <span className="label-mono text-muted-foreground">p95 · {locale === 'pt' ? 'latência' : 'latency'}</span>
      <div className="my-2 flex items-baseline gap-1">
        <motion.span
          className={`font-display text-5xl font-bold tabular-nums tracking-tight ${
            ok ? 'text-foreground' : 'text-[hsl(var(--signal))]'
          }`}
        >
          {text}
        </motion.span>
        <span className="font-mono text-sm text-muted-foreground">ms</span>
      </div>
      <div className="relative h-2 bg-[hsl(var(--muted))]">
        <motion.div
          className={`absolute inset-y-0 left-0 ${ok ? 'bg-[hsl(var(--ink))]' : 'bg-[hsl(var(--signal))]'}`}
          style={{ width }}
        />
        <span
          className="absolute -top-1 h-4 w-px bg-[hsl(var(--ink))]"
          style={{ left: `${(TARGET / START) * 100}%` }}
        />
      </div>
      <span className="mt-1.5 font-mono text-[10px] text-muted-foreground">
        {locale === 'pt' ? 'alvo' : 'target'} {TARGET} ms
      </span>
    </div>
  );
}
