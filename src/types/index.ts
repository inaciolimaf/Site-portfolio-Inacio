// Professional Portfolio Types - Inácio Filho

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  university: string;
  email: string;
  phone?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  credentialId?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  level?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LocaleContent {
  personal: PersonalInfo;
  about: string;
  navigation: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    certifications: string;
    contact: string;
  };
  sections: {
    hero: {
      greeting: string;
      description: string;
      cta: string;
    };
    about: {
      title: string;
      content: string;
    };
    skills: {
      title: string;
      subtitle: string;
    };
    experience: {
      title: string;
      subtitle: string;
      current: string;
    };
    projects: {
      title: string;
      subtitle: string;
      viewProject: string;
      viewGithub: string;
    };
    certifications: {
      title: string;
      subtitle: string;
      viewCredential: string;
    };
    contact: {
      title: string;
      subtitle: string;
      form: {
        name: string;
        email: string;
        subject: string;
        message: string;
        send: string;
        sending: string;
        success: string;
        error: string;
      };
    };
  };
}