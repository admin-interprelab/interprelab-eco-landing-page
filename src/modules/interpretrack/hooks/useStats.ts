import { useMemo } from 'react';
import { callService } from '../services/callService';
import { useCallData } from './useCallData';

export const useStats = () => {
  const { calls, loading, error } = useCallData();

  const stats = useMemo(() => {
    return callService.getAggregatedStats();
  }, [calls]);

  const callTypeStats = useMemo(() => {
    return callService.getCallTypeStats();
  }, [calls]);

  const weeklyData = useMemo(() => {
    return callService.getWeeklyData();
  }, [calls]);

  return {
    stats,
    callTypeStats,
    weeklyData,
    loading,
    error,
  };
};
