/**
 * Types for InterpreBot Components
 */

import type { LucideIcon } from 'lucide-react';

export interface AssessmentSkill {
  id: string;
  skill: string;
  score: number;
  icon: string;
  category: 'linguistic' | 'medical' | 'technical' | 'cultural';
  description?: string;
  improvement?: string;
}

export interface CompetencyArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'primary' | 'success' | 'warning' | 'secondary';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'analysis' | 'recommendation';
}

export interface AssessmentResult {
  id: string;
  overallScore: number;
  skills: AssessmentSkill[];
  recommendations: string[];
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  timestamp: Date;
}

export interface InterpreBotState {
  isVisible: boolean;
  isMinimized: boolean;
  showAssessment: boolean;
  isAnalyzing: boolean;
  currentStep: 'welcome' | 'assessment' | 'results' | 'chat';
  assessmentProgress: number;
}

export interface InterpreBotProps {
  initialState?: Partial<InterpreBotState>;
  onStateChange?: (state: InterpreBotState) => void;
  onAssessmentComplete?: (result: AssessmentResult) => void;
  onMessageSent?: (message: string) => void;
  className?: string;
  position?: { x: number; y: number };
}

export interface InterpreBotHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  title?: string;
  subtitle?: string;
}

export interface WelcomeScreenProps {
  onStartAssessment: () => void;
  onMinimize: () => void;
  competencies: CompetencyArea[];
}

export interface AssessmentScreenProps {
  skills: AssessmentSkill[];
  isAnalyzing: boolean;
  progress: number;
  onComplete?: () => void;
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  currentMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  disabled?: boolean;
  suggestions?: string[];
}

export interface MinimizedBotProps {
  onRestore: () => void;
  hasNotification?: boolean;
  notificationCount?: number;
}

export interface SkillProgressBarProps {
  skill: AssessmentSkill;
  index: number;
  isAnimating: boolean;
  showDetails?: boolean;
  onClick?: (skill: AssessmentSkill) => void;
}

export interface CompetencyCardProps {
  competency: CompetencyArea;
  index: number;
  onClick?: (competency: CompetencyArea) => void;
}

export interface RecommendationCardProps {
  title: string;
  content: string;
  type: 'recommendation' | 'strength' | 'improvement' | 'next-step';
  icon?: LucideIcon;
}
