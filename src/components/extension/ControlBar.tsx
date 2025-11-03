/**
 * Control Bar Component
 * Recording controls and status indicators
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Square } from 'lucide-react';

interface ControlBarProps {
  /** Whether recording is active */
  isRecording: boolean;
  /** Source language code */
  sourceLanguage?: string;
  /** Target language code */
  targetLanguage?: string;
  /** Specialty context */
  specialty?: string;
  /** Whether WebSocket is connected */
  isConnected: boolean;
  /** Toggle recording handler */
  onToggleRecording: () => void;
  /** Language change handler */
  onLanguageChange?: (source: string, target: string) => void;
  /** Specialty change handler */
  onSpecialtyChange?: (specialty: string) => void;
}

export const ControlBar = ({
  isRecording,
  sourceLanguage = 'EN',
  targetLanguage = 'ES',
  specialty = 'Medical',
  isConnected,
  onToggleRecording,
  onLanguageChange,
  onSpecialtyChange,
}: ControlBarProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/50">
      {/* Recording Control */}
      <div className="flex items-center gap-3">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="sm"
          onClick={onToggleRecording}
          disabled={!isConnected}
          className="flex items-center gap-2 min-w-[140px]"
        >
          {isRecording ? (
            <>
              <Square className="w-3 h-3" />
              Stop Processing
            </>
          ) : (
            <>
              <Mic className="w-3 h-3" />
              Start Processing
            </>
          )}
        </Button>

        {/* Language Pair Badge */}
        <Badge
          variant="outline"
          className="text-xs cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onLanguageChange?.(sourceLanguage, targetLanguage)}
          title="Click to change language pair"
        >
          {sourceLanguage} → {targetLanguage} {specialty}
        </Badge>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <Badge
          className={`text-xs ${
            isConnected
              ? 'bg-success text-success-foreground'
              : 'bg-destructive text-destructive-foreground'
          }`}
        >
          {isConnected ? (
            <>
              <div className="w-2 h-2 bg-current rounded-full mr-1 animate-pulse" />
              WebSocket Active
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-current rounded-full mr-1" />
              Disconnected
            </>
          )}
        </Badge>

        {isRecording && (
          <Badge variant="secondary" className="text-xs animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-ping" />
            Live
          </Badge>
        )}
      </div>
    </div>
  );
};
