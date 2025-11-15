/**
 * Solution Hero Component Types
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface SolutionItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string;
  badge?: string;
  features?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface SolutionHeroProps {
  className?: string;
  solutions?: SolutionItem[];
  showTrustIndicators?: boolean;
  showCTA?: boolean;
  customHeadline?: {
    primary: string;
    secondary: string;
    description: string;
    subDescription?: string;
  };
  onSolutionClick?: (solution: SolutionItem) => void;
}

export interface SolutionCardProps {
  solution: SolutionItem;
  index: number;
  onClick?: (solution: SolutionItem) => void;
  className?: string;
}

export interface SolutionHeroHeadlineProps {
  primary: string;
  secondary: string;
  description: string;
  subDescription?: string;
  className?: string;
}

export interface SolutionHeroCTAProps {
  className?: string;
  primaryAction?: {
    text: string;
    link: string;
    variant?: 'default' | 'outline' | 'ghost';
  };
  secondaryAction?: {
    text: string;
    link: string;
    variant?: 'default' | 'outline' | 'ghost';
  };
}

export interface TrustIndicatorProps {
  className?: string;
  indicators?: Array<{
    id: string;
    text: string;
    status?: 'active' | 'verified' | 'certified';
  }>;
}

export interface SolutionHeroContextType {
  solutions: SolutionItem[];
  selectedSolution: SolutionItem | null;
  isLoading: boolean;
  error: string | null;
  setSolutions: (solutions: SolutionItem[]) => void;
  setSelectedSolution: (solution: SolutionItem | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface SolutionHeroProviderProps {
  children: ReactNode;
  initialSolutions?: SolutionItem[];
}
