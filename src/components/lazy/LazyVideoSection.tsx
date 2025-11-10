import React, { lazy } from 'react';
import LazyComponent from './LazyComponent';

// Lazy load the VideoSection component
const VideoSection = lazy(() => import('@/components/VideoSection'));

interface LazyVideoSectionProps {
  className?: string;
}

const VideoSkeleton = () => (
  <div className="relative w-full h-screen bg-muted animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/40" />
    <div className="relative z-10 flex items-center justify-center h-full text-center text-muted-foreground px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-12 bg-muted-foreground/20 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-muted-foreground/20 rounded w-full mx-auto"></div>
        <div className="w-20 h-20 bg-muted-foreground/20 rounded-full mx-auto flex items-center justify-center">
          <div className="w-8 h-8 bg-muted-foreground/40 rounded"></div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground/30"
        />
      ))}
    </div>
  </div>
);

export const LazyVideoSection: React.FC<LazyVideoSectionProps> = ({
  className
}) => {
  return (
    <LazyComponent
      fallback={VideoSkeleton}
      threshold={0.1}
      rootMargin="200px"
      className={className}
    >
      <VideoSection />
    </LazyComponent>
  );
};

export default LazyVideoSection;
