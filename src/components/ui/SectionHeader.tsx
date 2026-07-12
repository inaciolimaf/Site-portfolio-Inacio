import { Reveal } from '@/components/ui/Reveal';

interface SectionHeaderProps {
  index: string;   // real section order, e.g. "01"
  label: string;   // mono eyebrow, e.g. "Sobre / About"
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, label, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14 border-b border-border pb-6">
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="label-mono text-[hsl(var(--signal))]">{index}</span>
        <span className="h-px flex-1 max-w-[64px] bg-border" />
        <span className="label-mono text-muted-foreground">{label}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
