/**
 * Types for Features Components
 */

import type { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category?: FeatureCategory;
  priority?: 'high' | 'medium' | 'low';
  isNew?: boolean;
  comingSoon?: boolean;
}

export type FeatureCategory =
  | 'quality-assurance'
  | 'analytics'
  | 'resources'
  | 'security'
  | 'collaboration'
  | 'real-time'
  | 'certification';

export interface FeatureSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  backgroundImage?: string;
  features: Feature[];
}

export interface FeatureCardProps {
  feature: Feature;
  index?: number;
  variant?: 'default' | 'compact' | 'detailed';
  showCategory?: boolean;
  onClick?: (feature: Feature) => void;
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  variant?: 'default' | 'compact' | 'detailed';
  showCategories?: boolean;
  onFeatureClick?: (feature: Feature) => void;
}

export interface FeaturesSectionProps {
  section: FeatureSection;
  className?: string;
  showAnimation?: boolean;
}
