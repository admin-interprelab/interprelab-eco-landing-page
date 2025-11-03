import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  RefreshCw,
  Download,
  Settings,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useDashboard } from './DashboardProvider';
import { format } from 'date-fns';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  showQuickStats?: boolean;
  showExportOptions?: boolean;
}

export default function DashboardHeader({
  title = 'InterpreTrack Dashboard',
  subtitle = 'Your interpretation activity at a glance',
  showQuickStats = true,
  showExportOptions = true,
}: DashboardHeaderProps) {
  const {
    stats,
    isLoading,
    lastUpdated,
    refreshData,
    exportData,
    getTimeRangeStats,
  } = useDashboard();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle manual refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshData]);

  // Handle export
  const handleExport = useCallback((format: 'csv' | 'json') => {
    exportData(format);
  }, [exportData]);

  // Get quick insights
  const todayStats = getTimeRangeStats(1);
  const weekStats = getTimeRangeStats(7);
  const monthStats = getTimeRangeStats(30);

  // Calculate trends (simplified)
  const weeklyTrend = weekStats.totalEarnings > 0 ?
    ((todayStats.totalEarnings * 7) / weekStats.totalEarnings - 1) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            {title}
            {isLoading && (
              <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
          </h1>
          <p className="text-muted-foreground">{subtitle}</p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {format(lastUpdated, 'MMM dd, yyyy • hh:mm a')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          {showExportOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('json')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      {showQuickStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {todayStats.totalCalls}
            </div>
            <div className="text-xs text-muted-foreground">Today's Calls</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              ${todayStats.totalEarnings.toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Today's Earnings</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {weekStats.totalCalls}
            </div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-foreground">
                {monthStats.totalCalls}
              </span>
              {weeklyTrend !== 0 && (
                <Badge
                  variant={weeklyTrend > 0 ? "default" : "destructive"}
                  className="text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {weeklyTrend > 0 ? '+' : ''}{weeklyTrend.toFixed(1)}%
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Data
        </Badge>

        {stats.totalCalls === 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            No calls logged yet
          </Badge>
        )}

        {stats.totalCalls > 0 && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {stats.totalCalls} total calls
          </Badge>
        )}

        {weeklyTrend > 10 && (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <TrendingUp className="h-3 w-3" />
            Strong week!
          </Badge>
        )}
      </div>
    </div>
  );
}
