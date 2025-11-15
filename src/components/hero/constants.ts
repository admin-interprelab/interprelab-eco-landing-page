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
    // Public sample video (Big Buck Bunny) used as a placeholder for the interpreter-stress clip
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=675&fit=crop&crop=faces',
    statistics: {
      value: '73%',
      label: 'of interpreters report high stress from unknown terminology',
    },
  },
  {
    id: 'quality-standards',
    title: 'High Demand Has Lowered Quality Standards',
    description: 'The shortage of qualified interpreters has led to hiring untrained bilinguals or those with limited English proficiency. Independent contractor relationships mean QA teams provide minimal feedback - often analyzing just one call every 4-6 months.',
    // Public sample video (Elephants Dream) used as a placeholder for the quality-gap clip
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&fit=crop&crop=faces',
    statistics: {
      value: '1 in 6 months',
      label: 'average QA feedback frequency for interpreters',
    },
  },
  {
    id: 'patient-outcomes',
    title: 'Language Barriers Cost Lives',
    description: 'Limited English Proficiency patients are twice as likely to die when hospitalized compared to English-speaking patients. These disparities often go unreported as LEP communities face marginalization and discrimination in healthcare.',
    // Public sample video (For Bigger Joyrides) used as a placeholder for the patient-outcomes clip
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=675&fit=crop&crop=faces',
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
