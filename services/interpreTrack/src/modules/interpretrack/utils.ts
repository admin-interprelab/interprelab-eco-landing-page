import { CallRecord, CallTypeStats, WeeklyData, AggregatedStats } from './types';

// InterpreTrack utility functions

export function getRoundedDuration(startTime: Date, endTime: Date): number {
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationMinutes = durationMs / (1000 * 60);
  // Round to nearest minute
  return Math.round(durationMinutes);
}

export function isDemoMode(): boolean {
  // Check if user is in demo mode (not authenticated or using demo data)
  return !localStorage.getItem('user_authenticated');
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function calculateCallTypeStats(calls: CallRecord[]): CallTypeStats {
  return calls.reduce(
    (stats, call) => {
      if (call.callType === 'VRI') stats.vri += 1;
      else stats.opi += 1;
      return stats;
    },
    { vri: 0, opi: 0 }
  );
}

export function calculateWeeklyData(calls: CallRecord[]): WeeklyData[] {
  const weeklyData: WeeklyData[] = [
    { day: 'Sun', calls: 0, earnings: 0 },
    { day: 'Mon', calls: 0, earnings: 0 },
    { day: 'Tue', calls: 0, earnings: 0 },
    { day: 'Wed', calls: 0, earnings: 0 },
    { day: 'Thu', calls: 0, earnings: 0 },
    { day: 'Fri', calls: 0, earnings: 0 },
    { day: 'Sat', calls: 0, earnings: 0 },
  ];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  calls
    .filter(call => call.startTime > oneWeekAgo)
    .forEach(call => {
      const dayIndex = call.startTime.getDay();
      weeklyData[dayIndex].calls += 1;
      weeklyData[dayIndex].earnings = parseFloat(
        (weeklyData[dayIndex].earnings + call.earnings).toFixed(2)
      );
    });

  return weeklyData;
}

export function calculateAggregatedStats(calls: CallRecord[]): AggregatedStats {
  return {
    totalCalls: calls.length,
    totalMinutes: calls.reduce((sum, call) => sum + call.duration, 0),
    totalEarnings: parseFloat(
      calls.reduce((sum, call) => sum + call.earnings, 0).toFixed(2)
    ),
  };
}
