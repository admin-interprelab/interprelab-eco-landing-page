import { useMemo } from 'react';
import { useCallData } from './useCallData';
import { calculateAggregatedStats, calculateCallTypeStats, calculateWeeklyData } from '../utils';

export const useStats = () => {
  const { calls, loading, error, addCall } = useCallData();

  const stats = useMemo(() => {
    return calculateAggregatedStats(calls);
  }, [calls]);

  const callTypeStats = useMemo(() => {
    return calculateCallTypeStats(calls);
  }, [calls]);

  const weeklyData = useMemo(() => {
    return calculateWeeklyData(calls);
  }, [calls]);

  return {
    stats,
    callTypeStats,
    weeklyData,
    calls,
    addCall,
    loading,
    error,
  };
};


