/**
 * About Hero Component
 */

import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';
import type { AboutHeroProps } from './types';
import { DEFAULT_HERO_CONTENT, HERO_IMAGE } from './constants';

/**
 * About Hero Component
 *
 * Hero section for the About page with company introduction
 */
export const AboutHero = ({
  className = '',
  showImage = true,
  customContent = DEFAULT_HERO_CONTENT,
}: AboutHeroProps) => {
  const content = { ...DEFAULT_HERO_CONTENT, ...customContent };

  return (
    <section
      className={`py-20 bg-gradient-subtle ${className}`}
      data-section-id="hero"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              {content.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {content.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{content.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{content.teamSize}</span>
              </div>
            </div>
          </div>

          {showImage && (
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-border/50">
                <img
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  className="w-full rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
