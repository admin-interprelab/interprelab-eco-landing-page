import { useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  DollarSign,
  Phone,
} from "lucide-react";

// Constants for better maintainability
const DEFAULT_CHART_HEIGHT = 250;
const DEFAULT_CHART_MARGIN = { top: 5, right: 30, left: -10, bottom: 0 };
const GRID_STROKE_DASHARRAY = "3 3";
const BAR_RADIUS = 4;
const AXIS_FONT_SIZE = 12;
const TICK_MARGIN = 8;

const COMPONENT_TITLE = "Weekly Activity";
const COMPONENT_DESCRIPTION =
  "Your call and earnings trend analysis for the last 7 days.";
const NO_DATA_MESSAGE = "No activity data available for the selected period.";

// Chart configuration with semantic colors and proper typing
const CHART_CONFIG = {
  calls: {
    label: "Calls",
    color: "hsl(var(--primary))",
    icon: Phone,
  },
  earnings: {
    label: "Earnings",
    color: "hsl(var(--accent))",
    icon: DollarSign,
  },
} as const satisfies ChartConfig;

// Types for better type safety
interface DayData {
  day: string;
  calls: number;
  earnings: number;
  date?: Date;
}

interface WeeklyStats {
  totalCalls: number;
  totalEarnings: number;
  averageCalls: number;
  averageEarnings: number;
  peakDay: string;
  peakCalls: number;
  peakEarnings: number;
}

interface WeeklyChartProps {
  /** Weekly activity data for the chart */
  data: DayData[];
  /** Optional custom height for the chart */
  height?: number;
  /** Custom title override */
  title?: string;
  /** Custom description override */
  description?: string;
  /** Whether to show summary statistics */
  showStats?: boolean;
  /** Whether to show average reference lines */
  showAverageLines?: boolean;
  /** Whether to show legend */
  showLegend?: boolean;
  /** Chart type: 'grouped' or 'stacked' */
  chartType?: "grouped" | "stacked";
  /** Currency symbol for earnings formatting */
  currencySymbol?: string;
}

/**
 * Formats currency values for display
 * @param value - The currency value
 * @param symbol - Currency symbol (default: $)
 * @returns Formatted currency string
 */
const formatCurrency = (value: number, symbol: string = "$"): string => {
  if (value >= 1000) {
    return `${symbol}${(value / 1000).toFixed(1)}K`;
  }
  return `${symbol}${value.toFixed(0)}`;
};

/**
 * Formats day names for better display
 * @param day - Day string (e.g., "Mon", "Monday")
 * @returns Formatted day string
 */
const formatDayName = (day: string): string => {
  // If it's already a short form, return as is
  if (day.length <= 3) return day;

  // Convert full day names to short form
  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  return dayMap[day] || day.slice(0, 3);
};

/**
 * Chart Header Component
 * Displays title, description, and optional summary statistics
 */
interface ChartHeaderProps {
  title: string;
  description: string;
  stats?: WeeklyStats;
  showStats?: boolean;
}

const ChartHeader = ({
  title,
  description,
  stats,
  showStats,
}: ChartHeaderProps) => (
  <CardHeader>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {showStats && stats && (
        <div className="text-right space-y-1">
          <div className="text-2xl font-bold text-foreground">
            {stats.totalCalls}
          </div>
          <div className="text-xs text-muted-foreground">Total Calls</div>
        </div>
      )}
    </div>
    {showStats && stats && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {stats.averageCalls.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">Avg Calls/Day</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">
            {formatCurrency(stats.averageEarnings)}
          </div>
          <div className="text-xs text-muted-foreground">Avg Earnings/Day</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {stats.peakDay}
          </div>
          <div className="text-xs text-muted-foreground">Peak Day</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">
            {formatCurrency(stats.totalEarnings)}
          </div>
          <div className="text-xs text-muted-foreground">Total Earnings</div>
        </div>
      </div>
    )}
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
    <Calendar className="h-12 w-12 text-muted-foreground/50" />
    <div className="space-y-2">
      <p className="text-muted-foreground font-medium">No Activity Data</p>
      <p className="text-sm text-muted-foreground/80 max-w-sm">{message}</p>
    </div>
  </div>
);

/**
 * Custom hook for processing weekly data
 * Calculates statistics and formats data for chart consumption
 */
const useWeeklyData = (data: DayData[]) => {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return {
        processedData: [],
        stats: null,
        hasData: false,
      };
    }

    // Process data with formatted day names
    const processedData = data.map((item) => ({
      ...item,
      day: formatDayName(item.day),
    }));

    // Calculate statistics
    const totalCalls = data.reduce((sum, item) => sum + item.calls, 0);
    const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
    const averageCalls = totalCalls / data.length;
    const averageEarnings = totalEarnings / data.length;

    // Find peak day
    const peakDayData = data.reduce((peak, current) =>
      current.calls > peak.calls ? current : peak
    );

    const stats: WeeklyStats = {
      totalCalls,
      totalEarnings,
      averageCalls,
      averageEarnings,
      peakDay: formatDayName(peakDayData.day),
      peakCalls: peakDayData.calls,
      peakEarnings: peakDayData.earnings,
    };

    return {
      processedData,
      stats,
      hasData: true,
    };
  }, [data]);
};

