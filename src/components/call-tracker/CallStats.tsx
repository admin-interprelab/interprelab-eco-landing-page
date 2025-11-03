/**
 * Call Stats Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign, Phone } from 'lucide-react';
import type { CallStatsProps } from './types';
import { formatDuration, formatCurrency } from './utils';

/**
 * Call Stats Component
 *
 * Displays call statistics and earnings summary
 */
export const CallStats = ({
  className = '',
  userSettings,
  totalSessions = 0,
  totalEarnings = 0,
  averageSessionLength = 0,
}: CallStatsProps) => {
  const formattedEarnings = userSettings
    ? formatCurrency(totalEarnings, userSettings.preferred_currency)
    : formatCurrency(totalEarnings);

  const formattedAverageLength = formatDuration(Math.floor(averageSessionLength));

  const stats = [
    {
      icon: Phone,
      label: 'Total Sessions',
      value: totalSessions.toString(),
      description: 'Completed calls',
    },
    {
      icon: DollarSign,
      label: 'Total Earnings',
      value: formattedEarnings,
      description: 'All-time earnings',
    },
    {
      icon: Clock,
      label: 'Average Length',
      value: formattedAverageLength,
      description: 'Per session',
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: '100%',
      description: 'Completed calls',
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Call Statistics</CardTitle>
        <CardDescription>
          Your call tracking performance overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;

            return (
              <div key={index} className="text-center p-3 rounded-lg bg-muted/50">
                <div className="flex justify-center mb-2">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
