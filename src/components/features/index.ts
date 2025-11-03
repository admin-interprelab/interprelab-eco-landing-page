/**
 * Features Components Barrel Export
 */

// Components
export { FeatureCard } from './FeatureCard';
export { FeatureGrid } from './FeatureGrid';
export { FeatureSection } from './FeatureSection';
export { FeatureFilter } from './FeatureFilter';
export { FeatureModal } from './FeatureModal';

// Types
export type {
  Feature,
  FeatureCategory,
  FeatureSection as FeatureSectionType,
  FeatureCardProps,
  FeatureGridProps,
  FeaturesSectionProps,
} from './types';

// Constants
export {
  FEATURE_CATEGORIES,
  CORE_FEATURES,
  ADVANCED_FEATURES,
  DEFAULT_FEATURES_SECTION,
  GRID_LAYOUTS,
  ANIMATION_DELAYS,
  BREAKPOINTS,
} from './constants';

// Utils
export {
  getCategoryConfig,
  getCategoryColor,
  getCategoryLabel,
  getCategoryIcon,
  filterFeaturesByCategory,
  filterFeaturesByPriority,
  getUniqueCategories,
  sortFeaturesByPriority,
  groupFeaturesByCategory,
  calculateAnimationDelay,
  generateGridClasses,
  isNewFeature,
  isComingSoonFeature,
  getFeatureStatusBadge,
  getFeatureStatusBadgeVariant,
  truncateDescription,
  generateFeatureCardId,
  generateFeatureCardAriaLabel,
  matchesSearchQuery,
  filterFeaturesBySearch,
  getResponsiveImageUrl,
} from './utils';

// Hooks
export {
  useFeatureFiltering,
  useFeatureAnimations,
  useFeatureInteractions,
  useResponsiveLayout,
  useFeatureVisibility,
} from './hooks';
