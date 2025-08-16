import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { Github, Linkedin, Instagram, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const { content, locale } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 py-12 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo and Name */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-hero-gradient mb-2">
              {content.personal.name}
            </h3>
            <p className="text-muted-foreground">
              {content.personal.title[locale]}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.github && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.footer.socials.github}
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {socialLinks.linkedin && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.footer.socials.linkedin}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {socialLinks.instagram && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.footer.socials.instagram}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center space-x-2">
            <span>{content.footer.copyright}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};