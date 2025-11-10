import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePremium } from '@/contexts/PremiumContext';
import { PremiumUpgradeCard } from '@/components/premium/PremiumUpgradeCard';
import { BarChart3, DollarSign, Phone } from 'lucide-react';

interface HeatmapData {
  day: number; // 0 = Sun, 6 = Sat
  hour: number; // 0-23
  value: number;
}

const mockEarningsData: HeatmapData[] = [
  { day: 1, hour: 10, value: 150 }, { day: 1, hour: 11, value: 200 },
  { day: 2, hour: 14, value: 180 }, { day: 3, hour: 9, value: 250 },
  { day: 3, hour: 10, value: 300 }, { day: 5, hour: 13, value: 220 },
];

const mockCallsData: HeatmapData[] = [
  { day: 1, hour: 10, value: 5 }, { day: 1, hour: 11, value: 6 },
  { day: 2, hour: 14, value: 4 }, { day: 3, hour: 9, value: 7 },
  { day: 3, hour: 10, value: 8 }, { day: 5, hour: 13, value: 5 },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = Array.from({ length: 13 }, (_, i) => `${i + 8}h`); // 8am to 8pm

export const PerformanceHeatmap: React.FC = () => {
  const { isPremium } = usePremium();
  const [view, setView] = useState<'earnings' | 'calls'>('earnings');

  if (!isPremium) {
    return <PremiumUpgradeCard featureName="Performance Heatmap" />;
  }

  const data = view === 'earnings' ? mockEarningsData : mockCallsData;
  const maxValue = Math.max(...data.map(d => d.value), 1);

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
            const opacity = cellData ? (cellData.value / maxValue) * 0.8 + 0.2 : 0.1;
            return (
              <div
                key={`${day}-${hour}`}
                className="w-full aspect-square rounded bg-primary"
                style={{ opacity }}
                title={`${days[day]} at ${hour}:00 - ${cellData ? cellData.value : 0} ${view}`}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceHeatmap;

