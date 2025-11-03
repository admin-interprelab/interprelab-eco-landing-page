/**
 * Testimonials Header Component
 */

import { Badge } from '@/components/ui/badge';
import type { TestimonialsHeaderProps } from './types';
import { DEFAULT_HEADER } from './constants';

/**
 * Testimonials Header Component
 *
 * Displays the section header with badge, title, and description
 */
export const TestimonialsHeader = ({
  title = DEFAULT_HEADER.title,
  subtitle = DEFAULT_HEADER.subtitle,
  description = DEFAULT_HEADER.description,
  badge = DEFAULT_HEADER.badge,
  className = '',
}: TestimonialsHeaderProps) => {
  return (
    <div className={`text-center mb-16 animate-fade-in ${className}`}>
      {badge && (
        <Badge className="glass px-6 py-3 mb-6 border-primary/20">
          {badge}
        </Badge>
      )}

      <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
        {title.includes(subtitle) ? (
          <>
            {title.split(subtitle)[0]}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {subtitle}
            </span>
            {title.split(subtitle)[1]}
          </>
        ) : (
          <>
            {title} <span className="bg-gradient-primary bg-clip-text text-transparent">{subtitle}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
