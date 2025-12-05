/**
 * Stats Components Barrel Export
 */

// Main Component
export { StatsSection } from './StatsSection';

// Sub Components
export { StatsHeader } from './StatsHeader';
export { StatCard } from './StatCard';
export { StatsGrid } from './StatsGrid';

// Types
export type {
  StatItem,
  StatsSectionProps,
  StatCardProps,
  StatsHeaderProps,
  StatsGridProps,
  StatsContextType,
  StatsProviderProps,
} from './types';

// Constants
export {
  DEFAULT_STATS,
  DEFAULT_HEADER,
  GRADIENT_PRESETS,
  ANIMATION_CONFIG,
  GRID_COLUMNS,
  CARD_VARIANTS,
  TREND_COLORS,
  TREND_ICONS,
} from './constants';

// Utils
export {
  getStatGradient,
  getGridColumns,
  getCardVariantClasses,
  getTrendColor,
  getTrendIcon,
  formatStatValue,
  parseStatValue,
  animateCountUp,
  getAnimationDelay,
  validateStat,
  filterStats,
  sortStats,
  getStatById,
  generateStatAnalytics,
  calculateStatsTotal,
  getStatsSummary,
  isInViewport,
  debounce,
  formatTrend,
} from './utils';

// Hooks
export {
  StatsProvider,
  useStats,
  useStatsAnimations,
  useStatsInteractions,
  useStatsResponsive,
  useStatsFilter,
  useStatsAnalytics,
} from './hooks';
