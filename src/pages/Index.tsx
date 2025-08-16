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
  const { locale, content } = useLocale();
  console.log("Index.tsx - Current locale:", locale);
  console.log("Index.tsx - Current content (hero greeting):", content.sections.hero.greeting);
  return (
    <div key={locale} className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Header />
      <main>
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
