// Portfolio Data - Inácio Filho

import { Experience, Project, Certification, Skill, SocialLinks, LocaleContent } from '@/types';

// Re-export types for convenience
export type { LocaleContent } from '@/types';

export const socialLinks: SocialLinks = {
  github: 'https://github.com/inaciolimaf',
  linkedin: 'https://linkedin.com/in/inaciolimaf',
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
  { name: 'FastAPI', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'APIs RESTful', category: 'backend' },

  // Database
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Redis', category: 'database' },

  // Tools & DevOps
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Terraform', category: 'tools' },
  { name: 'Google Cloud', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Pytest', category: 'tools' },
  { name: 'JWT', category: 'tools' },

  // AI & Other
  { name: 'LLMs em produção', category: 'other' },
  { name: 'LangGraph', category: 'other' },
  { name: 'Llama', category: 'other' },
  { name: 'TDD', category: 'other' },
  { name: 'Microserviços', category: 'other' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Grupo Boticário',
    branch: 'boticario',
    highlights: [
      { type: 'ci', message: { pt: 'testes do pipeline de 12 para 5 min', en: 'pipeline test run from 12 to 5 min' }, game: 'pipeline' },
      { type: 'perf', message: { pt: 'dashboard principal 35% mais rápido (SSR + queries)', en: 'main dashboard 35% faster (SSR + queries)' } },
      { type: 'feat', message: { pt: '20+ endpoints e telas usados todo dia pelas lojas', en: '20+ endpoints and screens used daily by stores' } },
    ],
    position: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    startDate: '2026-04',
    endDate: 'Presente',
    current: true,
    description: {
      pt: 'Ferramentas internas para a rede de franquias e varejo: features web com Next.js/TypeScript e Node.js/Express, e serviços Python/FastAPI para processamento de dados e integrações. Entreguei 20+ endpoints e telas usados diariamente pelas lojas, reduzi em 35% o tempo de carregamento do dashboard principal (SSR + otimização de queries) e baixei o tempo de testes do pipeline de 12 para 5 minutos.',
      en: 'Internal tools for the franchise and retail network: web features with Next.js/TypeScript and Node.js/Express, plus Python/FastAPI services for data processing and integrations. Delivered 20+ endpoints and screens used daily by stores, cut the main dashboard load time by 35% (SSR + query optimization) and brought the pipeline test run down from 12 to 5 minutes.',
    },
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'CI/CD'],
  },
  {
    id: '2',
    company: 'CNA+',
    branch: 'cna-plus',
    highlights: [
      { type: 'test', message: { pt: 'cobertura de testes de ~40% para 85%+', en: 'test coverage from ~40% to 85%+' } },
      { type: 'perf', message: { pt: 'endpoints p95 de 1,8 s para 350 ms', en: 'endpoints p95 from 1.8 s to 350 ms' }, game: 'p95' },
      { type: 'feat', message: { pt: 'versionamento de cursos com rollback em 1 clique', en: 'course versioning with one-click rollback' } },
    ],
    position: {
      pt: 'Desenvolvedor Full Stack',
      en: 'Full Stack Developer',
    },
    startDate: '2024-09',
    endDate: '2026-04',
    description: {
      pt: 'Evoluí o LMS usado por 30.000+ alunos ativos. Projetei o sistema de versionamento de cursos (histórico completo e rollback em um clique), lançado sem downtime. Levei os principais endpoints de 1,8 s para 350 ms (p95) corrigindo N+1, criando índices e cache com Redis, e subi a cobertura de testes de ~40% para mais de 85% com Pytest, reduzindo bugs críticos em ~60%.',
      en: 'Evolved the LMS used by 30,000+ active students. Designed the course versioning system (full history and one-click rollback), shipped with zero downtime. Took the main course endpoints from 1.8 s to 350 ms (p95) by fixing N+1 queries, adding indexes and Redis caching, and raised test coverage from ~40% to over 85% with Pytest, cutting critical bugs by ~60%.',
    },
    technologies: ['Python', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Pytest', 'Node.js', 'React.js', 'Docker'],
  },
  {
    id: '3',
    company: 'NUVEN',
    branch: 'nuven',
    highlights: [
      { type: 'ops', message: { pt: '~5.000 req/dia com 99,5% de uptime', en: '~5,000 req/day at 99.5% uptime' } },
      { type: 'perf', message: { pt: 'cache reduziu 40% do tempo de resposta', en: 'caching cut response time by 40%' } },
      { type: 'feat', message: { pt: 'API Node/TS na frente da inferência Llama', en: 'Node/TS API in front of Llama inference' } },
    ],
    position: {
      pt: 'Desenvolvedor Back End',
      en: 'Backend Developer',
    },
    startDate: '2024-01',
    endDate: '2024-12',
    description: {
      pt: 'Integração com o modelo Llama para automatizar processos de negócio: API Node.js/Express em TypeScript na frente de um serviço de inferência Python/FastAPI, com autenticação JWT, rate limiting por cliente e cache de respostas. Em produção, ~5.000 requisições/dia com 99,5% de uptime; o cache reduziu em 40% o tempo médio de resposta.',
      en: 'Llama model integration to automate business processes: a Node.js/Express TypeScript API in front of a Python/FastAPI inference service, with JWT auth, per-client rate limiting and response caching. In production it handled ~5,000 requests/day at 99.5% uptime; caching cut average response time by 40%.',
    },
    technologies: ['Node.js', 'Express', 'TypeScript', 'Python', 'FastAPI', 'Llama', 'PostgreSQL', 'Docker', 'JWT'],
  },
  {
    id: '4',
    company: 'Loading Desenvolvimento Jr',
    branch: 'loading-jr',
    highlights: [
      { type: 'chore', message: { pt: 'de tarefas guiadas a dono de features', en: 'from guided tasks to owning features' } },
      { type: 'feat', message: { pt: '4 projetos de clientes entregues', en: '4 client projects delivered' } },
    ],
    position: {
      pt: 'Desenvolvedor de Software Trainee',
      en: 'Software Developer Trainee',
    },
    startDate: '2023-06',
    endDate: '2023-12',
    description: {
      pt: 'Aplicações web completas para clientes reais, com React.js no front e Node.js/Express e Django no back, em um time de 6 pessoas com code review e Scrum. Entreguei 4 projetos de clientes e passei de tarefas guiadas a ser dono de features de ponta a ponta.',
      en: 'Complete web applications for real clients, with React.js on the front end and Node.js/Express and Django on the back end, in a team of 6 with code review and Scrum. Delivered 4 client projects and moved from guided tasks to owning features end to end.',
    },
    technologies: ['JavaScript', 'React.js', 'Node.js', 'Express', 'Python', 'Django', 'HTML5', 'CSS3', 'Git'],
  },
];

export const projects: Project[] = [
  {
    id: 'inkstave',
    name: {
      pt: 'Inkstave',
      en: 'Inkstave',
    },
    description: {
      pt: 'Editor LaTeX colaborativo em tempo real (CRDTs) com compilação a PDF via Tectonic e um agente de escrita com IA que localiza seções e propõe edições revisáveis. Arquitetura própria, do zero, inspirada no Overleaf.',
      en: 'Real-time collaborative LaTeX editor (CRDTs) with PDF compilation via Tectonic and an AI writing agent that locates sections and proposes reviewable edits. A from-scratch architecture inspired by Overleaf.',
    },
    startDate: '2026',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React', 'LangGraph', 'Docker'],
    github: 'https://github.com/inaciolimaf/inkstave',
    demo: 'https://inkstave.inaciof.com',
    image: '/projects/inkstave.jpg',
    caseStudy: '/inkstave',
    featured: true,
  },
  {
    id: 'quadro-publico',
    name: {
      pt: 'Quadro Público',
      en: 'Quadro Público',
    },
    description: {
      pt: 'Portal de transparência de servidores municipais: coleta automática de contracheques e cargos do portal do governo, sincronização a cada 24h e visualização em tabelas e gráficos de remuneração.',
      en: 'Transparency portal for municipal public servants: automatic scraping of payslips and roles from the government portal, 24h sync, and pay data shown in tables and charts.',
    },
    startDate: '2026',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    github: 'https://github.com/inaciolimaf/QuadroPublico',
    demo: 'https://quadro-publico.inaciof.com',
    image: '/projects/quadro-publico.jpg',
    featured: true,
  },
  {
    id: 'leitores-competentes',
    name: {
      pt: 'Leitores Competentes',
      en: 'Leitores Competentes',
    },
    description: {
      pt: 'Gerador de questões de leitura com IA para o 3º ano do Ensino Fundamental, alinhado aos descritores da avaliação diagnóstica. Backend em Python que orquestra o LLM e busca de contexto para produzir textos e questões.',
      en: 'AI-powered reading comprehension question generator for 3rd-grade students, aligned to diagnostic-assessment descriptors. A Python backend orchestrates the LLM and context search to produce texts and questions.',
    },
    startDate: '2026',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'IA/LLM', 'Docker'],
    github: 'https://github.com/inaciolimaf/leitores-competentes',
    demo: 'https://leitores-competentes.inaciof.com',
    image: '/projects/leitores-competentes.jpg',
    featured: true,
  },
  {
    id: 'visao-sisu',
    name: {
      pt: 'VisaoSISU',
      en: 'VisaoSISU',
    },
    description: {
      pt: 'Site para visualização das notas de corte anteriores do SISU, facilitando a consulta histórica para estudantes.',
      en: 'Website for viewing previous SISU cutoff scores, making historical consultation easier for students.',
    },
    startDate: '2024',
    endDate: '2024',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/inaciolimaf/VisaoSISU',
  },
];

