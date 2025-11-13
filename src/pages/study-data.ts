import { Module } from '@/types/study';

export const getEthicsModules = (completedModules: string[]): Module[] => [
  {
    id: 'ethics-1',
    title: 'Professional Ethics Fundamentals',
    description: 'Core principles of interpreter ethics and professional conduct',
    duration: '45 min',
    difficulty: 'Beginner',
    completed: completedModules.includes('ethics-1'),
    category: 'ethics',
  },
  {
    id: 'ethics-2',
    title: 'Confidentiality and Privacy',
    description: 'Understanding HIPAA and confidentiality requirements',
    duration: '30 min',
    difficulty: 'Intermediate',
    completed: completedModules.includes('ethics-2'),
    category: 'ethics',
  },
  {
    id: 'ethics-3',
    title: 'Cultural Competency',
    description: 'Navigating cultural differences in interpretation',
    duration: '60 min',
    difficulty: 'Advanced',
    completed: completedModules.includes('ethics-3'),
    category: 'ethics',
  },
];

export const getTerminologyModules = (completedModules: string[]): Module[] => [
  {
    id: 'term-1',
    title: 'Medical Terminology Basics',
    description: 'Essential medical terms and anatomy',
    duration: '90 min',
    difficulty: 'Beginner',
    completed: completedModules.includes('term-1'),
    category: 'terminology',
  },
  // ... other terminology modules
];

export const getPracticeScenarios = (completedModules: string[]): Module[] => [
  {
    id: 'practice-1',
    title: 'Hospital Emergency Room',
    description: 'Practice interpreting in high-stress medical situations',
    duration: '30 min',
    difficulty: 'Intermediate',
    completed: completedModules.includes('practice-1'),
    category: 'practice',
  },
  // ... other practice scenarios
];

export const studyTools = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'modules', label: 'Modules', icon: BookOpen },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'scenarios', label: 'Scenarios', icon: Play },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
  { id: 'coach', label: 'AI Coach', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];
