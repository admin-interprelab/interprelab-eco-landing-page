/*eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import StatsCards from '@/components/dashboard/StatsCards';
import { LazyWeeklyChart, LazyCallTypeChart } from '@/components/lazy';
import AIInsights from '@/components/dashboard/AiInsights';
import RecentCalls from '@/components/dashboard/RecentCalls';
import ManualLog from '@/components/dashboard/ManualLog';
import { useCallStats } from '@/hooks/useCallStats';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import EarningsProjection from '@/components/dashboard/EarningsProjection';
import { usePremium } from '@/contexts/PremiumContext';
import { PageHero } from '@/components/PageHero';
import { GoalSetting } from '@/components/track/GoalSetting'; // eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PerformanceInsights } from '@/components/track/PerformanceInsights'; // eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallTracker } from '@/hooks/useCallTracker';
import { useGoals } from '../../useGoals';

export default function InterpreTrack() {
  const {
    isTracking,
    elapsedSeconds,
    userSettings,
    startCall,
    endCall,
    formatDuration,
    formatCurrency,
    calculateEarnings
  } = useCallTracker();

  const { stats, dailyStats, callTypeStats, loading, error } = useCallStats();
  const { data: goals = [], isLoading: goalsLoading, isError: goalsError } = useGoals();
  const { isPremium } = usePremium();
  const [callNotes, setCallNotes] = useState('');
  const [activeView, setActiveView] = useState<'dashboard' | 'goals' | 'insights'>('dashboard');

  const handleEndCall = () => {
    endCall(callNotes);
    setCallNotes('');
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);

  // Mock performance data
  const performanceData = {
    totalEarnings: 3200,
    totalCalls: 67,
    totalHours: 28,
    averageCallDuration: 45,
    averageHourlyRate: 85,
    bestDay: {
      date: 'November 15, 2024',
      earnings: 450,
      calls: 8
    },
    trends: {
      earningsChange: 12,
      callsChange: -5,
      hoursChange: 8
    },
    insights: [
      'Your earnings have increased by 12% compared to last month',
      'Peak performance hours are between 10 AM - 2 PM',
      'Medical interpretation calls have the highest hourly rate',
      'You\'ve maintained a consistent 5-day work schedule'
    ],
    recommendations: [
      'Consider scheduling more calls during your peak hours',
      'Focus on medical interpretation to maximize earnings',
      'Set up recurring availability for consistent bookings',
      'Track call preparation time to improve efficiency'
    ]
  };

  // These handlers will need to be implemented with mutations to the backend
  const handleUpdateGoal = (goal: any) => {};

  const handleDeleteGoal = (goalId: string) => {
    // setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const handleAddGoal = (newGoal: any) => {
    // const goal = {
    //   ...newGoal,
    //   id: Date.now().toString(),
    //   current: 0
    // };
    // setGoals(prev => [...prev, goal]);
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <PageHero
          badgeText="Performance Analytics"
          title="InterpreTrack: Your Path to Peak Performance"
          subtitle="Set goals, track your progress, and gain valuable insights into your interpretation work. Understand your patterns and unlock your full potential."
        />

        {/* Content Area */}
        {activeView === 'goals' ? (
          <GoalSetting
            goals={goals}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            onAddGoal={handleAddGoal}
          />
          <GoalsTracker goals={goals || []} isPremium={isPremium} />
        ) : activeView === 'insights' ? (
          <PerformanceInsights
            data={performanceData}
            period="month"
          />
        ) : (
          /* Dashboard Content */
          <div className="space-y-6">{
            (loading || goalsLoading) ? (
              <div className="text-center py-8">
                <p className="text-white">Loading your statistics...</p>
              </div>)
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400">Error loading statistics: {error}</p>
              </div>
            ) : (
              <>
                <StatsCards stats={{
                  totalCalls: stats?.totalCalls || 0,
                  totalMinutes: Math.round((stats?.totalDuration || 0) / 60),
                  totalEarnings: stats?.totalEarnings || 0
                }} />

                <div className="grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3 space-y-6">
                    <ManualLog />
                    <LazyWeeklyChart data={dailyStats.map(day => ({
                      day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
                      calls: day.calls,
                      earnings: day.earnings
                    }))} />
                  </div>
                  <div className="lg:col-span-2 grid gap-6">
                    {isPremium ? (
                      <>
                        <EarningsProjection isPremium={isPremium} />
                        <GoalsTracker goals={goals || []} isPremium={isPremium} />
                      </>
                    ) : (
                      <LazyCallTypeChart data={callTypeStats} />
                    )}
                    <AIInsights stats={`Total Calls: ${stats?.totalCalls || 0}, Average Duration: ${stats?.averageCallDuration ? Math.round(stats.averageCallDuration / 60) : 0} min`} error={false} />
                  </div>
                </div>

                <RecentCalls />
              </>
            )}
          </div>
        )}
      </main>
    </Layout>
  );
}
