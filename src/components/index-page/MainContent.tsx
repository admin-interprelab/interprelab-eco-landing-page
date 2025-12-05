/**
 * Main Content Component
 */

import React from 'react';
import { Hero } from '@/components/Hero';
import { ProductShowcase } from '@/components/ProductShowcase';
import { StatsSection } from '@/components/StatsSection';
import { Testimonials } from '@/components/Testimonials';
import { useIndexAnalytics } from './hooks';
import type { MainContentProps } from './types';

/**
 * MainContent Component
 *
 * Main content sections with:
 * - Hero section
 * - Product showcase
 * - Statistics section
 * - Testimonials
 * - Conditional rendering
 * - Analytics tracking
 */
export const MainContent = React.memo<MainContentProps>(({
  showHero = true,
  showProductShowcase = true,
  showStats = true,
  showTestimonials = true,
  className = "",
}) => {
  const { trackSectionView } = useIndexAnalytics();

  React.useEffect(() => {
    if (showHero) trackSectionView('hero');
    if (showProductShowcase) trackSectionView('product_showcase');
    if (showStats) trackSectionView('stats');
    if (showTestimonials) trackSectionView('testimonials');
  }, [showHero, showProductShowcase, showStats, showTestimonials, trackSectionView]);

  return (
    <main className={className}>
      {showHero && <Hero />}
      {showProductShowcase && <ProductShowcase />}
      {showStats && <StatsSection />}
      {showTestimonials && <Testimonials />}
    </main>
  );
});
