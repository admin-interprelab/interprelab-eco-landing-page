import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface ProjectionData {
  month: string;
  actual?: number;
  projected: number;
  conservative: number;
  optimistic: number;
}

interface EarningsProjectionProps {
  data: ProjectionData[];
  isPremium: boolean;
}

const chartConfig = {
  actual: {
    label: 'Actual',
    color: 'hsl(var(--primary))',
  },
  projected: {
    label: 'Projected',
    color: 'hsl(var(--accent))',
  },
  conservative: {
    label: 'Conservative',
    color: 'hsl(var(--muted-foreground))',
  },
  optimistic: {
    label: 'Optimistic',
    color: 'hsl(142, 76%, 36%)',
  },
};

export default function EarningsProjection({ data, isPremium }: EarningsProjectionProps) {
  const currentMonthEarnings = data.find(d => d.actual)?.actual || 0;
  const projectedEndOfYear = data[data.length - 1]?.projected || 0;
  const growthRate = ((projectedEndOfYear - currentMonthEarnings) / currentMonthEarnings * 100).toFixed(1);

  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 backdrop-blur-sm z-10" />
        <CardHeader className="relative z-20">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Earnings Forecast
          </CardTitle>
          <CardDescription>AI-powered earnings predictions</CardDescription>
        </CardHeader>
        <CardContent className="relative z-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Premium Forecasting</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Get AI-powered earnings projections based on your performance trends and optimize your income strategy.
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
              <TrendingUp className="h-5 w-5 text-primary" />
              Earnings Forecast
            </CardTitle>
            <CardDescription>AI-powered predictions for the next 6 months</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Premium
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Current Month</span>
              </div>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthEarnings)}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-muted-foreground">Projected (6mo)</span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(projectedEndOfYear)}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-muted-foreground">Growth Rate</span>
              </div>
              <div className="text-2xl font-bold text-emerald-500">+{growthRate}%</div>
            </div>
          </div>

          {/* Chart */}
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                
                {/* Confidence interval area */}
                <Line 
                  type="monotone" 
                  dataKey="conservative" 
                  stroke="var(--color-conservative)" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="optimistic" 
                  stroke="var(--color-optimistic)" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                
                {/* Main lines */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="var(--color-actual)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-actual)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="var(--color-projected)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-projected)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Insights */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">AI Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Based on your current trajectory and market trends, you're on track to exceed your annual target by 12%. 
                  Consider increasing your Thursday and Friday availability for optimal results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
