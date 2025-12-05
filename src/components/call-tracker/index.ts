/**
 * Call Tracker Components Barrel Export
 */

// Main Component
export { CallTracker } from './CallTracker';

// Sub Components
export { CallTimer } from './CallTimer';
export { CallControls } from './CallControls';
export { CallNotes } from './CallNotes';
export { AudioIntegration } from './AudioIntegration';
export { CallStats } from './CallStats';

// Types
export type {
  CallSession,
  UserSettings,
  CallTrackerProps,
  CallTimerProps,
  CallNotesProps,
  CallControlsProps,
  CallStatsProps,
  AudioIntegrationProps,
  CallTrackerContextType,
  CallTrackerProviderProps,
} from './types';

// Constants
export {
  DEFAULT_USER_SETTINGS,
  CURRENCY_SYMBOLS,
  SUPPORTED_CURRENCIES,
  PAY_RATE_TYPES,
  CALL_STATUS,
  TIMER_CONFIG,
  AUDIO_INTEGRATION_FEATURES,
  DEFAULT_NOTES_PLACEHOLDER,
  VALIDATION_RULES,
  ANIMATION_CONFIG,
  NOTIFICATION_MESSAGES,
} from './constants';

// Utils
export {
  formatDuration,
  formatCurrency,
  calculateEarnings,
  validateUserSettings,
  generateSessionId,
  createCallSession,
  completeCallSession,
  parseDurationToSeconds,
  getPayRateDisplayText,
  calculateSessionStats,
  validateNotes,
  truncateNotes,
  isWithinMaxDuration,
  getSessionStatusColor,
  formatTimeForDisplay,
  generateCallAnalytics,
  debounce,
} from './utils';

// Hooks
export {
  CallTrackerProvider,
  useCallTracker,
  useCallTimer,
  useCallNotes,
  useCallAnalytics,
  useCallNotifications,
} from './hooks';
