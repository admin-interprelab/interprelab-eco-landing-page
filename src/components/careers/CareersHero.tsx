/**
 * Careers Hero Component
 */

import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Briefcase } from 'lucide-react';
import type { CareersHeroProps } from './types';
import { DEFAULT_HERO_CONTENT } from './constants';

/**
 * Careers Hero Component
 *
 * Hero section for the careers page with title, description, and stats
 */
export const CareersHero = ({
  className = '',
  title = DEFAULT_HERO_CONTENT.title,
  description = DEFAULT_HERO_CONTENT.description,
  showStats = true,
  customStats = DEFAULT_HERO_CONTENT.stats,
}: CareersHeroProps) => {
  return (
    <section
      className={`py-20 bg-gradient-subtle ${className}`}
      data-section-id="careers-hero"
    >
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          Careers
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
          {title}
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          {description}
        </p>

        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {customStats.openPositions}+
              </div>
              <div className="text-sm text-muted-foreground">
                Open Positions
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {customStats.departments}
              </div>
              <div className="text-sm text-muted-foreground">
                Departments
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {customStats.employees}+
              </div>
              <div className="text-sm text-muted-foreground">
                Team Members
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
