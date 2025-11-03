/**
 * Call Tracker Component Utilities
 */

import type { CallSession, UserSettings } from './types';
import { CURRENCY_SYMBOLS, PAY_RATE_TYPES } from './constants';

/**
 * Format duration in seconds to HH:MM:SS format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':');
};

/**
 * Format currency amount with symbol
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';
  return `${symbol}${amount.toFixed(2)}`;
};

/**
 * Calculate earnings based on duration and pay rate
 */
export const calculateEarnings = (
  durationSeconds: number,
  payRate: number,
  payRateType: 'per_hour' | 'per_minute'
): number => {
  if (payRateType === 'per_hour') {
    const hours = durationSeconds / 3600;
    return hours * payRate;
  } else {
    const minutes = durationSeconds / 60;
    return minutes * payRate;
  }
};

/**
 * Validate user settings
 */
export const validateUserSettings = (settings: Partial<UserSettings>): boolean => {
  if (settings.pay_rate !== undefined) {
    if (settings.pay_rate < 0.01 || settings.pay_rate > 1000) {
      return false;
    }
  }

  if (settings.pay_rate_type !== undefined) {
    if (!Object.keys(PAY_RATE_TYPES).includes(settings.pay_rate_type)) {
      return false;
    }
  }

  if (settings.preferred_currency !== undefined) {
    if (!Object.keys(CURRENCY_SYMBOLS).includes(settings.preferred_currency)) {
      return false;
    }
  }

  return true;
};

/**
 * Generate unique session ID
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create new call session
 */
export const createCallSession = (startTime: Date = new Date()): CallSession => {
  return {
    id: generateSessionId(),
    startTime,
    duration: 0,
    earnings: 0,
    status: 'active',
  };
};

/**
 * Update call session with end time and calculations
 */
export const completeCallSession = (
  session: CallSession,
  endTime: Date,
  userSettings: UserSettings,
  notes?: string
): CallSession => {
  const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);
  const earnings = calculateEarnings(duration, userSettings.pay_rate, userSettings.pay_rate_type);

  return {
    ...session,
    endTime,
    duration,
    earnings,
    notes,
    status: 'completed',
  };
};

/**
 * Parse duration string to seconds
 */
export const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
};

/**
 * Get pay rate display text
 */
export const getPayRateDisplayText = (settings: UserSettings): string => {
  const rateText = PAY_RATE_TYPES[settings.pay_rate_type];
  const currencyText = formatCurrency(settings.pay_rate, settings.preferred_currency);
  return `${currencyText} ${rateText}`;
};

/**
 * Calculate session statistics
 */
export const calculateSessionStats = (sessions: CallSession[]) => {
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const totalSessions = completedSessions.length;
  const totalDuration = completedSessions.reduce((sum, s) => sum + s.duration, 0);
  const totalEarnings = completedSessions.reduce((sum, s) => sum + s.earnings, 0);
  const averageSessionLength = totalSessions > 0 ? totalDuration / totalSessions : 0;

  return {
    totalSessions,
    totalDuration,
    totalEarnings,
    averageSessionLength,
  };
};

/**
 * Validate notes length
 */
export const validateNotes = (notes: string, maxLength: number = 1000): boolean => {
  return notes.length <= maxLength;
};

/**
 * Truncate notes if too long
 */
export const truncateNotes = (notes: string, maxLength: number = 1000): string => {
  if (notes.length <= maxLength) return notes;
  return notes.substring(0, maxLength - 3) + '...';
};

/**
 * Check if session is within maximum duration
 */
export const isWithinMaxDuration = (durationSeconds: number, maxDuration: number = 8 * 60 * 60): boolean => {
  return durationSeconds <= maxDuration;
};

/**
 * Get session status color
 */
export const getSessionStatusColor = (status: CallSession['status']): string => {
  switch (status) {
    case 'active':
      return 'text-success';
    case 'paused':
      return 'text-warning';
    case 'completed':
      return 'text-muted-foreground';
    default:
      return 'text-muted-foreground';
  }
};

/**
 * Format time for display
 */
export const formatTimeForDisplay = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Generate analytics data for call session
 */
export const generateCallAnalytics = (session: CallSession, userSettings: UserSettings) => {
  return {
    event: 'call_session_completed',
    session_id: session.id,
    duration_seconds: session.duration,
    earnings: session.earnings,
    pay_rate: userSettings.pay_rate,
    pay_rate_type: userSettings.pay_rate_type,
    currency: userSettings.preferred_currency,
    has_notes: Boolean(session.notes),
  };
};

/**
 * Debounce function for auto-save
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
