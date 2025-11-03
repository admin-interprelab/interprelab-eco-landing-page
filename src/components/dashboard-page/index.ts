/**
 * Dashboard Page Components Export
 */

export { Dashboard } from './Dashboard';
export { DashboardHeader } from './DashboardHeader';
export { StatsCards } from './StatsCards';
export { RecentCalls } from './RecentCalls';

// Hooks
export {
  useDashboardData,
  useDashboardAnalytics,
  useDashboardPreferences
} from './hooks';

// Types
export type {
  DashboardStats,
  CallLogEntry,
  DashboardPageProps,
  StatsCardsProps,
  RecentCallsProps,
  DashboardHeaderProps,
} from './types';

// Constants
export {
  DEFAULT_CURRENCY,
  STATS_CONFIG,
  DATE_FORMATS,
  EMPTY_STATES,
} from './constants';

// Utils
export {
  calculateStats,
  formatDuration,
  formatCurrency,
  getDateRanges,
  filterCallsByDateRange,
  processDashboardStats,
  isValidCallEntry,
  sanitizeCallData,
  calculateEarningsPerHour,
  getPerformanceIndicators,
} from './utils';
