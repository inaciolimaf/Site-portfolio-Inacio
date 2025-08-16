// Portfolio Data - Inácio Filho

import { Experience, Project, Certification, Skill, SocialLinks, LocaleContent } from '@/types';

// Re-export types for convenience
export type { LocaleContent } from '@/types';

export const socialLinks: SocialLinks = {
  github: 'https://github.com/inaciofilho',
  linkedin: 'https://linkedin.com/in/inaciofilho',
  instagram: 'https://instagram.com/inaciofilho',
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  
  // Backend
  { name: 'Python', category: 'backend' },
  { name: 'Django REST Framework', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'APIs RESTful', category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', category: 'database' },
  
  // Tools & Other
  { name: 'Git', category: 'tools' },
  { name: 'Pytest', category: 'tools' },
  { name: 'IoT', category: 'other' },
  { name: 'Automação', category: 'other' },
  { name: 'Pandas', category: 'other' },
  { name: 'Selenium', category: 'other' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Ctrl+Play',
    position: {
      pt: 'Desenvolvedor de Software',
      en: 'Software Developer',
    },
    startDate: '2024-09',
    endDate: 'Atual',
    current: true,
    description: {
      pt: 'Desenvolvimento de sistemas e plataformas digitais utilizando tecnologias modernas.',
      en: 'Development of digital systems and platforms using modern technologies.',
    },
    technologies: ['Python', 'Django REST Framework', 'PostgreSQL', 'Pytest', 'Node.js', 'React.js'],
  },
  {
    id: '2',
    company: 'Loading Desenvolvimento Jr',
    position: {
      pt: 'Desenvolvedor de Software (Trainee)',
      en: 'Software Developer (Trainee)',
    },
    startDate: '2023-10',
    endDate: '2024-09',
    description: {
      pt: 'Desenvolvimento de aplicações web completas com foco em soluções escaláveis.',
      en: 'Development of complete web applications with a focus on scalable solutions.',
    },
    technologies: ['JavaScript', 'React.js', 'Node.js', 'Python', 'Django', 'HTML5', 'CSS3'],
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: {
      pt: 'AutoTech House',
      en: 'AutoTech House',
    },
    description: {
      pt: 'Sistema de Automação Residencial - Casa inteligente com sensores e atuadores, monitoramento remoto via web',
      en: 'Home Automation System - Smart home with sensors and actuators, remote monitoring via web',
    },
    startDate: '2024-04',
    endDate: '2024-08',
    technologies: ['IoT', 'Software em Tempo Real', 'Wi-Fi', 'Bluetooth'],
    github: '#',
    featured: true,
  },
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: {
      pt: 'Fundamentals of Deep Learning',
      en: 'Fundamentals of Deep Learning',
    },
    issuer: 'NVIDIA',
    date: '2024-08',
    link: '#',
  },
  {
    id: '2',
    name: {
      pt: 'TDD - Desenvolvimento de Software Guiado por Testes',
      en: 'TDD - Test-Driven Software Development',
    },
    issuer: 'Curso Técnico',
    date: '2023-08',
    link: '#',
  },
];

