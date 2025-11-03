/**
 * Types for Extension UI Components
 */

export interface ContextWindow {
  id: string;
  title: string;
  content: string;
  type: 'translation' | 'medical' | 'cultural' | 'analysis';
  confidence: number;
  timestamp: Date;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  isDragging: boolean;
  offset: Position;
}

export interface ExtensionState {
  isRecording: boolean;
  isMuted: boolean;
  isMinimized: boolean;
  isVisible: boolean;
  position: Position;
}

export interface AssessmentSkill {
  skill: string;
  score: number;
  icon: string;
}

export interface InterpreBotState {
  showAssessment: boolean;
  message: string;
}

export type AgentType = 'translation' | 'medical' | 'cultural' | 'analysis';

export interface AgentUpdate {
  id: string;
  agentType: AgentType;
  content: string;
  confidence: number;
  timestamp: Date;
}
