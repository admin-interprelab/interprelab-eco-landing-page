import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import type { CallRecord } from '@/lib/types';
import { Calendar, DollarSign } from 'lucide-react';

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

interface CallTypeData {
  vri: number;
  opi: number;
}

interface WeeklyData {
  day: string;
  calls: number;
  earnings: number;
}

interface Integration {
    name: string;
    status: 'connected' | 'disconnected' | 'syncing';
    lastSync?: string;
    icon: React.ReactNode;
    dataPoints?: number;
}

interface LearningMetrics {
    studyHours: number;
    termsLearned: number;
    quizzesCompleted: number;
    scenariosPracticed: number;
    botConversations: number;
    streak: number;
}

interface PlatformData {
    name: string;
    calls: number;
    earnings: number;
    avgDuration: number;
    change: number;
}

interface PremiumStats {
    totalCalls: number;
    totalMinutes: number;
    totalEarnings: number;
    avgCallDuration: number;
    peakHourEarnings: number;
    streakDays: number;
    monthlyGoalProgress: number;
    efficiencyScore: number;
}

interface DashboardData {
    stats: Stats;
    recentCalls: CallRecord[];
    currency: string;
    callTypeData: CallTypeData;
    weeklyData: WeeklyData[];
    integrations: Integration[];
    heatmapData: { day: string; hour: number; earnings: number }[];
    learningMetrics: LearningMetrics;
    platformData: PlatformData[];
    premiumStats: PremiumStats;
    aiInsights: string | null;
}

const calculateStats = (data: any[]) => {
    const totalDuration = data.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
    const totalEarnings = data.reduce((sum, call) => sum + (parseFloat(call.earnings) || 0), 0);
    const callCount = data.length;
    const avgDuration = callCount > 0 ? totalDuration / callCount : 0;

    return { totalDuration, totalEarnings, callCount, avgDuration };
};

export const useDashboardData = () => {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDashboardData = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const { data: settings } = await supabase
                .from('user_settings')
                .select('preferred_currency')
                .eq('user_id', user.id)
                .maybeSingle();

            const now = new Date();
            const monthStart = startOfMonth(now);
            const monthEnd = endOfMonth(now);
            const yearStart = startOfYear(now);
            const yearEnd = endOfYear(now);

            const { data: monthData, error: monthError } = await supabase.from('call_logs').select('duration_seconds, earnings, interpretation_type').eq('user_id', user.id).gte('start_time', monthStart.toISOString()).lte('start_time', monthEnd.toISOString());
            if (monthError) throw monthError;

            const { data: yearData, error: yearError } = await supabase.from('call_logs').select('duration_seconds, earnings').eq('user_id', user.id).gte('start_time', yearStart.toISOString()).lte('start_time', yearEnd.toISOString());
            if (yearError) throw yearError;

            const { data: allData, error: allError } = await supabase.from('call_logs').select('duration_seconds, earnings').eq('user_id', user.id);
            if (allError) throw allError;

            const { data: recent, error: recentError } = await supabase.from('call_logs').select('*').eq('user_id', user.id).order('start_time', { ascending: false }).limit(5);
            if (recentError) throw recentError;

            const monthStats = calculateStats(monthData || []);
            const yearStats = calculateStats(yearData || []);
            const allStats = calculateStats(allData || []);

            setData({
                stats: {
                    monthTotal: monthStats.totalDuration,
                    monthEarnings: monthStats.totalEarnings,
                    monthCalls: monthStats.callCount,
                    yearTotal: yearStats.totalDuration,
                    yearEarnings: yearStats.totalEarnings,
                    yearCalls: yearStats.callCount,
                    avgCallDuration: allStats.avgDuration,
                    totalCalls: allStats.callCount,
                },
                recentCalls: recent || [],
                currency: settings?.preferred_currency || 'USD',
                callTypeData: {
                    vri: monthData?.filter(c => c.interpretation_type === 'VRI').length || 0,
                    opi: monthData?.filter(c => c.interpretation_type === 'OPI').length || 0,
                },
                weeklyData: [
                    { day: 'Mon', calls: 4, earnings: 200 }, { day: 'Tue', calls: 6, earnings: 300 }, { day: 'Wed', calls: 5, earnings: 250 }, { day: 'Thu', calls: 8, earnings: 400 }, { day: 'Fri', calls: 7, earnings: 350 }, { day: 'Sat', calls: 3, earnings: 150 }, { day: 'Sun', calls: 2, earnings: 100 },
                ],
                heatmapData: [
                    { day: 'Mon', hour: 10, earnings: 120 }, { day: 'Tue', hour: 14, earnings: 250 }, { day: 'Wed', hour: 11, earnings: 180 }, { day: 'Fri', hour: 15, earnings: 300 },
                ],
                integrations: [
                    { name: 'Google Calendar', status: 'connected', lastSync: '2025-11-10T10:00:00Z', icon: <Calendar />, dataPoints: 120 }, { name: 'Stripe', status: 'syncing', icon: <DollarSign />, dataPoints: 45 },
                ],
                learningMetrics: { studyHours: 12, termsLearned: 150, quizzesCompleted: 25, scenariosPracticed: 10, botConversations: 42, streak: 5 },
                platformData: [
                    { name: 'Platform A', calls: 25, earnings: 1500, avgDuration: 30, change: 10 }, { name: 'Platform B', calls: 15, earnings: 1000, avgDuration: 40, change: -5 },
                ],
                premiumStats: { totalCalls: 40, totalMinutes: 1800, totalEarnings: 3500, avgCallDuration: 45, peakHourEarnings: 250, streakDays: 5, monthlyGoalProgress: 70, efficiencyScore: 85 },
                aiInsights: "You're on track to meet your monthly goal. Keep up the great work!",
            });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            loadDashboardData();
        } else {
            setLoading(false);
        }
    }, [user, loadDashboardData]);

    return { data, loading, error, refresh: loadDashboardData };
};
