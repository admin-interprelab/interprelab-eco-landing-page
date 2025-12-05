/**
 * Stats Grid Component
 */

import { StatCard } from './StatCard';
import type { StatsGridProps } from './types';
import { getGridColumns } from './utils';

/**
 * Stats Grid Component
 *
 * Grid container for stat cards with:
 * - Responsive column layout
 * - Staggered animations
 * - Click handling
 */
export const StatsGrid = ({
  stats,
  columns = 'auto',
  variant = 'default',
  showTrends = false,
  animateOnScroll = true,
  onStatClick,
  className = '',
}: StatsGridProps) => {
  const gridClasses = getGridColumns(columns, stats.length);

  return (
    <div className={`grid gap-8 ${gridClasses} ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id}
          stat={stat}
          index={index}
          variant={variant}
          showTrend={showTrends}
          animateOnScroll={animateOnScroll}
          onClick={onStatClick}
        />
      ))}
    </div>
  );
};
