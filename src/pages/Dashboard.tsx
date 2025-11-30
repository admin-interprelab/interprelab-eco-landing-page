import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { usePremium } from '@/contexts/PremiumContext';
import AIInsights from '@/components/dashboard/AiInsights';
import CallTypeChart from '@/components/dashboard/CallTypeChart';
import EarningsProjection from '@/components/dashboard/EarningsProjection';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import IntegrationStatus from '@/components/dashboard/IntegrationStatus';
import LearningProgress from '@/components/dashboard/LearningProgress';
import ManualLog from '@/components/dashboard/ManualLog';
import PerformanceHeatmap from '@/components/dashboard/PerformanceHeatmap';
import PlatformComparison from '@/components/dashboard/PlatformComparison';
import PremiumStatsOverview from '@/components/dashboard/PremiumStatsOverview';
import RecentCalls from '@/components/dashboard/RecentCalls';
import StatsCards from '@/components/dashboard/StatsCards';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import { PremiumUpgradeCard } from '@/components/premium/PremiumUpgradeCard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import { useGoals } from '../../useGoals';
import { AlertTriangle } from 'lucide-react';

// TODO: This component should be refactored to use a custom hook (e.g., `useDashboardData`) to handle data fetching and state management.

const Dashboard = () => {
  const { user } = useAuth();
  const { isPremium, upgrade } = usePremium();
  const { data, loading, error, refresh } = useDashboardData();
  const { data: goals, isLoading: goalsLoading } = useGoals();

  const getErrorMessage = (err: any): { title: string, description: string, raw: string } => {
    const rawError = err?.message || 'An unknown error occurred.';

    // Check for common network error messages
    if (typeof rawError === 'string' && (rawError.toLowerCase().includes('network request failed') || rawError.toLowerCase().includes('failed to fetch'))) {
      return {
        title: 'Network Connection Error',
        description: 'It seems you are offline. Please check your internet connection and try again.',
        raw: rawError,
      };
    }

    // Default error message
    return {
      title: 'Error Loading Dashboard',
      description: "We couldn't fetch your dashboard data. Please try again.",
      raw: rawError,
    };
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading || goalsLoading) {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="h-64" />
                        <Skeleton className="h-80" />
                    </div>
                    <div className="space-y-8">
                        <Skeleton className="h-96" />
                        <Skeleton className="h-64" />
                    </div>
                </div>
            </div>
        </Layout>
    );
  }

  if (error) {
    const { title, description, raw } = getErrorMessage(error);
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
              <p>{description}</p>
              <pre className="mt-2 text-xs bg-background/50 p-2 rounded">{raw}</pre>
              <Button onClick={() => refresh()} className="mt-4">Retry</Button>
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (!user || !data) {
      return <Layout><div>Please sign in to view your dashboard.</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Button onClick={upgrade}>Toggle Premium</Button>
        </div>

        {isPremium ? (
            <PremiumStatsOverview stats={data.premiumStats} isPremium={isPremium} />
        ) : (
            <StatsCards stats={{ totalCalls: data.stats.totalCalls, totalMinutes: Math.round(data.stats.monthTotal / 60), totalEarnings: data.stats.monthEarnings }} />
        )}

        {!isPremium && <PremiumUpgradeCard featureName="Advanced Analytics" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <WeeklyChart data={data.weeklyData} />
                <RecentCalls calls={data.recentCalls} />
                <PerformanceHeatmap data={data.heatmapData} isPremium={isPremium} />
            </div>
            <div className="space-y-8">
                <ManualLog />
                <CallTypeChart data={data.callTypeData} />
                <AIInsights stats={data.aiInsights} />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GoalsTracker goals={goals || []} isPremium={isPremium} />
            <EarningsProjection isPremium={isPremium} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlatformComparison platforms={data.platformData} isPremium={isPremium} />
            <LearningProgress metrics={data.learningMetrics} />
        </div>

        <IntegrationStatus integrations={data.integrations} />

      </div>
    </Layout>
  );
};


export default Dashboard;
