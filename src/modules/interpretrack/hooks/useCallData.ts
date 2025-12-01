import { useState, useEffect } from 'react';
import { callService } from '../services/callService';
import { CallRecord } from '../types';

export const useCallData = () => {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const data = await callService.getCalls();
        setCalls(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const addCall = async (call: Omit<CallRecord, 'id'>) => {
    try {
      const newCall = await callService.createCall(call);
      setCalls(prev => [newCall, ...prev]);
      return newCall;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateCall = async (id: string, updates: Partial<CallRecord>) => {
    try {
      const updated = await callService.updateCall(id, updates);
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
      const success = await callService.deleteCall(id);
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
