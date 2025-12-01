export interface CallRecord {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  earnings: number;
  platform: 'Platform A' | 'Platform B' | 'Platform C';
  callType: 'VRI' | 'OPI';
}

export interface CallTypeStats {
  vri: number;
  opi: number;
}

export interface WeeklyData {
  day: string;
  calls: number;
  earnings: number;
}

export interface AggregatedStats {
  totalCalls: number;
  totalMinutes: number;
  totalEarnings: number;
}

export interface UserPreferences {
  payPerMinuteUSD: number;
  targetCurrency: string;
  rounding: 'up' | 'down' | 'nearest';
}
