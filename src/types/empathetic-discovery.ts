import { ReactNode } from 'react';
import { PainPoint, EmotionalState, JourneyStage } from './navigation';

// Pain Point-Aware Search Types
export interface EmpathicSearchResult {
  id: string;
  type: 'solution' | 'support' | 'story' | 'resource' | 'community';
  title: string;
  description: string;
  content: string;
  emotionalTone: 'validating' | 'hopeful' | 'empowering' | 'practical';
  painPointsAddressed: PainPoint['type'][];
  urgencyLevel: 'immediate' | 'important' | 'helpful';
  url: string;
  testimonialQuote?: string;
  tags: string[];
  category: 'ai-tools' | 'training' | 'community' | 'support' | 'success-stories';
  relevanceScore: number;
  crisisSupport?: boolean;
}

export interface EmpathicSearchFilters {
  currentStruggles: ('burnout' | 'financial-stress' | 'tech-frustration' | 'isolation' | 'career-stagnation')[];
  urgencyLevel: 'crisis' | 'seeking-help' | 'exploring-options' | 'planning-ahead';
  preferredSolutionType: 'immediate-relief' | 'long-term-growth' | 'community-support' | 'professional-development';
  emotionalReadiness: 'need-validation' | 'ready-for-hope' | 'ready-for-action';
  emotionalTone?: 'validating' | 'hopeful' | 'empowering' | 'practical';
}

export interface SearchQuery {
  query: string;
  filters: EmpathicSearchFilters;
  emotionalState?: EmotionalState;
  journeyStage?: JourneyStage;
}

// Therapeutic Content Recommendations
export interface ContentPersonalization {
  interpreterProfile: InterpreterProfile;
  journeyStage: JourneyStage;
  previousInteractions: UserInteraction[];
  recommendedContent: PersonalizedContent[];
}

export interface InterpreterProfile {
  id: string;
  strugglesIdentified: PainPoint[];
  experienceLevel: 'new' | 'intermediate' | 'experienced' | 'veteran';
  specializations: string[];
  currentChallenges: string[];
  successStories: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  supportPreferences: 'peer' | 'professional' | 'self-guided' | 'mixed';
}

export interface UserInteraction {
  timestamp: Date;
  type: 'search' | 'content-view' | 'tool-use' | 'community-engagement' | 'support-access';
  content: string;
  emotionalResponse?: 'positive' | 'neutral' | 'negative' | 'crisis';
  duration: number;
  outcome: 'completed' | 'abandoned' | 'escalated';
}

export interface PersonalizedContent {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'tool' | 'story' | 'exercise' | 'community';
  recommendationReason: string;
  emotionalBenefit: string;
  practicalBenefit: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  priority: 'high' | 'medium' | 'low';
}

// Success Story Matching
export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  fullStory: string;
  interpreterBackground: {
    experienceLevel: string;
    specialization: string[];
    challenges: PainPoint['type'][];
    demographics?: {
      ageRange?: string;
      location?: string;
      languages?: string[];
    };
  };
  transformation: {
    before: string;
    after: string;
    keyMilestones: string[];
    timeframe: string;
    toolsUsed: string[];
  };
  emotionalJourney: {
    startingPoint: string;
    lowPoints: string[];
    breakthroughs: string[];
    currentState: string;
  };
  quotes: {
    inspirational: string;
    practical: string;
    hopeful: string;
  };
  metrics?: {
    earningsImprovement?: string;
    stressReduction?: string;
    skillImprovement?: string;
    careerAdvancement?: string;
  };
  tags: string[];
  featured: boolean;
  verified: boolean;
}

export interface StoryMatchCriteria {
  painPoints: PainPoint['type'][];
  experienceLevel: string;
  specializations: string[];
  currentEmotionalState: EmotionalState;
  journeyStage: JourneyStage;
}

// Empowerment-Focused Onboarding
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'validation' | 'assessment' | 'goal-setting' | 'solution-matching' | 'community-connection';
  emotionalTone: 'validating' | 'hopeful' | 'empowering';
  content: ReactNode;
  validation?: (data: any) => boolean;
  nextStep?: string;
  skipAllowed: boolean;
  timeEstimate: string;
}

export interface OnboardingFlow {
  id: string;
  name: string;
  description: string;
  steps: OnboardingStep[];
  personalizedPath: boolean;
  completionRewards: string[];
}

export interface OnboardingProgress {
  userId: string;
  flowId: string;
  currentStep: string;
  completedSteps: string[];
  skippedSteps: string[];
  personalizedData: Record<string, any>;
  startedAt: Date;
  lastActivity: Date;
  completed: boolean;
  completedAt?: Date;
}

// Hope-Building Content Progression
export interface HopeProgressionLevel {
  level: number;
  name: string;
  description: string;
  emotionalGoal: string;
  content: {
    validation: string[];
    inspiration: string[];
    practical: string[];
    community: string[];
  };
  milestones: string[];
  nextLevelCriteria: string[];
}

export interface ContentProgression {
  userId: string;
  currentLevel: number;
  completedContent: string[];
  hopeIndicators: HopeIndicator[];
  progressMetrics: {
    validationEngagement: number;
    inspirationResonance: number;
    practicalApplication: number;
    communityConnection: number;
  };
}

export interface HopeIndicator {
  type: 'success-story-engagement' | 'solution-exploration' | 'premium-consideration' | 'community-participation' | 'goal-setting' | 'positive-feedback';
  timestamp: Date;
  intensity: number; // 1-10 scale
  context: string;
  content?: string;
}
