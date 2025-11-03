/**
 * Dashboard utility functions and hooks
 * Separated from components to maintain Fast Refresh compatibility
 */

import { useContext } from 'react';
import { DashboardContext } from './DashboardProvider';

/**
 * Custom hook to use dashboard context
 * Throws error if used outside of DashboardProvider
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

/**
 * Hook for dashboard actions only (useful for components that only need actions)
 */
export const useDashboardActions = () => {
  const { refreshData, addNewCall, getTimeRangeStats, exportData } = useDashboard();
  return { refreshData, addNewCall, getTimeRangeStats, exportData };
};

/**
 * Hook for dashboard data only (useful for display components)
 */
export const useDashboardData = () => {
  const { stats, weeklyData, callTypeStats, recentCalls, isLoading, lastUpdated } = useDashboard();
  return { stats, weeklyData, callTypeStats, recentCalls, isLoading, lastUpdated };
};
