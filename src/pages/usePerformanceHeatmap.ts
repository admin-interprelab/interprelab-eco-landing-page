import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Fetches performance heatmap data from the database for the last 90 days.
 */
const fetchPerformanceHeatmapData = async (userId: string) => {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('performance_heatmap')
    .select('day_of_week, hour_of_day, total_earnings, total_calls')
    .eq('user_id', userId)
    .gte('date_recorded', ninetyDaysAgo);

  if (error) {
    throw new Error(`Failed to fetch heatmap data: ${error.message}`);
  }

  return data;
};

export const usePerformanceHeatmap = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['performance-heatmap', user?.id],
    queryFn: () => fetchPerformanceHeatmapData(user!.id),
    enabled: !!user, // Only run the query if the user is authenticated
  });
};
