import { useState, useEffect } from 'react';
import { callService } from '../services/callService';
import { firestoreCallService } from '../services/firestoreCallService';
import { isDemoMode } from '@/lib/utils';
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
          // Real-time subscription for Firestore
          unsubscribe = firestoreCallService.subscribeToCalls((updatedCalls) => {
            setCalls(updatedCalls);
            setLoading(false);
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
      const service = demo ? callService : firestoreCallService;
      const newCall = await service.createCall(call);
      
      // For local service, we need to manually update state
      // For Firestore, the subscription will handle it
      if (demo) {
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
      const service = demo ? callService : firestoreCallService;
      const updated = await service.updateCall(id, updates);
      
      if (demo && updated) {
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
      const service = demo ? callService : firestoreCallService;
      const success = await service.deleteCall(id);
      
      if (demo && success) {
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
