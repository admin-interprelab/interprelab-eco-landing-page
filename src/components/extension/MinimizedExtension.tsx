/**
 * Minimized Extension Component
 * Compact floating button when extension is minimized
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, Mic } from 'lucide-react';

interface MinimizedExtensionProps {
  /** Whether recording is active */
  isRecording: boolean;
  /** Whether WebSocket is connected */
  isConnected: boolean;
  /** Number of active agents */
  activeAgents: number;
  /** Click handler to restore window */
  onRestore: () => void;
  /** Position for the minimized button */
  position?: { x: number; y: number };
}

export const MinimizedExtension = ({
  isRecording,
  isConnected,
  activeAgents,
  onRestore,
  position = { x: 0, y: 0 },
}: MinimizedExtensionProps) => {
  return (
    <div
      className="fixed z-50"
      style={{
        right: position.x || 24,
        bottom: position.y || 24,
      }}
    >
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={onRestore}
          className={`
            w-14 h-14 rounded-full shadow-lg transition-all duration-300
            bg-card/95 backdrop-blur-sm border-2
            hover:scale-110 hover:shadow-xl
            ${isRecording ? 'animate-pulse border-red-500' : ''}
            ${isConnected ? 'border-green-500/50' : 'border-red-500/50'}
          `}
          title="Restore InterpreCoach"
        >
          <div className="relative">
            <Languages className="w-6 h-6" />

            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute -top-1 -right-1">
                <Mic className="w-3 h-3 text-red-500 animate-pulse" />
              </div>
            )}

            {/* Connection status dot */}
            <div
              className={`
                absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background
                ${isConnected ? 'bg-green-500' : 'bg-red-500'}
                ${isConnected ? 'animate-pulse' : ''}
              `}
            />
          </div>
        </Button>

        {/* Agent count badge */}
        {activeAgents > 0 && (
          <Badge
            className="absolute -top-2 -left-2 text-xs min-w-[20px] h-5 flex items-center justify-center"
            variant="default"
          >
            {activeAgents}
          </Badge>
        )}

        {/* Activity indicator */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20" />
        )}
      </div>
    </div>
  );
};
