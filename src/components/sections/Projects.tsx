import { useLocale } from '@/hooks/useLocale';
import { projects } from '@/data/portfolio';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Projects = () => {
  const { content, locale } = useLocale();

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hero-gradient">
            {content.sections.projects.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.sections.projects.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`card-professional p-6 group hover:scale-105 transition-all duration-500 animate-rotate-in hover-gradient w-full ${
                project.featured ? 'ring-2 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500">
                <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">🏠</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.name[locale]}
                  </h3>
                  {project.featured && (
                    <Badge variant="secondary">{content.sections.projects.featured}</Badge>
                  )}
                </div>

                <p className="text-foreground/80 leading-relaxed">
                  {project.description[locale]}
                </p>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3 pt-4">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <Github className="h-4 w-4" />
                        <span>{content.sections.projects.viewGithub}</span>
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      className="flex-1 btn-primary"
                      size="sm"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>{content.sections.projects.viewProject}</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};