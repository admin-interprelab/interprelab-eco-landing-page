import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeatmapData {
  hour: number;
  day: string;
  calls: number;
  earnings: number;
}

interface PerformanceHeatmapProps {
  data: HeatmapData[];
  isPremium: boolean;
}

export default function PerformanceHeatmap({ data, isPremium }: PerformanceHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const maxEarnings = Math.max(...data.map(d => d.earnings));
  
  const getHeatColor = (earnings: number) => {
    if (earnings === 0) return 'bg-muted/30';
    const intensity = earnings / maxEarnings;
    if (intensity > 0.8) return 'bg-emerald-500';
    if (intensity > 0.6) return 'bg-emerald-400';
    if (intensity > 0.4) return 'bg-emerald-300';
    if (intensity > 0.2) return 'bg-emerald-200';
    return 'bg-emerald-100';
  };

  const getDataForCell = (day: string, hour: number) => {
    return data.find(d => d.day === day && d.hour === hour);
  };

  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 backdrop-blur-sm z-10" />
        <CardHeader className="relative z-20">
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            Peak Performance Hours
          </CardTitle>
          <CardDescription>Discover your most productive times</CardDescription>
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Flame className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Premium Analytics</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Unlock heatmap analytics to identify your peak performance hours and optimize your schedule for maximum earnings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Peak Performance Hours
            </CardTitle>
            <CardDescription>Heatmap of your earnings by day and hour</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Premium
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less activity</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-4 w-4 rounded bg-muted/30" />
                <div className="h-4 w-4 rounded bg-emerald-100" />
                <div className="h-4 w-4 rounded bg-emerald-200" />
                <div className="h-4 w-4 rounded bg-emerald-300" />
                <div className="h-4 w-4 rounded bg-emerald-400" />
                <div className="h-4 w-4 rounded bg-emerald-500" />
              </div>
              <span>More activity</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Hour labels */}
              <div className="flex gap-1 mb-2 ml-12">
                {[0, 6, 12, 18, 23].map(hour => (
                  <div key={hour} className="text-xs text-muted-foreground" style={{ width: '20px', marginLeft: hour === 0 ? 0 : '80px' }}>
                    {hour}h
                  </div>
                ))}
              </div>

              {/* Days and cells */}
              {days.map(day => (
                <div key={day} className="flex items-center gap-2 mb-1">
                  <div className="text-xs text-muted-foreground w-10 text-right">{day}</div>
                  <div className="flex gap-1">
                    {hours.map(hour => {
                      const cellData = getDataForCell(day, hour);
                      const earnings = cellData?.earnings || 0;
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className={cn(
                            'h-5 w-5 rounded-sm transition-all hover:scale-110 cursor-pointer',
                            getHeatColor(earnings)
                          )}
                          title={`${day} ${hour}:00 - ${earnings > 0 ? `$${earnings.toFixed(2)}` : 'No activity'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">Peak Performance:</span>
              <span className="text-muted-foreground">Tuesday 2-4 PM ($145/hour avg)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Hot Streak:</span>
              <span className="text-muted-foreground">5 consecutive days this week</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
