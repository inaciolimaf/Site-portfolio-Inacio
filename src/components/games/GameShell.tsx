import { ReactNode } from 'react';
import { RotateCcw, FastForward } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';

interface GameShellProps {
  title: string;
  hint: string;
  /** one-line live status, announced to screen readers */
  status: string;
  done: boolean;
  onSkip: () => void;
  onReset: () => void;
  children: ReactNode;
}

/** Shared frame for the inline mini-games: title, hint, live status, skip/reset. */
export function GameShell({ title, hint, status, done, onSkip, onReset, children }: GameShellProps) {
  const { locale } = useLocale();
  const pt = locale === 'pt';
  return (
    <section
      aria-label={title}
      className="border border-[hsl(var(--ink))] bg-[hsl(var(--card))] shadow-[6px_6px_0_hsl(var(--ink))]"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--ink))] px-4 py-2.5">
        <span className="label-mono">
          <span className="text-[hsl(var(--signal))]">▶</span> {title}
        </span>
        <div className="flex items-center gap-1">
          {!done && (
            <button
              onClick={onSkip}
              className="inline-flex items-center gap-1.5 px-2 py-1 label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              <FastForward className="h-3.5 w-3.5" aria-hidden="true" />
              {pt ? 'ver resultado' : 'show result'}
            </button>
          )}
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2 py-1 label-mono text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {pt ? 'reiniciar' : 'reset'}
          </button>
        </div>
      </header>
      <p className="px-4 pt-3 text-sm text-muted-foreground">{hint}</p>
      <div className="p-4">{children}</div>
      <p
        role="status"
        aria-live="polite"
        className={`border-t border-[hsl(var(--ink))] px-4 py-2.5 font-mono text-xs ${
          done ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))]' : 'text-muted-foreground'
        }`}
      >
        {status}
      </p>
    </section>
  );
}

/** Finds the drop target under a pointer position (used by drag & drop games). */
export function dropTargetAt(x: number, y: number, attr: string): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    const v = (el as HTMLElement).dataset?.[attr];
    if (v !== undefined) return v;
  }
  return null;
}
