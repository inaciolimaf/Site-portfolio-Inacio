import { useLocale } from '@/hooks/useLocale';
import { Placeable } from '@/components/assembly/Placeable';

export const Footer = () => {
  const { content, locale } = useLocale();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-background py-12">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Placeable>
            <button
              onClick={scrollTop}
              className="group flex items-baseline gap-2 font-display text-2xl font-extrabold tracking-tight"
            >
              Inácio Filho
              <span className="misreg h-1.5 w-1.5 rounded-full bg-[hsl(var(--signal))]" />
            </button>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {content.personal.title[locale]} · {content.personal.location}
            </p>
          </Placeable>

          <Placeable>
            <button
              onClick={scrollTop}
              className="label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
            >
              {locale === 'pt' ? '↑ Voltar ao topo' : '↑ Back to top'}
            </button>
          </Placeable>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Placeable>
            <p className="label-mono text-muted-foreground">{content.footer.copyright}</p>
          </Placeable>
          <Placeable>
            <p className="label-mono text-muted-foreground">Coreaú · Ceará · BR</p>
          </Placeable>
        </div>
      </div>
    </footer>
  );
};
