import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Clock, Phone, Target, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  premium?: boolean;
  subtitle?: string;
}

const StatCard = ({ title, value, change, changeLabel, icon, trend, premium, subtitle }: StatCardProps) => {
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';
  const trendBg = trend === 'up' ? 'bg-emerald-500/10' : trend === 'down' ? 'bg-red-500/10' : 'bg-muted/50';

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      {premium && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Zap className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 text-sm font-medium", trendColor)}>
              <span className={cn("px-2 py-0.5 rounded-full text-xs", trendBg)}>
                {trend === 'up' ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel || 'vs last period'}</span>
            </div>
          )}
        </div>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  );
};

interface PremiumStatsOverviewProps {
  stats: {
    totalCalls: number;
    totalMinutes: number;
    totalEarnings: number;
    avgCallDuration: number;
    peakHourEarnings: number;
    streakDays: number;
    monthlyGoalProgress: number;
    efficiencyScore: number;
  };
  isPremium: boolean;
}

export default function PremiumStatsOverview({ stats, isPremium }: PremiumStatsOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Earnings"
        value={formatCurrency(stats.totalEarnings)}
        change={12.5}
        changeLabel="vs last month"
        icon={<DollarSign className="h-4 w-4" />}
        trend="up"
        subtitle="This month"
      />
      
      <StatCard
        title="Total Calls"
        value={stats.totalCalls}
        change={8.3}
        changeLabel="vs last month"
        icon={<Phone className="h-4 w-4" />}
        trend="up"
        subtitle="This month"
      />
      
      <StatCard
        title="Active Time"
        value={formatTime(stats.totalMinutes)}
        change={-2.1}
        changeLabel="vs last month"
        icon={<Clock className="h-4 w-4" />}
        trend="down"
        subtitle="Interpretation hours"
      />

      <StatCard
        title="Avg Call Duration"
        value={`${stats.avgCallDuration} min`}
        change={5.2}
        changeLabel="vs last month"
        icon={<Target className="h-4 w-4" />}
        trend="up"
        subtitle="Per call average"
      />

      {isPremium && (
        <>
          <StatCard
            title="Current Streak"
            value={`${stats.streakDays} days`}
            icon={<Award className="h-4 w-4" />}
            trend="up"
            premium
            subtitle="Keep it going!"
          />

          <StatCard
            title="Efficiency Score"
            value={`${stats.efficiencyScore}%`}
            change={3.8}
            changeLabel="vs last week"
            icon={<Zap className="h-4 w-4" />}
            trend="up"
            premium
            subtitle="Performance rating"
          />

          <StatCard
            title="Monthly Goal"
            value={`${stats.monthlyGoalProgress}%`}
            icon={<Target className="h-4 w-4" />}
            trend="up"
            premium
            subtitle={`$${(stats.totalEarnings / (stats.monthlyGoalProgress / 100)).toFixed(0)} target`}
          />

          <StatCard
            title="Peak Hour Earnings"
            value={formatCurrency(stats.peakHourEarnings)}
            icon={<TrendingUp className="h-4 w-4" />}
            premium
            subtitle="Your best performing hour"
          />
        </>
      )}
    </div>
  );
}
