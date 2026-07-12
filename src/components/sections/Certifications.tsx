import { useLocale } from '@/hooks/useLocale';
import { certifications } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export const Certifications = () => {
  const { content, locale } = useLocale();

  return (
    <section id="certifications" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          index="05"
          label={locale === 'pt' ? 'Credenciais' : 'Credentials'}
          title={content.sections.certifications.title}
          subtitle={content.sections.certifications.subtitle}
        />

        <div className="border-t border-border">
          {certifications.map((cert) => {
            const hasLink = cert.link && cert.link !== '#';
            const Wrapper = hasLink ? 'a' : 'div';
            return (
              <Reveal key={cert.id}>
                <Wrapper
                  {...(hasLink ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group grid gap-3 border-b border-border py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-8 ${
                    hasLink ? 'transition-colors hover:bg-[hsl(var(--signal))]/[0.04]' : ''
                  }`}
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {cert.name[locale]}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {cert.issuer} · <span className="label-mono">{cert.date}</span>
                    </p>
                  </div>
                  {hasLink && (
                    <span className="flex items-center gap-2 label-mono text-muted-foreground transition-colors group-hover:text-[hsl(var(--signal))]">
                      {content.sections.certifications.viewCredential}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
