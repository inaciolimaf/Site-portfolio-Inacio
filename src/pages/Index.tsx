import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ui/AdvancedAnimations';
import { useLocale } from '@/hooks/useLocale';

const Index = () => {
  const { locale } = useLocale();
  return (
    <div key={locale} className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[hsl(var(--ink))] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[hsl(var(--paper))]"
      >
        {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>
      <ScrollProgressBar />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
