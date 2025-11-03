/**
 * Utility functions for Hero Components
 */

import type { HeroAction, VideoHeroSection } from './types';

/**
 * Check if action is external link
 */
export const isExternalAction = (action: HeroAction): boolean => {
  return action.external || action.href.startsWith('http');
};

/**
 * Get action link target
 */
export const getActionTarget = (action: HeroAction): string | undefined => {
  return isExternalAction(action) ? '_blank' : undefined;
};

/**
 * Get action link rel attribute
 */
export const getActionRel = (action: HeroAction): string | undefined => {
  return isExternalAction(action) ? 'noopener noreferrer' : undefined;
};

/**
 * Generate action button classes
 */
export const getActionClasses = (action: HeroAction): string => {
  const baseClasses = 'group transition-all duration-300';

  const variantClasses = {
    hero: 'bg-gradient-primary hover:shadow-lg hover:scale-105',
    glass: 'backdrop-blur-sm bg-white/10 hover:bg-white/20',
    outline: 'border-2 border-primary hover:bg-primary hover:text-primary-foreground',
    default: 'bg-primary hover:bg-primary/90',
  };

  return `${baseClasses} ${variantClasses[action.variant] || variantClasses.default}`;
};

/**
 * Generate animation delay for staggered animations
 */
export const calculateAnimationDelay = (
  index: number,
  baseDelay: number = 100,
  increment: number = 100
): string => {
  return `${baseDelay + (index * increment)}ms`;
};

/**
 * Format statistics value
 */
export const formatStatistic = (value: string): string => {
  // Handle percentage values
  if (value.includes('%')) {
    return value;
  }

  // Handle multiplier values (e.g., "2x")
  if (value.includes('x')) {
    return value;
  }

  // Handle fraction values (e.g., "1 in 6")
  if (value.includes('in')) {
    return value;
  }

  // Default formatting
  return value;
};

/**
 * Get video poster image
 */
export const getVideoPoster = (section: VideoHeroSection, index: number): string => {
  if (section.posterSrc) return section.posterSrc;

  // Fallback poster images based on index
  const fallbackPosters = [
    '/videos/interpreter-stress-poster.jpg',
    '/videos/quality-gap-poster.jpg',
    '/videos/patient-outcomes-poster.jpg',
  ];

  return fallbackPosters[index] || fallbackPosters[0];
};

/**
 * Generate video section ID for accessibility
 */
export const generateVideoSectionId = (section: VideoHeroSection, index: number): string => {
  return `video-section-${section.id || index}`;
};

/**
 * Generate video aria-label
 */
export const generateVideoAriaLabel = (section: VideoHeroSection): string => {
  return `Background video for ${section.title}`;
};

/**
 * Check if device supports video autoplay
 */
export const supportsVideoAutoplay = (): boolean => {
  // Check for mobile devices that might not support autoplay
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Most modern browsers support autoplay with muted videos
  return !isMobile || 'IntersectionObserver' in window;
};

/**
 * Handle video play with fallback
 */
export const playVideoWithFallback = async (video: HTMLVideoElement): Promise<void> => {
  try {
    await video.play();
  } catch (error) {
    console.log('Video autoplay failed, trying with muted:', error);
    video.muted = true;
    try {
      await video.play();
    } catch (retryError) {
      console.log('Video play retry failed:', retryError);
    }
  }
};

/**
 * Get responsive video dimensions
 */
export const getVideoResponsiveDimensions = (screenWidth: number) => {
  if (screenWidth < 768) {
    return { width: '100vw', height: '100vh' };
  } else if (screenWidth < 1024) {
    return { width: '100vw', height: '100vh' };
  } else {
    return { width: '100vw', height: '100vh' };
  }
};

/**
 * Calculate video intersection threshold based on screen size
 */
export const getVideoIntersectionThreshold = (screenWidth: number): number => {
  if (screenWidth < 768) {
    return 0.3; // Lower threshold for mobile
  } else {
    return 0.5; // Standard threshold for desktop
  }
};

/**
 * Generate hero section classes
 */
export const getHeroSectionClasses = (variant: 'default' | 'minimal' | 'video' = 'default'): string => {
  const baseClasses = 'relative min-h-screen flex items-center justify-center overflow-hidden';

  const variantClasses = {
    default: 'pt-20',
    minimal: 'pt-16',
    video: 'pt-0',
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

/**
 * Validate video source URL
 */
export const isValidVideoSource = (src: string): boolean => {
  if (!src) return false;

  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const hasValidExtension = videoExtensions.some(ext => src.toLowerCase().includes(ext));

  return hasValidExtension || src.startsWith('data:') || src.startsWith('blob:');
};

/**
 * Get optimal video format based on browser support
 */
export const getOptimalVideoFormat = (baseSrc: string): string => {
  // Check for WebM support
  const video = document.createElement('video');
  const canPlayWebM = video.canPlayType('video/webm') !== '';

  if (canPlayWebM && baseSrc.includes('.mp4')) {
    return baseSrc.replace('.mp4', '.webm');
  }

  return baseSrc;
};

/**
 * Preload video for better performance
 */
export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error(`Failed to preload video: ${src}`));

    video.src = src;
  });
};

/**
 * Get scroll indicator visibility
 */
export const shouldShowScrollIndicator = (index: number, totalSections: number): boolean => {
  return index === 0 && totalSections > 1;
};
