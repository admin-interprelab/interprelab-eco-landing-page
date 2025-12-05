import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetches the AI-generated earnings projection from the Supabase Edge Function.
 */
const fetchEarningsProjection = async () => {
  const { data, error } = await supabase.functions.invoke('generate-earnings-projection', {
    method: 'POST', // Edge functions are often invoked via POST
  });

  if (error) {
    throw new Error(`Failed to fetch earnings projection: ${error.message}`);
  }

  return data;
};

export const useEarningsProjection = () => {
  return useQuery({
    queryKey: ['earnings-projection'],
    queryFn: fetchEarningsProjection,
  });
};
