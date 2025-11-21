/**
 * Stats Section Component Types
 */

import { ReactNode, ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  id: string;
  icon: LucideIcon | ComponentType<unknown>;
  value: string | number;
  label: string;
  gradient: string;
  description?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period: string;
  };
  prefix?: string;
  suffix?: string;
  animated?: boolean;
}

export interface StatsSectionProps {
  className?: string;
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showBackground?: boolean;
  showTrends?: boolean;
  animateOnScroll?: boolean;
  columns?: 2 | 3 | 4 | 'auto';
  onStatClick?: (stat: StatItem) => void;
}

export interface StatCardProps {
  stat: StatItem;
  index: number;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showTrend?: boolean;
  animateOnScroll?: boolean;
  onClick?: (stat: StatItem) => void;
  className?: string;
}

export interface StatsHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4 | 'auto';
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showTrends?: boolean;
  animateOnScroll?: boolean;
  onStatClick?: (stat: StatItem) => void;
  className?: string;
}

export interface StatsContextType {
  stats: StatItem[];
  selectedStat: StatItem | null;
  isLoading: boolean;
  error: string | null;
  setStats: (stats: StatItem[]) => void;
  setSelectedStat: (stat: StatItem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface StatsProviderProps {
  children: ReactNode;
  initialStats?: StatItem[];
}
