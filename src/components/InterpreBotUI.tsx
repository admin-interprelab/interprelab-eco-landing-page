/**
 * Refactored InterpreBot UI Component
 * Modular, maintainable, and following best practices
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  InterpreBotHeader,
  WelcomeScreen,
  AssessmentScreen,
  ChatInterface,
  MinimizedBot,
  INTERPREBOT_DIMENSIONS,
  DEFAULT_POSITION,
  COMPETENCY_AREAS,
  CHAT_SUGGESTIONS,
} from './interprebot';
import {
  useInterpreBotState,
  useAssessmentProcess,
  useChatInterface,
  useDraggableBot,
  useKeyboardShortcuts,
} from './interprebot/hooks';
import type { InterpreBotProps } from './interprebot/types';

/**
 * Main InterpreBot UI Component
 *
 * AI-powered training and assessment interface that provides:
 * - Comprehensive skill assessment across 6 core competencies
 * - Real-time performance analysis and feedback
 * - Interactive chat interface for personalized guidance
 * - Detailed scoring and improvement recommendations
 * - Draggable interface with minimize/restore functionality
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Custom hooks for state management
 * - TypeScript support with proper interfaces
 * - Animated skill progression bars
 * - Contextual AI recommendations
 * - Professional assessment metrics
 * - Full keyboard navigation support
 * - Accessibility compliance
 */
export const InterpreBotUI = ({
  initialState,
  onStateChange,
  onAssessmentComplete,
  onMessageSent,
  className = '',
  position = DEFAULT_POSITION,
}: InterpreBotProps = {}) => {
  // State management
  const {
    state,
    minimize,
    restore,
    close,
    startAssessment,
    resetAssessment,
  } = useInterpreBotState(initialState);

  // Assessment process
  const {
    isRunning: isAnalyzing,
    progress,
    skills,
    assessmentResult,
    startAssessment: beginAssessment,
  } = useAssessmentProcess();

  // Chat interface
  const {
    messages,
    currentMessage,
    isTyping,
    setCurrentMessage,
    sendMessage,
    addBotMessage,
  } = useChatInterface();

  // Draggable functionality
  const {
    position: currentPosition,
    handleMouseDown,
  } = useDraggableBot(position);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'escape': minimize,
    'ctrl+shift+i': () => {
      if (!state.showAssessment) {
        handleStartAssessment();
      }
    },
  });

  // Handle assessment start
  const handleStartAssessment = () => {
    startAssessment();
    beginAssessment();
    addBotMessage('Starting your comprehensive assessment. This will evaluate your skills across 6 core competencies.', 'analysis');
  };

  // Handle message send
  const handleSendMessage = () => {
    sendMessage();
    onMessageSent?.(currentMessage);
  };

  // Handle state changes
  React.useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Handle assessment completion
  React.useEffect(() => {
    if (!isAnalyzing && state.showAssessment && assessmentResult) {
      onAssessmentComplete?.(assessmentResult);
      addBotMessage('Assessment complete! I\'ve analyzed your performance and generated personalized recommendations.', 'recommendation');
    }
  }, [isAnalyzing, state.showAssessment, assessmentResult, onAssessmentComplete, addBotMessage]);

  // Don't render if not visible
  if (!state.isVisible) return null;

  // Render minimized state
  if (state.isMinimized) {
    return (
      <MinimizedBot
        onRestore={restore}
        hasNotification={messages.length > 0}
        notificationCount={messages.filter(m => m.sender === 'bot').length}
      />
    );
  }

  return (
    <div
      className={`fixed z-50 ${className}`}
      style={{
        left: `${currentPosition.x}px`,
        bottom: `${currentPosition.y}px`,
        width: `${INTERPREBOT_DIMENSIONS.width}px`,
        maxHeight: `${INTERPREBOT_DIMENSIONS.height}px`,
      }}
    >
      <Card className="bg-card/95 border-border/50 backdrop-blur-lg shadow-2xl">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Header */}
          <InterpreBotHeader
            onMinimize={minimize}
            onClose={close}
            onMouseDown={handleMouseDown}
          />

          {/* Main Content */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {!state.showAssessment ? (
              <WelcomeScreen
                onStartAssessment={handleStartAssessment}
                onMinimize={minimize}
                competencies={COMPETENCY_AREAS}
              />
            ) : (
              <AssessmentScreen
                skills={skills}
                isAnalyzing={isAnalyzing}
                progress={progress}
              />
            )}
          </div>

          {/* Chat Interface */}
          <ChatInterface
            messages={messages}
            currentMessage={currentMessage}
            onMessageChange={setCurrentMessage}
            onSendMessage={handleSendMessage}
            disabled={isAnalyzing}
            suggestions={CHAT_SUGGESTIONS}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Export individual components for potential standalone use
export {
  InterpreBotHeader,
  WelcomeScreen,
  AssessmentScreen,
  ChatInterface,
  MinimizedBot,
  CompetencyCard,
  SkillProgressBar,
  RecommendationCard,
} from './interprebot';

// Export hooks for external use
export {
  useInterpreBotState,
  useAssessmentProcess,
  useChatInterface,
  useDraggableBot,
  useSkillAnimations,
  useNotifications,
} from './interprebot/hooks';

// Export types
export type {
  AssessmentSkill,
  CompetencyArea,
  ChatMessage,
  AssessmentResult,
  InterpreBotState,
  InterpreBotProps,
} from './interprebot/types';
