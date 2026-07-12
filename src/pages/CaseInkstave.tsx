import { useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

const LIVE = 'https://inkstave.inaciof.com';
const REPO = 'https://github.com/inaciolimaf/inkstave';

const STACK = [
  'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Redis', 'ARQ',
  'Yjs + pycrdt (CRDT)', 'Tectonic', 'LangGraph', 'OpenRouter', 'JWT',
  'React', 'TypeScript', 'Tailwind', 'CodeMirror 6', 'PDF.js', 'Docker', 'Playwright',
];

const CaseInkstave = () => {
  const { locale, changeLocale } = useLocale();
  const t = (pt: string, en: string) => (locale === 'pt' ? pt : en);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Inkstave — ' + t('Estudo de caso', 'Case study') + ' · Inácio Filho';
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = [
    { v: '5', l: t('dias, do zero ao deploy', 'days, from zero to deploy') },
    { v: '104', l: t('specs em Markdown', 'Markdown specs') },
    { v: '23', l: t('agentes em paralelo', 'agents in parallel') },
    { v: '<2 min', l: t('toda a suíte de testes', 'full test suite') },
    { v: 'R$0', l: t('por mês em produção', 'a month in production') },
  ];

  const pipeline = [
    {
      t: t('Deixe a IA entrevistar', 'Let the AI interview you'),
      d: t('Antes de gerar qualquer coisa, a IA me fazia perguntas para travar o escopo e as decisões difíceis de reverter.',
           'Before generating anything, the AI interviewed me to lock the scope and the hard-to-reverse decisions.'),
    },
    {
      t: t('Specs em Markdown', 'Specs in Markdown'),
      d: t('Dezenas de specs geradas em paralelo — começou com 60 e cresceu para 104, com uma spec de refatoração a cada cinco.',
           'Dozens of specs generated in parallel — it started at 60 and grew to 104, with a refactoring spec every fifth.'),
    },
    {
      t: t('Implementar em sequência', 'Build in sequence'),
      d: t('Um /loop implementava spec a spec usando um PROGRESS.md como cursor, sempre com os testes verdes antes de concluir.',
           'A /loop implemented spec by spec using a PROGRESS.md cursor, always green before marking done.'),
    },
    {
      t: t('Paralelismo disjunto', 'Disjoint parallelism'),
      d: t('Nos fix-packs, 23 subagentes rodaram ao mesmo tempo — cada um tocando arquivos diferentes, garantido ao escrever as specs.',
           'For the fix-packs, 23 sub-agents ran at once — each touching different files, guaranteed when the specs were written.'),
    },
    {
      t: t('Validação adversarial', 'Adversarial validation'),
      d: t('Um agente revisava cada spec; depois três reverificadores tentavam provar que cada bug era falso positivo antes de corrigir.',
           'One agent reviewed each spec; then three re-verifiers tried to prove each bug was a false positive before any fix.'),
    },
    {
      t: t('Qualidade também é spec', 'Quality is a spec too'),
      d: t('Code smells viravam novas specs de refatoração, e nenhum arquivo passava de 300 linhas.',
           'Code smells became new refactoring specs, and no file was allowed past 300 lines.'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* minimal top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 sm:px-10">
          <Link to="/" className="group flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Inácio Filho
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => changeLocale(locale === 'pt' ? 'en' : 'pt')}
              className="label-mono px-2 py-1 text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]"
              aria-label={t('Mudar para inglês', 'Switch to Portuguese')}
            >
              <span className={locale === 'pt' ? 'text-[hsl(var(--ink))]' : ''}>PT</span>
              <span className="mx-1 opacity-40">/</span>
              <span className={locale === 'en' ? 'text-[hsl(var(--ink))]' : ''}>EN</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 pb-24 sm:px-10">
        {/* hero */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="h-px w-10 bg-[hsl(var(--signal))]" />
            <span className="label-mono text-[hsl(var(--signal))]">
              {t('Estudo de caso — 2026', 'Case study — 2026')}
            </span>
            <span className="label-mono text-muted-foreground">{t('Open source · MIT', 'Open source · MIT')}</span>
          </div>

          <h1 className="font-display text-6xl font-bold tracking-tight sm:text-8xl">Inkstave</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground/80 sm:text-2xl">
            {t('Um editor de LaTeX colaborativo em tempo real, com um agente de escrita por IA — construído do zero orquestrando agentes com um método spec-driven.',
               'A real-time collaborative LaTeX editor with a built-in AI writing agent — built from scratch by orchestrating agents with a spec-driven method.')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="label-mono text-muted-foreground">
              {t('Solo · Full-stack + Arquitetura', 'Solo · Full-stack + Architecture')}
            </span>
            <a href={LIVE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 label-mono transition-colors hover:text-[hsl(var(--signal))]">
              {t('Ver ao vivo', 'View live')} <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--signal))]">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <Reveal className="mt-12">
            <img
              src="/projects/inkstave.jpg"
              alt={t('Landing do Inkstave', 'Inkstave landing page')}
              className="w-full rounded-sm border border-border"
            />
          </Reveal>
        </section>

        {/* stats */}
        <section className="grid grid-cols-2 gap-8 border-b border-border py-12 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl font-bold tracking-tight text-[hsl(var(--signal))] sm:text-5xl">{s.v}</div>
              <div className="mt-2 text-sm leading-snug text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </section>

        <Prose label={t('Visão geral', 'Overview')} title={t('O que é', 'What it is')}>
          <p>{t(
            'Inkstave é um editor de LaTeX colaborativo em tempo real, open source, com um agente de escrita por IA embutido. Você edita no navegador, compila para PDF em um clique, escreve junto com outras pessoas no mesmo documento e tem um histórico de versões completo.',
            'Inkstave is an open-source, real-time collaborative LaTeX editor with a built-in AI writing agent. You edit in the browser, compile to PDF in one click, write alongside other people in the same document, and get a full version history.',
          )}</p>
          <p>{t(
            'Foi construído do zero — inspirado no Overleaf Community Edition apenas como referência de arquitetura, sem reaproveitar uma linha de código. O Overleaf é AGPL; o Inkstave é MIT.',
            'It was built from scratch — inspired by Overleaf Community Edition only as an architectural reference, without reusing a single line of code. Overleaf is AGPL; Inkstave is MIT.',
          )}</p>
        </Prose>

        <Prose label={t('O desafio', 'The challenge')} title={t('Não era só fazer um editor', 'Not just building an editor')}>
          <p>{t(
            'O objetivo era provar um jeito de construir software: transformar o sistema inteiro em texto versionável antes de virar código, e orquestrar agentes de IA para implementar, revisar e corrigir — sempre dentro de trilhos que eu definia.',
            'The goal was to prove a way to build software: turn the whole system into versionable text before it becomes code, and orchestrate AI agents to implement, review and fix — always inside rails I defined.',
          )}</p>
          <p className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">{t(
            'O ser humano decide o quê e as regras; a IA faz o como, em escala.',
            'The human decides the what and the rules; the AI does the how, at scale.',
          )}</p>
        </Prose>

        {/* method */}
        <Prose label={t('Método', 'Method')} title={t('Spec-driven, orquestrando agentes', 'Spec-driven, orchestrating agents')}>
          <p>{t(
            'Em vez de pedir função por função, quebrei o sistema em 104 specs em Markdown. Cada spec é uma pasta com o prompt para o agente implementador e um spec.md detalhado: modelo de dados, contratos, critérios de aceite e plano de testes. O código é a consequência da spec, não o contrário.',
            'Instead of asking function by function, I broke the system into 104 Markdown specs. Each spec is a folder with the prompt for the implementing agent and a detailed spec.md: data model, contracts, acceptance criteria and a test plan. Code is the consequence of the spec, not the other way around.',
          )}</p>
        </Prose>

        <ol className="mb-20 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {pipeline.map((step, i) => (
            <Reveal key={i} className="bg-background">
              <li className="flex h-full gap-4 p-6">
                <span className="font-display text-2xl font-bold tabular-nums text-[hsl(var(--signal))]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{step.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Callout>
          <span className="label-mono text-[hsl(var(--signal))]">{t('A restrição que moldou tudo', 'The constraint that shaped everything')}</span>
          <p className="mt-3 text-lg leading-relaxed sm:text-xl">{t(
            'Uma regra aparentemente boba — a suíte inteira tinha que rodar em menos de 2 minutos — forçou todo trabalho pesado (compilar LaTeX, rodar o LLM) para filas assíncronas. No fim, a arquitetura ficou melhor por causa da restrição.',
            'A seemingly silly rule — the whole test suite had to run in under 2 minutes — forced every heavy task (compiling LaTeX, running the LLM) into async queues. In the end, the architecture got better because of the constraint.',
          )}</p>
        </Callout>

        {/* collaboration + agent */}
        <Prose label={t('Colaboração & IA', 'Collaboration & AI')} title={t('Escrito a várias mãos, revisado com cuidado', 'Written by many hands, reviewed with care')}>
          <p>{t(
            'Duas ou mais pessoas editam o mesmo .tex ao vivo, com presença e cursores, usando CRDTs (Yjs no navegador, pycrdt no servidor) e papéis de dono, editor e leitor.',
            'Two or more people edit the same .tex live, with presence and cursors, using CRDTs (Yjs in the browser, pycrdt on the server) and owner / editor / viewer roles.',
          )}</p>
          <p>{t(
            'O agente de IA localiza seções ("a introdução"), pesquisa o projeto e propõe edições como diffs revisáveis — nada é aplicado sem a sua aprovação. Em produção ele tem guarda-corpos: limite de iterações, timeouts, orçamento diário de custo e cancelamento.',
            'The AI agent locates sections ("the introduction"), searches the project and proposes edits as reviewable diffs — nothing is applied without your approval. In production it has guardrails: iteration limits, timeouts, a daily cost budget and cancellation.',
          )}</p>
        </Prose>

        <div className="mb-20 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <figure>
              <img src="/projects/inkstave-collab.jpg" alt={t('Edição colaborativa em tempo real', 'Real-time collaborative editing')} className="w-full rounded-sm border border-border" />
              <figcaption className="mt-2 label-mono text-muted-foreground">{t('Cursores e presença ao vivo', 'Live cursors and presence')}</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <figure>
              <img src="/projects/inkstave-features.jpg" alt={t('Compilação, PDF e diff da IA', 'Compile, PDF and AI diff')} className="w-full rounded-sm border border-border" />
              <figcaption className="mt-2 label-mono text-muted-foreground">{t('Compilar, pré-visualizar e o diff do agente', 'Compile, preview and the agent diff')}</figcaption>
            </figure>
          </Reveal>
        </div>

        {/* architecture */}
        <Prose label={t('Arquitetura', 'Architecture')} title={t('Uma imagem, três papéis', 'One image, three roles')}>
          <p>{t(
            'A mesma imagem de backend roda três papéis — a API (FastAPI), o worker de jobs assíncronos (ARQ) e o WebSocket de colaboração — sobre Postgres e Redis. O LaTeX compila com Tectonic; o agente usa LangGraph com o SDK da OpenAI apontado para o OpenRouter, trocável por injeção de dependência.',
            'The same backend image runs three roles — the API (FastAPI), the async job worker (ARQ) and the collaboration WebSocket — over Postgres and Redis. LaTeX compiles with Tectonic; the agent uses LangGraph with the OpenAI SDK pointed at OpenRouter, swappable via dependency injection.',
          )}</p>
        </Prose>

        <ul className="mb-20 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <li key={s} className="rounded-sm border border-border px-3 py-1.5 label-mono text-muted-foreground">{s}</li>
          ))}
        </ul>

        {/* security */}
        <Prose label={t('Segurança', 'Security')} title={t('Compilação em sandbox descartável', 'Compiling in a throwaway sandbox')}>
          <p>{t(
            'Para rodar aberto ao público, cada compilação acontece em um contêiner gVisor descartável: sem rede, root somente leitura, todas as capabilities dropadas, cotas de CPU e memória e um limite diário por usuário. Dados do usuário nunca entram nos argumentos de lançamento, e as ferramentas do agente não têm saída de rede.',
            'To run open to the public, every compile happens in a throwaway gVisor container: no network, read-only root, all capabilities dropped, CPU and memory quotas and a per-user daily limit. User data never reaches the launch arguments, and the agent tools have no network egress.',
          )}</p>
        </Prose>

        {/* deploy */}
        <Prose label={t('Deploy', 'Deploy')} title={t('No ar por R$ 0 por mês', 'Shipped for R$ 0 a month')}>
          <p>{t(
            'Do código ao site com HTTPS, R$ 0 por mês. Roda numa máquina ARM do tier gratuito da Oracle Cloud (4 vCPUs, 24 GB). A infraestrutura inteira — rede, firewall, chave SSH e a máquina — sobe com um terraform apply, e o deploy é com Coolify, um "Heroku" self-hosted que atualiza sozinho a cada push no GitHub.',
            'From code to an HTTPS site, R$ 0 a month. It runs on an ARM box from Oracle Cloud\'s free tier (4 vCPUs, 24 GB). The whole infrastructure — network, firewall, SSH key and the machine — comes up with a single terraform apply, and deploys via Coolify, a self-hosted "Heroku" that auto-updates on every push to GitHub.',
          )}</p>
        </Prose>

        {/* takeaway */}
        <Callout>
          <span className="label-mono text-[hsl(var(--signal))]">{t('O que ficou', 'The takeaway')}</span>
          <blockquote className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            “{t(
              'Não foi a IA fazendo no meu lugar. Foi o meu trabalho mudando de lugar: parei de digitar código e passei o tempo decidindo arquitetura, escrevendo as regras e validando resultado.',
              'It wasn\'t AI doing the work for me. It was my work moving: I stopped typing code and spent the time deciding architecture, writing the rules, and validating the results.',
            )}”
          </blockquote>
        </Callout>

        {/* cta */}
        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <a href={LIVE} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-[hsl(var(--ink))] px-6 py-3 text-sm font-medium text-[hsl(var(--paper))] transition-colors hover:bg-[hsl(var(--signal))]">
              {t('Ver ao vivo', 'View live')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-[hsl(var(--ink))]">
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <Link to="/#projects" className="group flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-[hsl(var(--ink))]">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t('Todos os projetos', 'All projects')}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

function Prose({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <Reveal className="mb-16 grid gap-6 border-t border-border pt-12 md:grid-cols-[minmax(0,200px)_1fr] md:gap-12">
      <div>
        <span className="label-mono text-[hsl(var(--signal))]">{label}</span>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
        {children}
      </div>
    </Reveal>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mb-20 border-l-2 border-[hsl(var(--signal))] bg-[hsl(var(--signal))]/[0.04] p-6 sm:p-8">
      {children}
    </Reveal>
  );
}

export default CaseInkstave;
