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

export interface AssessmentSkill {
  skill: string;
  score: number;
  icon: string;
}

export interface ExtensionState {
  isRecording: boolean;
  isMuted: boolean;
  isMinimized: boolean;
  isVisible: boolean;
  showAssessment: boolean;
  message: string;
  position: Position;
  isDragging: boolean;
  dragOffset: Position;
  contextWindows: ContextWindow[];
}
