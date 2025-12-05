/**
 * Call Tracker Main Component
 */

import { Layout } from '@/components/Layout';
import { CallTimer } from './CallTimer';
import { CallControls } from './CallControls';
import { CallNotes } from './CallNotes';
import { AudioIntegration } from './AudioIntegration';
import { CallStats } from './CallStats';
import type { CallTrackerProps } from './types';
import { useCallTracker, useCallNotes, useCallAnalytics } from './hooks';

/**
 * Call Tracker Component
 *
 * Main call tracking interface with:
 * - Real-time timer display
 * - Call control buttons
 * - Notes taking functionality
 * - Earnings calculation
 * - Audio integration info
 * - Statistics overview
 * - Analytics tracking
 */
export const CallTracker = ({
  className = '',
  customSettings,
  onCallStart,
  onCallEnd,
  onCallPause,
  onCallResume,
}: CallTrackerProps) => {
  const {
    isTracking,
    isPaused,
    elapsedSeconds,
    userSettings,
    startCall,
    endCall,
    pauseCall,
    resumeCall,
    calculateEarnings,
  } = useCallTracker();

  const { notes, handleNotesChange } = useCallNotes();
  const { totalEarnings, averageSessionLength, getSessionStats } = useCallAnalytics();
  const { totalSessions } = getSessionStats();

  const currentEarnings = calculateEarnings(elapsedSeconds);

  const handleStartCall = async () => {
    await startCall();
    if (onCallStart) {
      // Create a mock session for the callback
      const mockSession = {
        id: `session_${Date.now()}`,
        startTime: new Date(),
        duration: 0,
        earnings: 0,
        status: 'active' as const,
      };
      onCallStart(mockSession);
    }
  };

  const handleEndCall = async () => {
    await endCall(notes);
    if (onCallEnd) {
      // Create a mock completed session for the callback
      const mockSession = {
        id: `session_${Date.now()}`,
        startTime: new Date(Date.now() - elapsedSeconds * 1000),
        endTime: new Date(),
        duration: elapsedSeconds,
        earnings: currentEarnings,
        notes,
        status: 'completed' as const,
      };
      onCallEnd(mockSession);
    }
  };

  const handlePauseCall = () => {
    pauseCall();
    if (onCallPause) {
      const mockSession = {
        id: `session_${Date.now()}`,
        startTime: new Date(Date.now() - elapsedSeconds * 1000),
        duration: elapsedSeconds,
        earnings: currentEarnings,
        status: 'paused' as const,
      };
      onCallPause(mockSession);
    }
  };

  const handleResumeCall = () => {
    resumeCall();
    if (onCallResume) {
      const mockSession = {
        id: `session_${Date.now()}`,
        startTime: new Date(Date.now() - elapsedSeconds * 1000),
        duration: elapsedSeconds,
        earnings: currentEarnings,
        status: 'active' as const,
      };
      onCallResume(mockSession);
    }
  };

  return (
    <Layout className={className}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Call Tracker</h1>

        <div className="space-y-8">
          {/* Main Timer */}
          <CallTimer
            elapsedSeconds={elapsedSeconds}
            isTracking={isTracking}
            currentEarnings={currentEarnings}
            userSettings={userSettings}
            onStart={handleStartCall}
            onEnd={handleEndCall}
          />

          {/* Call Notes (only show when tracking) */}
          {isTracking && (
            <CallNotes
              notes={notes}
              onNotesChange={handleNotesChange}
              autoSave={userSettings?.auto_save_notes}
            />
          )}

          {/* Call Controls */}
          <CallControls
            isTracking={isTracking}
            isPaused={isPaused}
            onStart={handleStartCall}
            onEnd={handleEndCall}
            onPause={handlePauseCall}
            onResume={handleResumeCall}
          />

          {/* Statistics (only show when not tracking) */}
          {!isTracking && (
            <CallStats
              userSettings={userSettings}
              totalSessions={totalSessions}
              totalEarnings={totalEarnings}
              averageSessionLength={averageSessionLength}
            />
          )}

          {/* Audio Integration Info */}
          <AudioIntegration />
        </div>
      </div>
    </Layout>
  );
};
