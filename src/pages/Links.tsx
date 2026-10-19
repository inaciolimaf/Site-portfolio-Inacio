import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { ThemeToggle } from '@/components/ThemeToggle';

const EMAIL = 'inaciofilho.lima@gmail.com';

type Item = {
  label: string;
  meta: string;
  href: string;
  /** internal route (react-router) instead of a new tab */
  internal?: boolean;
  featured?: boolean;
};

const Links = () => {
  const { locale, changeLocale } = useLocale();
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Links · Inácio Filho';
  }, []);

  const items: Item[] = [
    { label: t('Portfólio', 'Portfolio'), meta: 'inaciof.com', href: '/', internal: true, featured: true },
    { label: 'LinkedIn', meta: 'in/inaciolimaf', href: socialLinks.linkedin! },
    { label: 'GitHub', meta: '@inaciolimaf', href: socialLinks.github! },
    { label: 'E-mail', meta: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'Inkstave', meta: t('Editor LaTeX colaborativo', 'Collaborative LaTeX editor'), href: 'https://inkstave.inaciof.com' },
    { label: t('Estudo de caso', 'Case study'), meta: t('Como construí o Inkstave', 'How I built Inkstave'), href: '/inkstave', internal: true },
  ];

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 + i * 0.05 },
        };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* utility bar */}
      <div className="mx-auto flex w-full max-w-[560px] items-center justify-between px-4 pt-4 sm:px-6">
        <span className="label-mono text-muted-foreground">/links</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeLocale(locale === 'pt' ? 'en' : 'pt')}
            className="label-mono px-2 py-1 text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
            aria-label={t('Mudar para inglês', 'Switch to Portuguese')}
          >
            <span className={locale === 'pt' ? 'text-[hsl(var(--ink))]' : ''}>PT</span>
            <span className="mx-1 opacity-40">/</span>
            <span className={locale === 'en' ? 'text-[hsl(var(--ink))]' : ''}>EN</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[560px] flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        {/* identity */}
        <motion.header {...rise(0)}>
          <img src="/favicon.svg" alt="" aria-hidden="true" className="h-16 w-16" />

          <h1 className="mt-8 flex items-baseline gap-2 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            Inácio Filho
            <span className="h-2 w-2 shrink-0 translate-y-[-4px] rounded-full bg-[hsl(var(--signal))]" />
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[hsl(var(--signal))]" />
            <span className="label-mono text-[hsl(var(--signal))]">Full Stack & Backend</span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
            {t(
              'Construo backends que continuam rápidos quando os dados crescem. Python, Django/FastAPI, Node.js e TypeScript.',
              'I build backends that stay fast when the data grows. Python, Django/FastAPI, Node.js and TypeScript.',
            )}
          </p>
        </motion.header>

        {/* links */}
        <nav aria-label={t('Links principais', 'Main links')} className="mt-12">
          <ul className="border-t border-border">
            {items.map((item, i) => {
              const external = !item.internal;
              const Icon = external ? ArrowUpRight : ArrowRight;
              const className = `group flex items-center gap-4 px-3 py-5 transition-colors sm:px-4 ${
                item.featured
                  ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))] hover:bg-[hsl(var(--signal))]'
                  : 'hover:text-[hsl(var(--signal))]'
              }`;
              const body = (
                <>
                  <span
                    className={`w-6 shrink-0 font-display text-sm font-bold tabular-nums ${
                      item.featured ? 'text-[hsl(var(--paper))]/60' : 'text-[hsl(var(--signal))]'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-semibold tracking-tight sm:text-2xl">{item.label}</span>
                    <span
                      className={`mt-0.5 block truncate label-mono ${
                        item.featured ? 'text-[hsl(var(--paper))]/70' : 'text-muted-foreground'
                      }`}
                    >
                      {item.meta}
                    </span>
                  </span>
                  <Icon
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      external ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-1'
                    }`}
                  />
                </>
              );

              return (
                <motion.li key={item.href} {...rise(i + 1)} className="border-b border-border">
                  {item.internal ? (
                    <Link to={item.href} className={className}>{body}</Link>
                  ) : (
                    <a
                      href={item.href}
                      {...(item.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className={className}
                    >
                      {body}
                    </a>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </main>

      <footer className="mx-auto w-full max-w-[560px] px-4 pb-8 sm:px-6">
        <div className="flex items-center justify-between border-t border-border pt-5">
          <span className="label-mono text-muted-foreground">© {new Date().getFullYear()} Inácio Filho</span>
          <span className="label-mono text-muted-foreground">Coreaú · CE · BR</span>
        </div>
      </footer>
    </div>
  );
};

export default Links;
