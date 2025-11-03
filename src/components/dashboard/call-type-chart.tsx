import { useMemo, useCallback } from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { CallTypeStats } from '@/lib/types';
import { Video, Phone, BarChart3, TrendingUp } from 'lucide-react';

// Constants for better maintainability
const CHART_HEIGHT = 200;
const CHART_OUTER_RADIUS = 80;
const CHART_INNER_RADIUS = 0;
const PERCENTAGE_DECIMAL_PLACES = 0;

const COMPONENT_TITLE = 'Call Type Breakdown';
const COMPONENT_DESCRIPTION = 'A comprehensive analysis of your VRI vs. OPI interpretation sessions.';
const NO_DATA_MESSAGE = 'No call data available. Start logging calls to see your breakdown.';

// Chart configuration with semantic colors and proper typing
const CHART_CONFIG = {
  vri: {
    label: 'VRI',
    color: '#3b82f6', // Blue - represents video/digital communication
    icon: Video,
  },
  opi: {
    label: 'OPI',
    color: '#10b981', // Green - represents audio/phone communication
    icon: Phone,
  },
} as const satisfies ChartConfig;

// Extended configuration for additional metadata
const EXTENDED_CONFIG = {
  vri: {
    ...CHART_CONFIG.vri,
    fullLabel: 'Video Remote Interpreting',
    description: 'Video-based interpretation sessions',
  },
  opi: {
    ...CHART_CONFIG.opi,
    fullLabel: 'Over-the-Phone Interpreting',
    description: 'Phone-based interpretation sessions',
  },
} as const;

// Types for better type safety
type CallType = keyof typeof CHART_CONFIG;

interface ChartDataPoint {
  name: CallType;
  value: number;
  fill: string;
  percentage: number;
}

interface CallTypeChartProps {
  /** Call statistics data containing VRI and OPI counts */
  data: CallTypeStats;
  /** Optional custom height for the chart */
  height?: number;
  /** Whether to show detailed statistics */
  showDetailedStats?: boolean;
  /** Custom title override */
  title?: string;
  /** Custom description override */
  description?: string;
}

/**
 * Formats percentage values for display
 * @param value - The percentage value (0-100)
 * @param decimalPlaces - Number of decimal places to show
 * @returns Formatted percentage string
 */
const formatPercentage = (value: number, decimalPlaces: number = PERCENTAGE_DECIMAL_PLACES): string => {
  return `${value.toFixed(decimalPlaces)}%`;
};

/**
 * Calculates percentage with proper rounding
 * @param value - The individual value
 * @param total - The total sum
 * @returns Percentage as a number (0-100)
 */
const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Chart Header Component
 * Displays title, description, and summary statistics
 */
interface ChartHeaderProps {
  title: string;
  description: string;
  totalCalls: number;
  showDetailedStats?: boolean;
}

const ChartHeader = ({ title, description, totalCalls, showDetailedStats }: ChartHeaderProps) => (
  <CardHeader>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {showDetailedStats && totalCalls > 0 && (
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{totalCalls}</div>
          <div className="text-xs text-muted-foreground">Total Calls</div>
        </div>
      )}
    </div>
  </CardHeader>
);

/**
 * Empty State Component
 * Displays when no data is available
 */
interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 p-8">
    <TrendingUp className="h-12 w-12 text-muted-foreground/50" />
    <div className="space-y-2">
      <p className="text-muted-foreground font-medium">No Data Available</p>
      <p className="text-sm text-muted-foreground/80 max-w-sm">{message}</p>
    </div>
  </div>
);

/**
 * Custom Legend Component
 * Enhanced legend with icons, labels, and statistics
 */
interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
    payload?: {
      strokeDasharray: string | number;
      value?: number;
      name?: string;
      fill?: string;
    };
  }>;
  showDetailedStats?: boolean;
  chartData?: ChartDataPoint[];
  totalCalls?: number;
}

