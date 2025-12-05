/**
 * Solution Hero Components Barrel Export
 */

// Main Component
export { SolutionHero } from './SolutionHero';

// Sub Components
export { SolutionHeroHeadline } from './SolutionHeroHeadline';
export { SolutionCard } from './SolutionCard';
export { SolutionHeroCTA } from './SolutionHeroCTA';
export { TrustIndicators } from './TrustIndicators';

// Types
export type {
  SolutionItem,
  SolutionHeroProps,
  SolutionCardProps,
  SolutionHeroHeadlineProps,
  SolutionHeroCTAProps,
  TrustIndicatorProps,
  SolutionHeroContextType,
  SolutionHeroProviderProps,
} from './types';

// Constants
export {
  DEFAULT_SOLUTIONS,
  DEFAULT_HEADLINE,
  DEFAULT_TRUST_INDICATORS,
  DEFAULT_CTA,
  ANIMATION_CONFIG,
  SOLUTION_COLORS,
  CARD_VARIANTS,
  TRUST_INDICATOR_COLORS,
} from './constants';

// Utils
export {
  getSolutionCardClasses,
  getSolutionIconColor,
  getTrustIndicatorColor,
  getAnimationDelay,
  formatSolutionDescription,
  generateSolutionId,
  isFeaturedSolution,
  getFeaturedBadgeText,
  getFeaturedBadgeColor,
  sortSolutionsByPriority,
  filterSolutions,
  getSolutionById,
  validateSolution,
  generateSolutionAnalytics,
  getGridClasses,
  debounce,
  isInViewport,
  scrollToElement,
} from './utils';

// Hooks
export {
  SolutionHeroProvider,
  useSolutionHero,
  useSolutionInteractions,
  useSolutionSearch,
  useSolutionAnimations,
  useResponsiveSolutions,
  useSolutionFocus,
  useSolutionAnalytics,
} from './hooks';
