import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { projects } from '@/data/portfolio';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export const Projects = () => {
  const { content, locale } = useLocale();

  // Fine pointer (desktop/mouse) → floating preview that follows the cursor.
  // Touch → show the preview inline, since there's no hover to trigger it.
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const y = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

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
                <article
                  className="group grid gap-4 border-b border-border py-8 transition-colors hover:bg-[hsl(var(--signal))]/[0.04] md:grid-cols-[minmax(0,64px)_1fr_auto] md:items-baseline md:gap-8"
                  onMouseEnter={() => fine && project.image && setPreview({ src: project.image, alt: project.name[locale] })}
                  onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}
                  onMouseLeave={() => setPreview(null)}
                >
                  <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {project.caseStudy ? (
                        <Link
                          to={project.caseStudy}
                          className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-[hsl(var(--signal))] sm:text-5xl"
                        >
                          {project.name[locale]}
                        </Link>
                      ) : (
                        <a
                          href={primary}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-[hsl(var(--signal))] sm:text-5xl"
                        >
                          {project.name[locale]}
                        </a>
                      )}
                      {project.featured && (
                        <span className="label-mono text-[hsl(var(--signal))]">
                          {content.sections.projects.featured}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 max-w-2xl leading-relaxed text-foreground/75">
                      {project.description[locale]}
                    </p>

                    {/* inline preview for touch devices */}
                    {!fine && project.image && (
                      <a
                        href={primary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 block overflow-hidden rounded-sm border border-border"
                      >
                        <img
                          src={project.image}
                          alt={project.name[locale]}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover object-top"
                        />
                      </a>
                    )}

                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                      {project.technologies.map((t) => (
                        <li key={t} className="label-mono text-muted-foreground">{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    {project.caseStudy && (
                      <Link
                        to={project.caseStudy}
                        className="flex items-center gap-1.5 label-mono text-[hsl(var(--signal))] transition-opacity hover:opacity-70"
                      >
                        {locale === 'pt' ? 'Estudo de caso' : 'Case study'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
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

      {/* floating cursor preview (desktop) */}
      {fine && (
        <AnimatePresence>
          {preview && (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
              style={{ x, y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <motion.div
                className="w-[24rem] -translate-x-1/2 -translate-y-[118%] overflow-hidden rounded-sm border border-border bg-card shadow-2xl"
                initial={{ scale: 0.92, rotate: -1.5 }}
                animate={{ scale: 1, rotate: -1.5 }}
                exit={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <img
                  src={preview.src}
                  alt={preview.alt}
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
