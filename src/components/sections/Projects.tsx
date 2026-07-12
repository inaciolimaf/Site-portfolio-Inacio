import { useLocale } from '@/hooks/useLocale';
import { projects } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export const Projects = () => {
  const { content, locale } = useLocale();

  return (
    <section id="projects" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="04"
          label={locale === 'pt' ? 'Trabalhos' : 'Work'}
          title={content.sections.projects.title}
          subtitle={content.sections.projects.subtitle}
        />

        <div className="border-t border-border">
          {projects.map((project, i) => {
            const primary = project.demo || project.github;
            return (
              <Reveal key={project.id}>
                <article className="group grid gap-4 border-b border-border py-8 transition-colors hover:bg-[hsl(var(--signal))]/[0.04] md:grid-cols-[minmax(0,64px)_1fr_auto] md:items-baseline md:gap-8">
                  <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <a
                        href={primary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-[hsl(var(--signal))] sm:text-5xl"
                      >
                        {project.name[locale]}
                      </a>
                      {project.featured && (
                        <span className="label-mono text-[hsl(var(--signal))]">
                          {content.sections.projects.featured}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-2xl leading-relaxed text-foreground/75">
                      {project.description[locale]}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                      {project.technologies.map((t) => (
                        <li key={t} className="label-mono text-muted-foreground">{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 label-mono text-foreground transition-colors hover:text-[hsl(var(--signal))]"
                      >
                        {content.sections.projects.viewProject}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--signal))]"
                      >
                        {content.sections.projects.viewGithub}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}

          <div className="py-8 label-mono text-muted-foreground">
            {content.sections.projects.newProject}
          </div>
        </div>
      </div>
    </section>
  );
};
