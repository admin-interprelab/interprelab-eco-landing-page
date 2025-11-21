/**
 * Dashboard Page Component Utilities
 */

import { startOfMonth, startOfYear, endOfMonth, endOfYear } from 'date-fns';
import type { CallLogEntry, DashboardStats } from './types';

/**
 * Calculates statistics from call log data
 */
export const calculateStats = (data: CallLogEntry[]) => {
  const totalDuration = data.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
  const totalEarnings = data.reduce((sum, call) => sum + (parseFloat(call.earnings) || 0), 0);
  const callCount = data.length;
  const avgDuration = callCount > 0 ? totalDuration / callCount : 0;

  return { totalDuration, totalEarnings, callCount, avgDuration };
};

/**
 * Formats duration in seconds to human readable format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

/**
 * Formats currency amount
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Gets date ranges for statistics
 */
export const getDateRanges = () => {
  const now = new Date();
  return {
    monthStart: startOfMonth(now),
    monthEnd: endOfMonth(now),
    yearStart: startOfYear(now),
    yearEnd: endOfYear(now),
  };
};

/**
 * Filters calls by date range
 */
export const filterCallsByDateRange = (
  calls: CallLogEntry[],
  startDate: Date,
  endDate: Date
): CallLogEntry[] => {
  return calls.filter(call => {
    const callDate = new Date(call.start_time);
    return callDate >= startDate && callDate <= endDate;
  });
};

/**
 * Processes raw call data into dashboard stats
 */
export const processDashboardStats = (allCalls: CallLogEntry[]): DashboardStats => {
  const { monthStart, monthEnd, yearStart, yearEnd } = getDateRanges();

  const monthCalls = filterCallsByDateRange(allCalls, monthStart, monthEnd);
  const yearCalls = filterCallsByDateRange(allCalls, yearStart, yearEnd);

  const monthStats = calculateStats(monthCalls);
  const yearStats = calculateStats(yearCalls);
  const allStats = calculateStats(allCalls);

  return {
    monthTotal: monthStats.totalDuration,
    monthEarnings: monthStats.totalEarnings,
    monthCalls: monthStats.callCount,
    yearTotal: yearStats.totalDuration,
    yearEarnings: yearStats.totalEarnings,
    yearCalls: yearStats.callCount,
    avgCallDuration: allStats.avgDuration,
    totalCalls: allStats.callCount,
  };
};

/**
 * Validates call log entry
 */
export const isValidCallEntry = (call: unknown): call is CallLogEntry => {
  return (
    call &&
    typeof call.id === 'string' &&
    typeof call.user_id === 'string' &&
    typeof call.start_time === 'string' &&
    typeof call.duration_seconds === 'number' &&
    typeof call.earnings === 'string'
  );
};

/**
 * Sanitizes call log data
 */
export const sanitizeCallData = (calls: unknown[]): CallLogEntry[] => {
  return calls.filter(isValidCallEntry);
};

/**
 * Calculates earnings per hour
 */
export const calculateEarningsPerHour = (earnings: number, durationSeconds: number): number => {
  if (durationSeconds === 0) return 0;
  const hours = durationSeconds / 3600;
  return earnings / hours;
};

/**
 * Gets performance indicators
 */
export const getPerformanceIndicators = (stats: DashboardStats) => {
  const monthlyRate = stats.monthTotal > 0 ? stats.monthEarnings / (stats.monthTotal / 3600) : 0;
  const yearlyRate = stats.yearTotal > 0 ? stats.yearEarnings / (stats.yearTotal / 3600) : 0;

  return {
    monthlyHourlyRate: monthlyRate,
    yearlyHourlyRate: yearlyRate,
    averageCallValue: stats.totalCalls > 0 ? (stats.monthEarnings + stats.yearEarnings) / stats.totalCalls : 0,
  };
};
