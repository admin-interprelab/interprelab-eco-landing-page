/**
 * Call Tracker Component Constants
 */

import type { UserSettings } from './types';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  pay_rate: 25.0,
  pay_rate_type: 'per_hour',
  preferred_currency: 'USD',
  auto_save_notes: true,
  notification_enabled: true,
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  CHF: 'CHF',
  CNY: '¥',
} as const;

export const SUPPORTED_CURRENCIES = Object.keys(CURRENCY_SYMBOLS) as Array<keyof typeof CURRENCY_SYMBOLS>;

export const PAY_RATE_TYPES = {
  per_hour: 'per hour',
  per_minute: 'per minute',
} as const;

export const CALL_STATUS = {
  active: 'Active',
  completed: 'Completed',
  paused: 'Paused',
} as const;

export const TIMER_CONFIG = {
  updateInterval: 1000, // 1 second
  autoSaveInterval: 30000, // 30 seconds
  maxSessionDuration: 8 * 60 * 60, // 8 hours in seconds
} as const;

export const AUDIO_INTEGRATION_FEATURES = [
  'Seamless browser audio integration',
  'No additional audio instances created',
  'Compatible with InterpreCoach',
  'Automatic call detection',
  'Real-time duration tracking',
  'Background operation support',
];

export const DEFAULT_NOTES_PLACEHOLDER = 'Add notes about this call...';

export const VALIDATION_RULES = {
  maxNotesLength: 1000,
  minPayRate: 0.01,
  maxPayRate: 1000,
} as const;

export const ANIMATION_CONFIG = {
  timerPulse: 'animate-pulse',
  buttonTransition: 'transition-all duration-200',
  cardHover: 'hover:shadow-lg transition-shadow duration-300',
} as const;

export const NOTIFICATION_MESSAGES = {
  callStarted: 'Call tracking started',
  callEnded: 'Call tracking ended',
  callPaused: 'Call tracking paused',
  callResumed: 'Call tracking resumed',
  notesSaved: 'Notes saved automatically',
  maxDurationReached: 'Maximum session duration reached',
} as const;
