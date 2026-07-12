import { useLocale } from '@/hooks/useLocale';

export const Footer = () => {
  const { content, locale } = useLocale();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-background py-12">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              onClick={scrollTop}
              className="group flex items-baseline gap-2 font-display text-2xl font-extrabold tracking-tight"
            >
              Inácio Filho
              <span className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-[hsl(var(--signal))]" />
            </button>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {content.personal.title[locale]} · {content.personal.location}
            </p>
          </div>

          <button
            onClick={scrollTop}
            className="label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
          >
            {locale === 'pt' ? '↑ Voltar ao topo' : '↑ Back to top'}
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-muted-foreground">{content.footer.copyright}</p>
          <p className="label-mono text-muted-foreground">Coreaú · Ceará · BR</p>
        </div>
      </div>
    </footer>
  );
};
