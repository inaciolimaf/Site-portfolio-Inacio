import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { Mail, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Contact = () => {
  const { content } = useLocale();

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hero-gradient">
            {content.sections.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.sections.contact.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-1 gap-12">
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <div className="card-professional p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">{content.sections.contact.letsTalk}</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-slide-in-left animate-delay-100">
                  <div className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors hover:scale-110 duration-300">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{content.sections.contact.form.email}</p>
                    <p className="text-muted-foreground">{content.personal.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 animate-slide-in-left animate-delay-200">
                  <div className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors hover:scale-110 duration-300">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{content.sections.contact.location}</p>
                    <p className="text-muted-foreground">{content.personal.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 animate-fade-in animate-delay-300">
                <h4 className="font-semibold mb-4">{content.sections.contact.socialMedia}</h4>
                <div className="flex space-x-4">
                  {socialLinks.github && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                    >
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.linkedin && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                    >
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.instagram && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                    >
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};