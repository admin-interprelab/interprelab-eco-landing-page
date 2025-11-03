/**
 * Stats Section Component Constants
 */

import { TrendingUp, Users, Globe, Award, Target, Zap, Shield, Star } from 'lucide-react';
import type { StatItem } from './types';

export const DEFAULT_STATS: StatItem[] = [
  {
    id: 'active-interpreters',
    icon: Users,
    value: "10,000+",
    label: "Active Interpreters",
    gradient: "from-primary to-primary-glow",
    description: "Professional interpreters using our platform",
    trend: {
      value: 15,
      direction: 'up',
      period: 'this month',
    },
    animated: true,
  },
  {
    id: 'countries-worldwide',
    icon: Globe,
    value: "50+",
    label: "Countries Worldwide",
    gradient: "from-success to-primary",
    description: "Global reach across continents",
    trend: {
      value: 8,
      direction: 'up',
      period: 'this quarter',
    },
    animated: true,
  },
  {
    id: 'accuracy-improvement',
    icon: TrendingUp,
    value: "40%",
    label: "Accuracy Improvement",
    gradient: "from-secondary to-accent",
    description: "Average improvement in interpretation accuracy",
    trend: {
      value: 5,
      direction: 'up',
      period: 'vs last year',
    },
    suffix: '%',
    animated: true,
  },
  {
    id: 'client-satisfaction',
    icon: Award,
    value: "98%",
    label: "Client Satisfaction",
    gradient: "from-primary to-secondary",
    description: "Client satisfaction rate",
    trend: {
      value: 2,
      direction: 'up',
      period: 'this year',
    },
    suffix: '%',
    animated: true,
  },
];

export const DEFAULT_HEADER = {
  badge: 'Trusted Globally',
  title: 'Transforming Interpretation',
  subtitle: '',
};

export const GRADIENT_PRESETS = {
  primary: 'from-primary to-primary-glow',
  success: 'from-success to-primary',
  warning: 'from-warning to-orange-500',
  info: 'from-info to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  blue: 'from-blue-500 to-indigo-500',
  green: 'from-green-500 to-teal-500',
  orange: 'from-orange-500 to-red-500',
  secondary: 'from-secondary to-accent',
  custom: 'from-primary to-secondary',
} as const;

export const ANIMATION_CONFIG = {
  duration: 2000,
  delay: 100,
  staggerDelay: 150,
  countUpDuration: 1500,
  fadeInDuration: 600,
} as const;

export const GRID_COLUMNS = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  auto: 'grid-cols-2 md:grid-cols-4',
} as const;

export const CARD_VARIANTS = {
  default: 'text-center space-y-3',
  compact: 'text-center space-y-2',
  detailed: 'text-center space-y-4 p-6 glass rounded-xl border border-border/20',
  minimal: 'text-center space-y-2 p-4',
} as const;

export const TREND_COLORS = {
  up: 'text-success',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
} as const;

export const TREND_ICONS = {
  up: '↗',
  down: '↘',
  neutral: '→',
} as const;
