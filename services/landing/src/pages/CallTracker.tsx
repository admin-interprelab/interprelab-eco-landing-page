import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Badge } from '@/lib/ui/components/ui/badge';
import { useCallTracker } from '@/hooks/useCallTracker';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'sonner';

import { ActiveCallTracker } from '@/components/call-tracker/ActiveCallTracker';
import { MonthStatistics } from '@/components/call-tracker/MonthStatistics';
import { CallDistributionChart } from '@/components/call-tracker/CallDistributionChart';
import { RecentCallHistory } from '@/components/call-tracker/RecentCallHistory';

// Generic Interfaces - In a real app, these should be in a types file
interface CallStats {
  monthCalls: number;
  totalSeconds: number;
  totalDuration: number;
  roundedSeconds: number;
  totalRounded: number;
  totalEarnings: number;
  totalRoundedEarnings: number;
  roundedEarnings: number;
  projectedEarnings: number;
  timeLost: number;
  earningsLost: number;
  roundingMethod: string;
}

interface RecentCall {
  id: string;
  call_type: string | null;
  duration_seconds: number | null;
  rounded_duration_seconds: number | null;
  earnings: number | null;
  notes: string | null;
  start_time: string;
}

interface CallTypeStats {
  type: string;
  count: number;
  duration: number;
  earnings: number;
  color: string;
}

const CallTracker = () => {
  const [notes, setNotes] = useState('');
  const [callType, setCallType] = useState<'VRI' | 'OPI'>('VRI');
  const [stats, setStats] = useState<CallStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>([]);
  const [callTypeStats, setCallTypeStats] = useState<CallTypeStats[]>([]);
  const [roundingMethod, setRoundingMethod] = useState<string>('actual');
  
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    isTracking,
    elapsedSeconds,
    startCall,
    endCall,
    formatDuration,
    formatCurrency,
    calculateEarnings,
    userSettings,
  } = useCallTracker();
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadDashboardData(), loadUserSettings()]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserSettings = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_settings')
      .select('time_rounding_method')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) throw error;

    if (data?.time_rounding_method) {
      setRoundingMethod(data.time_rounding_method);
    }
  };

  const loadDashboardData = async () => {
    if (!user) return;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Get month stats
    const { data: monthData, error: monthError } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('start_time', monthStart.toISOString())
      .lte('start_time', monthEnd.toISOString());

    if (monthError) throw monthError;

    if (monthData) {
      const totalDuration = monthData.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
      const totalRounded = monthData.reduce((sum, call) => sum + (call.rounded_duration_seconds || call.duration_seconds || 0), 0);
      const totalEarnings = monthData.reduce((sum, call) => sum + (call.earnings || 0), 0);
      const totalRoundedEarnings = monthData.reduce((sum, call) => sum + (call.rounded_earnings || call.earnings || 0), 0);
      
      // Calculate time lost to rounding
      const timeLost = totalDuration - totalRounded;
      const earningsLost = totalEarnings - totalRoundedEarnings;

      // Call type breakdown
      const vriCalls = monthData.filter(c => c.call_type === 'VRI');
      const opiCalls = monthData.filter(c => c.call_type === 'OPI');
      
      setCallTypeStats([
        {
          type: 'VRI',
          count: vriCalls.length,
          duration: vriCalls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0),
          earnings: vriCalls.reduce((sum, call) => sum + (call.earnings || 0), 0),
          color: 'hsl(217, 91%, 60%)', // blue
        },
        {
          type: 'OPI',
          count: opiCalls.length,
          duration: opiCalls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0),
          earnings: opiCalls.reduce((sum, call) => sum + (call.earnings || 0), 0),
          color: 'hsl(271, 81%, 56%)', // purple
        }
      ]);

      setStats({
        monthCalls: monthData.length,
        totalSeconds: totalDuration,
        roundedSeconds: totalRounded,
        totalEarnings: totalEarnings,
        roundedEarnings: totalRoundedEarnings,
        projectedEarnings: totalEarnings, // Could calculate based on remaining days
        timeLost,
        earningsLost,
        roundingMethod,
        totalDuration, 
      } as any); 
    }

    // Get recent calls
    const { data: recent, error: recentError } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false })
      .limit(10);

    if (recentError) throw recentError;

    setRecentCalls(recent || []);
  };

  const handleEndCallWrapper = async () => {
    try {
      await endCall(notes, callType);
      setNotes('');
      setCallType('VRI');
      // Reload data after call ends
      setTimeout(loadData, 500);
    } catch (error) {
      console.error("Error ending call:", error);
      toast.error("Failed to save call log.");
    }
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);
  const formatDurationMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {isLoading && (
          <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
               <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
               <p className="text-sm font-medium text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        )}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Addressing Pain Point #1: Transparency in Compensation
          </Badge>
          <h1 className="text-4xl font-bold mb-2">InterpreTrack</h1>
          <p className="text-lg text-muted-foreground">
            Precision logging that reveals the truth. Every second counts, every call matters.
          </p>
        </div>

        {/* Active Call Tracker */}
        <ActiveCallTracker
          isTracking={isTracking}
          elapsedSeconds={elapsedSeconds}
          callType={callType}
          setCallType={setCallType}
          notes={notes}
          setNotes={setNotes}
          startCall={startCall}
          handleEndCall={handleEndCallWrapper}
          formatDuration={formatDuration}
          formatCurrency={formatCurrency}
          currentEarnings={currentEarnings}
          userSettings={userSettings}
        />

        {/* Month Statistics */}
        <MonthStatistics
          stats={stats}
          userSettings={userSettings}
          formatCurrency={formatCurrency}
          formatDurationMinutes={formatDurationMinutes}
        />

        {/* Call Type Distribution */}
        <CallDistributionChart
          callTypeStats={callTypeStats}
          userSettings={userSettings}
          formatDurationMinutes={formatDurationMinutes}
          formatCurrency={formatCurrency}
        />

        {/* Recent Calls */}
        <RecentCallHistory
          recentCalls={recentCalls}
          userSettings={userSettings}
          formatDurationMinutes={formatDurationMinutes}
          formatCurrency={formatCurrency}
        />
      </div>
    </Layout>
  );
};

export default CallTracker;

