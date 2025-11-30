import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { usePremium } from '@/contexts/PremiumContext';
import { PremiumUpgradeCard } from '@/components/premium/PremiumUpgradeCard';
import { BarChart3, DollarSign, Phone, AlertTriangle } from 'lucide-react';
import { usePerformanceHeatmap } from '@/hooks/usePerformanceHeatmap';
import { cn } from '@/lib/utils';

interface HeatmapData {
  day: number; // 0 = Sun, 6 = Sat
  hour: number; // 0-23
  value: number;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = Array.from({ length: 13 }, (_, i) => `${i + 8}h`); // 8am to 8pm

export const PerformanceHeatmap: React.FC = () => {
  const { isPremium } = usePremium();
  const [view, setView] = useState<'earnings' | 'calls'>('earnings');

  const { data: rawData, isLoading, isError, error } = usePerformanceHeatmap();

  if (!isPremium) {
    return <PremiumUpgradeCard featureName="Performance Heatmap" />;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Performance Heatmap
          </CardTitle>
          <CardDescription>Could not load your performance data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  // Process the fetched data
  const processedData: HeatmapData[] = (rawData || []).map(item => ({
    day: item.day_of_week,
    hour: item.hour_of_day,
    value: view === 'earnings' ? item.total_earnings : item.total_calls,
  }));

  const aggregatedData = processedData.reduce((acc, curr) => {
    const key = `${curr.day}-${curr.hour}`;
    if (!acc[key]) {
      acc[key] = { ...curr, value: 0 };
    }
    acc[key].value += curr.value;
    return acc;
  }, {} as Record<string, HeatmapData>);

  const data = Object.values(aggregatedData);
  const maxValue = Math.max(...data.map(d => d.value), 0);

  const getCellData = (day: number, hour: number) => {
    return data.find(d => d.day === day && d.hour === hour);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg">Performance Heatmap</CardTitle>
          </div>
          <div className="flex gap-1 border p-1 rounded-md">
            <Button size="xs" variant={view === 'earnings' ? 'secondary' : 'ghost'} onClick={() => setView('earnings')}>
              <DollarSign className="w-4 h-4" />
            </Button>
            <Button size="xs" variant={view === 'calls' ? 'secondary' : 'ghost'} onClick={() => setView('calls')}>
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Your most active times by {view}. Darker means more activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayLabel, dayIndex) => (
            <div key={dayLabel} className="text-center text-xs text-muted-foreground">{dayLabel}</div>
          ))}
          {Array.from({ length: 7 * 13 }).map((_, i) => {
            const day = i % 7;
            const hour = Math.floor(i / 7) + 8;
            const cellData = getCellData(day, hour);
            const opacity = maxValue > 0 && cellData ? (cellData.value / maxValue) * 0.9 + 0.1 : 0.1;
            return (
              <div
                key={`${day}-${hour}`}
                className="w-full aspect-square rounded bg-primary"
                style={{ opacity }}
                title={`${days[day]} at ${hour}:00 - ${cellData ? (view === 'earnings' ? `$${cellData.value.toFixed(2)}` : `${cellData.value} calls`) : `0 ${view}`}`}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceHeatmap;
