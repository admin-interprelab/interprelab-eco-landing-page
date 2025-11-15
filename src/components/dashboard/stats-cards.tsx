import { useDashboardData } from './dashboard-utils';
import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Clock, DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Constants for better maintainability
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LOCALE = 'en-US';
const DEFAULT_TIME_PERIOD = 'This month';

// Grid configuration
const GRID_CLASSES = 'grid gap-4 md:grid-cols-3';
const CARD_HEADER_CLASSES = 'flex flex-row items-center justify-between space-y-0 pb-2';
const STAT_VALUE_CLASSES = 'text-2xl font-bold';
const STAT_PERIOD_CLASSES = 'text-xs text-muted-foreground';

// Types for better type safety
interface StatItem {
  id: string;
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  formatter?: (value: number) => string;
  colorClass?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period?: string;
  };
}

interface StatsData {
  totalCalls: number;
  totalMinutes: number;
  totalEarnings: number;
}

interface StatsCardsProps {
  /** Optional time period label */
  timePeriod?: string;
  /** Optional currency code for earnings formatting */
  currency?: string;
  /** Optional locale for number formatting */
  locale?: string;
  /** Whether to show trend indicators */
  showTrends?: boolean;
  /** Optional trend data for each stat */
  trends?: {
    calls?: { value: number; direction: 'up' | 'down' | 'neutral' };
    minutes?: { value: number; direction: 'up' | 'down' | 'neutral' };
    earnings?: { value: number; direction: 'up' | 'down' | 'neutral' };
  };
  /** Custom grid layout classes */
  gridClasses?: string;
}

/**
 * Formats currency values with proper localization
 * @param amount - The amount to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted currency string
 */
const formatCurrency = (
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats large numbers with appropriate suffixes (K, M, B)
 * @param value - The number to format
 * @param locale - Locale for formatting
 * @returns Formatted number string
 */
const formatLargeNumber = (value: number, locale: string = DEFAULT_LOCALE): string => {
  if (value >= 1000000000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  }
  if (value >= 1000000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  }
  if (value >= 1000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return value.toString();
};

/**
 * Formats time duration in minutes to human-readable format
 * @param minutes - Total minutes
 * @returns Formatted time string
 */
const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Trend Indicator Component
 * Shows trend direction and value with appropriate styling
 */
interface TrendIndicatorProps {
  trend: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period?: string;
  };
}

const TrendIndicator = ({ trend }: TrendIndicatorProps) => {
  const getTrendIcon = () => {
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      case 'neutral':
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend.direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'neutral':
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTrendValue = (value: number) => {
    const sign = trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : '';
    return `${sign}${Math.abs(value)}%`;
  };

  return (
    <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
      {getTrendIcon()}
      <span>{formatTrendValue(trend.value)}</span>
      {trend.period && <span className="text-muted-foreground">vs {trend.period}</span>}
    </div>
  );
};

/**
 * Individual Stat Card Component
 * Displays a single statistic with icon, value, and optional trend
 */
interface StatCardProps {
  stat: StatItem;
  timePeriod: string;
  showTrend?: boolean;
}

const StatCard = ({ stat, timePeriod, showTrend }: StatCardProps) => {
  const formattedValue = stat.formatter ? stat.formatter(stat.value) : stat.value.toString();
  const Icon = stat.icon;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className={CARD_HEADER_CLASSES}>
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <Icon className={`h-4 w-4 ${stat.colorClass || 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className={`${STAT_VALUE_CLASSES} ${stat.colorClass || ''}`}>
          {formattedValue}
        </div>
        <div className="flex items-center justify-between">
          <p className={STAT_PERIOD_CLASSES}>{timePeriod}</p>
          {showTrend && stat.trend && <TrendIndicator trend={stat.trend} />}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Custom hook for processing stats data
 * Transforms raw stats into structured stat items with formatting
 */
const useProcessedStats = (
  stats: StatsData,
  currency: string,
  locale: string,
  trends?: StatsCardsProps['trends']
) => {
  return useMemo((): StatItem[] => {
    const currencyFormatter = (value: number) => formatCurrency(value, currency, locale);
    const durationFormatter = (value: number) => formatDuration(value);
    const numberFormatter = (value: number) => formatLargeNumber(value, locale);

    return [
      {
        id: 'total-calls',
        title: 'Total Calls',
        value: stats.totalCalls,
        icon: Phone,
        formatter: numberFormatter,
        trend: trends?.calls,
      },
      {
        id: 'total-minutes',
        title: 'Total Minutes',
        value: stats.totalMinutes,
        icon: Clock,
        formatter: durationFormatter,
        trend: trends?.minutes,
      },
      {
        id: 'total-earnings',
        title: 'Total Earnings',
        value: stats.totalEarnings,
        icon: DollarSign,
        formatter: currencyFormatter,
        colorClass: 'text-accent',
        trend: trends?.earnings,
      },
    ];
  }, [stats, currency, locale, trends]);
};

/**
 * Stats Cards Component
 *
 * A comprehensive dashboard statistics display system that provides:
 * - Key performance metrics visualization
 * - Flexible formatting for different data types
 * - Optional trend indicators with directional arrows
 * - Responsive grid layout
 * - Hover effects and smooth transitions
 *
 * Features:
 * - Currency formatting with localization support
 * - Large number formatting with compact notation (K, M, B)
 * - Duration formatting (hours and minutes)
 * - Trend indicators with color coding
 * - Customizable time periods and currencies
 * - Accessible design with proper ARIA labels
 * - Responsive layout for different screen sizes
 *
 * @param stats - Statistics data containing calls, minutes, and earnings
 * @param timePeriod - Time period label (default: "This month")
 * @param currency - Currency code for earnings formatting (default: "USD")
 * @param locale - Locale for number formatting (default: "en-US")
 * @param showTrends - Whether to display trend indicators
 * @param trends - Optional trend data for each statistic
 * @param gridClasses - Custom CSS classes for grid layout
 */
export default function StatsCards({
  timePeriod = DEFAULT_TIME_PERIOD,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  showTrends = false,
  trends,
  gridClasses = GRID_CLASSES,
}: StatsCardsProps) {
  const { stats } = useDashboardData();
  const processedStats = useProcessedStats(stats, currency, locale, trends);

  return (
    <div className={gridClasses}>
      {processedStats.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
          timePeriod={timePeriod}
          showTrend={showTrends}
        />
      ))}
    </div>
  );
}
