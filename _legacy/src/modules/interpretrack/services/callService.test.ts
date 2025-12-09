import { describe, it, expect, beforeEach } from 'vitest';
import { CallService } from './callService';
import { CallRecord } from '../types';

describe('CallService', () => {
  let callService: CallService;

  beforeEach(() => {
    callService = new CallService();
  });

  const sampleCall: Omit<CallRecord, 'id'> = {
    startTime: new Date('2024-01-01T10:00:00Z'),
    endTime: new Date('2024-01-01T10:15:00Z'),
    duration: 15,
    earnings: 11.25,
    platform: 'Platform A',
    callType: 'VRI',
  };

  describe('CRUD Operations', () => {
    it('should create a call', async () => {
      const call = await callService.createCall(sampleCall);
      expect(call.id).toBeDefined();
      expect(call.platform).toBe('Platform A');
      
      const calls = await callService.getCalls();
      expect(calls).toHaveLength(1);
      expect(calls[0]).toEqual(call);
    });

    it('should get calls', async () => {
      await callService.createCall(sampleCall);
      await callService.createCall({ ...sampleCall, platform: 'Platform B' });

      const calls = await callService.getCalls();
      expect(calls).toHaveLength(2);
      expect(calls[0].platform).toBe('Platform B'); // Most recent first
    });

    it('should update a call', async () => {
      const call = await callService.createCall(sampleCall);
      const updated = await callService.updateCall(call.id, { duration: 20 });

      expect(updated).not.toBeNull();
      expect(updated?.duration).toBe(20);

      const calls = await callService.getCalls();
      expect(calls[0].duration).toBe(20);
    });

    it('should delete a call', async () => {
      const call = await callService.createCall(sampleCall);
      const success = await callService.deleteCall(call.id);

      expect(success).toBe(true);
      const calls = await callService.getCalls();
      expect(calls).toHaveLength(0);
    });
  });

  describe('Analytics', () => {
    beforeEach(async () => {
      // Add some sample data
      await callService.createCall({ ...sampleCall, callType: 'VRI', earnings: 10 });
      await callService.createCall({ ...sampleCall, callType: 'OPI', earnings: 5 });
      await callService.createCall({ ...sampleCall, callType: 'VRI', earnings: 10 });
    });

    it('should calculate call type stats', () => {
      const stats = callService.getCallTypeStats();
      expect(stats.vri).toBe(2);
      expect(stats.opi).toBe(1);
    });

    it('should calculate aggregated stats', () => {
      const stats = callService.getAggregatedStats();
      expect(stats.totalCalls).toBe(3);
      expect(stats.totalEarnings).toBe(25);
    });
  });
});
