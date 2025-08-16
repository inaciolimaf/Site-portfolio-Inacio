import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { ParticleBackground, TypewriterText, AnimatedCounter } from '@/components/ui/AnimatedElements';

export const Hero = () => {
  const { content } = useLocale();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
  <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Particle Background */}
    <ParticleBackground count={30} />
    
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float animate-pulse-slow"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '3s'}}></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        
        <div className="animate-fade-in">
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            <TypewriterText 
              text={content.sections.hero.greeting}
              speed={100}
              hideCursorAfter={true}
            />
          </p>
        </div>

        <div className="animate-scale-in animate-delay-300">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-hero-gradient animate-glow">
              {content.personal.name}
            </span>
          </h1>
        </div>

        <div className="animate-bounce-in animate-delay-500">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6 text-shimmer">
            {content.personal.title}
          </h2>
        </div>
        <div className="animate-slide-in-left animate-delay-700">
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {content.sections.hero.description}
          </p>
        </div>
        <div className="animate-zoom-in animate-delay-800">
          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-bounce-in animate-delay-800"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 hover:border-primary hover:text-primary transition-all duration-300 group-hover:scale-110 hover-glow hover-rotate"
                >
                  <Github className="h-6 w-6" />
                </Button>
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-bounce-in animate-delay-1000"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 hover:border-primary hover:text-primary transition-all duration-300 group-hover:scale-110 hover-glow hover-rotate"
                >
                  <Linkedin className="h-6 w-6" />
                </Button>
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group animate-bounce-in animate-delay-1200"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 hover:border-primary hover:text-primary transition-all duration-300 group-hover:scale-110 hover-glow hover-rotate"
                >
                  <Instagram className="h-6 w-6" />
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="animate-zoom-in animate-delay-1400">
          <Button
            onClick={() => scrollToSection('#projects')}
            className="btn-primary text-lg px-8 py-3 h-auto hover-lift"
          >
            {content.sections.hero.cta}
          </Button>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 transform -translate-x-1/2 animate-bounce animate-delay-1600">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scrollToSection('#about')}
        className="h-12 w-12 rounded-full hover:bg-primary/10 animate-wave"
      >
        <ArrowDown className="h-6 w-6" />
      </Button>
    </div>
  </section>
);
}