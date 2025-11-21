/**
 * Constants for Hero Components
 */

import { ArrowRight, Play, Zap, User, Shield, TrendingUp, AlertTriangle, Users, Heart } from 'lucide-react';
import type { HeroContent, VideoHeroSection } from './types';

// Default Hero Content
export const DEFAULT_HERO_CONTENT: HeroContent = {
  badge: {
    id: 'ai-platform',
    text: 'AI-Powered Interpretation Platform',
    icon: Zap,
    variant: 'default',
  },
  headline: {
    primary: 'Master Medical',
    secondary: 'Interpretation',
  },
  subtitle: 'Train smarter with AI-driven assessment, real-time coaching, and automated tracking.',
  actions: [
    {
      id: 'assessment',
      label: 'Take the Assessment',
      href: '/interprebot',
      variant: 'hero',
      size: 'xl',
      icon: ArrowRight,
      iconPosition: 'right',
    },
    {
      id: 'coach',
      label: 'Meet InterpreCoach',
      href: '/interprecoach',
      variant: 'glass',
      size: 'xl',
      icon: Play,
      iconPosition: 'left',
    },
  ],
  trustIndicators: {
    text: 'Trusted by healthcare systems and legal firms across 50+ countries',
    items: [
      {
        id: 'medical',
        text: 'Medical Centers',
        emoji: '🏥',
      },
      {
        id: 'legal',
        text: 'Legal Firms',
        emoji: '⚖️',
      },
      {
        id: 'global',
        text: 'Global Organizations',
        emoji: '🌍',
      },
    ],
  },
};

// Video Hero Sections - Updated with the three main pain points
export const VIDEO_HERO_SECTIONS: VideoHeroSection[] = [
  {
    id: 'stress-terminology',
    title: 'High-Stress Situations Leave No Room for Mistakes',
    description: 'Interpreters face intense pressure when encountering unknown medical terminology during critical encounters. Rather than interrupt the flow, they often rely on guesswork, leading to potential miscommunication in life-or-death situations.',
    videoSrc: '/videos/interpreter-stress.mp4',
    posterSrc: '/videos/interpreter-stress-poster.jpg',
    statistics: {
      value: '73%',
      label: 'of interpreters report high stress from unknown terminology',
    },
  },
  {
    id: 'quality-standards',
    title: 'High Demand Has Lowered Quality Standards',
    description: 'The shortage of qualified interpreters has led to hiring untrained bilinguals or those with limited English proficiency. Independent contractor relationships mean QA teams provide minimal feedback - often analyzing just one call every 4-6 months.',
    videoSrc: '/videos/quality-gap.mp4',
    posterSrc: '/videos/quality-gap-poster.jpg',
    statistics: {
      value: '1 in 6 months',
      label: 'average QA feedback frequency for interpreters',
    },
  },
  {
    id: 'patient-outcomes',
    title: 'Language Barriers Cost Lives',
    description: 'Limited English Proficiency patients are twice as likely to die when hospitalized compared to English-speaking patients. These disparities often go unreported as LEP communities face marginalization and discrimination in healthcare.',
    videoSrc: '/videos/patient-outcomes.mp4',
    posterSrc: '/videos/patient-outcomes-poster.jpg',
    statistics: {
      value: '2x higher',
      label: 'mortality rate for LEP patients in hospitals',
    },
  },
];

// Animation Configurations
export const HERO_ANIMATIONS = {
  fadeIn: {
    duration: '1000ms',
    delay: '200ms',
    easing: 'ease-out',
  },
  slideUp: {
    duration: '800ms',
    delay: '400ms',
    easing: 'ease-out',
  },
  stagger: {
    baseDelay: 100,
    increment: 100,
  },
} as const;

// Video Configuration
export const VIDEO_CONFIG = {
  autoPlay: true,
  muted: true,
  loop: true,
  preload: 'auto' as const,
  playsInline: true,
  intersectionThreshold: 0.5,
  textFadeDelay: 800,
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;

// Hero Variants
export const HERO_VARIANTS = {
  default: {
    background: 'bg-background',
    overlay: 'bg-gradient-glow opacity-20',
    textAlign: 'text-center',
  },
  minimal: {
    background: 'bg-background',
    overlay: 'bg-gradient-to-b from-background/50 to-background',
    textAlign: 'text-left',
  },
  video: {
    background: 'bg-black',
    overlay: 'bg-black/60',
    textAlign: 'text-center',
  },
} as const;
