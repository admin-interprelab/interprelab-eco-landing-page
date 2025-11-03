/**
 * Utility functions for Layout Components
 */

import type { LayoutContextType } from './types';
import { LAYOUT_VARIANTS } from './constants';

/**
 * Get layout variant configuration
 */
export const getLayoutVariantConfig = (variant: keyof typeof LAYOUT_VARIANTS) => {
  return LAYOUT_VARIANTS[variant] || LAYOUT_VARIANTS.default;
};

/**
 * Generate layout container classes
 */
export const getLayoutContainerClasses = (
  variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard',
  customClassName?: string
): string => {
  const config = getLayoutVariantConfig(variant);
  const baseClasses = config.containerClasses;

  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Generate main content classes
 */
export const getMainContentClasses = (
  variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard',
  customClassName?: string
): string => {
  const config = getLayoutVariantConfig(variant);
  const baseClasses = config.mainPadding;

  return customClassName ? `${baseClasses} ${customClassName}` : baseClasses;
};

/**
 * Check if layout should show component
 */
export const shouldShowComponent = (
  override: boolean | undefined,
  defaultValue: boolean
): boolean => {
  if (override !== undefined) {
    return override;
  }
  return defaultValue;
};

/**
 * Calculate scroll progress
 */
export const calculateScrollProgress = (): number => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollHeight <= 0) return 0;

  return Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
};

/**
 * Check if user has scrolled past threshold
 */
export const hasScrolledPastThreshold = (threshold: number): boolean => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return scrollTop > threshold;
};

/**
 * Smooth scroll to top
 */
export const scrollToTop = (smooth: boolean = true): void => {
  if (smooth && 'scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, 0);
  }
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0,
  smooth: boolean = true
): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementTop = element.offsetTop - offset;

  if (smooth && 'scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, elementTop);
  }
};

/**
 * Get viewport dimensions
 */
export const getViewportDimensions = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Check if device is tablet
 */
export const isTabletDevice = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is desktop
 */
export const isDesktopDevice = (): boolean => {
  return window.innerWidth >= 1024;
};

/**
 * Get device type
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Get safe area insets for mobile devices
 */
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);

  return {
    top: style.getPropertyValue('--safe-area-inset-top') || '0px',
    right: style.getPropertyValue('--safe-area-inset-right') || '0px',
    bottom: style.getPropertyValue('--safe-area-inset-bottom') || '0px',
    left: style.getPropertyValue('--safe-area-inset-left') || '0px',
  };
};

/**
 * Generate layout ID for accessibility
 */
export const generateLayoutId = (variant: string): string => {
  return `layout-${variant}-${Date.now()}`;
};

/**
 * Check if layout needs scroll container
 */
export const needsScrollContainer = (variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard'): boolean => {
  return variant === 'fullscreen' || variant === 'dashboard';
};

/**
 * Get optimal content width for variant
 */
export const getOptimalContentWidth = (variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard'): string => {
  switch (variant) {
    case 'fullscreen':
      return '100%';
    case 'dashboard':
      return '100%';
    case 'minimal':
      return 'max-w-4xl';
    case 'default':
    default:
      return 'max-w-7xl';
  }
};

/**
 * Calculate layout metrics
 */
export const calculateLayoutMetrics = () => {
  const viewport = getViewportDimensions();
  const deviceType = getDeviceType();
  const safeArea = getSafeAreaInsets();

  return {
    viewport,
    deviceType,
    safeArea,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    aspectRatio: viewport.width / viewport.height,
  };
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const viewport = getViewportDimensions();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewport.height &&
    rect.right <= viewport.width
  );
};

/**
 * Get element offset from top
 */
export const getElementOffsetTop = (element: HTMLElement): number => {
  let offsetTop = 0;
  let currentElement: HTMLElement | null = element;

  while (currentElement) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent as HTMLElement;
  }

  return offsetTop;
};

/**
 * Format loading message
 */
export const formatLoadingMessage = (message?: string): string => {
  return message || 'Loading...';
};

/**
 * Format error message
 */
export const formatErrorMessage = (error: string | Error): string => {
  if (typeof error === 'string') return error;
  return error.message || 'An unexpected error occurred';
};
