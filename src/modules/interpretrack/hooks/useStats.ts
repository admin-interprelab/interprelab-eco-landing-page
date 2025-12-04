import { useMemo } from 'react';
import { callService } from '../services/callService';
import { useCallData } from './useCallData';

export const useStats = () => {
  const { calls, loading, error } = useCallData();

  const stats = useMemo(() => {
    return callService.getAggregatedStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  const callTypeStats = useMemo(() => {
    return callService.getCallTypeStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  const weeklyData = useMemo(() => {
    return callService.getWeeklyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  return {
    stats,
    callTypeStats,
    weeklyData,
    loading,
    error,
  };
};
