import { useLocale } from '@/hooks/useLocale';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

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
          <Reveal className="max-w-2xl">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed text-foreground/85 ${
                  i === 0 ? 'text-xl sm:text-2xl font-display font-medium tracking-tight text-foreground' : 'mt-6 text-base sm:text-lg'
                }`}
              >
                {p}
              </p>
            ))}
          </Reveal>

          {/* index card + stats */}
          <Reveal delay={0.1}>
            <dl className="divide-y divide-border border-y border-border">
              {facts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="label-mono text-muted-foreground">{f.k}</dt>
                  <dd className="text-sm sm:text-right sm:text-base">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold tracking-tight text-[hsl(var(--signal))] sm:text-4xl">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
