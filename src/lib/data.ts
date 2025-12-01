import type { CallRecord, WeeklyData, UserPreferences, ConversionRates, CallTypeStats } from './types';

// Demo mode flag - set to true for guest/demo users
export const isDemoMode = () => {
  // Check if user is logged in (you can replace this with actual auth check)
  return !localStorage.getItem('userId');
};

const now = new Date();

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

// Generate realistic demo data for guest users
const generateCallRecords = (count: number): CallRecord[] => {
  const records: CallRecord[] = [];
  const platforms: ('Platform A' | 'Platform B' | 'Platform C')[] = ['Platform A', 'Platform B', 'Platform C'];

  for (let i = 0; i < count; i++) {
    const pseudoRandom = (i * 3 + 7) % 60;
    const end = new Date(now.getTime() - i * 60 * 60 * 1000 - pseudoRandom * 60 * 1000);
    
    // More realistic call durations (5-45 minutes)
    const randomDuration = 300 + ((i * 17) % 2640);
    const start = new Date(end.getTime() - randomDuration * 1000);

    const duration = getRoundedDuration(start, end);

    // More balanced VRI/OPI distribution (60% VRI, 40% OPI for demo data)
    const callType = (i % 5) < 3 ? 'VRI' : 'OPI';

    records.push({
      id: `call_${i + 1}`,
      startTime: start,
      endTime: end,
      duration,
      earnings: parseFloat((duration * userPreferences.payPerMinuteUSD).toFixed(2)),
      platform: platforms[i % platforms.length],
      callType,
    });
  }
  return records;
};

// Sample data with realistic distribution
export const sampleCallRecords: CallRecord[] = generateCallRecords(75);

// Actual user data (empty for new users)
let userCallRecords: CallRecord[] = [];

// Export the appropriate dataset
export const callRecords: CallRecord[] = isDemoMode() ? sampleCallRecords : userCallRecords;


export const addCallRecord = (record: Omit<CallRecord, 'id' | 'earnings'>) => {
  const newRecord: CallRecord = {
    ...record,
    id: `call_${userCallRecords.length + 1}`,
    earnings: parseFloat((record.duration * userPreferences.payPerMinuteUSD).toFixed(2)),
  };
  
  if (isDemoMode()) {
    // For demo mode, add to sample data (just for this session)
    sampleCallRecords.unshift(newRecord);
  } else {
    // For real users, add to their data
    userCallRecords.unshift(newRecord);
  }
  
  return newRecord;
}

export const getAggregatedStats = () => {
  const records = isDemoMode() ? sampleCallRecords : userCallRecords;
  const totalCalls = records.length;
  const totalMinutes = records.reduce((acc, call) => acc + call.duration, 0);
  const totalEarnings = records.reduce((acc, call) => acc + call.earnings, 0);

  return {
    totalCalls,
    totalMinutes,
    totalEarnings,
  };
};

export const getCallTypeStats = (): CallTypeStats => {
  const records = isDemoMode() ? sampleCallRecords : userCallRecords;
  const stats: CallTypeStats = { vri: 0, opi: 0 };
  
  records.forEach(call => {
    if (call.callType === 'VRI') {
      stats.vri += 1;
    } else {
      stats.opi += 1;
    }
  });
  
  return stats;
}

export const getWeeklyData = (): WeeklyData[] => {
  const records = isDemoMode() ? sampleCallRecords : userCallRecords;
  
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

  records
    .filter(call => call.startTime > oneWeekAgo)
    .forEach(call => {
      const dayIndex = call.startTime.getDay();
      weeklyData[dayIndex].calls += 1;
      weeklyData[dayIndex].earnings = parseFloat((weeklyData[dayIndex].earnings + call.earnings).toFixed(2));
    });

  // Fill in missing days with realistic data for demo mode
  if (isDemoMode()) {
    weeklyData.forEach((day, index) => {
      if (day.calls === 0) {
        day.calls = (index % 5) + 2; // 2-6 calls per day
        const avgDuration = 15; // 15 minutes average
        const duration = day.calls * avgDuration;
        day.earnings = parseFloat((duration * userPreferences.payPerMinuteUSD).toFixed(2));
      }
    });
  }

  return weeklyData;
};

export const wageDetails = {
  payPerMinuteUSD: 0.75,
  payPerHourUSD: 45.00,
};
