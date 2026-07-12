import { useLocale } from '@/hooks/useLocale';
import { experiences } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export const Experience = () => {
  const { content, locale } = useLocale();

  const fmt = (d: string) => {
    if (/^\d{4}-\d{2}$/.test(d)) {
      const [y, m] = d.split('-');
      return `${m}/${y}`;
    }
    return d === 'Presente' ? (locale === 'pt' ? 'Presente' : 'Present') : d;
  };

  return (
    <section id="experience" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="03"
          label={locale === 'pt' ? 'Trajetória' : 'Career'}
          title={content.sections.experience.title}
          subtitle={content.sections.experience.subtitle}
        />

        <div className="border-t border-border">
          {experiences.map((exp) => (
            <Reveal key={exp.id}>
              <article className="group grid gap-6 border-b border-border py-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12">
                <div className="flex flex-col gap-2">
                  <span className="label-mono text-muted-foreground">
                    {fmt(exp.startDate)} — {fmt(exp.endDate)}
                  </span>
                  {exp.current && (
                    <span className="inline-flex w-fit items-center gap-2 label-mono text-[hsl(var(--signal))]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--signal))]" />
                      {content.sections.experience.current}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {exp.position[locale]}
                  </h3>
                  <p className="mt-1 text-lg text-muted-foreground">{exp.company}</p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
                    {exp.description[locale]}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {exp.technologies.map((t) => (
                      <li key={t} className="label-mono text-muted-foreground">{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