// Localization Content
export const ptContent: LocaleContent = {
  personal: {
    name: 'Inácio Filho',
    title: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    location: 'Fortaleza, CE - Brasil',
    university: 'Engenharia da Computação - UFC',
    email: 'inacio@exemplo.com',
  },
  about: `Desenvolvedor Full Stack apaixonado por tecnologia e inovação, graduando em Engenharia da Computação pela Universidade Federal do Ceará (UFC). Atuo na criação de soluções web completas, integrando frontend e backend com foco em performance e escalabilidade.\n\nTenho experiência sólida em desenvolvimento web utilizando Python com Django REST Framework para construção de APIs robustas, Node.js para soluções backend eficientes, e React.js para interfaces de usuário modernas e responsivas. Trabalho com bancos de dados PostgreSQL e aplico metodologias de testes automatizados com Pytest para garantir a qualidade do código.\n\nBusco constantemente aprimorar minhas habilidades técnicas e contribuir para projetos inovadores que utilizem o poder da tecnologia para resolver problemas reais.`,
  navigation: {
    home: 'Início',
    about: 'Sobre',
    skills: 'Habilidades',
    experience: 'Experiência',
    projects: 'Projetos',
    certifications: 'Certificações',
    contact: 'Contato',
  },
  header: {
    toggleLanguage: 'Mudar para Inglês',
    toggleMenu: 'Alternar menu',
  },
  sections: {
    hero: {
      greeting: 'Olá, eu sou',
      description: 'Criando soluções web completas com foco em performance e escalabilidade',
      cta: 'Ver Projetos',
    },
    about: {
      title: 'Sobre Mim',
      content: 'Desenvolvedor Full Stack apaixonado por tecnologia',
      personalDetails: 'Detalhes Pessoais',
      yearsExperience: 'Anos de Experiência',
      completedProjects: 'Projetos Concluídos',
    },
    skills: {
      title: 'Minhas Habilidades',
      subtitle: 'Tecnologias que domino e uso no dia a dia',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Banco de Dados',
        tools: 'Ferramentas',
        other: 'Outros',
      },
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Minha jornada no desenvolvimento de software',
      current: 'Atual',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos meus trabalhos recentes',
      viewProject: 'Ver Projeto',
      viewGithub: 'Ver no GitHub',
      featured: 'Destaque',
      newProject: 'Mais projetos em breve...',
    },
    certifications: {
      title: 'Certificações',
      subtitle: 'Cursos e certificações que complementam minha formação',
      viewCredential: 'Ver Certificado',
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Vamos conversar sobre seu próximo projeto',
      form: {
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto',
        message: 'Mensagem',
        send: 'Enviar Mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada com sucesso!',
        successDescription: 'Obrigado pelo contato! Retornarei em breve.',
        error: 'Erro ao enviar mensagem. Tente novamente.',
      },
      letsTalk: 'Vamos Conversar',
      location: 'Localização',
      socialMedia: 'Redes Sociais',
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Inácio Filho. Todos os direitos reservados.`,
    madeWith: 'Feito com',
    socials: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
    },
  },
  notFound: {
    title: '404',
    message: 'Oops! Página não encontrada',
    goHome: 'Voltar para o Início',
    consoleError: 'Erro 404: O usuário tentou acessar a rota inexistente:',
  },
  themeToggle: {
    switchToDark: 'Mudar para o modo escuro',
    switchToLight: 'Mudar para o modo claro',
  },
};

export const enContent: LocaleContent = {
  personal: {
    name: 'Inácio Filho',
    title: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    location: 'Fortaleza, CE - Brazil',
    university: 'Computer Engineering - UFC',
    email: 'inacio@example.com',
  },
  about: `Full Stack Developer passionate about technology and innovation, studying Computer Engineering at the Federal University of Ceará (UFC). I work on creating complete web solutions, integrating frontend and backend with focus on performance and scalability.\n\nI have solid experience in web development using Python with Django REST Framework for building robust APIs, Node.js for efficient backend solutions, and React.js for modern and responsive user interfaces. I work with PostgreSQL databases and apply automated testing methodologies with Pytest to ensure code quality.\n\nI constantly seek to improve my technical skills and contribute to innovative projects that use the power of technology to solve real problems.`,
  navigation: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    certifications: 'Certifications',
    contact: 'Contact',
  },
  header: {
    toggleLanguage: 'Switch to Portuguese',
    toggleMenu: 'Toggle menu',
  },
  sections: {
    hero: {
      greeting: 'Hello, I am',
      description: 'Creating complete web solutions focused on performance and scalability',
      cta: 'View Projects',
    },
    about: {
      title: 'About Me',
      content: 'Full Stack Developer passionate about technology',
      personalDetails: 'Personal Details',
      yearsExperience: 'Years of Experience',
      completedProjects: 'Completed Projects',
    },
    skills: {
      title: 'My Skills',
      subtitle: 'Technologies I master and use daily',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools',
        other: 'Other',
      },
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey in software development',
      current: 'Current',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      viewGithub: 'View on GitHub',
      featured: 'Featured',
      newProject: 'More projects coming soon...',
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Courses and certifications that complement my education',
      viewCredential: 'View Certificate',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s talk about your next project',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        successDescription: 'Thank you for your message! I will get back to you soon.',
        error: 'Error sending message. Please try again.',
      },
      letsTalk: 'Let\'s Talk',
      location: 'Location',
      socialMedia: 'Social Media',
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Inácio Filho. All rights reserved.`,
    madeWith: 'Made with',
    socials: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
    },
  },
  notFound: {
    title: '404',
    message: 'Oops! Page not found',
    goHome: 'Return to Home',
    consoleError: '404 Error: User attempted to access non-existent route:',
  },
  themeToggle: {
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
  },
};