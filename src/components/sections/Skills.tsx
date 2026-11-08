import { lazy, Suspense, useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { useMotionPrefs } from '@/context/MotionPrefs';
import { skills } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Placeable } from '@/components/assembly/Placeable';

const SkillPile = lazy(() => import('@/components/games/SkillPile'));

const order = ['frontend', 'backend', 'database', 'tools', 'other'] as const;

export const Skills = () => {
  const { content, locale } = useLocale();
  const { animated } = useMotionPrefs();
  const [view, setView] = useState<'pile' | 'list'>('pile');
  const showPile = animated && view === 'pile';
  const labels = content.sections.skills.categories;

  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="02"
          label={locale === 'pt' ? 'Stack' : 'Stack'}
          title={content.sections.skills.title}
          subtitle={content.sections.skills.subtitle}
        />

        {animated && (
          <Placeable className="mb-6">
          <div className="flex items-center gap-1" role="group" aria-label={locale === 'pt' ? 'Visualização' : 'View'}>
            {(['pile', 'list'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`border px-3 py-1.5 label-mono transition-colors ${
                  view === v
                    ? 'border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-[hsl(var(--paper))]'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {v === 'pile' ? (locale === 'pt' ? 'Pilha' : 'Pile') : locale === 'pt' ? 'Lista' : 'List'}
              </button>
            ))}
          </div>
          </Placeable>
        )}

        {showPile && (
          <Suspense fallback={<div className="h-[460px] border border-border sm:h-[520px]" />}>
            <Placeable>
              <SkillPile skills={skills} labels={labels} />
            </Placeable>
          </Suspense>
        )}

        {/* the list is always in the DOM: visible in list/reading mode, for screen readers otherwise */}
        <div className={showPile ? 'sr-only' : 'border-t border-border'}>
          {order.filter((c) => grouped[c]?.length).map((category, i) => (
            <Placeable key={category}>
              <div className="grid gap-4 border-b border-border py-8 md:grid-cols-[minmax(0,240px)_1fr] md:gap-10">
                <div className="flex items-baseline gap-3">
                  <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {content.sections.skills.categories[category as keyof typeof content.sections.skills.categories]}
                  </h3>
                </div>
                <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                  {grouped[category].map((skill) => (
                    <li
                      key={skill.name}
                      className="group cursor-default text-lg text-foreground/80 transition-colors hover:text-foreground sm:text-xl"
                    >
                      <span className="bg-[linear-gradient(hsl(var(--signal)),hsl(var(--signal)))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Placeable>
          ))}
        </div>
      </div>
    </section>
  );
};
