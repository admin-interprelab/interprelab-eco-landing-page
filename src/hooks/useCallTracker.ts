import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/firebase';
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';

interface CallSession {
  id?: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  earnings?: number;
  currency?: string;
}

interface UserSettings {
    user_id: string;
    pay_rate: number;
    pay_rate_type: 'per_hour' | 'per_minute';
    preferred_currency: string;
    preferred_language: string;
}

export const useCallTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { currentUser: user } = useAuth();
  const { toast } = useToast();

  const loadUserSettings = useCallback(async () => {
    if (!user) return;
    const userSettingsRef = doc(db, 'user_settings', user.uid);
    const docSnap = await getDoc(userSettingsRef);

    if (docSnap.exists()) {
      setUserSettings(docSnap.data() as UserSettings);
    } else {
      // Create default settings with 'per_minute'
      const newSettings: UserSettings = {
        user_id: user.uid,
        pay_rate: 0,
        pay_rate_type: 'per_minute',
        preferred_currency: 'USD',
        preferred_language: 'en',
      };
      await setDoc(userSettingsRef, newSettings);
      setUserSettings(newSettings);
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

  const startCall = async () => {
    const session: CallSession = {
      startTime: new Date(),
    };
    
    setCurrentSession(session);
    setIsTracking(true);
    setElapsedSeconds(0);

    toast({
      title: 'Call Started',
      description: 'Timer is now running',
    });
  };

  const endCall = async (notes?: string) => {
    if (!currentSession || !user) return;

    const endTime = new Date();
    const durationSeconds = elapsedSeconds;
    const earnings = calculateEarnings(durationSeconds);

    try {
      await addDoc(collection(db, 'call_logs'), {
        user_id: user.uid,
        start_time: currentSession.startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_seconds: durationSeconds,
        earnings: earnings,
        currency: userSettings?.preferred_currency || 'USD',
        notes: notes,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save call log',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Call Ended',
      description: `Duration: ${formatDuration(durationSeconds)} | Earnings: ${formatCurrency(earnings, userSettings?.preferred_currency)}`,
    });

    setIsTracking(false);
    setCurrentSession(null);
    setElapsedSeconds(0);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
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
