
import type { CallRecord, WeeklyData, UserPreferences, ConversionRates, CallTypeStats } from './types';

const now = new Date('2024-05-15T12:00:00Z');

export const userPreferences: UserPreferences = {
  payPerMinuteUSD: 0.75,
  targetCurrency: 'MXN',
  rounding: 'up',
};

export const conversionRates: ConversionRates = {
  MXN: 18.50,
  CNY: 7.25,
  EUR: 0.92,
};

export const getRoundedDuration = (start: Date, end: Date): number => {
  const durationSeconds = (end.getTime() - start.getTime()) / 1000;
  const durationMinutes = durationSeconds / 60;

  switch(userPreferences.rounding) {
    case 'up':
      return Math.ceil(durationMinutes);
    case 'nearest':
      return Math.round(durationMinutes);
    case 'down':
    default:
      return Math.floor(durationMinutes);
  }
}

const generateCallRecords = (count: number): CallRecord[] => {
  const records: CallRecord[] = [];
  const platforms: ('Platform A' | 'Platform B' | 'Platform C')[] = ['Platform A', 'Platform B', 'Platform C'];

  for (let i = 0; i < count; i++) {
    const pseudoRandom = (i * 3 + 7) % 60;
    const end = new Date(now.getTime() - i * 60 * 60 * 1000 - pseudoRandom * 60 * 1000);
    const randomDuration = 300 + ((i * 17) % 2640);
    const start = new Date(end.getTime() - randomDuration * 1000);

    const duration = getRoundedDuration(start, end);

    records.push({
      id: `call_${i + 1}`,
      startTime: start,
      endTime: end,
      duration,
      earnings: parseFloat((duration * userPreferences.payPerMinuteUSD).toFixed(2)),
      platform: platforms[i % platforms.length],
      callType: (i % 3) === 0 ? 'OPI' : 'VRI',
    });
  }
  return records;
};

export const callRecords: CallRecord[] = generateCallRecords(50);


export const addCallRecord = (record: Omit<CallRecord, 'id' | 'earnings'>) => {
  const newRecord: CallRecord = {
    ...record,
    id: `call_${callRecords.length + 1}`,
    earnings: parseFloat((record.duration * userPreferences.payPerMinuteUSD).toFixed(2)),
  };
  callRecords.unshift(newRecord);
  return newRecord;
}


export const getAggregatedStats = () => {
  const totalCalls = callRecords.length;
  const totalMinutes = callRecords.reduce((acc, call) => acc + call.duration, 0);
  const totalEarnings = callRecords.reduce((acc, call) => acc + call.earnings, 0);

  return {
    totalCalls,
    totalMinutes,
    totalEarnings,
  };
};

export const getCallTypeStats = (): CallTypeStats => {
  const stats: CallTypeStats = { vri: 0, opi: 0 };
  callRecords.forEach(call => {
    if (call.callType === 'VRI') {
      stats.vri += 1;
    } else {
      stats.opi += 1;
    }
  });
  return stats;
}

export const getWeeklyData = (): WeeklyData[] => {
  const weeklyData: WeeklyData[] = [
    { day: 'Sun', calls: 0, earnings: 0 },
    { day: 'Mon', calls: 0, earnings: 0 },
    { day: 'Tue', calls: 0, earnings: 0 },
    { day: 'Wed', calls: 0, earnings: 0 },
    { day: 'Thu', calls: 0, earnings: 0 },
    { day: 'Fri', calls: 0, earnings: 0 },
    { day: 'Sat', calls: 0, earnings: 0 },
  ];

  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  callRecords
    .filter(call => call.startTime > oneWeekAgo)
    .forEach(call => {
      const dayIndex = call.startTime.getDay();
      weeklyData[dayIndex].calls += 1;
      weeklyData[dayIndex].earnings = parseFloat((weeklyData[dayIndex].earnings + call.earnings).toFixed(2));
    });

  weeklyData.forEach((day, index) => {
    if (day.calls === 0) {
      day.calls = (index % 5) + 1;
      const duration = day.calls * ((index * 5 + 5) % 15 + 5);
      day.earnings = parseFloat((duration * userPreferences.payPerMinuteUSD).toFixed(2));
    }
  });

  return weeklyData;
};

export const wageDetails = {
  payPerMinuteUSD: 0.75,
  payPerHourUSD: 45.00,
};
