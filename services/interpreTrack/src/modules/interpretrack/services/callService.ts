import { CallRecord, CallTypeStats, WeeklyData, AggregatedStats } from '../types';

export class CallService {
  private calls: CallRecord[] = [];
  private readonly PAY_PER_MINUTE = 0.75;

  // CRUD Operations
  async createCall(call: Omit<CallRecord, 'id'>): Promise<CallRecord> {
    const newCall: CallRecord = {
      ...call,
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    this.calls.unshift(newCall);
    return newCall;
  }

  async getCalls(limit?: number): Promise<CallRecord[]> {
    if (limit) {
      return this.calls.slice(0, limit);
    }
    return [...this.calls];
  }

  async updateCall(id: string, updates: Partial<CallRecord>): Promise<CallRecord | null> {
    const index = this.calls.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.calls[index] = { ...this.calls[index], ...updates };
    return this.calls[index];
  }

  async deleteCall(id: string): Promise<boolean> {
    const index = this.calls.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.calls.splice(index, 1);
    return true;
  }

  // Analytics Methods
  getCallTypeStats(): CallTypeStats {
    return this.calls.reduce(
      (stats, call) => {
        if (call.callType === 'VRI') stats.vri += 1;
        else stats.opi += 1;
        return stats;
      },
      { vri: 0, opi: 0 }
    );
  }

  getWeeklyData(): WeeklyData[] {
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

    this.calls
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

  getAggregatedStats(): AggregatedStats {
    return {
      totalCalls: this.calls.length,
      totalMinutes: this.calls.reduce((sum, call) => sum + call.duration, 0),
      totalEarnings: parseFloat(
        this.calls.reduce((sum, call) => sum + call.earnings, 0).toFixed(2)
      ),
    };
  }

  // Seed Sample Data
  seedSampleData(count: number = 75): void {
    const platforms: ('Platform A' | 'Platform B' | 'Platform C')[] = [
      'Platform A',
      'Platform B',
      'Platform C',
    ];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const pseudoRandom = (i * 3 + 7) % 60;
      const endTime = new Date(now.getTime() - i * 60 * 60 * 1000 - pseudoRandom * 60 * 1000);
      
      // Random duration 5-45 minutes
      const randomDuration = 5 + ((i * 17) % 40);
      const startTime = new Date(endTime.getTime() - randomDuration * 60 * 1000);
      
      const duration = randomDuration;
      const earnings = parseFloat((duration * this.PAY_PER_MINUTE).toFixed(2));
      
      // 60% VRI, 40% OPI distribution
      const callType = (i % 5) < 3 ? 'VRI' : 'OPI';

      this.calls.push({
        id: `call_${i + 1}`,
        startTime,
        endTime,
        duration,
        earnings,
        platform: platforms[i % platforms.length],
        callType,
      });
    }
  }

  // Get instance with sample data
  static createWithSampleData(): CallService {
    const service = new CallService();
    service.seedSampleData();
    return service;
  }
}

// Singleton instance
export const callService = CallService.createWithSampleData();


