import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocale } from '@/hooks/useLocale';

export const Header = () => {
  const { content, locale, changeLocale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigation = [
    { name: content.navigation.about, href: '#about' },
    { name: content.navigation.experience, href: '#experience' },
    { name: content.navigation.projects, href: '#projects' },
    { name: content.navigation.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* monogram */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-lg font-extrabold tracking-tight">Inácio Filho</span>
          <span className="h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[hsl(var(--signal))]" />
        </a>

        {/* desktop nav */}
        <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'} className="hidden items-center gap-8 md:flex">
          {navigation.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
            >
              <span aria-hidden="true" className="text-[hsl(var(--signal))]">{String(i + 1).padStart(2, '0')}</span>{' '}
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => changeLocale(locale === 'pt' ? 'en' : 'pt')}
            className="label-mono px-2 py-1 text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
            aria-label={content.header.toggleLanguage}
          >
            <span className={locale === 'pt' ? 'text-[hsl(var(--ink))]' : ''}>PT</span>
            <span className="mx-1 opacity-40">/</span>
            <span className={locale === 'en' ? 'text-[hsl(var(--ink))]' : ''}>EN</span>
          </button>
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={content.header.toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-nav" aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'} className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-md md:hidden">
          {navigation.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="flex items-center gap-3 py-3 font-display text-2xl font-bold"
            >
              <span className="label-mono text-[hsl(var(--signal))]">{String(i + 1).padStart(2, '0')}</span>
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
