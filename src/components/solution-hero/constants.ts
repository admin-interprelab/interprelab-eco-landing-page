/**
 * Solution Hero Component Constants
 */

import { Bot, BookOpen, BarChart3, MessageSquare, Zap, Shield } from 'lucide-react';
import type { SolutionItem } from './types';

export const DEFAULT_SOLUTIONS: SolutionItem[] = [
  {
    id: 'interprebot',
    icon: Bot,
    title: 'InterpreBot',
    description: 'AI-powered assessment tool that provides instant feedback on your interpretation skills',
    link: '/interprebot',
    color: 'text-primary',
    badge: 'AI-Powered',
    features: ['Real-time feedback', 'Skill assessment', 'Performance analytics'],
    isPopular: true,
  },
  {
    id: 'interprecoach',
    icon: BookOpen,
    title: 'InterpreCoach',
    description: 'Personalized AI coaching to help you master medical terminology and improve techniques',
    link: '/interprecoach',
    color: 'text-success',
    badge: 'Personalized',
    features: ['Custom learning paths', 'Medical terminology', 'Technique improvement'],
    isNew: true,
  },
  {
    id: 'interpretrack',
    icon: BarChart3,
    title: 'InterpreTrack',
    description: 'Track your performance, analyze patterns, and measure your growth over time',
    link: '/interpretrack',
    color: 'text-warning',
    badge: 'Analytics',
    features: ['Performance tracking', 'Pattern analysis', 'Growth metrics'],
  },
];

export const DEFAULT_HEADLINE = {
  primary: 'Embrace the Change,',
  secondary: "Don't Get Replaced By It",
  description: 'The InterpreLab Ecosystem: AI-powered solutions designed to eradicate the human margin of error in medical interpretation',
  subDescription: "We're contributing to the UN SDG 2030 goals by transforming healthcare communication on a global scale—ensuring every voice is heard, every diagnosis is clear, and every patient receives equitable care.",
};

export const DEFAULT_TRUST_INDICATORS = [
  {
    id: 'hipaa',
    text: 'HIPAA Compliant',
    status: 'certified' as const,
  },
  {
    id: 'soc2',
    text: 'SOC 2 Certified',
    status: 'certified' as const,
  },
  {
    id: 'iso27001',
    text: 'ISO 27001',
    status: 'certified' as const,
  },
  {
    id: 'gdpr',
    text: 'GDPR Compliant',
    status: 'verified' as const,
  },
];

export const DEFAULT_CTA = {
  primaryAction: {
    text: 'Find Out More',
    link: '/about',
    variant: 'default' as const,
  },
  secondaryAction: {
    text: 'View Demo',
    link: '/demo',
    variant: 'outline' as const,
  },
};

export const ANIMATION_CONFIG = {
  staggerDelay: 100,
  cardHoverDuration: 300,
  fadeInDuration: 600,
  slideUpDistance: 20,
};

export const SOLUTION_COLORS = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  destructive: 'text-destructive',
  muted: 'text-muted-foreground',
} as const;

export const CARD_VARIANTS = {
  default: 'glass border-primary/20',
  elevated: 'glass border-primary/30 shadow-lg',
  outlined: 'border-2 border-primary/40 bg-card/50',
  solid: 'bg-card border-border',
} as const;

export const TRUST_INDICATOR_COLORS = {
  active: 'bg-primary',
  verified: 'bg-success',
  certified: 'bg-success',
} as const;
