/**
 * Extension UI Components Barrel Export
 */

// Components
export { ExtensionHeader } from './ExtensionHeader';
export { ControlBar } from './ControlBar';
export { ContextWindowCard } from './ContextWindowCard';
export { DataFlowVisualization } from './DataFlowVisualization';
export { MinimizedExtension } from './MinimizedExtension';

// Types
export type {
  ContextWindow,
  Position,
  DragState,
  ExtensionState,
  AssessmentSkill,
  InterpreBotState,
  AgentType,
  AgentUpdate,
} from './types';

// Constants
export {
  EXTENSION_DIMENSIONS,
  INTERPREBOT_DIMENSIONS,
  ANIMATION_DURATIONS,
  AGENT_CONFIGS,
  ASSESSMENT_SKILLS,
  MOCK_CONTEXT_WINDOWS,
  REALTIME_UPDATES,
  DEFAULT_POSITIONS,
} from './constants';

// Utils
export {
  getAgentIcon,
  getAgentColor,
  getAgentLabel,
  generateRandomUpdate,
  updateToContextWindow,
  formatTimestamp,
  getConfidenceColor,
  truncateText,
  constrainPosition,
  generateId,
  debounce,
  isInViewport,
  getViewportDimensions,
} from './utils';

// Hooks
export {
  useDraggableWindow,
  useContextWindows,
  useExtensionState,
  useAssessmentState,
  useWindowResize,
  useKeyboardShortcuts,
  useLocalStorage,
} from './hooks';
