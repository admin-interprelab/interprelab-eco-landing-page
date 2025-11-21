/**
 * Main Content Component
 */

import React from 'react';
import { SolutionHero } from '@/components/SolutionHero';
import { StatsSection } from '@/components/StatsSection';
import { Testimonials } from '@/components/Testimonials';
import { useHomeAnalytics } from './hooks';
import type { MainContentProps } from './types';

/**
 * MainContent Component
 *
 * Main content sections with:
 * - Solution hero
 * - Statistics section
 * - Testimonials
 * - Conditional rendering
 * - Analytics tracking
 */
export const MainContent = React.memo<MainContentProps>(({
  showSolutionHero = true,
  showStats = true,
  showTestimonials = true,
  className = "",
}) => {
  const { trackSectionView } = useHomeAnalytics();

  React.useEffect(() => {
    if (showSolutionHero) trackSectionView('solution_hero');
    if (showStats) trackSectionView('stats');
    if (showTestimonials) trackSectionView('testimonials');
  }, [showSolutionHero, showStats, showTestimonials, trackSectionView]);

  return (
    <main className={className}>
      {showSolutionHero && <SolutionHero />}
      {showStats && <StatsSection />}
      {showTestimonials && <Testimonials />}
    </main>
  );
});
