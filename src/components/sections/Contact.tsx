import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export const Contact = () => {
  const { content, locale } = useLocale();

  const socials = [
    { label: 'GitHub', href: socialLinks.github },
    { label: 'LinkedIn', href: socialLinks.linkedin },
    { label: 'Instagram', href: socialLinks.instagram },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="06"
          label={locale === 'pt' ? 'Contato' : 'Contact'}
          title={content.sections.contact.title}
          subtitle={content.sections.contact.subtitle}
        />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <Reveal>
            <a
              href={`mailto:${content.personal.email}`}
              className="group inline-flex max-w-full items-start gap-3 font-display text-[7vw] font-bold leading-[1.05] tracking-tight transition-colors hover:text-[hsl(var(--signal))] sm:text-4xl lg:text-5xl"
            >
              <span className="break-words">{content.personal.email}</span>
              <ArrowUpRight className="mt-1 h-7 w-7 flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <p className="mt-6 max-w-lg text-muted-foreground">
              {content.personal.location}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-t border-border">
              <span className="block py-4 label-mono text-muted-foreground">
                {content.sections.contact.socialMedia}
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-t border-border py-4 transition-colors hover:text-[hsl(var(--signal))]"
                >
                  <span className="font-display text-lg font-medium">{s.label}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
