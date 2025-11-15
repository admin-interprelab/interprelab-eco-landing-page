/**
 * Video Hero Section Component
 */

import React from 'react';
import { VideoHeroSection as FullScreenVideoHero } from '@/components/hero/VideoHeroSection';
import { useHomeAnalytics } from './hooks';
import type { VideoHeroSectionProps } from './types';

/**
 * VideoHeroSection Component
 *
 * Full-screen video hero sections with:
 * - Snap scrolling
 * - Multiple pain point videos
 * - Analytics tracking
 * - Responsive design
 */
export const VideoHeroSection = React.memo<VideoHeroSectionProps>(({
  painPoints,
  className = "",
}) => {
  const { trackSectionView } = useHomeAnalytics();

  React.useEffect(() => {
    trackSectionView('video_hero');
  }, [trackSectionView]);

  return (
    <div className={`h-screen overflow-y-scroll snap-y snap-mandatory ${className}`}>
      {painPoints.map((painPoint, index) => (
        <FullScreenVideoHero
          key={index}
          section={{ ...painPoint, id: painPoint.title.replace(/\s+/g, '-').toLowerCase() }}
          index={index}
        />
      ))}
    </div>
  );
});
