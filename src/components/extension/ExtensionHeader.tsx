/**
 * Extension Header Component
 * Draggable header with controls and status indicators
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, Minimize2, Settings } from 'lucide-react';

interface ExtensionHeaderProps {
  /** Whether audio is muted */
  isMuted: boolean;
  /** Number of active agents */
  activeAgents: number;
  /** Whether WebSocket is connected */
  isConnected: boolean;
  /** Mouse down handler for dragging */
  onMouseDown: (e: React.MouseEvent) => void;
  /** Toggle mute handler */
  onToggleMute: () => void;
  /** Minimize handler */
  onMinimize: () => void;
  /** Settings handler */
  onSettings?: () => void;
}

export const ExtensionHeader = ({
  isMuted,
  activeAgents,
  isConnected,
  onMouseDown,
  onToggleMute,
  onMinimize,
  onSettings,
}: ExtensionHeaderProps) => {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-border/50 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
    >
      {/* Status and Title */}
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full animate-pulse ${
          isConnected ? 'bg-success' : 'bg-destructive'
        }`} />
        <div>
          <h3 className="font-semibold text-sm">InterpreCoach Multi-Agent System</h3>
          <p className="text-xs text-muted-foreground">
            Real-time AI Processing Pipeline
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {activeAgents} Agent{activeAgents !== 1 ? 's' : ''} Active
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          title="Minimize"
        >
          <Minimize2 className="w-3 h-3" />
        </Button>

        {onSettings && (
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
            onClick={(e) => {
              e.stopPropagation();
              onSettings();
            }}
            title="Settings"
          >
            <Settings className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};
