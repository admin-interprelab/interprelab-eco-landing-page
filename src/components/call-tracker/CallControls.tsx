/**
 * Call Controls Component
 */

import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, Pause, Play } from 'lucide-react';
import type { CallControlsProps } from './types';

/**
 * Call Controls Component
 *
 * Control buttons for starting, stopping, pausing, and resuming calls
 */
export const CallControls = ({
  className = '',
  isTracking,
  isPaused = false,
  onStart,
  onEnd,
  onPause,
  onResume,
  disabled = false,
}: CallControlsProps) => {
  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      {!isTracking ? (
        <Button
          onClick={onStart}
          size="lg"
          className="w-full max-w-xs"
          disabled={disabled}
        >
          <Phone className="mr-2 h-5 w-5" />
          Start Call
        </Button>
      ) : (
        <>
          {isPaused ? (
            <Button
              onClick={onResume}
              size="lg"
              className="w-full max-w-xs"
              disabled={disabled || !onResume}
            >
              <Play className="mr-2 h-5 w-5" />
              Resume Call
            </Button>
          ) : (
            <Button
              onClick={onPause}
              variant="outline"
              size="lg"
              className="w-full max-w-xs"
              disabled={disabled || !onPause}
            >
              <Pause className="mr-2 h-5 w-5" />
              Pause Call
            </Button>
          )}

          <Button
            onClick={onEnd}
            variant="destructive"
            size="lg"
            className="w-full max-w-xs"
            disabled={disabled}
          >
            <PhoneOff className="mr-2 h-5 w-5" />
            End Call
          </Button>
        </>
      )}
    </div>
  );
};
