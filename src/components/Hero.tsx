/**
 * Refactored Hero Component
 * Modular, maintainable, and following best practices
 */

import React from 'react';
import {
  HeroBadge,
  HeroHeadline,
  HeroActions,
  HeroTrustIndicators,
  DEFAULT_HERO_CONTENT
} from './hero/index';
import { useHeroAnimations, useHeroLayout } from './hero/hooks';
import { getHeroSectionClasses } from './hero/utils';
import type { HeroProps } from './hero/types';

/**
 * Main Hero Component
 *
 * A comprehensive hero section that provides:
 * - Eye-catching headline with gradient text
 * - Platform badge with icon
 * - Call-to-action buttons with hover effects
 * - Trust indicators and social proof
 * - Responsive design with mobile-first approach
 * - Accessibility support with proper ARIA labels
 * - Animation support with reduced motion respect
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Custom hooks for responsive behavior and animations
 * - TypeScript support with proper interfaces
 * - Performance optimizations
 * - Full keyboard navigation support
 */
export const Hero = ({
  content = DEFAULT_HERO_CONTENT,
  className = '',
  showAnimations = true,
}: HeroProps) => {
  const { badge, headline, subtitle, actions, trustIndicators } = content;

  const { getResponsiveTextSizes } = useHeroLayout();
  const { getAnimationClasses, markElementVisible } = useHeroAnimations(showAnimations);

  const textSizes = getResponsiveTextSizes();
  const sectionClasses = getHeroSectionClasses('default');

  // Mark elements as visible for animations on mount
  React.useEffect(() => {
    if (showAnimations) {
      setTimeout(() => markElementVisible('hero-content'), 100);
    }
  }, [showAnimations, markElementVisible]);

  return (
    <section className={`${sectionClasses} ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`max-w-5xl mx-auto space-y-10 ${getAnimationClasses('hero-content', 'fade-in')}`}
          role="banner"
          aria-label="Hero section"
        >
          {/* Platform Badge */}
          {badge && (
            <div className="flex justify-center">
              <HeroBadge badge={badge} />
            </div>
          )}

          {/* Main Headline */}
          <HeroHeadline
            primary={headline.primary}
            secondary={headline.secondary}
            className={textSizes.headline}
          />

          {/* Subtitle */}
          <p className={`${textSizes.subtitle} text-muted-foreground max-w-3xl mx-auto leading-relaxed`}>
            {subtitle}
          </p>

          {/* Call-to-Action Buttons */}
          <HeroActions actions={actions} />

          {/* Trust Indicators */}
          <HeroTrustIndicators
            text={trustIndicators.text}
            items={trustIndicators.items}
          />
        </div>
      </div>
    </section>
  );
};

// Export individual components for potential standalone use
export {
  HeroBadge,
  HeroHeadline,
  HeroActions,
  HeroTrustIndicators,
} from './hero/index';

// Export hooks for external use
export {
  useHeroAnimations,
  useHeroLayout,
  useHeroScroll,
  useHeroActions,
} from './hero/hooks';

// Export types
export type {
  HeroAction,
  HeroBadge as HeroBadgeType,
  TrustIndicator,
  HeroContent,
  HeroProps,
} from './hero/types';
