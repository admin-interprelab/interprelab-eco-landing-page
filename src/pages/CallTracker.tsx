/**
 * Refactored Call Tracker Page
 * Now uses modular architecture for better maintainability
 */

import { CallTracker as ModularCallTracker, CallTrackerProvider } from '@/components/call-tracker';

/**
 * Call Tracker Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture with context provider
 */
const CallTracker = () => {
  return (
    <CallTrackerProvider>
      <ModularCallTracker />
    </CallTrackerProvider>
  );
};

export default CallTracker;
