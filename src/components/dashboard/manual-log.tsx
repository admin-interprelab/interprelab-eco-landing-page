import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, Timer } from "lucide-react";
import { addCallRecord, getRoundedDuration } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { CallRecord } from "@/lib/types";



// Constants for better maintainability
const TIMER_UPDATE_INTERVAL = 1000; // 1 second
const DEFAULT_PLATFORM: CallRecord["platform"] = "Platform A";
const DEFAULT_CALL_TYPE: CallRecord["callType"] = "VRI";

const PLATFORMS: Array<{ value: CallRecord["platform"]; label: string }> = [
  { value: "Platform A", label: "Platform A" },
  { value: "Platform B", label: "Platform B" },
  { value: "Platform C", label: "Platform C" },
];

const CALL_TYPES: Array<{
  value: CallRecord["callType"];
  label: string;
  id: string;
}> = [
  { value: "VRI", label: "VRI", id: "vri" },
  { value: "OPI", label: "OPI", id: "opi" },
];

// Types for better type safety
interface TimerState {
  isActive: boolean;
  startTime: Date | null;
  elapsedTime: number;
}

interface CallSettings {
  platform: CallRecord["platform"];
  callType: CallRecord["callType"];
}

/**
 * Formats milliseconds into HH:MM:SS format
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};

/**
 * Timer Display Component
 * Shows the current elapsed time with a timer icon
 */
interface TimerDisplayProps {
  elapsedTime: number;
}

const TimerDisplay = ({ elapsedTime }: TimerDisplayProps) => (
  <div className="flex items-center justify-center bg-muted/50 rounded-lg p-6">
    <Timer className="mr-4 h-10 w-10 text-primary" />
    <div className="text-4xl font-bold font-mono w-48 text-center">
      {formatTime(elapsedTime)}
    </div>
  </div>
);

/**
 * Platform Selection Component
 * Allows users to select which platform they're using for the call
 */
interface PlatformSelectorProps {
  platform: CallRecord["platform"];
  onPlatformChange: (platform: CallRecord["platform"]) => void;
  disabled: boolean;
}

const PlatformSelector = ({
  platform,
  onPlatformChange,
  disabled,
}: PlatformSelectorProps) => (
  <div className="space-y-2">
    <Label>Platform</Label>
    <Select
      onValueChange={(value) =>
        onPlatformChange(value as CallRecord["platform"])
      }
      defaultValue={platform}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent>
        {PLATFORMS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/**
 * Call Type Selection Component
 * Radio group for selecting VRI or OPI call type
 */
interface CallTypeSelectorProps {
  callType: CallRecord["callType"];
  onCallTypeChange: (callType: CallRecord["callType"]) => void;
  disabled: boolean;
}

const CallTypeSelector = ({
  callType,
  onCallTypeChange,
  disabled,
}: CallTypeSelectorProps) => (
  <div className="space-y-2">
    <Label>Call Type</Label>
    <RadioGroup
      defaultValue={callType}
      onValueChange={(value) =>
        onCallTypeChange(value as CallRecord["callType"])
      }
      className="flex items-center space-x-2 pt-2"
      disabled={disabled}
    >
      {CALL_TYPES.map(({ value, label, id }) => (
        <div key={value} className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

/**
 * Control Buttons Component
 * Start/Stop button with appropriate styling and icons
 */
interface ControlButtonsProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

const ControlButtons = ({ isActive, onStart, onStop }: ControlButtonsProps) => (
  <CardFooter>
    {!isActive ? (
      <Button onClick={onStart} className="w-full" size="lg">
        <Play className="mr-2 h-5 w-5" />
        Start Call
      </Button>
    ) : (
      <Button
        onClick={onStop}
        className="w-full"
        variant="destructive"
        size="lg"
      >
        <Square className="mr-2 h-5 w-5" />
        Stop & Log Call
      </Button>
    )}
  </CardFooter>
);

/**
 * Custom hook for managing timer functionality
 * Encapsulates timer logic and provides clean interface
 */
const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    isActive: false,
    startTime: null,
    elapsedTime: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update elapsed time when timer is active
  useEffect(() => {
    if (timerState.isActive && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => ({
          ...prev,
          elapsedTime: Date.now() - prev.startTime!.getTime(),
        }));
      }, TIMER_UPDATE_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isActive, timerState.startTime]);

  const startTimer = useCallback(() => {
    setTimerState({
      isActive: true,
      startTime: new Date(),
      elapsedTime: 0,
    });
  }, []);

  const stopTimer = useCallback(() => {
    setTimerState({
      isActive: false,
      startTime: null,
      elapsedTime: 0,
    });
  }, []);

  return {
    ...timerState,
    startTimer,
    stopTimer,
  };
};

/**
 * Custom hook for managing call settings
 * Handles platform and call type selection
 */
const useCallSettings = () => {
  const [settings, setSettings] = useState<CallSettings>({
    platform: DEFAULT_PLATFORM,
    callType: DEFAULT_CALL_TYPE,
  });

  const updatePlatform = useCallback((platform: CallRecord["platform"]) => {
    setSettings((prev) => ({ ...prev, platform }));
  }, []);

  const updateCallType = useCallback((callType: CallRecord["callType"]) => {
    setSettings((prev) => ({ ...prev, callType }));
  }, []);

  return {
    ...settings,
    updatePlatform,
    updateCallType,
  };
};

interface ManualLogProps {
  onCallLogged: (callData: {
    startTime: Date;
    endTime: Date;
    platform: CallRecord['platform'];
    callType: CallRecord['callType'];
  }) => Promise<void>;
}

/**
 * Manual Call Log Component
 *
 * A comprehensive timer-based call logging system that allows interpreters to:
 * - Start and stop call timers manually
 * - Select platform and call type
 * - Automatically calculate duration
 * - Provide visual feedback and notifications (handled by parent)
 *
 * Features:
 * - Real-time timer display with HH:MM:SS format
 * - Platform selection (Platform A, B, C)
 * - Call type selection (VRI/OPI)
 * - Disabled controls during active calls to prevent accidental changes
 */
export default function ManualLog({ onCallLogged }: ManualLogProps) {
  const { isActive, startTime, elapsedTime, startTimer, stopTimer } =
    useTimer();
  const { platform, callType, updatePlatform, updateCallType } =
    useCallSettings();

  /**
   * Handles starting a new call timer
   * Initiates the timer and locks the settings
   */
  const handleStart = useCallback(() => {
    startTimer();
  }, [startTimer]);

  /**
   * Handles stopping the call timer and logging the call
   * Creates a new call record and shows success notification
   */
  const handleStop = useCallback(async () => {
    if (!startTime) return;

    const endTime = new Date();

    await onCallLogged({ startTime, endTime, platform, callType });

    stopTimer();
  }, [startTime, platform, callType, onCallLogged, stopTimer]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Call Log</CardTitle>
        <CardDescription>
          Manually start and stop a timer to log your interpretation calls with
          accurate duration tracking.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <TimerDisplay elapsedTime={elapsedTime} />

        <div className="grid grid-cols-2 gap-4">
          <PlatformSelector
            platform={platform}
            onPlatformChange={updatePlatform}
            disabled={isActive}
          />

          <CallTypeSelector
            callType={callType}
            onCallTypeChange={updateCallType}
            disabled={isActive}
          />
        </div>
      </CardContent>

      <ControlButtons
        isActive={isActive}
        onStart={handleStart}
        onStop={handleStop}
      />
    </Card>
  );
}
