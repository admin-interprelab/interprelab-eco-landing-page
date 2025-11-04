/**
 * Constants for Layout Components
 */

import type { LayoutContextType } from './types';

// Layout Variants Configuration
export const LAYOUT_VARIANTS = {
  default: {
    showNavigation: true,
    showFooter: true,
    showInterpreBot: true,
    // Make the layout a column flex container so the main content can grow
    // and the footer will sit at the bottom without creating a large empty gap.
    mainPadding: 'flex-1 pt-20',
    containerClasses: 'min-h-screen bg-background flex flex-col',
  },
  minimal: {
    showNavigation: true,
    showFooter: false,
    showInterpreBot: false,
    mainPadding: 'flex-1 pt-16',
    containerClasses: 'min-h-screen bg-background flex flex-col',
  },
  fullscreen: {
    showNavigation: false,
    showFooter: false,
    showInterpreBot: false,
    mainPadding: 'flex-1 pt-0',
    containerClasses: 'h-screen bg-background overflow-hidden flex flex-col',
  },
  dashboard: {
    showNavigation: true,
    showFooter: false,
    showInterpreBot: true,
    mainPadding: 'flex-1 pt-16',
    containerClasses: 'min-h-screen bg-muted/10 flex flex-col',
  },
} as const;

// Default Layout Configuration
export const DEFAULT_LAYOUT_CONFIG: LayoutContextType = {
  variant: 'default',
  showNavigation: true,
  showFooter: true,
  showInterpreBot: true,
  isLoading: false,
  error: null,
  updateLayout: () => {},
  setLoading: () => {},
  setError: () => {},
};

// Scroll Configuration
export const SCROLL_CONFIG = {
  scrollToTopThreshold: 400,
  smoothScrollBehavior: 'smooth' as const,
  scrollToTopDuration: 500,
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  pageTransition: 300,
  loadingFade: 200,
  scrollToTop: 400,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;

// Z-Index Layers
export const Z_INDEX = {
  navigation: 40,
  sidebar: 30,
  modal: 50,
  tooltip: 60,
  interpreBot: 45,
  scrollToTop: 35,
  loadingOverlay: 55,
} as const;

// Loading Messages
export const LOADING_MESSAGES = [
  'Loading your content...',
  'Preparing your experience...',
  'Getting things ready...',
  'Almost there...',
  'Loading InterpreLab...',
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  timeout: 'Request timed out. Please try again.',
  notFound: 'The requested content was not found.',
  unauthorized: 'You are not authorized to view this content.',
  serverError: 'Server error. Please try again later.',
} as const;

// Layout Spacing
export const LAYOUT_SPACING = {
  navigationHeight: '80px',
  navigationHeightMobile: '64px',
  footerMinHeight: '200px',
  sidebarWidth: '280px',
  sidebarWidthCollapsed: '64px',
  contentMaxWidth: '1200px',
  containerPadding: '1.5rem',
  sectionSpacing: '5rem',
} as const;
