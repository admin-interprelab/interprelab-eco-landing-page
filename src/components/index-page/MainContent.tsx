/**
 * Main Content Component
 */

import React from 'react';
import { Hero } from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import { VIDEO_HERO_SECTIONS } from '@/components/hero/constants';
import { ProductShowcase } from '@/components/ProductShowcase';
import { StatsSection } from '@/components/stats';
import { Testimonials } from '@/components/testimonials';
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
  showVideoSection = false, // New prop for video section
  showProductShowcase = true,
  showStats = true,
  showTestimonials = true,
  className = "",
}) => {
  const { trackSectionView } = useIndexAnalytics();

  React.useEffect(() => {
    if (showHero) trackSectionView('hero');
    if (showVideoSection) trackSectionView('video_section');
    if (showProductShowcase) trackSectionView('product_showcase');
    if (showStats) trackSectionView('stats');
    if (showTestimonials) trackSectionView('testimonials');
  }, [showHero, showVideoSection, showProductShowcase, showStats, showTestimonials, trackSectionView]);

  return (
    <main className={className}>
      {showHero && <Hero />}
      {showVideoSection && <VideoSection sections={VIDEO_HERO_SECTIONS} />}
      {showProductShowcase && <ProductShowcase />}
      {showStats && <StatsSection />}
      {showTestimonials && <Testimonials />}
    </main>
  );
});
