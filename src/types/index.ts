// Professional Portfolio Types - Inácio Filho

export type LocalizedText = {
  pt: string;
  en: string;
};

export interface PersonalInfo {
  name: string;
  title: LocalizedText;
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
  position: LocalizedText;
  startDate: string;
  endDate: string;
  description: LocalizedText;
  technologies: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
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
  name: LocalizedText;
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
  header: {
    toggleLanguage: string;
    toggleMenu: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
    socials: {
      github: string;
      linkedin: string;
      instagram: string;
    };
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
      personalDetails: string;
      yearsExperience: string;
      completedProjects: string;
    };
    skills: {
      title: string;
      subtitle: string;
      categories: {
        frontend: string;
        backend: string;
        database: string;
        tools: string;
        other: string;
      };
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
      featured: string;
      newProject: string;
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
        successDescription: string;
        error: string;
      };
      letsTalk: string;
      location: string;
      socialMedia: string;
    };
  };
  notFound: {
    title: string;
    message: string;
    goHome: string;
    consoleError: string;
  };
  themeToggle: {
    switchToDark: string;
    switchToLight: string;
  };
}
