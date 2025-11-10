import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, Clock, TrendingUp, Phone } from 'lucide-react';
import { format, startOfMonth, startOfYear, endOfMonth, endOfYear } from 'date-fns';
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
import PremiumUpgradeCard from '@/components/dashboard/PremiumUpgradeCard';
import RecentCalls from '@/components/dashboard/RecentCalls';
import StatsCards from '@/components/dashboard/StatsCards';
import WeeklyChart from '@/components/dashboard/WeeklyChart';

interface Stats {
  monthTotal: number;
  monthEarnings: number;
  monthCalls: number;
  yearTotal: number;
  yearEarnings: number;
  yearCalls: number;
  avgCallDuration: number;
  totalCalls: number;
}


const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    monthTotal: 0,
    monthEarnings: 0,
    monthCalls: 0,
    yearTotal: 0,
    yearEarnings: 0,
    yearCalls: 0,
    avgCallDuration: 0,
    totalCalls: 0,
  });
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [currency, setCurrency] = useState('USD');
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false); // Placeholder for premium status

  // Placeholder data for new components
  const [callTypeData, setCallTypeData] = useState({ vri: 0, opi: 0 });
  const [weeklyData, setWeeklyData] = useState([]);
  const [projectionData, setProjectionData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [learningMetrics, setLearningMetrics] = useState({ studyHours: 0, termsLearned: 0, quizzesCompleted: 0, scenariosPracticed: 0, botConversations: 0, streak: 0 });
  const [heatmapData, setHeatmapData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [premiumStats, setPremiumStats] = useState({ totalCalls: 0, totalMinutes: 0, totalEarnings: 0, avgCallDuration: 0, peakHourEarnings: 0, streakDays: 0, monthlyGoalProgress: 0, efficiencyScore: 0 });
  const [aiInsights, setAiInsights] = useState(null);


  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    // Get user currency
    const { data: settings } = await supabase
      .from('user_settings')
      .select('preferred_currency')
      .eq('user_id', user.id)
      .maybeSingle();

    if (settings) {
      setCurrency(settings.preferred_currency);
    }

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);

    // Get month stats
    const { data: monthData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings, interpretation_type')
      .eq('user_id', user.id)
      .gte('start_time', monthStart.toISOString())
      .lte('start_time', monthEnd.toISOString());

    // Get year stats
    const { data: yearData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings')
      .eq('user_id', user.id)
      .gte('start_time', yearStart.toISOString())
      .lte('start_time', yearEnd.toISOString());

    // Get all time stats
    const { data: allData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings')
      .eq('user_id', user.id);

    // Get recent calls
    const { data: recent } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false })
      .limit(5);

    const monthStats = calculateStats(monthData || []);
    const yearStats = calculateStats(yearData || []);
    const allStats = calculateStats(allData || []);

    setStats({
      monthTotal: monthStats.totalDuration,
      monthEarnings: monthStats.totalEarnings,
      monthCalls: monthStats.callCount,
      yearTotal: yearStats.totalDuration,
      yearEarnings: yearStats.totalEarnings,
      yearCalls: yearStats.callCount,
      avgCallDuration: allStats.avgDuration,
      totalCalls: allStats.callCount,
    });

    setRecentCalls(recent || []);

    // Placeholder data population
    setCallTypeData({
      vri: monthData?.filter(c => c.interpretation_type === 'VRI').length || 0,
      opi: monthData?.filter(c => c.interpretation_type === 'OPI').length || 0,
    });

    // This is just placeholder data, in a real app you would fetch this from your backend
    setWeeklyData([
      { day: 'Mon', calls: 4, earnings: 200 },
      { day: 'Tue', calls: 6, earnings: 300 },
      { day: 'Wed', calls: 5, earnings: 250 },
      { day: 'Thu', calls: 8, earnings: 400 },
      { day: 'Fri', calls: 7, earnings: 350 },
      { day: 'Sat', calls: 3, earnings: 150 },
      { day: 'Sun', calls: 2, earnings: 100 },
    ]);
    setProjectionData([
        { month: 'Jan', actual: 3000, projected: 3200, conservative: 2800, optimistic: 3500 },
        { month: 'Feb', actual: 3500, projected: 3700, conservative: 3200, optimistic: 4000 },
        { month: 'Mar', projected: 4000, conservative: 3500, optimistic: 4500 },
        { month: 'Apr', projected: 4200, conservative: 3700, optimistic: 4800 },
        { month: 'May', projected: 4500, conservative: 4000, optimistic: 5000 },
        { month: 'Jun', projected: 4800, conservative: 4200, optimistic: 5500 },
    ]);
    setGoals([
        { id: '1', title: 'Monthly Earnings', target: 5000, current: 3500, unit: 'dollars', deadline: '2025-12-31', type: 'monthly' },
        { id: '2', title: 'Weekly Hours', target: 40, current: 30, unit: 'hours', deadline: '2025-11-15', type: 'weekly' },
    ]);
    setIntegrations([
        { name: 'Google Calendar', status: 'connected', lastSync: '2025-11-10T10:00:00Z', icon: <Calendar />, dataPoints: 120 },
        { name: 'Stripe', status: 'syncing', icon: <DollarSign />, dataPoints: 45 },
    ]);
    setLearningMetrics({ studyHours: 12, termsLearned: 150, quizzesCompleted: 25, scenariosPracticed: 10, botConversations: 42, streak: 5 });
    setHeatmapData([
        { day: 'Mon', hour: 10, calls: 2, earnings: 100 },
        { day: 'Tue', hour: 14, calls: 3, earnings: 150 },
        { day: 'Tue', hour: 15, calls: 2, earnings: 100 },
        { day: 'Fri', hour: 11, calls: 4, earnings: 200 },
    ]);
    setPlatformData([
        { name: 'Platform A', calls: 25, earnings: 1500, avgDuration: 30, change: 10 },
        { name: 'Platform B', calls: 15, earnings: 1000, avgDuration: 40, change: -5 },
    ]);
    setPremiumStats({ totalCalls: 40, totalMinutes: 1800, totalEarnings: 3500, avgCallDuration: 45, peakHourEarnings: 250, streakDays: 5, monthlyGoalProgress: 70, efficiencyScore: 85 });
    setAiInsights("You're on track to meet your monthly goal. Keep up the great work!");
  };

  const calculateStats = (data: any[]) => {
    const totalDuration = data.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
    const totalEarnings = data.reduce((sum, call) => sum + (parseFloat(call.earnings) || 0), 0);
    const callCount = data.length;
    const avgDuration = callCount > 0 ? totalDuration / callCount : 0;

    return { totalDuration, totalEarnings, callCount, avgDuration };
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Button onClick={() => setIsPremium(!isPremium)}>Toggle Premium</Button>
        </div>

        {isPremium ? (
            <PremiumStatsOverview stats={premiumStats} isPremium={isPremium} />
        ) : (
            <StatsCards stats={{ totalCalls: stats.totalCalls, totalMinutes: stats.monthTotal, totalEarnings: stats.monthEarnings }} />
        )}

        {!isPremium && <PremiumUpgradeCard />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <WeeklyChart data={weeklyData} />
                <RecentCalls />
                <PerformanceHeatmap data={heatmapData} isPremium={isPremium} />
            </div>
            <div className="space-y-8">
                <ManualLog />
                <CallTypeChart data={callTypeData} />
                <AIInsights stats={aiInsights} />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GoalsTracker goals={goals} isPremium={isPremium} />
            <EarningsProjection data={projectionData} isPremium={isPremium} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlatformComparison platforms={platformData} isPremium={isPremium} />
            <LearningProgress metrics={learningMetrics} />
        </div>

        <IntegrationStatus integrations={integrations} />

      </div>
    </Layout>
  );
};


export default Dashboard;
