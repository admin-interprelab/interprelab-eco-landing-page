/**
 * Dashboard Page Component Constants
 */

export const DEFAULT_CURRENCY = 'USD';

export const STATS_CONFIG = {
  REFRESH_INTERVAL: 300000, // 5 minutes
  DEFAULT_RECENT_CALLS_LIMIT: 5,
};

export const DATE_FORMATS = {
  CALL_DISPLAY: 'MMM dd, yyyy • hh:mm a',
  SHORT_DATE: 'MMM dd',
  FULL_DATE: 'MMMM dd, yyyy',
};

export const STAT_CARD_CONFIGS = [
  {
    key: 'monthly',
    title: 'This Month',
    icon: 'Calendar',
    getValue: (stats: any) => stats.monthEarnings,
    getSubtext: (stats: any) => `${stats.monthCalls} calls • ${formatDuration(stats.monthTotal)}`,
  },
  {
    key: 'yearly',
    title: 'This Year',
    icon: 'TrendingUp',
    getValue: (stats: any) => stats.yearEarnings,
    getSubtext: (stats: any) => `${stats.yearCalls} calls • ${formatDuration(stats.yearTotal)}`,
  },
  {
    key: 'average',
    title: 'Avg Call Duration',
    icon: 'Clock',
    getValue: (stats: any) => formatDuration(stats.avgCallDuration),
    getSubtext: () => 'Across all calls',
    isTime: true,
  },
  {
    key: 'total',
    title: 'Total Calls',
    icon: 'Phone',
    getValue: (stats: any) => stats.totalCalls,
    getSubtext: () => 'All time',
    isCount: true,
  },
];

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const EMPTY_STATES = {
  NO_CALLS: {
    title: 'No calls logged yet',
    description: 'Start tracking your calls to see them here.',
  },
  LOADING: {
    title: 'Loading...',
    description: 'Fetching your dashboard data.',
  },
  ERROR: {
    title: 'Unable to load data',
    description: 'Please try refreshing the page.',
  },
};
