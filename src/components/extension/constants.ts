/**
 * Constants for Extension UI Components
 */

import { Languages, Stethoscope, Globe, BarChart3 } from 'lucide-react';
import type { AssessmentSkill, ContextWindow } from './types';

// UI Constants
export const EXTENSION_DIMENSIONS = {
  width: 480,
  height: 600,
  minWidth: 320,
  minHeight: 400,
} as const;

export const INTERPREBOT_DIMENSIONS = {
  width: 420,
  height: 600,
} as const;

// Animation Constants
export const ANIMATION_DURATIONS = {
  transition: 300,
  pulse: 2000,
  update: 4000,
} as const;

// Agent Type Configurations
export const AGENT_CONFIGS = {
  translation: {
    icon: Languages,
    color: 'bg-primary/20',
    label: 'Translation Agent',
  },
  medical: {
    icon: Stethoscope,
    color: 'bg-success/20',
    label: 'Medical Terminology Agent',
  },
  cultural: {
    icon: Globe,
    color: 'bg-warning/20',
    label: 'Cultural Context Agent',
  },
  analysis: {
    icon: BarChart3,
    color: 'bg-secondary/20',
    label: 'Analytics Agent',
  },
} as const;

// Assessment Skills Data
export const ASSESSMENT_SKILLS: AssessmentSkill[] = [
  { skill: 'Linguistic Accuracy', score: 92, icon: '🎯' },
  { skill: 'Terminology Mastery', score: 88, icon: '🏥' },
  { skill: 'Grammatical Correctness', score: 91, icon: '📝' },
  { skill: 'Fluency & Flow', score: 94, icon: '🌊' },
  { skill: 'Contextual Appropriateness', score: 89, icon: '🎭' },
  { skill: 'Cultural Sensitivity', score: 93, icon: '🌍' },
];

// Mock Context Windows Data
export const MOCK_CONTEXT_WINDOWS: ContextWindow[] = [
  {
    id: '1',
    title: 'Speech-to-Text Agent',
    content: 'Processed audio: "The patient presents with chest pain and shortness of breath..." (PII removed)',
    type: 'translation',
    confidence: 98,
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'Medical Terminology Agent',
    content: 'Detected: chest pain (dolor torácico), shortness of breath (disnea), cardiovascular assessment needed',
    type: 'medical',
    confidence: 96,
    timestamp: new Date(Date.now() - 15000),
  },
  {
    id: '3',
    title: 'Cultural Context Agent',
    content: 'Patient communication style: Direct. Cultural background: Latin American. Adaptation recommended.',
    type: 'cultural',
    confidence: 92,
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '4',
    title: 'Ethics & QA Agent',
    content: 'Interpretation accuracy: 95%. Completeness: 98%. Reminder: Maintain first-person speech patterns.',
    type: 'analysis',
    confidence: 94,
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: '5',
    title: 'Live Assistance LLM',
    content: 'Suggested phrase: "El paciente presenta dolor en el pecho y dificultad para respirar"',
    type: 'translation',
    confidence: 97,
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '6',
    title: 'Session Analytics',
    content: 'Session duration: 12:34. Words interpreted: 1,247. Medical terms: 23. Overall performance: Excellent',
    type: 'analysis',
    confidence: 91,
    timestamp: new Date(Date.now() - 75000),
  },
];

// Real-time Update Messages
export const REALTIME_UPDATES = [
  'New medical term detected: "hypertension" -> "hipertensión"',
  'Cultural note: Patient may minimize symptoms due to cultural background',
  'QA Alert: Consider slowing pace for complex medical terms',
  'Live suggestion: "El médico va a revisar su presión arterial"',
  'Analytics: Session quality improving, confidence up 3%',
  'Terminology check: "myocardial infarction" -> "infarto de miocardio"',
  'Cultural adaptation: Use formal address for elderly patient',
  'Grammar correction: Verb tense consistency maintained',
  'Flow analysis: Speaking pace optimal for comprehension',
  'Context alert: Medical emergency protocol activated',
];

// Default Positions
export const DEFAULT_POSITIONS = {
  extension: { x: 0, y: 100 },
  interprebot: { x: 0, y: 100 },
} as const;
