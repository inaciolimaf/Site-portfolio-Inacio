import { useLocale } from '@/hooks/useLocale';
import { experiences } from '@/data/portfolio';
import { CalendarDays, MapPin, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Experience = () => {
  const { content } = useLocale();

  return (
    <section id="experience" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hero-gradient">
            {content.sections.experience.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.sections.experience.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 hidden sm:block"></div>

            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="relative mb-12 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden sm:block"></div>

                {/* Content Card */}
                <div className="card-professional p-6 ml-0 sm:ml-20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {experience.position}
                      </h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>{experience.company}</span>
                        {experience.current && (
                          <Badge variant="secondary" className="ml-2">
                            {content.sections.experience.current}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {experience.startDate} - {experience.endDate}
                      </span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};