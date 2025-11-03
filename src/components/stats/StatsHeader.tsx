/**
 * Stats Header Component
 */

import { Badge } from '@/components/ui/badge';
import type { StatsHeaderProps } from './types';
import { DEFAULT_HEADER } from './constants';

/**
 * Stats Header Component
 *
 * Displays the section header with badge and title
 */
export const StatsHeader = ({
  title = DEFAULT_HEADER.title,
  subtitle = DEFAULT_HEADER.subtitle,
  badge = DEFAULT_HEADER.badge,
  className = '',
}: StatsHeaderProps) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <Badge className="mb-4 px-6 py-3">
          {badge}
        </Badge>
      )}

      <h2 className="text-3xl md:text-5xl font-bold text-foreground">
        {title}
        {subtitle && (
          <span className="bg-gradient-primary bg-clip-text text-transparent ml-2">
            {subtitle}
          </span>
        )}
      </h2>
    </div>
  );
};
