import { describe, it, expect } from 'vitest';
import { formatCurrency, parseCurrency, convertCurrency } from './currency';

describe('Currency Utils', () => {
  describe('formatCurrency', () => {
    it('should format USD by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('should format with custom currency', () => {
      expect(formatCurrency(1234.56, { currency: 'EUR' })).toBe('€1,234.56');
    });

    it('should format with custom locale', () => {
      // Note: In Node/HappyDOM environments, locale formatting might vary slightly depending on ICU data.
      // We'll check for the presence of the currency symbol and the value.
      const result = formatCurrency(1234.56, { currency: 'EUR', locale: 'de-DE' });
      expect(result).toContain('1.234,56');
      expect(result).toContain('€');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('parseCurrency', () => {
    it('should parse simple currency string', () => {
      expect(parseCurrency('$1,234.56')).toBe(1234.56);
    });

    it('should parse string with no symbol', () => {
      expect(parseCurrency('1,234.56')).toBe(1234.56);
    });

    it('should handle negative numbers', () => {
      expect(parseCurrency('-$1,234.56')).toBe(-1234.56);
    });
  });

  describe('convertCurrency', () => {
    it('should convert correctly', () => {
      // 100 USD -> EUR (Rate 0.85)
      expect(convertCurrency(100, 1, 0.85)).toBe(85);
    });

    it('should handle zero', () => {
      expect(convertCurrency(0, 1, 0.85)).toBe(0);
    });
  });
});
