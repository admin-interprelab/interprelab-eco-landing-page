import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CallStats {
  totalCalls: number;
  totalEarnings: number;
  totalDuration: number; // in seconds
  averageCallDuration: number; // in seconds
  averageEarnings: number;
  callsThisWeek: number;
  earningsThisWeek: number;
  callsThisMonth: number;
  earningsThisMonth: number;
  topPlatform: string;
  mostActiveDay: string;
}

interface DailyStats {
  date: string;
  calls: number;
  earnings: number;
  duration: number;
}

interface PlatformStats {
  platform: string;
  calls: number;
  earnings: number;
  percentage: number;
}

interface CallTypeStats {
  vri: number;
  opi: number;
  other: number;
}

export const useCallStats = (dateRange?: { start: Date; end: Date }) => {
  const [stats, setStats] = useState<CallStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [callTypeStats, setCallTypeStats] = useState<CallTypeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Build query with optional date range
      let query = supabase
        .from('call_logs')
        .select('*')
        .eq('user_id', user.id);

      if (dateRange) {
        query = query
          .gte('start_time', dateRange.start.toISOString())
          .lte('start_time', dateRange.end.toISOString());
      }

      const { data: calls, error: callsError } = await query;

      if (callsError) throw callsError;

      if (!calls || calls.length === 0) {
        setStats({
          totalCalls: 0,
          totalEarnings: 0,
          totalDuration: 0,
          averageCallDuration: 0,
          averageEarnings: 0,
          callsThisWeek: 0,
          earningsThisWeek: 0,
          callsThisMonth: 0,
          earningsThisMonth: 0,
          topPlatform: 'N/A',
          mostActiveDay: 'N/A'
        });
        setDailyStats([]);
        setPlatformStats([]);
        setCallTypeStats({ vri: 0, opi: 0, other: 0 });
        return;
      }

      // Calculate basic stats
      const totalCalls = calls.length;
      const totalEarnings = calls.reduce((sum, call) => sum + (call.earnings || 0), 0);
      const totalDuration = calls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
      const averageCallDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;
      const averageEarnings = totalCalls > 0 ? totalEarnings / totalCalls : 0;

      // Calculate weekly and monthly stats
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const callsThisWeek = calls.filter(call =>
        new Date(call.start_time) >= weekAgo
      ).length;

      const earningsThisWeek = calls
        .filter(call => new Date(call.start_time) >= weekAgo)
        .reduce((sum, call) => sum + (call.earnings || 0), 0);

      const callsThisMonth = calls.filter(call =>
        new Date(call.start_time) >= monthAgo
      ).length;

      const earningsThisMonth = calls
        .filter(call => new Date(call.start_time) >= monthAgo)
        .reduce((sum, call) => sum + (call.earnings || 0), 0);

      // Find top platform
      const platformCounts = calls.reduce((acc, call) => {
        const platform = call.platform || 'Unknown';
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPlatform = Object.entries(platformCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

      // Find most active day
      const dayCounts = calls.reduce((acc, call) => {
        const day = new Date(call.start_time).toLocaleDateString('en-US', { weekday: 'long' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostActiveDay = Object.entries(dayCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

      setStats({
        totalCalls,
        totalEarnings,
        totalDuration,
        averageCallDuration,
        averageEarnings,
        callsThisWeek,
        earningsThisWeek,
        callsThisMonth,
        earningsThisMonth,
        topPlatform,
        mostActiveDay
      });

      // Calculate daily stats for charts
      const dailyStatsMap = calls.reduce((acc, call) => {
        const date = new Date(call.start_time).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, calls: 0, earnings: 0, duration: 0 };
        }
        acc[date].calls += 1;
        acc[date].earnings += call.earnings || 0;
        acc[date].duration += call.duration_seconds || 0;
        return acc;
      }, {} as Record<string, DailyStats>);

      setDailyStats(Object.values(dailyStatsMap).sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));

      // Calculate platform stats
      const platformStatsMap = calls.reduce((acc, call) => {
        const platform = call.platform || 'Unknown';
        if (!acc[platform]) {
          acc[platform] = { platform, calls: 0, earnings: 0, percentage: 0 };
        }
        acc[platform].calls += 1;
        acc[platform].earnings += call.earnings || 0;
        return acc;
      }, {} as Record<string, PlatformStats>);

      const platformStatsArray = Object.values(platformStatsMap).map(stat => ({
        ...stat,
        percentage: (stat.calls / totalCalls) * 100
      }));

      setPlatformStats(platformStatsArray.sort((a, b) => b.calls - a.calls));

      // Calculate call type stats
      const callTypes = calls.reduce((acc, call) => {
        const type = call.call_type?.toLowerCase() || 'other';
        if (type === 'vri') acc.vri += 1;
        else if (type === 'opi') acc.opi += 1;
        else acc.other += 1;
        return acc;
      }, { vri: 0, opi: 0, other: 0 });

      setCallTypeStats(callTypes);

    } catch (err) {
      console.error('Error fetching call stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user, dateRange]);

  const refreshStats = () => {
    fetchStats();
  };

  return {
    stats,
    dailyStats,
    platformStats,
    callTypeStats,
    loading,
    error,
    refreshStats
  };
};
