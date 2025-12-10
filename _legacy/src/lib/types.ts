
export interface CallRecord {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  earnings: number;
  platform: 'Platform A' | 'Platform B' | 'Platform C';
  callType: 'VRI' | 'OPI';
}

export interface WeeklyData {
  day: string;
  calls: number;
  earnings: number;
}

export interface UserPreferences {
    payPerMinuteUSD: number;
    targetCurrency: string;
    rounding: 'nearest' | 'up' | 'down';
}

export interface ConversionRates {
    [key: string]: number;
}

export interface CallTypeStats {
  vri: number;
  opi: number;
}
