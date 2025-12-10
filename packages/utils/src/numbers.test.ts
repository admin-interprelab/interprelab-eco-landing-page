import { describe, it, expect } from 'vitest';
import { formatNumber, formatPercentage, roundToNearest, calculatePercentageChange, clamp } from './numbers';

describe('Number Utils', () => {
  describe('formatNumber', () => {
    it('should format with default decimals', () => {
      expect(formatNumber(1234.567)).toBe('1,235'); // Default 0 decimals
    });

    it('should format with custom decimals', () => {
      expect(formatNumber(1234.567, 2)).toBe('1,234.57');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage', () => {
      expect(formatPercentage(0.123)).toBe('12.3%');
    });

    it('should format with custom decimals', () => {
      expect(formatPercentage(0.12345, 2)).toBe('12.35%');
    });
  });

  describe('roundToNearest', () => {
    it('should round to nearest integer', () => {
      expect(roundToNearest(4.6)).toBe(5);
    });

    it('should round to nearest 5', () => {
      expect(roundToNearest(12, 5)).toBe(10);
      expect(roundToNearest(13, 5)).toBe(15);
    });
  });

  describe('calculatePercentageChange', () => {
    it('should calculate increase', () => {
      expect(calculatePercentageChange(150, 100)).toBe(50);
    });

    it('should calculate decrease', () => {
      expect(calculatePercentageChange(50, 100)).toBe(-50);
    });

    it('should handle zero previous value', () => {
      expect(calculatePercentageChange(100, 0)).toBe(100);
      expect(calculatePercentageChange(0, 0)).toBe(0);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should clamp min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should clamp max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });
});
