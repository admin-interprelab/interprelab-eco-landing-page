/**
 * Index Main Component
 */

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MainContent } from './MainContent';
import { useIndexAnalytics } from './hooks';
import { DEFAULT_SECTION_CONFIG } from './constants';
import type { IndexPageProps } from './types';

/**
 * Index Component
 *
 * Main index page with:
 * - Navigation
 * - Main content sections
 * - Footer
 * - Analytics tracking
 * - Responsive design
 */
export const Index = React.memo<IndexPageProps>(({
  className = '',
  customContent,
}) => {
  const { trackPageView } = useIndexAnalytics();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  const sectionConfig = {
    ...DEFAULT_SECTION_CONFIG,
    ...customContent,
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Navigation />

      <MainContent
        showHero={sectionConfig.showHero}
        showProductShowcase={sectionConfig.showProductShowcase}
        showStats={sectionConfig.showStats}
        showTestimonials={sectionConfig.showTestimonials}
      />

      <Footer />
    </div>
  );
});
