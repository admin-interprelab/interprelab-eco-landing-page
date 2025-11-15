/**
 * Call Tracker Component Hooks
 */

import React, { useState, useEffect, useCallback, useContext, createContext, useRef } from 'react';
import type { CallSession, UserSettings, CallTrackerContextType, CallTrackerProviderProps } from './types';
import { DEFAULT_USER_SETTINGS, TIMER_CONFIG, NOTIFICATION_MESSAGES } from './constants';
import {
  formatDuration,
  formatCurrency,
  calculateEarnings,
  createCallSession,
  completeCallSession,
  generateCallAnalytics,
  debounce
} from './utils';

// Call Tracker Context
const CallTrackerContext = createContext<CallTrackerContextType | null>(null);

/**
 * Call Tracker Provider Component
 */
export const CallTrackerProvider = ({
  children,
  initialSettings = DEFAULT_USER_SETTINGS
}: CallTrackerProviderProps) => {
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    ...DEFAULT_USER_SETTINGS,
    ...initialSettings,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const pausedTimeRef = useRef<number>(0);

  // Timer effect
  useEffect(() => {
    if (isTracking && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const now = new Date();
          const elapsed = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000) - pausedTimeRef.current;
          setElapsedSeconds(elapsed);
        }
      }, TIMER_CONFIG.updateInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking, isPaused]);

  const startCall = useCallback(async () => {
    const startTime = new Date();
    const session = createCallSession(startTime);

    setCurrentSession(session);
    setIsTracking(true);
    setIsPaused(false);
    setElapsedSeconds(0);
    startTimeRef.current = startTime;
    pausedTimeRef.current = 0;

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'call_started', {
        session_id: session.id,
      });
    }
  }, []);

  const endCall = useCallback(async (notes?: string) => {
    if (!currentSession || !startTimeRef.current) return;

    const endTime = new Date();
    const completedSession = completeCallSession(
      currentSession,
      endTime,
      userSettings,
      notes
    );

    setCurrentSession(null);
    setIsTracking(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;

    // Track analytics
    const analyticsData = generateCallAnalytics(completedSession, userSettings);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', analyticsData.event, analyticsData);
    }

    // Here you would typically save to database
    console.log('Call completed:', completedSession);
  }, [currentSession, userSettings]);

  const pauseCall = useCallback(() => {
    if (!isTracking || isPaused) return;

    setIsPaused(true);
    pausedTimeRef.current += elapsedSeconds;
  }, [isTracking, isPaused, elapsedSeconds]);

  const resumeCall = useCallback(() => {
    if (!isTracking || !isPaused) return;

    setIsPaused(false);
    startTimeRef.current = new Date();
  }, [isTracking, isPaused]);

  const updateNotes = useCallback((notes: string) => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, notes } : null);
    }
  }, [currentSession]);

  const calculateEarningsForDuration = useCallback((seconds: number) => {
    return calculateEarnings(seconds, userSettings.pay_rate, userSettings.pay_rate_type);
  }, [userSettings]);

  const formatDurationDisplay = useCallback((seconds: number) => {
    return formatDuration(seconds);
  }, []);

  const formatCurrencyDisplay = useCallback((amount: number, currency?: string) => {
    return formatCurrency(amount, currency || userSettings.preferred_currency);
  }, [userSettings.preferred_currency]);

  const contextValue: CallTrackerContextType = {
    currentSession,
    isTracking,
    isPaused,
    elapsedSeconds,
    userSettings,
    startCall,
    endCall,
    pauseCall,
    resumeCall,
    updateNotes,
    calculateEarnings: calculateEarningsForDuration,
    formatDuration: formatDurationDisplay,
    formatCurrency: formatCurrencyDisplay,
  };

  return React.createElement(
    CallTrackerContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing call tracker context
 */
export const useCallTracker = (): CallTrackerContextType => {
  const context = useContext(CallTrackerContext);
  if (!context) {
    throw new Error('useCallTracker must be used within a CallTrackerProvider');
  }
  return context;
};

/**
 * Hook for call timer functionality
 */
export const useCallTimer = () => {
  const {
    isTracking,
    isPaused,
    elapsedSeconds,
    startCall,
    endCall,
    pauseCall,
    resumeCall
  } = useCallTracker();

  const [displayTime, setDisplayTime] = useState('00:00:00');

  useEffect(() => {
    setDisplayTime(formatDuration(elapsedSeconds));
  }, [elapsedSeconds]);

  return {
    isTracking,
    isPaused,
    elapsedSeconds,
    displayTime,
    startCall,
    endCall,
    pauseCall,
    resumeCall,
  };
};

/**
 * Hook for call notes with auto-save
 */
export const useCallNotes = (autoSaveInterval: number = 5000) => {
  const { currentSession, updateNotes } = useCallTracker();
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounced auto-save function
  const debouncedSave = useCallback(
    debounce(async (notesToSave: string) => {
      setIsSaving(true);
      updateNotes(notesToSave);
      setLastSaved(new Date());
      setIsSaving(false);
    }, autoSaveInterval),
    [updateNotes, autoSaveInterval]
  );

  const handleNotesChange = useCallback((newNotes: string) => {
    setNotes(newNotes);
    if (currentSession) {
      debouncedSave(newNotes);
    }
  }, [currentSession, debouncedSave]);

  // Reset notes when session ends
  useEffect(() => {
    if (!currentSession) {
      setNotes('');
      setLastSaved(null);
    }
  }, [currentSession]);

  return {
    notes,
    isSaving,
    lastSaved,
    handleNotesChange,
  };
};

/**
 * Hook for call analytics and statistics
 */
export const useCallAnalytics = () => {
  const [sessions, setSessions] = useState<CallSession[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [averageSessionLength, setAverageSessionLength] = useState(0);

  const addSession = useCallback((session: CallSession) => {
    setSessions(prev => [...prev, session]);
  }, []);

  const getSessionStats = useCallback(() => {
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const total = completedSessions.reduce((sum, s) => sum + s.earnings, 0);
    const duration = completedSessions.reduce((sum, s) => sum + s.duration, 0);
    const average = completedSessions.length > 0 ? duration / completedSessions.length : 0;

    setTotalEarnings(total);
    setTotalDuration(duration);
    setAverageSessionLength(average);

    return {
      totalSessions: completedSessions.length,
      totalEarnings: total,
      totalDuration: duration,
      averageSessionLength: average,
    };
  }, [sessions]);

  useEffect(() => {
    getSessionStats();
  }, [sessions, getSessionStats]);

  return {
    sessions,
    totalEarnings,
    totalDuration,
    averageSessionLength,
    addSession,
    getSessionStats,
  };
};

/**
 * Hook for call notifications
 */
export const useCallNotifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = useCallback((message: string) => {
    setNotifications(prev => [...prev, message]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== message));
    }, 5000);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    clearNotifications,
  };
};
