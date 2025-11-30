import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { getAggregatedStats, getWeeklyData, getCallTypeStats, callRecords, addCallRecord } from '@/lib/data';
import type { CallRecord, WeeklyData, CallTypeStats } from '@/lib/types';

// Types for dashboard state
interface DashboardStats {
  totalCalls: number;
  totalMinutes: number;
  totalEarnings: number;
}

interface DashboardData {
  stats: DashboardStats;
  weeklyData: WeeklyData[];
  callTypeStats: CallTypeStats;
  recentCalls: CallRecord[];
  isLoading: boolean;
  lastUpdated: Date | null;
}

interface DashboardActions {
  refreshData: () => Promise<void>;
  addNewCall: (call: Omit<CallRecord, 'id' | 'earnings'>) => Promise<CallRecord>;
  getTimeRangeStats: (days: number) => DashboardStats;
  exportData: (format: 'csv' | 'json') => void;
}

interface DashboardContextType extends DashboardData, DashboardActions {}

// Create context
export const DashboardContext = createContext<DashboardContextType | null>(null);

// Provider component
interface DashboardProviderProps {
  children: ReactNode;
  refreshInterval?: number; // Auto-refresh interval in milliseconds
}

export const DashboardProvider = ({
  children,
  refreshInterval = 30000 // 30 seconds default
}: DashboardProviderProps) => {
  const [data, setData] = useState<DashboardData>({
    stats: { totalCalls: 0, totalMinutes: 0, totalEarnings: 0 },
    weeklyData: [],
    callTypeStats: { vri: 0, opi: 0 },
    recentCalls: [],
    isLoading: true,
    lastUpdated: null,
  });

  // Refresh data function
  const refreshData = useCallback(async () => {
    setData(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API delay for realistic loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      const stats = getAggregatedStats();
      const weeklyData = getWeeklyData();
      const callTypeStats = getCallTypeStats();
      const recentCalls = callRecords.slice(0, 10); // Get top 10 recent calls

      setData({
        stats,
        weeklyData,
        callTypeStats,
        recentCalls,
        isLoading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error('Failed to refresh dashboard data:', error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Add new call function
  const addNewCall = useCallback(async (callData: Omit<CallRecord, 'id' | 'earnings'>) => {
    const newCall = addCallRecord(callData);

    // Refresh data after adding new call
    await refreshData();

    return newCall;
  }, [refreshData]);

  // Get stats for specific time range
  const getTimeRangeStats = useCallback((days: number): DashboardStats => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filteredCalls = callRecords.filter(call => call.startTime >= cutoffDate);

    return {
      totalCalls: filteredCalls.length,
      totalMinutes: filteredCalls.reduce((sum, call) => sum + call.duration, 0),
      totalEarnings: filteredCalls.reduce((sum, call) => sum + call.earnings, 0),
    };
  }, []);

  // Export data function
  const exportData = useCallback((format: 'csv' | 'json') => {
    const dataToExport = {
      stats: data.stats,
      weeklyData: data.weeklyData,
      callTypeStats: data.callTypeStats,
      recentCalls: data.recentCalls,
      exportedAt: new Date().toISOString(),
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      // Convert calls to CSV
      const csvHeaders = ['ID', 'Start Time', 'End Time', 'Duration (min)', 'Earnings', 'Platform', 'Call Type'];
      const csvRows = data.recentCalls.map(call => [
        call.id,
        call.startTime.toISOString(),
        call.endTime.toISOString(),
        call.duration.toString(),
        call.earnings.toString(),
        call.platform,
        call.callType,
      ]);

      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-calls-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [data]);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!refreshInterval) return;

    const interval = setInterval(refreshData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshData, refreshInterval]);

  const contextValue: DashboardContextType = {
    ...data,
    refreshData,
    addNewCall,
    getTimeRangeStats,
    exportData,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Export hooks from separate utility file to maintain Fast Refresh compatibility
export { useDashboard, useDashboardActions, useDashboardData } from './dashboard-utils';
