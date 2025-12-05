/**
 * Call Tracker Component Types
 */

import { ReactNode } from 'react';

export interface CallSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  earnings: number;
  notes?: string;
  status: 'active' | 'completed' | 'paused';
}

export interface UserSettings {
  pay_rate: number;
  pay_rate_type: 'per_hour' | 'per_minute';
  preferred_currency: string;
  auto_save_notes: boolean;
  notification_enabled: boolean;
}

export interface CallTrackerProps {
  className?: string;
  customSettings?: Partial<UserSettings>;
  onCallStart?: (session: CallSession) => void;
  onCallEnd?: (session: CallSession) => void;
  onCallPause?: (session: CallSession) => void;
  onCallResume?: (session: CallSession) => void;
}

export interface CallTimerProps {
  className?: string;
  elapsedSeconds: number;
  isTracking: boolean;
  currentEarnings: number;
  userSettings?: UserSettings;
  onStart: () => void;
  onEnd: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export interface CallNotesProps {
  className?: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  placeholder?: string;
  maxLength?: number;
  autoSave?: boolean;
}

export interface CallControlsProps {
  className?: string;
  isTracking: boolean;
  isPaused?: boolean;
  onStart: () => void;
  onEnd: () => void;
  onPause?: () => void;
  onResume?: () => void;
  disabled?: boolean;
}

export interface CallStatsProps {
  className?: string;
  userSettings?: UserSettings;
  totalSessions?: number;
  totalEarnings?: number;
  averageSessionLength?: number;
}

export interface AudioIntegrationProps {
  className?: string;
  title?: string;
  description?: string;
  features?: string[];
}

export interface CallTrackerContextType {
  currentSession: CallSession | null;
  isTracking: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  userSettings: UserSettings | null;
  startCall: () => Promise<void>;
  endCall: (notes?: string) => Promise<void>;
  pauseCall: () => void;
  resumeCall: () => void;
  updateNotes: (notes: string) => void;
  calculateEarnings: (seconds: number) => number;
  formatDuration: (seconds: number) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export interface CallTrackerProviderProps {
  children: ReactNode;
  initialSettings?: Partial<UserSettings>;
}