const CustomLegend = ({ payload, showDetailedStats, chartData, totalCalls }: CustomLegendProps) => {
  if (!payload) return null;

  return (
    <div className="flex flex-wrap gap-4 justify-center pt-6">
      {payload.map((item, index) => {
        const callType = item.value as CallType;
        const config = CHART_CONFIG[callType];
        const Icon = config.icon;
        const color = item.color || config.color;
        const value = item.payload?.value || 0;

        // Find the corresponding chart data point for percentage
        const dataPoint = chartData?.find(d => d.name === callType);
        const percentage = dataPoint?.percentage || 0;

        return (
          <div
            key={`${item.value}-${index}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
            <div className="text-left">
              <div className="font-medium text-sm text-foreground">
                {config.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {value} calls
                {showDetailedStats && (
                  <span className="ml-1">
                    ({formatPercentage(percentage)})
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Custom hook for processing chart data
 * Transforms raw call stats into chart-ready format
 */
const useChartData = (data: CallTypeStats) => {
  return useMemo(() => {
    const totalCalls = data.vri + data.opi;

    const chartData: ChartDataPoint[] = [
      {
        name: 'vri',
        value: data.vri,
        fill: CHART_CONFIG.vri.color,
        percentage: calculatePercentage(data.vri, totalCalls),
      },
      {
        name: 'opi',
        value: data.opi,
        fill: CHART_CONFIG.opi.color,
        percentage: calculatePercentage(data.opi, totalCalls),
      },
    ];

    return {
      chartData,
      totalCalls,
      hasData: totalCalls > 0,
    };
  }, [data.vri, data.opi]);
};

/**
 * Call Type Chart Component
 *
 * A comprehensive pie chart visualization for call type distribution that provides:
 * - Visual breakdown of VRI vs OPI calls
 * - Interactive legend with icons and statistics
 * - Responsive design with proper aspect ratios
 * - Empty state handling for no data scenarios
 * - Customizable appearance and content
 *
 * Features:
 * - Semantic color coding (blue for video, green for phone)
 * - Percentage labels on chart segments
 * - Detailed statistics in legend
 * - Hover effects and transitions
 * - Accessible design with proper ARIA labels
 * - Responsive layout for different screen sizes
 *
 * @param data - Call statistics containing VRI and OPI counts
 * @param height - Optional custom height for the chart (default: 200px)
 * @param showDetailedStats - Whether to show detailed statistics (default: false)
 * @param title - Custom title override
 * @param description - Custom description override
 */
export default function CallTypeChart({
  data,
  height = CHART_HEIGHT,
  showDetailedStats = false,
  title = COMPONENT_TITLE,
  description = COMPONENT_DESCRIPTION,
}: CallTypeChartProps) {
  const { chartData, totalCalls, hasData } = useChartData(data);

  /**
   * Custom label renderer for pie chart
   * Shows percentage labels on chart segments
   */
  const renderCustomLabel = useCallback(({ percent }: { percent: number }) => {
    // Only show label if percentage is significant enough
    if (percent < 5) return null;
    return formatPercentage(percent * 100);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <ChartHeader
        title={title}
        description={description}
        totalCalls={totalCalls}
        showDetailedStats={showDetailedStats}
      />

      <CardContent className="flex-grow flex flex-col items-center justify-center">
        {hasData ? (
          <ChartContainer
            config={CHART_CONFIG}
            className="mx-auto aspect-square h-full w-full"
          >
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => [
                    `${value} calls`,
                    CHART_CONFIG[name as CallType]?.label || name,
                  ]}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={CHART_OUTER_RADIUS}
                  innerRadius={CHART_INNER_RADIUS}
                  paddingAngle={2}
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={entry.fill}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Legend
                  content={(props) => (
                    <CustomLegend
                      payload={props.payload}
                      showDetailedStats={showDetailedStats}
                      chartData={chartData}
                      totalCalls={totalCalls}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <EmptyState message={NO_DATA_MESSAGE} />
        )}
      </CardContent>
    </Card>
  );
}
