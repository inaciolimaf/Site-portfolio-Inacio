import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { GameShell, dropTargetAt } from './GameShell';

/**
 * "12 → 5 min" — replays the Boticário CI speed-up. Every job starts queued on
 * runner 1, one after another (12 min). `install` must run first; everything
 * else only needs it. Spread the jobs over the runners until the pipeline
 * finishes in 5 min. Drag a job to another runner, or tap it to move it to the
 * next runner.
 */

interface Job {
  id: string;
  minutes: number;
  locked?: boolean;
}

const JOBS: Job[] = [
  { id: 'deps', minutes: 1, locked: true },
  { id: 'lint', minutes: 1 },
  { id: 'unit', minutes: 4 },
  { id: 'integration', minutes: 4 },
  { id: 'e2e', minutes: 2 },
];
const RUNNERS = 3;
const SCALE = 12; // minutes shown on the axis
const TARGET = 5;
const INITIAL: Record<string, number> = Object.fromEntries(JOBS.map((j) => [j.id, 0]));
const SOLVED: Record<string, number> = { deps: 0, lint: 0, e2e: 0, unit: 1, integration: 2 };

const install = JOBS[0].minutes;

/** start time of each job given its runner, plus the pipeline's total time */
function schedule(assign: Record<string, number>) {
  const cursor = Array.from({ length: RUNNERS }, () => install);
  const start: Record<string, number> = { deps: 0 };
  for (const job of JOBS.slice(1)) {
    const r = assign[job.id];
    start[job.id] = cursor[r];
    cursor[r] += job.minutes;
  }
  return { start, total: Math.max(...cursor) };
}

export default function PipelineGame() {
  const { locale } = useLocale();
  const pt = locale === 'pt';
  const [assign, setAssign] = useState(INITIAL);
  const dragged = useRef(false);
  const { start, total } = schedule(assign);
  const done = total <= TARGET;

  const move = (id: string, runner: number) => setAssign((a) => ({ ...a, [id]: runner }));

  const status = done
    ? pt
      ? `✓ pipeline em ${total} min — de 12 para 5, como fiz na Boticário.`
      : `✓ pipeline in ${total} min — from 12 to 5, as I did at Boticário.`
    : pt
      ? `tempo total: ${total} min · alvo: ${TARGET} min`
      : `total time: ${total} min · target: ${TARGET} min`;

  return (
    <GameShell
      title={pt ? 'Pipeline: 12 → 5 min' : 'Pipeline: 12 → 5 min'}
      hint={
        pt
          ? 'Todos os jobs estão na fila do runner 1. Só o deps (install) precisa vir antes. Arraste os jobs para outros runners — ou toque num job para mudá-lo de runner.'
          : 'Every job is queued on runner 1. Only deps (install) has to come first. Drag jobs to other runners — or tap a job to move it to the next runner.'
      }
      status={status}
      done={done}
      onSkip={() => setAssign(SOLVED)}
      onReset={() => setAssign(INITIAL)}
    >
      {/* time axis */}
      <div className="ml-[40px] mr-[48px] flex justify-between font-mono sm:ml-[72px] sm:mr-[64px] text-[10px] text-muted-foreground" aria-hidden="true">
        {[0, 2, 4, 6, 8, 10, 12].map((m) => (
          <span key={m} className={m % 4 ? 'hidden sm:inline' : ''}>{m}m</span>
        ))}
      </div>

      <div className="mt-1 space-y-1.5">
        {Array.from({ length: RUNNERS }, (_, r) => (
          <div key={r} className="flex items-stretch gap-2">
            <span className="w-8 shrink-0 self-center label-mono text-muted-foreground sm:w-16">
              <span className="hidden sm:inline">runner </span>
              <span className="sm:hidden">R</span>
              {r + 1}
            </span>
            <div
              data-runner={r}
              className="relative h-11 flex-1 border border-dashed border-border bg-background"
            >
              {JOBS.filter((j) => assign[j.id] === r).map((job) => (
                <motion.button
                  key={job.id}
                  layoutId={`job-${job.id}`}
                  type="button"
                  drag={job.locked ? false : 'y'}
                  dragSnapToOrigin
                  dragMomentum={false}
                  whileDrag={{ scale: 1.04, zIndex: 20 }}
                  onDragStart={() => (dragged.current = true)}
                  onDragEnd={(e) => {
                    setTimeout(() => (dragged.current = false), 0);
                    const pe = e as PointerEvent;
                    const target = dropTargetAt(pe.clientX, pe.clientY, 'runner');
                    if (target !== null) move(job.id, Number(target));
                  }}
                  onClick={() => {
                    if (job.locked || dragged.current) return;
                    move(job.id, (assign[job.id] + 1) % RUNNERS);
                  }}
                  aria-label={
                    job.locked
                      ? `${job.id}, ${job.minutes} min`
                      : `${job.id}, ${job.minutes} min, runner ${r + 1}. ${pt ? 'Mover para o próximo runner' : 'Move to next runner'}`
                  }
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className={`absolute inset-y-1 flex items-center overflow-hidden border px-1.5 font-mono text-[10px] sm:text-[11px] ${
                    job.locked
                      ? 'cursor-default border-[hsl(var(--ink))] bg-[hsl(var(--muted))] text-muted-foreground'
                      : 'cursor-grab touch-none border-[hsl(var(--ink))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))] active:cursor-grabbing'
                  }`}
                  style={{
                    left: `${(start[job.id] / SCALE) * 100}%`,
                    width: `calc(${(job.minutes / SCALE) * 100}% - 3px)`,
                  }}
                >
                  <span className="truncate">{job.id}</span>
                  {job.minutes > 1 && <span className="ml-auto pl-1 opacity-60">{job.minutes}m</span>}
                </motion.button>
              ))}
            </div>
            <span className="w-10 shrink-0 sm:w-14" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* total bar */}
      <div className="mt-4 flex items-center gap-2" aria-hidden="true">
        <span className="w-8 shrink-0 label-mono text-muted-foreground sm:w-16">
          <span className="hidden sm:inline">total</span>
          <span className="sm:hidden">Σ</span>
        </span>
        <div className="relative h-3 flex-1 bg-[hsl(var(--muted))]">
          <motion.div
            className={`absolute inset-y-0 left-0 ${done ? 'bg-[hsl(var(--ink))]' : 'bg-[hsl(var(--signal))]'}`}
            animate={{ width: `${(total / SCALE) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          />
          <span className="absolute -top-1 h-5 w-px bg-[hsl(var(--ink))]" style={{ left: `${(TARGET / SCALE) * 100}%` }} />
        </div>
        <span className="w-10 text-right font-display text-lg font-bold tabular-nums sm:w-14 sm:text-xl">{total}m</span>
      </div>
    </GameShell>
  );
}
