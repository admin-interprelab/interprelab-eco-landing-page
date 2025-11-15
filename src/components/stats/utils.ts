/**
 * Stats Section Component Utilities
 */

import type { StatItem } from './types';
import { GRADIENT_PRESETS, GRID_COLUMNS, CARD_VARIANTS, TREND_COLORS, TREND_ICONS } from './constants';

/**
 * Get gradient classes for stat icons
 */
export const getStatGradient = (gradient: string): string => {
  return GRADIENT_PRESETS[gradient as keyof typeof GRADIENT_PRESETS] || gradient;
};

/**
 * Get grid column classes
 */
export const getGridColumns = (columns: 2 | 3 | 4 | 'auto', statsCount: number): string => {
  if (columns === 'auto') {
    if (statsCount <= 2) return GRID_COLUMNS[2];
    if (statsCount === 3) return GRID_COLUMNS[3];
    return GRID_COLUMNS[4];
  }
  return GRID_COLUMNS[columns];
};

/**
 * Get card variant classes
 */
export const getCardVariantClasses = (variant: 'default' | 'compact' | 'detailed' | 'minimal'): string => {
  return CARD_VARIANTS[variant];
};

/**
 * Get trend color class
 */
export const getTrendColor = (direction: 'up' | 'down' | 'neutral'): string => {
  return TREND_COLORS[direction];
};

/**
 * Get trend icon
 */
export const getTrendIcon = (direction: 'up' | 'down' | 'neutral'): string => {
  return TREND_ICONS[direction];
};

/**
 * Format stat value for display
 */
export const formatStatValue = (stat: StatItem): string => {
  const { value, prefix = '', suffix = '' } = stat;
  return `${prefix}${value}${suffix}`;
};

/**
 * Parse numeric value from stat
 */
export const parseStatValue = (value: string | number): number => {
  if (typeof value === 'number') return value;

  // Remove common suffixes and prefixes
  const cleaned = value.toString()
    .replace(/[+%$,]/g, '')
    .replace(/k$/i, '000')
    .replace(/m$/i, '000000')
    .replace(/b$/i, '000000000');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Animate number counting up
 */
export const animateCountUp = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2000,
  suffix: string = ''
): void => {
  const startTime = Date.now();
  const range = end - start;

  const updateCount = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (range * easeOut));

    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = `${end}${suffix}`;
    }
  };

  requestAnimationFrame(updateCount);
};

/**
 * Generate animation delay for staggered effects
 */
export const getAnimationDelay = (index: number, staggerDelay: number = 150): string => {
  return `${index * staggerDelay}ms`;
};

/**
 * Validate stat item
 */
export const validateStat = (stat: Partial<StatItem>): boolean => {
  return Boolean(
    stat.id &&
    stat.icon &&
    stat.value !== undefined &&
    stat.label &&
    stat.gradient
  );
};

/**
 * Filter stats by criteria
 */
export const filterStats = (
  stats: StatItem[],
  criteria: {
    hasAnimation?: boolean;
    hasTrend?: boolean;
    minValue?: number;
  }
): StatItem[] => {
  return stats.filter(stat => {
    if (criteria.hasAnimation !== undefined && Boolean(stat.animated) !== criteria.hasAnimation) {
      return false;
    }

    if (criteria.hasTrend !== undefined && Boolean(stat.trend) !== criteria.hasTrend) {
      return false;
    }

    if (criteria.minValue !== undefined) {
      const numericValue = parseStatValue(stat.value);
      if (numericValue < criteria.minValue) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort stats by various criteria
 */
export const sortStats = (
  stats: StatItem[],
  sortBy: 'value' | 'label' | 'trend' | 'original' = 'original'
): StatItem[] => {
  if (sortBy === 'original') return stats;

  return [...stats].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return parseStatValue(b.value) - parseStatValue(a.value);
      case 'label':
        return a.label.localeCompare(b.label);
      case 'trend': {
        const aTrend = a.trend?.value || 0;
        const bTrend = b.trend?.value || 0;
        return bTrend - aTrend;
      }
      default:
        return 0;
    }
  });
};

/**
 * Get stat by ID
 */
export const getStatById = (stats: StatItem[], id: string): StatItem | null => {
  return stats.find(stat => stat.id === id) || null;
};

/**
 * Generate stat analytics data
 */
export const generateStatAnalytics = (stat: StatItem) => {
  return {
    event: 'stat_viewed',
    stat_id: stat.id,
    stat_label: stat.label,
    stat_value: stat.value,
    has_trend: Boolean(stat.trend),
    is_animated: Boolean(stat.animated),
  };
};

/**
 * Calculate total from stats
 */
export const calculateStatsTotal = (stats: StatItem[]): number => {
  return stats.reduce((total, stat) => {
    const numericValue = parseStatValue(stat.value);
    return total + numericValue;
  }, 0);
};

/**
 * Get stats summary
 */
export const getStatsSummary = (stats: StatItem[]) => {
  const total = calculateStatsTotal(stats);
  const withTrends = stats.filter(stat => stat.trend).length;
  const animated = stats.filter(stat => stat.animated).length;
  const averageTrend = stats
    .filter(stat => stat.trend)
    .reduce((sum, stat) => sum + (stat.trend?.value || 0), 0) / withTrends || 0;

  return {
    totalStats: stats.length,
    totalValue: total,
    withTrends,
    animated,
    averageTrend: Math.round(averageTrend * 10) / 10,
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Debounce function
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
 * Format trend display
 */
export const formatTrend = (trend: StatItem['trend']): string => {
  if (!trend) return '';

  const icon = getTrendIcon(trend.direction);
  const sign = trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : '';

  return `${icon} ${sign}${trend.value}% ${trend.period}`;
};
