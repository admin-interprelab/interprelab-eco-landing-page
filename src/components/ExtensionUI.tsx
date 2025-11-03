/**
 * Refactored Extension UI Component
 * Modular, maintainable, and following best practices
 */

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ExtensionHeader,
  ControlBar,
  ContextWindowCard,
  DataFlowVisualization,
  MinimizedExtension,
  useDraggableWindow,
  useExtensionState,
  useContextWindows,
  useKeyboardShortcuts,
  EXTENSION_DIMENSIONS,
  DEFAULT_POSITIONS,
  type ContextWindow,
} from './extension';

/**
 * Main Extension UI Component
 *
 * A comprehensive multi-agent AI processing interface that provides:
 * - Real-time audio processing pipeline visualization
 * - Multiple AI agent context windows
 * - Draggable, resizable interface
 * - WebSocket connection management
 * - Recording controls and status indicators
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Custom hooks for state management
 * - Keyboard shortcuts support
 * - Responsive design with minimized state
 * - Real-time updates and notifications
 * - Accessibility support with proper ARIA labels
 */
export const ExtensionUI = () => {
  // State management hooks
  const {
    isRecording,
    isMuted,
    isMinimized,
    isVisible,
    toggleRecording,
    toggleMute,
    minimize,
    restore,
  } = useExtensionState();

  // Draggable window functionality
  const {
    position,
    isDragging,
    handleMouseDown,
  } = useDraggableWindow(DEFAULT_POSITIONS.extension);

  // Context windows management
  const {
    contextWindows,
    addContextWindow,
    clearContextWindows,
  } = useContextWindows(isRecording);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+shift+r': toggleRecording,
    'ctrl+shift+m': toggleMute,
    'ctrl+shift+h': minimize,
    'escape': minimize,
  });

  // Computed values
  const activeAgents = useMemo(() => {
    const uniqueTypes = new Set(contextWindows.map(window => window.type));
    return uniqueTypes.size;
  }, [contextWindows]);

  const isConnected = true; // Mock WebSocket connection status

  // Handle context window click
  const handleContextWindowClick = (window: ContextWindow) => {
    console.log('Context window clicked:', window);
    // Could open detailed view, copy content, etc.
  };

  // Handle settings
  const handleSettings = () => {
    console.log('Settings clicked');
    // Could open settings modal
  };

  // Don't render if not visible
  if (!isVisible) return null;

  // Render minimized state
  if (isMinimized) {
    return (
      <MinimizedExtension
        isRecording={isRecording}
        isConnected={isConnected}
        activeAgents={activeAgents}
        onRestore={restore}
        position={{ x: 24, y: 24 }}
      />
    );
  }

  return (
    <div
      className="fixed z-50 resize"
      style={{
        left: `${position.x || window.innerWidth - EXTENSION_DIMENSIONS.width - 20}px`,
        top: `${position.y || 100}px`,
        width: `${EXTENSION_DIMENSIONS.width}px`,
        maxHeight: `${EXTENSION_DIMENSIONS.height}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div className="extension-window h-full">
        <Card className="h-full bg-card/95 border-border/50 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Draggable Header */}
            <ExtensionHeader
              isMuted={isMuted}
              activeAgents={activeAgents}
              isConnected={isConnected}
              onMouseDown={handleMouseDown}
              onToggleMute={toggleMute}
              onMinimize={minimize}
              onSettings={handleSettings}
            />

            {/* Control Bar */}
            <ControlBar
              isRecording={isRecording}
              isConnected={isConnected}
              onToggleRecording={toggleRecording}
            />

            {/* Content Area - Multi-Agent Context Windows */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {/* Context Windows Grid */}
              <div className="grid grid-cols-2 gap-3">
                {contextWindows.map((window) => (
                  <ContextWindowCard
                    key={window.id}
                    window={window}
                    onClick={handleContextWindowClick}
                    maxContentLength={100}
                  />
                ))}
              </div>

              {/* Recording Status */}
              {isRecording && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-success-foreground">
                    Multi-agent system processing audio stream...
                  </span>
                </div>
              )}

              {/* Data Flow Visualization */}
              <DataFlowVisualization
                isActive={isRecording}
                showProcessing={true}
              />

              {/* Empty State */}
              {contextWindows.length === 0 && !isRecording && (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="space-y-2">
                    <p className="font-medium">No active processing</p>
                    <p className="text-sm">
                      Start recording to see AI agent outputs
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Export individual components for potential standalone use
export {
  ExtensionHeader,
  ControlBar,
  ContextWindowCard,
  DataFlowVisualization,
  MinimizedExtension,
  useDraggableWindow,
  useExtensionState,
  useContextWindows,
  type ContextWindow,
  type Position,
  type ExtensionState,
  type AgentType,
} from './extension';
