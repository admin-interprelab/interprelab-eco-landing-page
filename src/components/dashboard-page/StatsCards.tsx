/**
 * Stats Cards Component
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Clock, TrendingUp, Phone } from 'lucide-react';
import { formatCurrency, formatDuration } from './utils';
import type { StatsCardsProps } from './types';

const ICON_MAP = {
  Calendar,
  TrendingUp,
  Clock,
  Phone,
};

/**
 * StatsCards Component
 *
 * Dashboard statistics cards with:
 * - Monthly and yearly earnings
 * - Call counts and durations
 * - Average metrics
 * - Customizable display options
 */
export const StatsCards = React.memo<StatsCardsProps>(({
  stats,
  currency,
  className = "",
  showMonthly = true,
  showYearly = true,
  showAverage = true,
  showTotal = true,
}) => {
  const cards = [
    {
      key: 'monthly',
      show: showMonthly,
      title: 'This Month',
      icon: Calendar,
      value: formatCurrency(stats.monthEarnings, currency),
      subtext: `${stats.monthCalls} calls • ${formatDuration(stats.monthTotal)}`,
    },
    {
      key: 'yearly',
      show: showYearly,
      title: 'This Year',
      icon: TrendingUp,
      value: formatCurrency(stats.yearEarnings, currency),
      subtext: `${stats.yearCalls} calls • ${formatDuration(stats.yearTotal)}`,
    },
    {
      key: 'average',
      show: showAverage,
      title: 'Avg Call Duration',
      icon: Clock,
      value: formatDuration(stats.avgCallDuration),
      subtext: 'Across all calls',
    },
    {
      key: 'total',
      show: showTotal,
      title: 'Total Calls',
      icon: Phone,
      value: stats.totalCalls.toString(),
      subtext: 'All time',
    },
  ];

  const visibleCards = cards.filter(card => card.show);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(visibleCards.length, 4)} gap-6 mb-8 ${className}`}>
      {visibleCards.map((card) => {
        const IconComponent = card.icon;

        return (
          <Card key={card.key} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.subtext}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});
