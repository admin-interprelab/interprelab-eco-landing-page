import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Badge } from '@/lib/ui/components/ui/badge';
import { Calendar, Clock, AlertCircle, TrendingUp } from 'lucide-react';

interface CallStats {
  monthCalls: number;
  totalSeconds: number;
  totalDuration: number;
  roundedSeconds: number;
  totalRounded: number;
  totalEarnings: number;
  totalRoundedEarnings: number;
  roundedEarnings: number;
  projectedEarnings: number;
  timeLost: number;
  earningsLost: number;
  roundingMethod: string;
}

interface MonthStatisticsProps {
  stats: CallStats | null;
  userSettings: any;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDurationMinutes: (seconds: number) => string;
}

export const MonthStatistics: React.FC<MonthStatisticsProps> = ({
  stats,
  userSettings,
  formatCurrency,
  formatDurationMinutes
}) => {
  if (!stats) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings, userSettings?.preferred_currency || 'USD')}</div>
            <p className="text-xs text-muted-foreground">
              {stats.monthCalls} calls • {formatDurationMinutes(stats.totalDuration)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDurationMinutes(stats.totalDuration)}</div>
            <p className="text-xs text-muted-foreground">
              Total call time tracked
            </p>
          </CardContent>
        </Card>

        {stats.roundingMethod !== 'actual' && (
          <>
            <Card className="border-orange-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">LSP Reported Time</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{formatDurationMinutes(stats.totalRounded)}</div>
                <p className="text-xs text-muted-foreground">
                  Rounded down by LSP
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time "Lost"</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{formatDurationMinutes(stats.timeLost)}</div>
                <p className="text-xs text-muted-foreground">
                  ≈ {formatCurrency(Math.abs(stats.earningsLost), userSettings?.preferred_currency || 'USD')} unpaid
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Transparency Message */}
      {stats.roundingMethod !== 'actual' && stats.timeLost > 0 && (
        <Card className="mb-8 border-orange-500/20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-orange-500 text-white">Transparency Report</Badge>
            <CardTitle className="text-orange-900 dark:text-orange-100">The Seconds Add Up</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 dark:text-orange-200 mb-4">
              This month, <strong>{formatDurationMinutes(stats.timeLost)}</strong> of your work went uncompensated due to rounding practices. 
              At 18-25 calls per day with minimal wait time, these "seconds" compound into real money—money that LSPs keep.
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              We don't need to call it out explicitly. The numbers speak for themselves. InterpreLab provides precision logging 
              so you can see the full picture. We're building tools for interpreters, not corporations.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
