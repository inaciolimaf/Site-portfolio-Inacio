// Portfolio Data - Inácio Filho

import { Experience, Project, Certification, Skill, SocialLinks, LocaleContent } from '@/types';

// Re-export types for convenience
export type { LocaleContent } from '@/types';

export const socialLinks: SocialLinks = {
  github: 'https://github.com/inaciolimaf',
  linkedin: 'https://linkedin.com/in/inaciolimaf',
  instagram: 'https://instagram.com/inaciosl',
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
  { name: 'Django', category: 'backend' },
  { name: 'Django REST Framework', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'APIs RESTful', category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', category: 'database' },
  
  // Tools & DevOps
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Pytest', category: 'tools' },
  { name: 'JWT', category: 'tools' },
  
  // AI & Other
  { name: 'AI/ML Integration', category: 'other' },
  { name: 'Llama', category: 'other' },
  { name: 'TDD', category: 'other' },
  { name: 'Microserviços', category: 'other' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Ctrl+Play',
    position: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    startDate: '2024-09',
    endDate: 'Presente',
    current: true,
    description: {
      pt: 'Desenvolvedor full stack responsável por fortalecer o sistema LMS (Learning Management System) da empresa, focando em estabilidade e performance. Implementei sistema complexo de versionamento de cursos, APIs RESTful robustas e estratégias abrangentes de testes com cobertura superior a 85%.',
      en: 'Full stack developer responsible for strengthening the company\'s LMS (Learning Management System), focusing on stability and performance. Implemented complex course versioning system, robust RESTful APIs and comprehensive testing strategies with over 85% coverage.',
    },
    technologies: ['Python', 'Django REST Framework', 'APIs RESTful', 'PostgreSQL', 'Pytest', 'Node.js', 'React.js', 'Git', 'DevOps'],
  },
  {
    id: '2',
    company: 'NUVEN',
    position: {
      pt: 'Desenvolvedor de Back End',
      en: 'Backend Developer',
    },
    startDate: '2024-01',
    endDate: '2024-12',
    description: {
      pt: 'Desenvolvedor backend especializado em soluções de inteligência artificial. Arquitetei e implementei integração completa com o modelo Llama, sistema de autenticação JWT, rate limiting e containerização com Docker. Estabeleci arquitetura escalável para múltiplas instâncias simultâneas de IA.',
      en: 'Backend developer specialized in artificial intelligence solutions. Architected and implemented complete integration with Llama model, JWT authentication system, rate limiting and Docker containerization. Established scalable architecture for multiple simultaneous AI instances.',
    },
    technologies: ['Node.js', 'Express', 'TypeScript', 'Llama', 'PostgreSQL', 'Docker', 'JWT'],
  },
  {
    id: '3',
    company: 'Loading Desenvolvimento Jr',
    position: {
      pt: 'Desenvolvedor de Software',
      en: 'Software Developer',
    },
    startDate: '2023-06',
    endDate: '2023-12',
    description: {
      pt: 'Trainee em desenvolvimento web full-stack, participando de projetos reais em ambiente de aprendizado estruturado. Desenvolvi aplicações web completas, interfaces responsivas e APIs para comunicação entre sistemas, seguindo boas práticas e metodologias ágeis.',
      en: 'Full-stack web development trainee, participating in real projects in a structured learning environment. Developed complete web applications, responsive interfaces and APIs for system communication, following best practices and agile methodologies.',
    },
    technologies: ['JavaScript', 'React.js', 'Node.js', 'Python', 'Django', 'HTML5', 'CSS3', 'Git'],
  },
];

export const projects: Project[] = [
  {
    id: '1',
    name: {
      pt: 'VisaoSISU',
      en: 'VisaoSISU',
    },
    description: {
      pt: 'Site para visualização das notas de corte anteriores do SISU, facilitando a consulta histórica para estudantes.',
      en: 'Website for viewing previous SISU cutoff scores, facilitating historical consultation for students.',
    },
    startDate: '2024',
    endDate: '2024',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/inaciolimaf/VisaoSISU',
    featured: true,
  },
  {
    id: '2',
    name: {
      pt: 'Sisu-Dados',
      en: 'Sisu-Dados',
    },
    description: {
      pt: 'Script Python para consumir a API do SISU e armazenar os dados de forma estruturada.',
      en: 'Python script to consume SISU API and store data in a structured way.',
    },
    startDate: '2024',
    endDate: '2024',
    technologies: ['Python', 'API', 'Data Processing'],
    github: 'https://github.com/inaciolimaf/Sisu-Dados',
    featured: true,
  },
  {
    id: '3',
    name: {
      pt: 'Microdados-Enem',
      en: 'Microdados-Enem',
    },
    description: {
      pt: 'Análise dos microdados do ENEM criando relação entre número de questões acertadas e a nota final.',
      en: 'Analysis of ENEM microdata creating relationship between number of correct answers and final score.',
    },
    startDate: '2024',
    endDate: '2024',
    technologies: ['Python', 'Data Analysis', 'Pandas'],
    github: 'https://github.com/inaciolimaf/Microdados-Enem',
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
    date: '2024',
    link: '#',
  },
  {
    id: '2',
    name: {
      pt: 'TDD – Desenvolvimento de Software Guiado por Testes',
      en: 'TDD – Test-Driven Software Development',
    },
    issuer: 'Instituto Tecnológico de Aeronáutica (Coursera)',
    date: '2023-08',
    link: 'https://www.coursera.org/account/accomplishments/verify/U7SSCUEEM2K2',
  },
];

// Localization Content
export const ptContent: LocaleContent = {
  personal: {
    name: 'Inácio Filho',
    title: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    location: 'Coreaú, Ceará - Brasil',
    university: 'Engenharia da Computação - UFC',
    email: 'inaciofilho.lima@gmail.com',
  },
  about: `Desenvolvedor Full Stack desde 2023, especializado em arquiteturas backend de alta performance e integração de inteligência artificial. Com mais de 3 projetos enterprise entregues e 100% de entregas no prazo, minha expertise inclui Python/Django, Node.js/TypeScript, React.js e PostgreSQL.\n\nFoco em código limpo, testes automatizados e arquiteturas bem estruturadas. Desenvolvo APIs RESTful robustas e escaláveis, sistemas LMS complexos com versionamento avançado e cobertura de testes superior a 85%.\n\nGraduando em Engenharia da Computação pela Universidade Federal do Ceará, sempre em busca de soluções inovadoras que utilizem tecnologia para resolver problemas reais.`,
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
      description: 'Desenvolvedor Full Stack | Backend Specialist | Graduado em Engenharia da Computação',
      cta: 'Ver Projetos',
    },
    about: {
      title: 'Sobre Mim',
      content: 'Desenvolvedor Full Stack especializado em soluções escaláveis',
      personalDetails: 'Detalhes Pessoais',
      yearsExperience: 'Anos de Experiência',
      completedProjects: 'Projetos Concluídos',
    },
    skills: {
      title: 'Principais Competências',
      subtitle: 'Tecnologias que domino e uso para criar soluções robustas',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Banco de Dados',
        tools: 'Ferramentas & DevOps',
        other: 'IA & Outros',
      },
    },
    experience: {
      title: 'Experiência Profissional',
      subtitle: 'Minha jornada no desenvolvimento de soluções enterprise',
      current: 'Atual',
    },
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos meus trabalhos em GitHub',
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
      title: 'Vamos Conversar?',
      subtitle: 'Entre em contato para discutir seu próximo projeto',
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
    location: 'Coreaú, Ceará - Brazil',
    university: 'Computer Engineering - UFC',
    email: 'inaciofilho.lima@gmail.com',
  },
  about: `Full Stack Developer since 2023, specialized in high-performance backend architectures and artificial intelligence integration. With over 3 enterprise projects delivered and 100% on-time delivery, my expertise includes Python/Django, Node.js/TypeScript, React.js and PostgreSQL.\n\nFocusing on clean code, automated testing and well-structured architectures. I develop robust and scalable RESTful APIs, complex LMS systems with advanced versioning and test coverage over 85%.\n\nStudying Computer Engineering at the Federal University of Ceará, always seeking innovative solutions that use technology to solve real problems.`,
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
      description: 'Full Stack Developer | Backend Specialist | Computer Engineering Graduate',
      cta: 'View Projects',
    },
    about: {
      title: 'About Me',
      content: 'Full Stack Developer specialized in scalable solutions',
      personalDetails: 'Personal Details',
      yearsExperience: 'Years of Experience',
      completedProjects: 'Completed Projects',
    },
    skills: {
      title: 'Core Competencies',
      subtitle: 'Technologies I master and use to create robust solutions',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools & DevOps',
        other: 'AI & Other',
      },
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey in developing enterprise solutions',
      current: 'Current',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some of my work on GitHub',
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
      title: 'Let\'s Talk?',
      subtitle: 'Get in touch to discuss your next project',
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