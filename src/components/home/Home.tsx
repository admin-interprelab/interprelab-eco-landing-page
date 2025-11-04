/**
 * Home Main Component
 */

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/Footer';
import { VideoHeroSection } from './VideoHeroSection';
import { MainContent } from './MainContent';
import { useHomeAnalytics } from './hooks';
import { DEFAULT_PAIN_POINTS } from './constants';
import type { HomePageProps } from './types';

/**
 * Home Component
 *
 * Main home page with:
 * - Transparent navigation
 * - Full-screen video hero sections
 * - Main content sections
 * - Analytics tracking
 * - Responsive design
 */
export const Home = React.memo<HomePageProps>(({
  className = '',
  customContent,
}) => {
  const { trackPageView } = useHomeAnalytics();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  const painPoints = customContent?.painPoints || DEFAULT_PAIN_POINTS;

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Navigation transparent />

      {/* Full-screen video sections with snap scrolling */}
      <VideoHeroSection painPoints={painPoints} />

      {/* Main content */}
      <MainContent
        showSolutionHero={customContent?.showSolutionHero}
        showStats={customContent?.showStats}
        showTestimonials={customContent?.showTestimonials}
      />

      <Footer />
    </div>
  );
});
