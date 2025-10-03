import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CallSession {
  id?: string;
  startTime: Date;
  endTime?: Date;
  durationSeconds?: number;
  earnings?: number;
  currency?: string;
}

export const useCallTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [userSettings, setUserSettings] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserSettings();
    }
  }, [user]);

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

  const loadUserSettings = async () => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (data) {
      setUserSettings(data);
    } else if (!error) {
      // Create default settings
      const { data: newSettings } = await supabase
        .from('user_settings')
        .insert({
          user_id: user?.id,
          pay_rate: 0,
          pay_rate_type: 'per_hour',
          preferred_currency: 'USD',
          preferred_language: 'en',
        })
        .select()
        .single();
      
      setUserSettings(newSettings);
    }
  };

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

    const { error } = await supabase
      .from('call_logs')
      .insert({
        user_id: user.id,
        start_time: currentSession.startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_seconds: durationSeconds,
        earnings: earnings,
        currency: userSettings?.preferred_currency || 'USD',
        notes: notes,
      });

    if (error) {
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
