/**
 * Constants for InterpreBot Components
 */

import { Brain, Sparkles, BarChart3, Target, Stethoscope, FileText, Waves, Globe, Users } from 'lucide-react';
import type { AssessmentSkill, CompetencyArea, InterpreBotState } from './types';

// InterpreBot Dimensions
export const INTERPREBOT_DIMENSIONS = {
  width: 420,
  height: 600,
  minWidth: 320,
  minHeight: 400,
} as const;

// Default Position
export const DEFAULT_POSITION = {
  x: 24,
  y: 24,
} as const;

// Assessment Skills Data
export const ASSESSMENT_SKILLS: AssessmentSkill[] = [
  {
    id: 'linguistic-accuracy',
    skill: 'Linguistic Accuracy',
    score: 92,
    icon: '🎯',
    category: 'linguistic',
    description: 'Precision in language translation and interpretation',
    improvement: 'Focus on idiomatic expressions and cultural nuances',
  },
  {
    id: 'terminology-mastery',
    skill: 'Terminology Mastery',
    score: 88,
    icon: '🏥',
    category: 'medical',
    description: 'Command of specialized medical and legal terminology',
    improvement: 'Expand vocabulary in cardiology and oncology terms',
  },
  {
    id: 'grammatical-correctness',
    skill: 'Grammatical Correctness',
    score: 91,
    icon: '📝',
    category: 'linguistic',
    description: 'Proper grammar, syntax, and sentence structure',
    improvement: 'Review complex conditional structures',
  },
  {
    id: 'fluency-flow',
    skill: 'Fluency & Flow',
    score: 94,
    icon: '🌊',
    category: 'technical',
    description: 'Natural speech rhythm and seamless delivery',
    improvement: 'Practice with faster-paced conversations',
  },
  {
    id: 'contextual-appropriateness',
    skill: 'Contextual Appropriateness',
    score: 89,
    icon: '🎭',
    category: 'cultural',
    description: 'Appropriate register and cultural sensitivity',
    improvement: 'Study formal vs. informal medical contexts',
  },
  {
    id: 'cultural-sensitivity',
    skill: 'Cultural Sensitivity',
    score: 93,
    icon: '🌍',
    category: 'cultural',
    description: 'Understanding of cultural contexts and customs',
    improvement: 'Learn about specific regional healthcare practices',
  },
];

// Competency Areas
export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: 'linguistic-accuracy',
    title: 'Linguistic Accuracy',
    description: 'Precision analysis',
    icon: '🎯',
    color: 'bg-primary/10',
    category: 'primary',
  },
  {
    id: 'medical-terminology',
    title: 'Medical Terminology',
    description: 'Complex vocabulary',
    icon: '🏥',
    color: 'bg-success/10',
    category: 'success',
  },
  {
    id: 'grammar-check',
    title: 'Grammar Check',
    description: 'Tense & syntax',
    icon: '📝',
    color: 'bg-warning/10',
    category: 'warning',
  },
  {
    id: 'flow-context',
    title: 'Flow & Context',
    description: 'Natural delivery',
    icon: '🌊',
    color: 'bg-secondary/10',
    category: 'secondary',
  },
];

// Default InterpreBot State
export const DEFAULT_INTERPREBOT_STATE: InterpreBotState = {
  isVisible: true,
  isMinimized: false,
  showAssessment: false,
  isAnalyzing: false,
  currentStep: 'welcome',
  assessmentProgress: 0,
};

// Chat Suggestions
export const CHAT_SUGGESTIONS = [
  'Analyze my weak areas',
  'Create learning path',
  'Show improvement tips',
  'Compare with benchmarks',
  'Schedule practice session',
  'Export assessment report',
];

// Assessment Recommendations
export const ASSESSMENT_RECOMMENDATIONS = [
  'Focus on medical terminology precision and cultural context awareness for optimal performance.',
  'Practice with complex medical scenarios to improve terminology retention.',
  'Work on maintaining consistent pace during high-stress interpretations.',
  'Develop strategies for handling unknown terminology in real-time.',
  'Strengthen cultural competency through diverse case studies.',
];

// Animation Configurations
export const ANIMATION_CONFIG = {
  skillBarDelay: 200, // ms between each skill bar animation
  analysisDelay: 800, // ms before text appears
  pulseInterval: 2000, // ms for pulse animations
  transitionDuration: 300, // ms for general transitions
} as const;

// Color Schemes
export const COLOR_SCHEMES = {
  primary: {
    gradient: 'from-purple-500 to-pink-500',
    hover: 'from-purple-600 to-pink-600',
    background: 'bg-purple-500/10',
    text: 'text-purple-600',
    border: 'border-purple-500/20',
  },
  success: {
    gradient: 'from-green-500 to-emerald-500',
    hover: 'from-green-600 to-emerald-600',
    background: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/20',
  },
  warning: {
    gradient: 'from-yellow-500 to-orange-500',
    hover: 'from-yellow-600 to-orange-600',
    background: 'bg-yellow-500/10',
    text: 'text-yellow-600',
    border: 'border-yellow-500/20',
  },
  secondary: {
    gradient: 'from-blue-500 to-cyan-500',
    hover: 'from-blue-600 to-cyan-600',
    background: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/20',
  },
} as const;

// Assessment Steps
export const ASSESSMENT_STEPS = [
  {
    id: 'initialization',
    title: 'Initializing Assessment',
    description: 'Preparing evaluation framework...',
    duration: 1000,
  },
  {
    id: 'linguistic-analysis',
    title: 'Linguistic Analysis',
    description: 'Analyzing language proficiency...',
    duration: 1500,
  },
  {
    id: 'terminology-evaluation',
    title: 'Terminology Evaluation',
    description: 'Evaluating specialized vocabulary...',
    duration: 1200,
  },
  {
    id: 'cultural-assessment',
    title: 'Cultural Assessment',
    description: 'Assessing cultural competency...',
    duration: 1000,
  },
  {
    id: 'performance-scoring',
    title: 'Performance Scoring',
    description: 'Calculating final scores...',
    duration: 800,
  },
  {
    id: 'recommendation-generation',
    title: 'Generating Recommendations',
    description: 'Creating personalized insights...',
    duration: 1000,
  },
] as const;

// Skill Categories
export const SKILL_CATEGORIES = {
  linguistic: {
    label: 'Linguistic Skills',
    color: 'text-blue-600',
    background: 'bg-blue-50',
    icon: FileText,
  },
  medical: {
    label: 'Medical Knowledge',
    color: 'text-green-600',
    background: 'bg-green-50',
    icon: Stethoscope,
  },
  technical: {
    label: 'Technical Skills',
    color: 'text-purple-600',
    background: 'bg-purple-50',
    icon: BarChart3,
  },
  cultural: {
    label: 'Cultural Competency',
    color: 'text-orange-600',
    background: 'bg-orange-50',
    icon: Globe,
  },
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  excellent: 95,
  good: 85,
  satisfactory: 75,
  needsImprovement: 65,
} as const;

// Message Types
export const MESSAGE_TYPES = {
  text: {
    icon: null,
    color: 'text-foreground',
  },
  suggestion: {
    icon: Sparkles,
    color: 'text-blue-600',
  },
  analysis: {
    icon: BarChart3,
    color: 'text-purple-600',
  },
  recommendation: {
    icon: Target,
    color: 'text-green-600',
  },
} as const;
