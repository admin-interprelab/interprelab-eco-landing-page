/**
 * Company Stats Component
 */

import type { CompanyStatsProps } from './types';
import { COMPANY_STATS } from './constants';
import { getStatsGridClasses, formatStatValue, generateStatId } from './utils';

/**
 * Company Stats Component
 *
 * Displays key company statistics in a grid layout
 */
export const CompanyStats = ({
  className = '',
  stats = COMPANY_STATS,
}: CompanyStatsProps) => {
  const gridClasses = getStatsGridClasses(stats.length);

  return (
    <section
      className={`py-20 bg-gradient-subtle ${className}`}
      data-section-id="company-stats"
    >
      <div className="container mx-auto px-6">
        <div className={`grid ${gridClasses} gap-8 text-center`}>
          {stats.map((stat) => {
            const statId = generateStatId(stat);
            const formattedValue = formatStatValue(stat.value);

            return (
              <div
                key={stat.id}
                id={statId}
                data-stat-id={stat.id}
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {formattedValue}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-muted-foreground/70 mt-1">
                    {stat.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
