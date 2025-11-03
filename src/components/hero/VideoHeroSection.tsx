/**
 * Video Hero Section Component
 * Individual full-screen video hero section
 */

import { useRef } from 'react';
import type { FullScreenVideoHeroProps } from './types';
import {
  getVideoPoster,
  generateVideoSectionId,
  generateVideoAriaLabel,
  shouldShowScrollIndicator,
  formatStatistic
} from './utils';
import { useVideoHero } from './hooks';
import { VIDEO_CONFIG } from './constants';

/**
 * Video Hero Section Component
 *
 * Full-screen video background section with:
 * - Auto-playing video with intersection observer
 * - Text overlay with fade-in animation
 * - Statistics display
 * - Scroll indicator (first section only)
 * - Accessibility support
 * - Error handling and fallbacks
 */
export const VideoHeroSection = ({
  section,
  index,
  isActive = false,
  onVideoLoad,
  onVideoError,
}: FullScreenVideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { isPlaying, textVisible, videoLoaded, videoError } = useVideoHero(videoRef, sectionRef);

  const sectionId = generateVideoSectionId(section, index);
  const videoAriaLabel = generateVideoAriaLabel(section);
  const posterSrc = getVideoPoster(section, index);
  const showScrollIndicator = shouldShowScrollIndicator(index, 3); // Assuming 3 total sections

  // Handle video load success
  const handleVideoLoad = () => {
    onVideoLoad?.(index);
  };

  // Handle video error
  const handleVideoError = (error: string) => {
    onVideoError?.(index, error);
  };

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="h-screen w-full relative snap-start snap-always overflow-hidden"
      aria-label={`Video section: ${section.title}`}
    >
      {/* Full-screen video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline={VIDEO_CONFIG.playsInline}
        muted={VIDEO_CONFIG.muted}
        loop={VIDEO_CONFIG.loop}
        preload={VIDEO_CONFIG.preload}
        poster={posterSrc}
        onLoadedData={handleVideoLoad}
        onError={() => handleVideoError('Video failed to load')}
        aria-label={videoAriaLabel}
      >
        <source src={section.videoSrc} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div
          className={`
            max-w-4xl text-center space-y-6 transition-all duration-1000
            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {section.title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto">
            {section.description}
          </p>

          {/* Statistics */}
          {section.statistics && (
            <div className="pt-6">
              <div className="inline-flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {formatStatistic(section.statistics.value)}
                </div>
                <div className="text-sm md:text-base text-white/80 text-center">
                  {section.statistics.label}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator (only on first section) */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
            role="img"
            aria-label="Scroll down for more content"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Video Error Fallback */}
      {videoError && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <div className="text-6xl">📹</div>
            <h2 className="text-2xl font-bold">Video Unavailable</h2>
            <p className="text-white/80">Unable to load video content</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 z-25 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/80">Loading video...</p>
          </div>
        </div>
      )}
    </section>
  );
};