/**
 * Custom Y-axis tick formatter
 * Formats Y-axis values based on data type
 */
const useAxisFormatters = (currencySymbol: string = "$") => {
  const formatEarningsAxis = useCallback(
    (value: number) => {
      return formatCurrency(value, currencySymbol);
    },
    [currencySymbol]
  );

  const formatCallsAxis = useCallback((value: number) => {
    return value.toString();
  }, []);

  return { formatEarningsAxis, formatCallsAxis };
};

/**
 * Weekly Chart Component
 *
 * A comprehensive weekly activity visualization that provides:
 * - Dual-axis bar chart showing calls and earnings
 * - Statistical summaries and insights
 * - Customizable appearance and behavior
 * - Interactive tooltips with formatted data
 * - Empty state handling for no data scenarios
 *
 * Features:
 * - Dual Y-axes for different data scales
 * - Responsive design with proper aspect ratios
 * - Optional average reference lines
 * - Customizable chart types (grouped/stacked)
 * - Statistical summary display
 * - Currency formatting with custom symbols
 * - Smooth animations and hover effects
 * - Accessible design with proper ARIA labels
 *
 * @param data - Weekly activity data containing day, calls, and earnings
 * @param height - Optional custom height for the chart (default: 250px)
 * @param title - Custom title override
 * @param description - Custom description override
 * @param showStats - Whether to show summary statistics (default: false)
 * @param showAverageLines - Whether to show average reference lines (default: false)
 * @param showLegend - Whether to show chart legend (default: false)
 * @param chartType - Chart display type: 'grouped' or 'stacked' (default: 'grouped')
 * @param currencySymbol - Currency symbol for earnings formatting (default: '$')
 */
export default function WeeklyChart({
  data,
  height = DEFAULT_CHART_HEIGHT,
  title = COMPONENT_TITLE,
  description = COMPONENT_DESCRIPTION,
  showStats = false,
  showAverageLines = false,
  showLegend = false,
  chartType = "grouped",
  currencySymbol = "$",
}: WeeklyChartProps) {
  const { processedData, stats, hasData } = useWeeklyData(data);

  // Safety check for invalid data
  if (!Array.isArray(data)) {
    return (
      <Card className="w-full">
        <ChartHeader
          title={title}
          description={description}
          showStats={showStats}
        />
        <CardContent className="flex flex-col min-h-[300px] justify-center">
          <EmptyState message="Invalid chart data format" />
        </CardContent>
      </Card>
    );
  }
  const { formatEarningsAxis, formatCallsAxis } =
    useAxisFormatters(currencySymbol);

  return (
    <Card className="w-full">
      <ChartHeader
        title={title}
        description={description}
        stats={stats || undefined}
        showStats={showStats}
      />

      <CardContent className="flex flex-col" style={{ minHeight: `${height + 50}px` }}>
        {hasData ? (
          <ChartContainer
            config={CHART_CONFIG}
            className="w-full"
            style={{ height: `${height}px`, minHeight: `${height}px` }}
          >
            <ResponsiveContainer width="100%" height="100%" minHeight={height}>
              <BarChart data={processedData} margin={DEFAULT_CHART_MARGIN}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray={GRID_STROKE_DASHARRAY}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={TICK_MARGIN}
                  fontSize={AXIS_FONT_SIZE}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="hsl(var(--primary))"
                  tickLine={false}
                  axisLine={false}
                  fontSize={AXIS_FONT_SIZE}
                  tickFormatter={formatCallsAxis}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--accent))"
                  tickLine={false}
                  axisLine={false}
                  fontSize={AXIS_FONT_SIZE}
                  tickFormatter={formatEarningsAxis}
                />

                {/* Average reference lines */}
                {showAverageLines && stats && (
                  <>
                    <ReferenceLine
                      yAxisId="left"
                      y={stats.averageCalls}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="5 5"
                      strokeOpacity={0.5}
                    />
                    <ReferenceLine
                      yAxisId="right"
                      y={stats.averageEarnings}
                      stroke="hsl(var(--accent))"
                      strokeDasharray="5 5"
                      strokeOpacity={0.5}
                    />
                  </>
                )}

                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                  content={<ChartTooltipContent indicator="dot" />}
                />

                {showLegend && (
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="rect"
                    wrapperStyle={{ paddingBottom: "20px" }}
                  />
                )}

                <Bar
                  yAxisId="left"
                  dataKey="calls"
                  fill="var(--color-calls)"
                  radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]}
                  name="Calls"
                />
                <Bar
                  yAxisId="right"
                  dataKey="earnings"
                  fill="var(--color-earnings)"
                  radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]}
                  name="Earnings"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <EmptyState message={NO_DATA_MESSAGE} />
        )}
      </CardContent>
    </Card>
  );
}
