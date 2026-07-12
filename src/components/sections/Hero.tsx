import { useEffect, useState, Suspense, lazy } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';

const KineticHeadline = lazy(() =>
  import('@/components/webgl/KineticHeadline').then((m) => ({ default: m.KineticHeadline }))
);

// Prefer the WebGL signature on capable devices; fall back to static type on
// touch / reduced-motion where the interaction can't be felt anyway.
function useCanRenderWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.innerWidth < 768;
    setOk(!reduce && !coarse && !small);
  }, []);
  return ok;
}

function useInkColors() {
  const [colors, setColors] = useState({ ink: '#141414', signal: '#FF3D23' });
  useEffect(() => {
    const read = () => {
      const dark = document.documentElement.classList.contains('dark');
      setColors({ ink: dark ? '#EDEBE4' : '#141414', signal: dark ? '#FF4A33' : '#FF3D23' });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return colors;
}

export const Hero = () => {
  const { content, locale } = useLocale();
  const webgl = useCanRenderWebGL();
  const { ink, signal } = useInkColors();

  const nameLines = content.personal.name.toUpperCase().split(' ');

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden border-b border-border bg-background"
    >
      {/* ambient grid — barely-there structure, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink)) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-6 pt-28 pb-10 sm:px-10 lg:px-16">
        {/* eyebrow / masthead line */}
        <div className="flex items-end justify-between border-b border-border pb-4">
          <span className="label-mono text-muted-foreground">
            {content.personal.location}
          </span>
          <span className="label-mono hidden text-muted-foreground sm:block">
            {locale === 'pt' ? 'Portfólio — Ed. 2026' : 'Portfolio — Ed. 2026'}
          </span>
        </div>

        {/* headline block */}
        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-[hsl(var(--signal))]" />
            <span className="label-mono text-[hsl(var(--signal))]">
              {content.personal.title[locale]}
            </span>
          </div>

          {/* the signature: kinetic WebGL type, or a static echo of it */}
          <div className="relative h-[34vh] min-h-[220px] w-full sm:h-[42vh]">
            {webgl ? (
              <Suspense fallback={<StaticHeadline lines={nameLines} />}>
                <KineticHeadline lines={nameLines} ink={ink} signal={signal} />
              </Suspense>
            ) : (
              <StaticHeadline lines={nameLines} />
            )}
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.sections.hero.description}
          </p>
        </div>

        {/* footer row: actions + meta */}
        <div className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection('#projects')}
              className="group inline-flex items-center gap-2 bg-[hsl(var(--ink))] px-6 py-3 text-sm font-medium text-[hsl(var(--paper))] transition-colors hover:bg-[hsl(var(--signal))]"
            >
              {content.sections.hero.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-[hsl(var(--ink))]"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="label-mono text-muted-foreground">
              {locale === 'pt' ? 'Desde 2023' : 'Since 2023'}
            </span>
            <button
              onClick={() => scrollToSection('#about')}
              className="group flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
            >
              {locale === 'pt' ? 'Rolar' : 'Scroll'}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function StaticHeadline({ lines }: { lines: string[] }) {
  return (
    <div className="flex h-full flex-col justify-center">
      {lines.map((line, i) => (
        <span
          key={i}
          className="font-display font-bold uppercase leading-[0.86] tracking-[-0.02em] text-[hsl(var(--ink))]"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 12rem)' }}
        >
          {line}
        </span>
      ))}
    </div>
  );
}
