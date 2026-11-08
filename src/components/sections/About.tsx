import { useLocale } from '@/hooks/useLocale';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Placeable } from '@/components/assembly/Placeable';

export const About = () => {
  const { content, locale } = useLocale();
  const paragraphs = content.about.split('\n\n');

  const facts = [
    { k: locale === 'pt' ? 'Local' : 'Location', v: content.personal.location },
    { k: locale === 'pt' ? 'Formação' : 'Education', v: content.personal.university },
    { k: 'E-mail', v: content.personal.email },
  ];

  const stats = [
    { n: '3+', l: content.sections.about.yearsExperience },
    { n: '85%+', l: locale === 'pt' ? 'Cobertura de testes' : 'Test coverage' },
    { n: '100%', l: locale === 'pt' ? 'Entregas no prazo' : 'On-time delivery' },
  ];

  return (
    <section id="about" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="01"
          label={locale === 'pt' ? 'Sobre' : 'About'}
          title={content.sections.about.title}
          subtitle={content.sections.about.content}
        />

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          {/* narrative */}
          <div className="max-w-2xl">
            {paragraphs.map((p, i) => (
              <Placeable key={i} className={i === 0 ? '' : 'mt-6'}>
                <p
                  className={`leading-relaxed text-foreground/85 ${
                    i === 0
                      ? 'text-xl sm:text-2xl font-display font-medium tracking-tight text-foreground'
                      : 'text-base sm:text-lg'
                  }`}
                >
                  {p}
                </p>
              </Placeable>
            ))}
          </div>

          {/* index card + stats */}
          <div>
            <dl className="border-y border-border">
              {facts.map((f, i) => (
                <Placeable key={f.k} className={i ? 'border-t border-border' : ''}>
                  <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <dt className="label-mono text-muted-foreground">{f.k}</dt>
                    <dd className="text-sm sm:text-right sm:text-base">{f.v}</dd>
                  </div>
                </Placeable>
              ))}
            </dl>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <Placeable key={s.l}>
                  <div className="misreg font-display text-3xl font-bold tracking-tight text-[hsl(var(--signal))] sm:text-4xl">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</div>
                </Placeable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
