/**
 * Competency Card Component
 * Individual competency area display card
 */

import type { CompetencyCardProps } from './types';
import { getCompetencyColorClass } from './utils';

/**
 * Competency Card Component
 *
 * Displays individual competency with:
 * - Icon and title
 * - Description
 * - Color-coded background
 * - Hover effects
 * - Click interaction
 */
export const CompetencyCard = ({
  competency,
  index,
  onClick,
}: CompetencyCardProps) => {
  const colorClass = getCompetencyColorClass(competency.category);

  return (
    <div
      className={`
        p-2 rounded cursor-pointer transition-all duration-200
        hover:scale-105 hover:shadow-md
        ${competency.color}
        ${onClick ? 'hover:bg-opacity-80' : ''}
      `}
      onClick={() => onClick?.(competency)}
      style={{ animationDelay: `${index * 100}ms` }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(competency);
        }
      }}
    >
      <div className="font-medium text-xs flex items-center gap-1">
        <span role="img" aria-label={competency.title}>
          {competency.icon}
        </span>
        {competency.title}
      </div>
      <div className="text-muted-foreground text-xs mt-1">
        {competency.description}
      </div>
    </div>
  );
};
