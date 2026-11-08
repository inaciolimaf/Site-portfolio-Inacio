import { useEffect, useRef, useState } from 'react';
import type RAPIER_NS from '@dimforge/rapier2d-compat';
import { RotateCcw } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import type { Skill } from '@/types';

/**
 * The stack as physical blocks. A cursor drops every skill into the box, they
 * pile up, and the visitor can grab and throw them. Physics runs in Rapier 2D
 * (Rust compiled to WebAssembly), loaded only when the box scrolls into view.
 * Blocks are plain DOM nodes moved with transforms, so text stays crisp.
 */

type Rapier = typeof RAPIER_NS;
type Body = RAPIER_NS.RigidBody;

const PX = 50; // pixels per physics metre
const WALL = 2; // half-thickness of the walls (metres)

const TONE: Record<Skill['category'], string> = {
  frontend: 'bg-[hsl(var(--card))] text-foreground border-[hsl(var(--ink))]',
  backend: 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))] border-[hsl(var(--ink))]',
  database: 'bg-background text-[hsl(var(--signal))] border-[hsl(var(--signal))]',
  tools: 'bg-[hsl(var(--muted))] text-foreground border-[hsl(var(--ink))]',
  other: 'bg-[hsl(var(--signal))] text-[hsl(var(--paper))] border-[hsl(var(--signal))]',
};

let rapierPromise: Promise<Rapier> | null = null;
function loadRapier() {
  rapierPromise ??= import('@dimforge/rapier2d-compat').then(async (m) => {
    const R = (m.default ?? m) as Rapier;
    await R.init();
    return R;
  });
  return rapierPromise;
}

interface Props {
  skills: Skill[];
  labels: Record<Skill['category'], string>;
}

