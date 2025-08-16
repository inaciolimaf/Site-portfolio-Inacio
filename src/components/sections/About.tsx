import { useLocale } from '@/hooks/useLocale';
import { MapPin, GraduationCap } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedElements';

export const About = () => {
  const { content } = useLocale();

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hero-gradient">
              {content.sections.about.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {content.sections.about.content}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - About Text */}
            <div className="animate-slide-in-left">
              <div className="prose prose-lg max-w-none">
                {content.about.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column - Personal Info */}
            <div className="animate-slide-in-right">
              <div className="card-professional p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Detalhes Pessoais
                  </h3>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{content.personal.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{content.personal.university}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
                  <div className="text-center animate-bounce-in animate-delay-200">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={2} suffix="+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                  </div>
                  <div className="text-center animate-bounce-in animate-delay-400">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedCounter end={10} suffix="+" />
                    </div>
                    <div className="text-sm text-muted-foreground">Projetos Concluídos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};