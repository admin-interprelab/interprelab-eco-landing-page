import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import StatsCards from '@/components/dashboard/stats-cards';
import { LazyWeeklyChart, LazyCallTypeChart } from '@/components/lazy';
import AIInsights from '@/components/dashboard/ai-insights';
import RecentCalls from '@/components/dashboard/recent-calls';
import ManualLog from '@/components/dashboard/manual-log';
import { useCallTracker } from '@/hooks/useCallTracker';
import { useCallStats } from '@/hooks/useCallStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Square, Timer, DollarSign, Target, TrendingUp, BarChart3 } from 'lucide-react';
import { GoalSetting } from '@/components/track/GoalSetting';
import { PerformanceInsights } from '@/components/track/PerformanceInsights';

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
  const [callNotes, setCallNotes] = useState('');
  const [activeView, setActiveView] = useState<'dashboard' | 'goals' | 'insights'>('dashboard');

  const handleEndCall = () => {
    endCall(callNotes);
    setCallNotes('');
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);

  // Mock goals data
  const [goals, setGoals] = useState([
    {
      id: '1',
      type: 'earnings' as const,
      target: 5000,
      current: 3200,
      period: 'monthly' as const,
      title: 'Monthly Earnings Goal',
      deadline: new Date('2024-12-31')
    },
    {
      id: '2',
      type: 'calls' as const,
      target: 100,
      current: 67,
      period: 'monthly' as const,
      title: 'Monthly Call Target'
    },
    {
      id: '3',
      type: 'hours' as const,
      target: 40,
      current: 28,
      period: 'weekly' as const,
      title: 'Weekly Hours Goal'
    }
  ]);

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

  const handleUpdateGoal = (goal: any) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const handleAddGoal = (newGoal: any) => {
    const goal = {
      ...newGoal,
      id: Date.now().toString(),
      current: 0
    };
    setGoals(prev => [...prev, goal]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">InterpreTrack</h1>
          <p className="text-xl text-gray-600 dark:text-blue-200">
            Professional call tracking and earnings management
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1">
            <div className="flex gap-1">
              <Button
                onClick={() => setActiveView('dashboard')}
                variant={activeView === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'dashboard' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => setActiveView('goals')}
                variant={activeView === 'goals' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'goals' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <Target className="h-4 w-4 mr-2" />
                Goals
              </Button>
              <Button
                onClick={() => setActiveView('insights')}
                variant={activeView === 'insights' ? 'default' : 'ghost'}
                size="sm"
                className={activeView === 'insights' ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Real-time Call Tracker */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Timer className="h-6 w-6 text-blue-400" />
              Live Call Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Timer Display */}
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-white mb-2">
                  {formatDuration(elapsedSeconds)}
                </div>
                <p className="text-sm text-blue-200">Current Session</p>
              </div>

              {/* Earnings Display */}
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-1">
                  <DollarSign className="h-6 w-6" />
                  {formatCurrency(currentEarnings, userSettings?.preferred_currency)}
                </div>
                <p className="text-sm text-blue-200">Current Earnings</p>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                {!isTracking ? (
                  <Button
                    onClick={startCall}
                    size="lg"
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/30"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Call
                  </Button>
                ) : (
                  <Button
                    onClick={handleEndCall}
                    size="lg"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30"
                  >
                    <Square className="h-5 w-5 mr-2" />
                    End Call
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        {activeView === 'goals' ? (
          <GoalSetting
            goals={goals}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            onAddGoal={handleAddGoal}
          />
        ) : activeView === 'insights' ? (
          <PerformanceInsights
            data={performanceData}
            period="month"
          />
        ) : (
          /* Dashboard Content */
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-white">Loading your statistics...</p>
              </div>
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
                    <LazyCallTypeChart data={callTypeStats} />
                    <AIInsights stats={`Total Calls: ${stats?.totalCalls || 0}, Average Duration: ${stats?.averageCallDuration ? Math.round(stats.averageCallDuration / 60) : 0} min`} error={false} />
                  </div>
                </div>

                <RecentCalls />
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
