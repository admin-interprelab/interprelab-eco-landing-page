import { useCallback } from 'react';
import ManualLog from './manual-log';
import { useDashboardActions } from './dashboard-utils';
import { getRoundedDuration } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type { CallRecord } from '@/lib/types';

/**
 * Wrapper component that provides dashboard integration to ManualLog
 * This allows ManualLog to work both with and without dashboard context
 */
export default function ManualLogWrapper() {
  const { addNewCall } = useDashboardActions();
  const { toast } = useToast();

  const handleCallLogged = useCallback(async (callData: {
    startTime: Date;
    endTime: Date;
    platform: CallRecord['platform'];
    callType: CallRecord['callType'];
  }) => {
    const duration = getRoundedDuration(callData.startTime, callData.endTime);

    const newRecord: Omit<CallRecord, 'id' | 'earnings'> = {
      startTime: callData.startTime,
      endTime: callData.endTime,
      duration,
      platform: callData.platform,
      callType: callData.callType,
    };

    try {
      await addNewCall(newRecord);
      toast({
        title: "Call Logged Successfully",
        description: `Your ${callData.callType} call on ${callData.platform} has been logged with a duration of ${duration} minutes.`,
      });
    } catch (error) {
      toast({
        title: "Error Logging Call",
        description: "There was an error logging your call. Please try again.",
        variant: "destructive",
      });
    }
  }, [addNewCall, toast]);

  // For now, just render the original ManualLog
  // In the future, we could pass the handleCallLogged as a prop
  return <ManualLog />;
}
