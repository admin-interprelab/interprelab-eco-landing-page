import { useState, useEffect } from 'react';
import { callService } from '../services/callService';
import { supabaseCallService } from '../services/supabaseCallService';
import { isDemoMode } from '../utils';
import { CallRecord } from '../types';

export const useCallData = () => {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const demo = isDemoMode();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchCalls = async () => {
      try {
        setLoading(true);
        if (demo) {
          const data = await callService.getCalls();
          setCalls(data);
          setLoading(false);
        } else {
          // Fetch initial calls for Supabase
          const data = await supabaseCallService.getCalls();
          setCalls(data);
          setLoading(false);

          // Real-time subscription for Supabase
          unsubscribe = supabaseCallService.subscribeToCalls((updatedCalls) => {
            setCalls(updatedCalls);
          });
        }
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchCalls();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [demo]);

  const addCall = async (call: Omit<CallRecord, 'id'>) => {
    try {
      const service = demo ? callService : supabaseCallService;
      const newCall = await service.createCall(call);
      
      // For local service or Supabase (until realtime triggers), update state manually
      if (demo) {
        setCalls(prev => [newCall, ...prev]);
      } else {
        // Optimistic update or wait for subscription? 
        // Supabase subscription might have latency. Let's update state manually too.
        setCalls(prev => [newCall, ...prev]);
      }
      return newCall;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateCall = async (id: string, updates: Partial<CallRecord>) => {
    try {
      const service = demo ? callService : supabaseCallService;
      const updated = await service.updateCall(id, updates);
      
      if (updated) {
        setCalls(prev => prev.map(c => c.id === id ? updated : c));
      }
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteCall = async (id: string) => {
    try {
      const service = demo ? callService : supabaseCallService;
      const success = await service.deleteCall(id);
      
      if (success) {
        setCalls(prev => prev.filter(c => c.id !== id));
      }
      return success;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { calls, loading, error, addCall, updateCall, deleteCall };
};


