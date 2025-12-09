import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { formatDate, formatRelativeTime, formatCallDuration, formatDurationSeconds } from './date';

describe('Date Utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    it('should format date object', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      // PPP format depends on locale, but usually "January 1st, 2024" or similar
      expect(formatDate(date)).toContain('January 1st, 2024');
    });

    it('should format date string', () => {
      expect(formatDate('2024-01-01T12:00:00Z')).toContain('January 1st, 2024');
    });
  });

  describe('formatRelativeTime', () => {
    it('should handle "Today"', () => {
      const date = new Date('2024-01-01T10:00:00Z'); // 2 hours ago
      expect(formatRelativeTime(date)).toContain('Today at');
    });

    it('should handle "Yesterday"', () => {
      const date = new Date('2023-12-31T12:00:00Z'); // Yesterday
      expect(formatRelativeTime(date)).toContain('Yesterday at');
    });

    it('should handle older dates', () => {
      const date = new Date('2023-12-25T12:00:00Z');
      expect(formatRelativeTime(date)).toBe('7 days ago');
    });
  });

  describe('formatCallDuration (minutes)', () => {
    it('should format minutes only', () => {
      expect(formatCallDuration(45)).toBe('45m');
    });

    it('should format hours and minutes', () => {
      expect(formatCallDuration(90)).toBe('1h 30m');
    });
  });

  describe('formatDurationSeconds', () => {
    it('should format seconds only', () => {
      expect(formatDurationSeconds(45)).toBe('45s');
    });

    it('should format minutes and seconds', () => {
      expect(formatDurationSeconds(90)).toBe('1m 30s');
    });

    it('should format hours, minutes, and seconds', () => {
      expect(formatDurationSeconds(3665)).toBe('1h 1m 5s');
    });
  });
});
