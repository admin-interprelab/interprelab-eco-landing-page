import ManualLog from './manual-log';
import { useDashboardActions } from './dashboard-utils';
import { getRoundedDuration } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type { CallRecord } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

/**
 * Wrapper component that provides dashboard integration to ManualLog
 * This allows ManualLog to work both with and without dashboard context
 */
export default function ManualLogWrapper() {
  const { addNewCall } = useDashboardActions();
  const { toast } = useToast();
  const { user } = useAuth(); // Use useAuth to get the user

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
      await addNewCall(newRecord, user?.id); // Pass user.id to addNewCall
      toast({
        title: "Call Logged Successfully",
        description: `Your ${callData.callType} call on ${callData.platform} has been logged with a duration of ${duration} minutes.`,
      });
      window.location.reload(); // Refresh the page to update all components with new data
    } catch (error) {
      toast({
        title: "Error Logging Call",
        description: "There was an error logging your call. Please try again.",
        variant: "destructive",
      });
    }
  }, [addNewCall, toast, user?.id]);

  return <ManualLog onCallLogged={handleCallLogged} />;
}
