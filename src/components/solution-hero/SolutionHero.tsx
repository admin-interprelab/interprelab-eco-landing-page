/**
 * Solution Hero Main Component
 */

import { SolutionHeroHeadline } from './SolutionHeroHeadline';
import { SolutionCard } from './SolutionCard';
import { SolutionHeroCTA } from './SolutionHeroCTA';
import { TrustIndicators } from './TrustIndicators';
import type { SolutionHeroProps, SolutionItem } from './types';
import { DEFAULT_SOLUTIONS, DEFAULT_HEADLINE } from './constants';
import { getGridClasses, generateSolutionAnalytics } from './utils';
import { useSolutionInteractions } from './hooks';

/**
 * Solution Hero Component
 *
 * Main hero section showcasing solutions with:
 * - Compelling headline
 * - Solution cards grid
 * - Call-to-action buttons
 * - Trust indicators
 * - Responsive design
 * - Analytics tracking
 */
export const SolutionHero = ({
  className = '',
  solutions = DEFAULT_SOLUTIONS,
  showTrustIndicators = true,
  showCTA = true,
  customHeadline = DEFAULT_HEADLINE,
  onSolutionClick,
}: SolutionHeroProps) => {
  const { handleSolutionClick } = useSolutionInteractions();
  const gridClasses = getGridClasses(solutions.length);

  const handleCardClick = (solution: SolutionItem) => {
    // Track analytics
    const analyticsData = generateSolutionAnalytics(solution);

    // Call custom handler if provided
    if (onSolutionClick) {
      onSolutionClick(solution);
    }

    // Call hook handler for internal tracking
    handleSolutionClick(solution);

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', analyticsData.event, analyticsData);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background via-background/95 to-primary/5 ${className}`}
      aria-label="Solution Hero Section"
    >
      <div className="container mx-auto">
        {/* Headline */}
        <SolutionHeroHeadline
          primary={customHeadline.primary}
          secondary={customHeadline.secondary}
          description={customHeadline.description}
          subDescription={customHeadline.subDescription}
        />

        {/* Solution Cards Grid */}
        <div className={`grid gap-6 mb-12 ${gridClasses}`}>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              index={index}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* Call-to-Action */}
        {showCTA && <SolutionHeroCTA />}

        {/* Trust Indicators */}
        {showTrustIndicators && <TrustIndicators />}
      </div>
    </section>
  );
};
