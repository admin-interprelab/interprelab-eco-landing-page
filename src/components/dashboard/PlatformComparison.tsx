import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlatformStats {
  name: string;
  calls: number;
  earnings: number;
  avgDuration: number;
  change: number;
}

interface PlatformComparisonProps {
  platforms: PlatformStats[];
  isPremium: boolean;
}

export default function PlatformComparison({ platforms, isPremium }: PlatformComparisonProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const totalEarnings = platforms.reduce((sum, p) => sum + p.earnings, 0);
  const sortedPlatforms = [...platforms].sort((a, b) => b.earnings - a.earnings);

  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 backdrop-blur-sm z-10" />
        <CardHeader className="relative z-20">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Platform Performance
          </CardTitle>
          <CardDescription>Compare earnings across platforms</CardDescription>
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Premium Analytics</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upgrade to compare platform performance and optimize where you spend your time.
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
              <BarChart3 className="h-5 w-5 text-primary" />
              Platform Performance
            </CardTitle>
            <CardDescription>Earnings breakdown by platform</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Premium
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedPlatforms.map((platform, index) => {
          const percentage = (platform.earnings / totalEarnings) * 100;
          const isTop = index === 0;

          return (
            <div key={platform.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    isTop ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{platform.name}</h4>
                      {isTop && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Top Performer
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {platform.calls} calls • {platform.avgDuration} min avg
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{formatCurrency(platform.earnings)}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {platform.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={platform.change > 0 ? 'text-emerald-500' : 'text-red-500'}>
                      {platform.change > 0 ? '+' : ''}{platform.change}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {percentage.toFixed(1)}% of total earnings
                </p>
              </div>
            </div>
          );
        })}

        {platforms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No platform data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