export default function SkillPile({ skills, labels }: Props) {
  const { locale } = useLocale();
  const box = useRef<HTMLDivElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const cursor = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0); // bump to drop everything again
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    // wait until the box is actually on screen before loading WASM
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        loadRapier()
          .then((R) => {
            if (!disposed) cleanup = simulate(R, el, blocks.current, cursor.current);
          })
          .catch(() => setFailed(true));
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      disposed = true;
      io.disconnect();
      cleanup();
    };
  }, [run]);

  if (failed) return null;

  return (
    <div>
      <div
        ref={box}
        aria-hidden="true"
        className="relative h-[460px] select-none overflow-hidden border border-[hsl(var(--ink))] bg-background sm:h-[520px]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--ink) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink) / 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        {skills.map((s, i) => (
          <div
            key={`${run}-${s.name}`}
            ref={(n) => (blocks.current[i] = n)}
            className={`absolute left-0 top-0 cursor-grab touch-none whitespace-nowrap border px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider opacity-0 shadow-[2px_2px_0_hsl(var(--ink)/0.25)] active:cursor-grabbing sm:text-sm ${TONE[s.category]}`}
          >
            {s.name}
          </div>
        ))}

        {/* the cursor that drops the blocks */}
        <div
          ref={cursor}
          className="pointer-events-none absolute left-0 top-0 z-10 opacity-0 transition-[transform,opacity] duration-150 ease-out"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
            <path
              d="M2 1.5 L2 17.5 L6.4 13.4 L9.3 20 L12.4 18.6 L9.6 12.2 L15.6 12.2 Z"
              fill="hsl(var(--ink))"
              stroke="hsl(var(--paper))"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute left-4 top-[18px] whitespace-nowrap rounded-[3px] bg-[hsl(var(--ink))] px-1.5 py-[3px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-[hsl(var(--paper))]">
            dev
          </span>
        </div>

        <span className="pointer-events-none absolute left-4 top-3 label-mono text-muted-foreground">
          {locale === 'pt' ? 'arraste e arremesse' : 'drag and throw'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-hidden="true">
          {(Object.keys(labels) as Skill['category'][]).map((c) => (
            <li key={c} className="flex items-center gap-2 label-mono text-muted-foreground">
              <span className={`h-3 w-3 border ${TONE[c]}`} />
              {labels[c]}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setRun((r) => r + 1)}
          className="inline-flex items-center gap-1.5 label-mono text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {locale === 'pt' ? 'soltar de novo' : 'drop again'}
        </button>
      </div>
    </div>
  );
}

/** Builds the world, drops the blocks, runs the loop. Returns a cleanup. */
function simulate(R: Rapier, box: HTMLDivElement, nodes: (HTMLDivElement | null)[], cursor: HTMLDivElement | null) {
  const world = new R.World({ x: 0, y: 22 });
  const els = nodes.filter((n): n is HTMLDivElement => !!n);
  const bodies: (Body | null)[] = els.map(() => null);
  const sizes = els.map((n) => ({ w: n.offsetWidth, h: n.offsetHeight }));
  let W = box.clientWidth;
  let H = box.clientHeight;

  // ── walls (rebuilt on resize) ───────────────────────────────
  let walls: RAPIER_NS.RigidBody[] = [];
  const buildWalls = () => {
    walls.forEach((b) => world.removeRigidBody(b));
    const w = W / PX;
    const h = H / PX;
    const add = (x: number, y: number, hx: number, hy: number) => {
      const b = world.createRigidBody(R.RigidBodyDesc.fixed().setTranslation(x, y));
      world.createCollider(R.ColliderDesc.cuboid(hx, hy).setFriction(0.8), b);
      return b;
    };
    walls = [
      add(w / 2, h + WALL, w / 2 + WALL * 2, WALL), // floor
      add(-WALL, h / 2 - h, WALL, h * 2), // left
      add(w + WALL, h / 2 - h, WALL, h * 2), // right
    ];
  };
  buildWalls();
  const ro = new ResizeObserver(() => {
    W = box.clientWidth;
    H = box.clientHeight;
    buildWalls();
  });
  ro.observe(box);

  // ── drop sequence: the cursor walks to a spot, lets go of a block ──
  const order = els.map((_, i) => i).sort(() => Math.random() - 0.5);
  const timers: number[] = [];
  const showCursor = (x: number, y: number, on: boolean) => {
    if (!cursor) return;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    cursor.style.opacity = on ? '1' : '0';
  };
  order.forEach((idx, k) => {
    timers.push(
      window.setTimeout(() => {
        const { w, h } = sizes[idx];
        const x = w / 2 + 8 + Math.random() * Math.max(1, W - w - 16);
        const y = h / 2 + 34;
        showCursor(x, y - 6, true);
        const body = world.createRigidBody(
          R.RigidBodyDesc.dynamic()
            .setTranslation(x / PX, y / PX)
            .setRotation((Math.random() - 0.5) * 0.5)
            .setLinearDamping(0.1)
            .setAngularDamping(0.4)
        );
        world.createCollider(
          R.ColliderDesc.cuboid(w / 2 / PX, h / 2 / PX).setFriction(0.7).setRestitution(0.15).setDensity(1),
          body
        );
        bodies[idx] = body;
        els[idx].style.opacity = '1';
      }, 140 + k * 150)
    );
  });
  timers.push(window.setTimeout(() => showCursor(W - 40, -30, false), 260 + order.length * 150));

  // ── grabbing and throwing ───────────────────────────────────
  let held: { i: number; dx: number; dy: number; lx: number; ly: number; lt: number; vx: number; vy: number } | null = null;
  const local = (e: PointerEvent) => {
    const r = box.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const down = (i: number) => (e: PointerEvent) => {
    const b = bodies[i];
    if (!b) return;
    e.preventDefault();
    els[i].setPointerCapture(e.pointerId);
    const p = local(e);
    const t = b.translation();
    b.setBodyType(R.RigidBodyType.KinematicPositionBased, true);
    held = { i, dx: t.x * PX - p.x, dy: t.y * PX - p.y, lx: p.x, ly: p.y, lt: performance.now(), vx: 0, vy: 0 };
  };
  const move = (e: PointerEvent) => {
    if (!held) return;
    const b = bodies[held.i];
    if (!b) return;
    const p = local(e);
    const now = performance.now();
    const dt = Math.max(1, now - held.lt) / 1000;
    held.vx = held.vx * 0.5 + ((p.x - held.lx) / dt) * 0.5;
    held.vy = held.vy * 0.5 + ((p.y - held.ly) / dt) * 0.5;
    held.lx = p.x;
    held.ly = p.y;
    held.lt = now;
    const { w, h } = sizes[held.i];
    const x = Math.min(W - w / 2, Math.max(w / 2, p.x + held.dx));
    const y = Math.min(H - h / 2, Math.max(-H, p.y + held.dy));
    b.setNextKinematicTranslation({ x: x / PX, y: y / PX });
  };
  const up = () => {
    if (!held) return;
    const b = bodies[held.i];
    if (b) {
      b.setBodyType(R.RigidBodyType.Dynamic, true);
      const cap = 40;
      b.setLinvel(
        { x: Math.max(-cap, Math.min(cap, held.vx / PX)), y: Math.max(-cap, Math.min(cap, held.vy / PX)) },
        true
      );
      b.setAngvel((Math.random() - 0.5) * 4, true);
    }
    held = null;
  };
  const handlers = els.map((n, i) => {
    const d = down(i);
    n.addEventListener('pointerdown', d);
    n.addEventListener('pointermove', move);
    n.addEventListener('pointerup', up);
    n.addEventListener('pointercancel', up);
    return d;
  });

  // ── loop: fixed 60 Hz steps, paused off-screen ──────────────
  let visible = true;
  const vis = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  vis.observe(box);
  let raf = 0;
  let last = performance.now();
  let acc = 0;
  const STEP = 1000 / 60;
  const frame = (t: number) => {
    acc += Math.min(100, t - last);
    last = t;
    if (visible) {
      while (acc >= STEP) {
        world.step();
        acc -= STEP;
      }
      for (let i = 0; i < els.length; i++) {
        const b = bodies[i];
        if (!b) continue;
        const p = b.translation();
        // anything that escaped (thrown too hard) comes back from the top
        if (p.y * PX > H + 200 || p.x * PX < -200 || p.x * PX > W + 200) {
          b.setTranslation({ x: W / 2 / PX, y: 40 / PX }, true);
          b.setLinvel({ x: 0, y: 0 }, true);
        }
        const { w, h } = sizes[i];
        els[i].style.transform = `translate(${p.x * PX - w / 2}px, ${p.y * PX - h / 2}px) rotate(${b.rotation()}rad)`;
      }
    } else {
      acc = 0;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    ro.disconnect();
    vis.disconnect();
    els.forEach((n, i) => {
      n.removeEventListener('pointerdown', handlers[i]);
      n.removeEventListener('pointermove', move);
      n.removeEventListener('pointerup', up);
      n.removeEventListener('pointercancel', up);
    });
    world.free();
  };
}
