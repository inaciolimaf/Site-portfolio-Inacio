import { Placeable } from '@/components/assembly/Placeable';

interface SectionHeaderProps {
  index: string;   // real section order, e.g. "01"
  label: string;   // mono eyebrow, e.g. "Sobre / About"
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-14 border-b border-border pb-6">
      <Placeable>
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="misreg inline-block label-mono text-[hsl(var(--signal))]">{index}</span>
          <span className="h-px max-w-[64px] flex-1 bg-border" />
          <span className="label-mono text-muted-foreground">{label}</span>
        </div>
      </Placeable>
      <Placeable className="mt-5">
        <h2 className="misreg-text font-display text-4xl font-bold tracking-tight sm:text-6xl">{title}</h2>
      </Placeable>
      {subtitle && (
        <Placeable className="mt-4">
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </Placeable>
      )}
    </div>
  );
}
