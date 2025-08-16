import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/data/portfolio';
import { Mail, MapPin, Github, Linkedin, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/AnimatedElements';
import type { ContactForm } from '@/types';

export const Contact = () => {
  const { content } = useLocale();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: content.sections.contact.form.success,
        description: "Obrigado pelo contato! Retornarei em breve.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: content.sections.contact.form.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <div className="card-professional p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Vamos Conversar</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-slide-in-left animate-delay-100">
                  <div className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors hover:scale-110 duration-300">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{content.personal.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 animate-slide-in-left animate-delay-200">
                  <div className="bg-primary/10 p-3 rounded-lg hover:bg-primary/20 transition-colors hover:scale-110 duration-300">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-muted-foreground">{content.personal.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 animate-fade-in animate-delay-300">
                <h4 className="font-semibold mb-4">Redes Sociais</h4>
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

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <div className="card-professional p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {content.sections.contact.form.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {content.sections.contact.form.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {content.sections.contact.form.subject}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {content.sections.contact.form.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-3">
                      <LoadingSpinner className="w-5 h-5" />
                      <span>{content.sections.contact.form.sending}</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>{content.sections.contact.form.send}</span>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};