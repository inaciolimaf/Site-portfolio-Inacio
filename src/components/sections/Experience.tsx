import { lazy, Suspense, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { useMotionPrefs } from '@/context/MotionPrefs';
import { experiences } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Placeable } from '@/components/assembly/Placeable';
import { useInViewPlay } from '@/hooks/useInViewPlay';
import type { Experience as Exp, Highlight } from '@/types';

const P95Game = lazy(() => import('@/components/games/P95Game'));
const PipelineGame = lazy(() => import('@/components/games/PipelineGame'));

/** Deterministic 7-char "commit hash" so the graph reads like a real git log. */
function shortHash(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

// Gutter geometry (px). The content column starts at GUTTER.
const GUTTER = 64;
const MAIN_X = 12;
const BRANCH_X = 36;
// vertical centre of the meta line (li has 40px top padding)
const META_Y = 47;

export const Experience = () => {
  const { content, locale } = useLocale();

  return (
    <section id="experience" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="03"
          label={locale === 'pt' ? 'Trajetória' : 'Career'}
          title={content.sections.experience.title}
          subtitle={content.sections.experience.subtitle}
        />

        <Placeable className="mb-8">
          <div className="flex items-center gap-3 label-mono text-muted-foreground" aria-hidden="true">
            <span className="text-foreground">$</span> git log --graph --oneline career
          </div>
        </Placeable>

        <ol className="border-t border-border">
          {experiences.map((exp, i) => (
            <Branch key={exp.id} exp={exp} first={i === 0} last={i === experiences.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
};

function Branch({ exp, first, last }: { exp: Exp; first: boolean; last: boolean }) {
  const { content, locale } = useLocale();
  const { animated } = useMotionPrefs();
  const ref = useRef<HTMLLIElement>(null);
  // the branch is drawn once, the first time the entry comes into view
  const grow = useMotionValue(animated ? 0 : 1);
  useInViewPlay(ref, () => void animate(grow, 1, { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }), {
    enabled: animated,
  });

  const fmt = (d: string) => {
    if (/^\d{4}-\d{2}$/.test(d)) {
      const [y, m] = d.split('-');
      return `${m}/${y}`;
    }
    return d === 'Presente' ? (locale === 'pt' ? 'Presente' : 'Present') : d;
  };

  const lane = exp.current ? 'bg-[hsl(var(--signal))]' : 'bg-[hsl(var(--ink))]';
  const stroke = exp.current ? 'hsl(var(--signal))' : 'hsl(var(--ink))';

  return (
    <li ref={ref} className="relative border-b border-border py-10" style={{ paddingLeft: GUTTER }}>
      {/* ── graph gutter (decorative) ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0" style={{ width: GUTTER }}>
        {/* main lane runs through every entry */}
        <span
          className="absolute w-px bg-border"
          style={{ left: MAIN_X, top: first ? META_Y : 0, bottom: last ? 22 : 0 }}
        />
        {/* the branch itself grows upwards from where it forked */}
        <motion.span
          className={`absolute w-[2px] origin-bottom ${lane}`}
          style={{
            left: BRANCH_X - 1,
            top: exp.current ? META_Y : META_Y + 24,
            bottom: 46,
            scaleY: animated ? grow : 1,
          }}
        />
        {/* fork from main (bottom) */}
        <svg className="absolute" style={{ left: MAIN_X, bottom: 22 }} width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M0 25 C0 12 24 14 24 0" stroke={stroke} strokeWidth="2" />
        </svg>
        {/* merge back into main (top) — the current branch is still open */}
        {!exp.current && (
          <>
            <svg className="absolute" style={{ left: MAIN_X, top: META_Y }} width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M0 0 C0 13 24 11 24 25" stroke={stroke} strokeWidth="2" />
            </svg>
            <span
              className="absolute h-[11px] w-[11px] rounded-full border-2 border-[hsl(var(--ink))] bg-background"
              style={{ left: MAIN_X - 5, top: META_Y - 5 }}
            />
          </>
        )}
        {exp.current && (
          <span className="absolute" style={{ left: BRANCH_X - 6, top: META_Y - 6 }}>
            <span className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-[hsl(var(--signal))] opacity-40 motion-reduce:hidden" />
            <span className="misreg relative block h-3 w-3 rounded-full bg-[hsl(var(--signal))]" />
          </span>
        )}
      </div>

      {/* ── content ─────────────────────────────────────────────── */}
      <Placeable>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 label-mono text-muted-foreground">
          {exp.current ? (
            <span className="text-[hsl(var(--signal))]">(HEAD → {exp.branch})</span>
          ) : (
            <span>
              merge <span className="text-foreground">{exp.branch}</span> → main
            </span>
          )}
          <span aria-hidden="true">·</span>
          <span>
            {fmt(exp.startDate)} — {fmt(exp.endDate)}
          </span>
          {exp.current && <span className="sr-only">{content.sections.experience.current}</span>}
        </p>
      </Placeable>

      <Placeable className="mt-4">
        <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{exp.position[locale]}</h3>
        <p className="mt-1 text-lg text-muted-foreground">{exp.company}</p>
      </Placeable>
      <Placeable className="mt-4">
        <p className="max-w-2xl leading-relaxed text-foreground/80">{exp.description[locale]}</p>
      </Placeable>

        <ul className="mt-6 space-y-2.5" aria-label={locale === 'pt' ? 'Destaques' : 'Highlights'}>
          {exp.highlights.map((h) => (
            <Commit key={h.message.en} h={h} hash={shortHash(exp.branch + h.message.en)} current={!!exp.current} />
          ))}
        </ul>

      <Placeable className="mt-6">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {exp.technologies.map((t) => (
            <li key={t} className="label-mono text-muted-foreground">{t}</li>
          ))}
        </ul>
      </Placeable>
    </li>
  );
}

function Commit({ h, hash, current }: { h: Highlight; hash: string; current: boolean }) {
  const { locale } = useLocale();
  const { reading } = useMotionPrefs();
  const [open, setOpen] = useState(false);
  const playable = h.game && !reading;
  const Game = h.game === 'p95' ? P95Game : PipelineGame;

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className={`absolute top-[0.45em] h-[9px] w-[9px] rounded-full border-2 bg-background ${
          current ? 'border-[hsl(var(--signal))]' : 'border-[hsl(var(--ink))]'
        }`}
        style={{ left: BRANCH_X - GUTTER - 4.5 }}
      />
      <Placeable>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <code className="font-mono text-xs text-muted-foreground">{hash}</code>
        <span className="text-foreground/85">
          <span className="font-mono text-sm text-[hsl(var(--signal))]">{h.type}:</span> {h.message[locale]}
        </span>
        {playable && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 border border-[hsl(var(--ink))] px-2 py-0.5 label-mono transition-colors hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
          >
            {open ? <X className="h-3 w-3" aria-hidden="true" /> : <Play className="h-3 w-3" aria-hidden="true" />}
            {open ? (locale === 'pt' ? 'fechar' : 'close') : locale === 'pt' ? 'jogar' : 'play'}
          </button>
        )}
      </div>
      </Placeable>
      {playable && open && (
        <div className="-ml-16 mt-4 max-w-3xl sm:ml-0">
          <Suspense
            fallback={<div className="h-64 animate-pulse border border-border bg-[hsl(var(--card))]" />}
          >
            <Game />
          </Suspense>
        </div>
      )}
    </li>
  );
}