export const certifications: Certification[] = [
  {
    id: 'gcp-pcd',
    name: {
      pt: 'Google Cloud Certified Professional Cloud Developer',
      en: 'Google Cloud Certified Professional Cloud Developer',
    },
    issuer: 'Google Cloud',
    date: '2026-08',
    link: 'https://www.credly.com/badges/91472da7-9b3f-4adf-8138-61f9feb0fab0/linked_in?t=tjshv6',
  },
  {
    id: 'aws-ccp',
    name: {
      pt: 'AWS Certified Cloud Practitioner',
      en: 'AWS Certified Cloud Practitioner',
    },
    issuer: 'Amazon Web Services',
    date: '2026',
    link: '#',
  },
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
    title: { pt: 'Engenheiro de Software Full Stack & Backend', en: 'Full Stack & Backend Software Engineer' },
    location: 'Coreaú, Ceará - Brasil',
    university: 'Engenharia da Computação - UFC',
    email: 'inaciofilho.lima@gmail.com',
  },
  about: `Construo backends que continuam rápidos quando os dados crescem. Principalmente Python e Django/FastAPI, e Node.js com TypeScript quando o trabalho pede. Hoje sou desenvolvedor full stack no Grupo Boticário, criando ferramentas internas para a rede de franquias com Next.js, Node.js e FastAPI.\n\nAntes, no CNA+, criei o sistema de versionamento de cursos do LMS usado por mais de 30 mil alunos, levei os principais endpoints de 1,8 s para 350 ms e mantive a cobertura de testes acima de 85%. Na NUVEN, coloquei um modelo Llama em produção atrás de uma API autenticada e com rate limiting, atendendo cerca de 5.000 requisições por dia.\n\nNo tempo livre construo projetos como o Inkstave, um editor LaTeX colaborativo em tempo real com agente de escrita por IA. Formado pela Universidade Federal do Ceará e certificado Google Cloud Professional Cloud Developer.`,
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
      description: 'Full Stack & Backend | Python, Django, FastAPI, Node.js, TypeScript | LLMs em produção',
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
    title: { pt: 'Engenheiro de Software Full Stack & Backend', en: 'Full Stack & Backend Software Engineer' },
    location: 'Coreaú, Ceará - Brazil',
    university: 'Computer Engineering - UFC',
    email: 'inaciofilho.lima@gmail.com',
  },
  about: `I build backends that stay fast when the data grows. Python and Django/FastAPI mostly, Node.js and TypeScript when the job calls for it. Today I'm a full stack developer at Grupo Boticário, building internal tools for the franchise network with Next.js, Node.js and FastAPI.\n\nBefore that, at CNA+, I built the course versioning system of an LMS used by 30,000+ students, cut the main endpoints from 1.8 s to 350 ms and kept test coverage above 85%. At NUVEN, I put a Llama model in production behind an authenticated, rate-limited API handling around 5,000 requests a day.\n\nOn the side I build things like Inkstave, a real-time collaborative LaTeX editor with an AI writing agent. Graduated from the Federal University of Ceará and Google Cloud Certified Professional Cloud Developer.`,
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
      description: 'Full Stack & Backend | Python, Django, FastAPI, Node.js, TypeScript | LLMs in production',
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