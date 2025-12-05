/**
 * Constants for Features Components
 */

import {
  Monitor,
  TrendingUp,
  BookOpen,
  Shield,
  Users,
  Database,
  Clock,
  Award,
  Zap,
  Brain,
  Globe,
  Settings
} from 'lucide-react';
import type { Feature, FeatureSection, FeatureCategory } from './types';

// Feature Categories Configuration
export const FEATURE_CATEGORIES = {
  'quality-assurance': {
    label: 'Quality Assurance',
    color: 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
    icon: Monitor,
  },
  'analytics': {
    label: 'Analytics',
    color: 'bg-green-500/20 text-green-700 dark:text-green-300',
    icon: TrendingUp,
  },
  'resources': {
    label: 'Resources',
    color: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
    icon: BookOpen,
  },
  'security': {
    label: 'Security',
    color: 'bg-red-500/20 text-red-700 dark:text-red-300',
    icon: Shield,
  },
  'collaboration': {
    label: 'Collaboration',
    color: 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
    icon: Users,
  },
  'real-time': {
    label: 'Real-time',
    color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
    icon: Clock,
  },
  'certification': {
    label: 'Certification',
    color: 'bg-pink-500/20 text-pink-700 dark:text-pink-300',
    icon: Award,
  },
} as const;

// Core Features Data
export const CORE_FEATURES: Feature[] = [
  {
    id: 'continuous-qa',
    icon: Monitor,
    title: 'Continuous Quality Assurance',
    description: 'Real-time monitoring combines AI precision with human expertise for comprehensive quality control.',
    category: 'quality-assurance',
    priority: 'high',
  },
  {
    id: 'performance-analytics',
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track terminology fidelity, ethical decisions, and get session-based performance reports.',
    category: 'analytics',
    priority: 'high',
  },
  {
    id: 'resource-management',
    icon: BookOpen,
    title: 'Resource Management',
    description: 'Upload, test, and refine language resources. Integrate glossaries and experiment with custom models.',
    category: 'resources',
    priority: 'medium',
  },
  {
    id: 'data-security',
    icon: Shield,
    title: 'Data Security & Privacy',
    description: 'Enterprise-grade security with HIPAA compliance and SOC 2 certification for sensitive environments.',
    category: 'security',
    priority: 'high',
  },
  {
    id: 'collaborative-platform',
    icon: Users,
    title: 'Collaborative Platform',
    description: 'Space for linguists, developers, and educators to share insights and best practices.',
    category: 'collaboration',
    priority: 'medium',
  },
  {
    id: 'conversation-analytics',
    icon: Database,
    title: 'Conversation Analytics',
    description: 'Comprehensive dashboards track logs, usage statistics, and model performance metrics.',
    category: 'analytics',
    priority: 'medium',
  },
  {
    id: 'real-time-feedback',
    icon: Clock,
    title: 'Real-time Feedback',
    description: 'Instant feedback during sessions with adaptive scenarios and AI-driven simulations.',
    category: 'real-time',
    priority: 'high',
  },
  {
    id: 'certification-support',
    icon: Award,
    title: 'Certification Support',
    description: 'Structured preparation for professional certification with graded assessments.',
    category: 'certification',
    priority: 'medium',
  },
];

// Advanced Features (for future expansion)
export const ADVANCED_FEATURES: Feature[] = [
  {
    id: 'ai-coaching',
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Personalized coaching recommendations based on performance patterns and learning objectives.',
    category: 'quality-assurance',
    priority: 'high',
    isNew: true,
  },
  {
    id: 'multi-language',
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Support for 50+ language pairs with specialized medical and legal terminology.',
    category: 'resources',
    priority: 'medium',
    comingSoon: true,
  },
  {
    id: 'custom-workflows',
    icon: Settings,
    title: 'Custom Workflows',
    description: 'Build custom assessment workflows tailored to specific industries and use cases.',
    category: 'collaboration',
    priority: 'low',
    comingSoon: true,
  },
  {
    id: 'instant-translation',
    icon: Zap,
    title: 'Instant Translation',
    description: 'Lightning-fast translation with context-aware suggestions and terminology validation.',
    category: 'real-time',
    priority: 'high',
    isNew: true,
  },
];

// Default Feature Section
export const DEFAULT_FEATURES_SECTION: FeatureSection = {
  id: 'core-features',
  title: 'Comprehensive Features for Professional Interpreters',
  subtitle: 'Platform Capabilities',
  description: 'From continuous monitoring to collaborative learning, InterpreLab provides everything interpreters need to excel in high-stakes environments.',
  badge: 'Platform Capabilities',
  backgroundImage: '/src/assets/tech-background.jpg',
  features: CORE_FEATURES,
};

// Grid Layout Configurations
export const GRID_LAYOUTS = {
  default: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  },
  compact: {
    mobile: 2,
    tablet: 3,
    desktop: 6,
  },
  detailed: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
} as const;

// Animation Delays
export const ANIMATION_DELAYS = {
  stagger: 100, // ms between each card animation
  section: 200, // ms for section animations
  hover: 150,   // ms for hover transitions
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;
