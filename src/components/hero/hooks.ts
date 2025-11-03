/**
 * Custom hooks for Hero Components
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { playVideoWithFallback, getVideoIntersectionThreshold } from './utils';

/**
 * Hook for managing hero animations
 */
export const useHeroAnimations = (enabled: boolean = true) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(enabled);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  // Check if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setAnimationsEnabled(!e.matches && enabled);
    };

    setAnimationsEnabled(!mediaQuery.matches && enabled);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enabled]);

  // Mark element as visible for animations
  const markElementVisible = useCallback((elementId: string) => {
    setVisibleElements(prev => new Set(prev).add(elementId));
  }, []);

  // Get animation classes for an element
  const getAnimationClasses = useCallback((elementId: string, animationType: 'fade-in' | 'slide-up' = 'fade-in') => {
    if (!animationsEnabled) return '';

    const baseClasses = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
    };

    const isVisible = visibleElements.has(elementId);
    return isVisible ? baseClasses[animationType] : `${baseClasses[animationType]} opacity-0`;
  }, [animationsEnabled, visibleElements]);

  // Get animation delay
  const getAnimationDelay = useCallback((index: number, baseDelay: number = 100) => {
    if (!animationsEnabled) return '0ms';
    return `${index * baseDelay}ms`;
  }, [animationsEnabled]);

  return {
    animationsEnabled,
    markElementVisible,
    getAnimationClasses,
    getAnimationDelay,
  };
};

/**
 * Hook for managing video playback and intersection
 */
export const useVideoHero = (videoRef: React.RefObject<HTMLVideoElement>, sectionRef: React.RefObject<HTMLDivElement>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Handle video intersection and playback
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const threshold = getVideoIntersectionThreshold(window.innerWidth);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            await playVideoWithFallback(video);
            setIsPlaying(true);

            // Fade in text after delay
            setTimeout(() => setTextVisible(true), 800);
          } catch (error) {
            setVideoError('Failed to play video');
            console.error('Video play failed:', error);
          }
        } else {
          video.pause();
          setIsPlaying(false);
          setTextVisible(false);
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [videoRef, sectionRef]);

  // Handle video load events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(null);
    };

    const handleError = (e: Event) => {
      setVideoError('Video failed to load');
      setVideoLoaded(false);
      console.error('Video load error:', e);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoRef]);

  return {
    isPlaying,
    textVisible,
    videoLoaded,
    videoError,
  };
};

/**
 * Hook for managing responsive hero layout
 */
export const useHeroLayout = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewportHeight(height);

      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Get responsive text sizes
  const getResponsiveTextSizes = useCallback(() => {
    switch (screenSize) {
      case 'mobile':
        return {
          headline: 'text-4xl md:text-5xl',
          subtitle: 'text-lg md:text-xl',
          badge: 'text-sm',
        };
      case 'tablet':
        return {
          headline: 'text-5xl md:text-6xl',
          subtitle: 'text-xl md:text-2xl',
          badge: 'text-sm',
        };
      case 'desktop':
        return {
          headline: 'text-6xl md:text-7xl lg:text-8xl',
          subtitle: 'text-xl md:text-2xl',
          badge: 'text-sm',
        };
      default:
        return {
          headline: 'text-6xl md:text-7xl lg:text-8xl',
          subtitle: 'text-xl md:text-2xl',
          badge: 'text-sm',
        };
    }
  }, [screenSize]);

  // Check if current screen is mobile
  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';

  return {
    screenSize,
    viewportHeight,
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveTextSizes,
  };
};

/**
 * Hook for managing hero scroll behavior
 */
export const useHeroScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax offset
  const getParallaxOffset = useCallback((speed: number = 0.5) => {
    return scrollY * speed;
  }, [scrollY]);

  return {
    scrollY,
    isScrolled,
    getParallaxOffset,
  };
};

/**
 * Hook for managing hero action interactions
 */
export const useHeroActions = () => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [clickedAction, setClickedAction] = useState<string | null>(null);

  // Handle action hover
  const handleActionHover = useCallback((actionId: string | null) => {
    setHoveredAction(actionId);
  }, []);

  // Handle action click
  const handleActionClick = useCallback((actionId: string) => {
    setClickedAction(actionId);

    // Reset clicked state after animation
    setTimeout(() => {
      setClickedAction(null);
    }, 200);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((
    event: React.KeyboardEvent,
    actionId: string,
    onClick?: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleActionClick(actionId);
      onClick?.();
    }
  }, [handleActionClick]);

  return {
    hoveredAction,
    clickedAction,
    handleActionHover,
    handleActionClick,
    handleKeyDown,
  };
};

/**
 * Hook for managing video preloading
 */
export const useVideoPreloader = (videoSources: string[]) => {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const preloadVideos = async () => {
      const totalVideos = videoSources.length;
      let loadedCount = 0;

      for (const src of videoSources) {
        try {
          const video = document.createElement('video');
          video.preload = 'metadata';

          await new Promise<void>((resolve, reject) => {
            video.onloadedmetadata = () => {
              loadedCount++;
              setLoadedVideos(prev => new Set(prev).add(src));
              setLoadingProgress((loadedCount / totalVideos) * 100);
              resolve();
            };

            video.onerror = () => {
              loadedCount++;
              setLoadingProgress((loadedCount / totalVideos) * 100);
              reject(new Error(`Failed to preload: ${src}`));
            };

            video.src = src;
          });
        } catch (error) {
          console.warn('Video preload failed:', error);
        }
      }
    };

    if (videoSources.length > 0) {
      preloadVideos();
    }
  }, [videoSources]);

  const isVideoLoaded = useCallback((src: string) => {
    return loadedVideos.has(src);
  }, [loadedVideos]);

  return {
    loadedVideos,
    loadingProgress,
    isVideoLoaded,
  };
};
