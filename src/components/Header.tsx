import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocale, Locale } from '@/hooks/useLocale';

export const Header = () => {
  const { content, locale, changeLocale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: content.navigation.home, href: '#home' },
    { name: content.navigation.about, href: '#about' },
    { name: content.navigation.skills, href: '#skills' },
    { name: content.navigation.experience, href: '#experience' },
    { name: content.navigation.projects, href: '#projects' },
    { name: content.navigation.certifications, href: '#certifications' },
    { name: content.navigation.contact, href: '#contact' },
  ];

  const handleLanguageToggle = () => {
    changeLocale(locale === 'pt' ? 'en' : 'pt');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="text-2xl font-bold text-hero-gradient hover:opacity-80 transition-opacity"
            >
              {content.personal.name}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              className="h-10 w-10 hover:bg-secondary/80"
              aria-label={content.header.toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              className="h-10 w-10"
              aria-label={content.header.toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10"
              aria-label={content.header.toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-md transition-all"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};