import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CallLogService, UserSettingsService } from '../integrations/supabase/services';

interface CallSession {
  id?: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  earnings?: number;
  currency?: string;
  callType?: 'VRI' | 'OPI';
}

interface UserSettings {
  pay_rate: number;
  pay_rate_type: 'per_hour' | 'per_minute';
  preferred_currency: string;
  preferred_language: string;
  time_rounding_method: 'round_down' | 'roll_over' | 'actual';
}

export const useCallTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const loadUserSettings = useCallback(async () => {
    if (!user) return;

    const { data, error } = await UserSettingsService.getUserSettings(user.id);

    if (data && !error) {
      setUserSettings({
        pay_rate: data.pay_rate || 0,
        pay_rate_type: (data.pay_rate_type as 'per_hour' | 'per_minute') || 'per_hour',
        preferred_currency: data.preferred_currency || 'USD',
        preferred_language: data.preferred_language || 'en',
        time_rounding_method: (data.time_rounding_method as 'round_down' | 'roll_over' | 'actual') || 'actual',
      });
    } else if (!error) {
      // Create default settings
      const { data: newSettings } = await UserSettingsService.updateUserSettings(user.id, {
        pay_rate: 0,
        pay_rate_type: 'per_hour',
        preferred_currency: 'USD',
        preferred_language: 'en',
        time_rounding_method: 'actual',
      });

      if (newSettings) {
        setUserSettings({
          pay_rate: newSettings.pay_rate || 0,
          pay_rate_type: (newSettings.pay_rate_type as 'per_hour' | 'per_minute') || 'per_hour',
          preferred_currency: newSettings.preferred_currency || 'USD',
          preferred_language: newSettings.preferred_language || 'en',
          time_rounding_method: (newSettings.time_rounding_method as 'round_down' | 'roll_over' | 'actual') || 'actual',
        });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserSettings();
    }
  }, [user, loadUserSettings]);

  useEffect(() => {
    if (isTracking) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTracking]);

  const calculateEarnings = (durationSeconds: number): number => {
    if (!userSettings || !userSettings.pay_rate) return 0;

    if (userSettings.pay_rate_type === 'per_hour') {
      return (durationSeconds / 3600) * userSettings.pay_rate;
    } else {
      return (durationSeconds / 60) * userSettings.pay_rate;
    }
  };

  const calculateRoundedDuration = (durationSeconds: number): number => {
    if (!userSettings) return durationSeconds;

    switch (userSettings.time_rounding_method) {
      case 'round_down':
        return Math.floor(durationSeconds / 60) * 60;
      case 'roll_over':
        return Math.ceil(durationSeconds / 60) * 60;
      default:
        return durationSeconds;
    }
  };

  const startCall = async () => {
    if (!user) return null;

    try {
      const callLog = {
        user_id: user.id,
        start_time: new Date().toISOString(),
      };

      const { data, error } = await CallLogService.createCallLog(callLog);

      if (error) {
        console.error('Error creating call log:', error);
        return { error };
      }

      const session: CallSession = {
        id: data?.id,
        startTime: new Date(),
      };

      setCurrentSession(session);
      setIsTracking(true);
      setElapsedSeconds(0);

      return { data, error: null };
    } catch (error) {
      console.error('Error starting call:', error);
      return { error };
    }
  };

  const endCall = async (notes?: string, callType?: 'VRI' | 'OPI') => {
    if (!currentSession || !user || !currentSession.id) return { error: 'No active call session' };

    try {
      const endTime = new Date().toISOString();
      const earnings = calculateEarnings(elapsedSeconds);
      const roundedDuration = calculateRoundedDuration(elapsedSeconds);
      const roundedEarnings = calculateEarnings(roundedDuration);

      const updates = {
        end_time: endTime,
        duration_seconds: elapsedSeconds,
        earnings,
        currency: userSettings?.preferred_currency || 'USD',
        notes: notes || null,
        call_type: callType || 'VRI',
        rounded_duration_seconds: roundedDuration,
        rounded_earnings: roundedEarnings,
      };

      const { data, error } = await CallLogService.updateCallLog(currentSession.id, updates);

      if (error) {
        console.error('Error updating call log:', error);
        return { error };
      }

      setIsTracking(false);
      setCurrentSession(null);
      setElapsedSeconds(0);

      return { data, error: null };
    } catch (error) {
      console.error('Error ending call:', error);
      return { error };
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return {
    isTracking,
    currentSession,
    elapsedSeconds,
    userSettings,
    startCall,
    endCall,
    formatDuration,
    formatCurrency,
    calculateEarnings,
  };
};
