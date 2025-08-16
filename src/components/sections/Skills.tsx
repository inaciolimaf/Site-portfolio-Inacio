import { useLocale } from '@/hooks/useLocale';
import { skills } from '@/data/portfolio';
import { 
  Monitor, 
  Server, 
  Database, 
  Settings, 
  Cpu 
} from 'lucide-react';

const categoryIcons = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Settings,
  other: Cpu,
};

const categoryColors = {
  frontend: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  backend: 'bg-green-500/10 text-green-600 dark:text-green-400',
  database: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  tools: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  other: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
};

export const Skills = () => {
  const { content, locale } = useLocale();

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hero-gradient">
            {content.sections.skills.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.sections.skills.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const colorClass = categoryColors[category as keyof typeof categoryColors];
            
            return (
              <div
                key={category}
                className="card-professional p-6 animate-scale-in hover-lift hover-gradient group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold capitalize">
                    {content.sections.skills.categories[category as keyof typeof content.sections.skills.categories]}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, skillIndex) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 bg-secondary/50 hover:bg-secondary hover:scale-105 text-secondary-foreground rounded-full text-sm transition-all duration-300 cursor-default animate-bounce-in"
                      style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};