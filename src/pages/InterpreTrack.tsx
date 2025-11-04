import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, LayoutDashboard, TrendingUp, BookOpen, Settings, RefreshCw } from 'lucide-react';
import PremiumStatsOverview from '@/components/dashboard/premium-stats-overview';
import GoalsTracker from '@/components/dashboard/goals-tracker';
import PerformanceHeatmap from '@/components/dashboard/performance-heatmap';
import IntegrationStatus from '@/components/dashboard/integration-status';
import PlatformComparison from '@/components/dashboard/platform-comparison';
import LearningProgress from '@/components/dashboard/learning-progress';
import PremiumUpgradeCard from '@/components/dashboard/premium-upgrade-card';
import EarningsProjection from '@/components/dashboard/earnings-projection';
import WeeklyChart from '@/components/dashboard/weekly-chart';
import AIInsights from '@/components/dashboard/ai-insights';
import RecentCalls from '@/components/dashboard/recent-calls';
import CallTypeChart from '@/components/dashboard/call-type-chart';
import ManualLog from '@/components/dashboard/manual-log';
import { getAggregatedStats, getWeeklyData, getCallTypeStats } from '@/lib/data';
import { Chrome, MessageSquare, BookOpen as Book } from 'lucide-react';

export default function InterpreTrack() {
  // TODO: Replace with actual premium status from user profile/subscription
  const [isPremium, setIsPremium] = useState(false);
  
  const stats = getAggregatedStats();
  const weeklyData = getWeeklyData();
  const callTypeData = getCallTypeStats();

  // Enhanced stats for premium dashboard
  const premiumStats = {
    totalCalls: stats.totalCalls,
    totalMinutes: stats.totalMinutes,
    totalEarnings: stats.totalEarnings,
    avgCallDuration: Math.round(stats.totalMinutes / stats.totalCalls) || 0,
    peakHourEarnings: 145.50,
    streakDays: 12,
    monthlyGoalProgress: 68,
    efficiencyScore: 87,
  };

  // Mock data for premium features
  const goals = isPremium ? [
    {
      id: '1',
      title: 'Monthly Earnings Goal',
      target: 3000,
      current: 2040,
      unit: 'dollars' as const,
      deadline: '2024-05-31',
      type: 'monthly' as const,
    },
    {
      id: '2',
      title: 'Weekly Call Target',
      target: 40,
      current: 28,
      unit: 'calls' as const,
      deadline: '2024-05-19',
      type: 'weekly' as const,
    },
    {
      id: '3',
      title: 'Annual Hours Goal',
      target: 2000,
      current: 450,
      unit: 'hours' as const,
      deadline: '2024-12-31',
      type: 'yearly' as const,
    },
  ] : [];

  const heatmapData = Array.from({ length: 7 * 24 }, (_, i) => ({
    hour: i % 24,
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 24)],
    calls: Math.floor(Math.random() * 5),
    earnings: Math.random() * 50,
  }));

  const integrations = [
    {
      name: 'InterpreCoach Extension',
      status: 'connected' as const,
      lastSync: new Date().toISOString(),
      icon: <Chrome className="h-6 w-6 text-primary" />,
      dataPoints: 1247,
    },
    {
      name: 'InterpreBot AI',
      status: 'connected' as const,
      lastSync: new Date().toISOString(),
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      dataPoints: 89,
    },
    {
      name: 'InterpreStudy',
      status: 'syncing' as const,
      icon: <Book className="h-6 w-6 text-blue-500" />,
      dataPoints: 342,
    },
  ];

  const platformStats = [
    {
      name: 'Platform A',
      calls: 156,
      earnings: 1234.50,
      avgDuration: 12,
      change: 15.3,
    },
    {
      name: 'Platform B',
      calls: 89,
      earnings: 567.25,
      avgDuration: 8,
      change: -5.2,
    },
    {
      name: 'Platform C',
      calls: 234,
      earnings: 1890.75,
      avgDuration: 10,
      change: 22.1,
    },
  ];

  const learningMetrics = {
    studyHours: 24,
    termsLearned: 342,
    quizzesCompleted: 18,
    scenariosPracticed: 45,
    botConversations: 89,
    streak: 12,
  };

  const projectionData = [
    { month: 'May', actual: 2040, projected: 2040, conservative: 2040, optimistic: 2040 },
    { month: 'Jun', projected: 2450, conservative: 2200, optimistic: 2700 },
    { month: 'Jul', projected: 2680, conservative: 2400, optimistic: 3000 },
    { month: 'Aug', projected: 2890, conservative: 2600, optimistic: 3300 },
    { month: 'Sep', projected: 3100, conservative: 2800, optimistic: 3600 },
    { month: 'Oct', projected: 3350, conservative: 3000, optimistic: 3900 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                InterpreTrack
              </h1>
              {isPremium && (
                <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-lg">
              Your comprehensive interpretation analytics hub
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Data
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Premium Stats Overview */}
        <PremiumStatsOverview stats={premiumStats} isPremium={isPremium} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {!isPremium && (
              <PremiumUpgradeCard />
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              <ManualLog />
              <GoalsTracker goals={goals} isPremium={isPremium} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <WeeklyChart data={weeklyData} />
              </div>
              <CallTypeChart data={callTypeData} />
            </div>

            <RecentCalls />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <EarningsProjection data={projectionData} isPremium={isPremium} />
              <PerformanceHeatmap data={heatmapData} isPremium={isPremium} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PlatformComparison platforms={platformStats} isPremium={isPremium} />
              <AIInsights stats="Your performance is trending upward!" error={false} />
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <LearningProgress metrics={learningMetrics} />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <WeeklyChart data={weeklyData} />
              <GoalsTracker goals={goals.filter(g => g.unit === 'hours')} isPremium={isPremium} />
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <IntegrationStatus integrations={integrations} />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <RecentCalls />
              <AIInsights stats="All integrations are working properly!" error={false} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
