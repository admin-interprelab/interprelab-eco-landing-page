import { ReactNode } from 'react';

export interface NavigationTool {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  preview?: string;
  status: 'available' | 'beta' | 'coming-soon';
  category: 'assessment' | 'training' | 'live-assistance' | 'tracking' | 'community';
}

export interface MegaMenuSection {
  title: string;
  description: string;
  tools: NavigationTool[];
  quickActions?: QuickAction[];
}

export interface QuickAction {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationProps {
  user?: any;
  currentPath: string;
  megaMenuEnabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Empathetic Navigation Types
export interface JourneyStage {
  stage: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment' | 'action';
  progress: number; // 0-100
  completedMilestones: string[];
  nextRecommendedAction: string;
}

export interface EmotionalState {
  stressLevel: 'low' | 'moderate' | 'high' | 'crisis';
  primaryConcerns: PainPoint[];
  supportNeeds: SupportType[];
  preferredCommunicationStyle: 'direct' | 'gentle' | 'encouraging';
}

export interface PainPoint {
  type: 'financial' | 'technological' | 'psychological' | 'professional-development' | 'isolation';
  severity: number; // 1-10
  description: string;
  relatedSolutions: string[];
}

export interface SupportResource {
  type: 'crisis-support' | 'peer-community' | 'professional-help' | 'self-care';
  title: string;
  description: string;
  immediateAccess: boolean;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TherapeuticNavigationProps {
  user?: any;
  currentJourneyStage: JourneyStage;
  emotionalState?: EmotionalState;
  supportResourcesEnabled: boolean;
}

export interface EmpathicMenuItem {
  label: string;
  href: string;
  description: string;
  emotionalTone: 'validating' | 'hopeful' | 'empowering' | 'supportive';
  icon: React.ComponentType<{ className?: string }>;
  painPointsAddressed: PainPoint['type'][];
  urgencyLevel: 'immediate' | 'important' | 'helpful';
}

export type SupportType = 'emotional' | 'technical' | 'financial' | 'professional' | 'community';
