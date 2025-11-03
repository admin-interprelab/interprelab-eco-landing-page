/**
 * Layout Components Barrel Export
 */

// Components
export { MainContent } from './MainContent';
export { ScrollToTop } from './ScrollToTop';
export { LoadingOverlay } from './LoadingOverlay';
export { ErrorBoundary } from './ErrorBoundary';

// Types
export type {
  LayoutProps,
  MainContentProps,
  ScrollToTopProps,
  LoadingOverlayProps,
  ErrorBoundaryProps,
  LayoutContextType,
  LayoutProviderProps,
  LayoutHeaderProps,
  LayoutSidebarProps,
} from './types';

// Constants
export {
  LAYOUT_VARIANTS,
  DEFAULT_LAYOUT_CONFIG,
  SCROLL_CONFIG,
  ANIMATION_CONFIG,
  BREAKPOINTS,
  Z_INDEX,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  LAYOUT_SPACING,
} from './constants';

// Utils
export {
  getLayoutVariantConfig,
  getLayoutContainerClasses,
  getMainContentClasses,
  shouldShowComponent,
  calculateScrollProgress,
  hasScrolledPastThreshold,
  scrollToTop,
  scrollToElement,
  getViewportDimensions,
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  getDeviceType,
  prefersReducedMotion,
  prefersDarkMode,
  getSafeAreaInsets,
  generateLayoutId,
  needsScrollContainer,
  getOptimalContentWidth,
  calculateLayoutMetrics,
  debounce,
  throttle,
  isElementInViewport,
  getElementOffsetTop,
  formatLoadingMessage,
  formatErrorMessage,
} from './utils';

// Hooks
export {
  LayoutProvider,
  useLayout,
  useScroll,
  useScrollToTop,
  useResponsiveLayout,
  useLoadingState,
  useErrorState,
  useLayoutKeyboardShortcuts,
} from './hooks';
