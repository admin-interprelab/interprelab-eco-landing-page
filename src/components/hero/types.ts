/**
 * Types for Hero Components
 */

import type { LucideIcon } from 'lucide-react';

export interface HeroAction {
  id: string;
  label: string;
  href: string;
  variant: 'hero' | 'glass' | 'outline' | 'default';
  size?: 'sm' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  external?: boolean;
}

export interface HeroBadge {
  id: string;
  text: string;
  icon?: LucideIcon;
  variant?: 'default' | 'secondary' | 'outline';
}

export interface TrustIndicator {
  id: string;
  text: string;
  emoji?: string;
  icon?: LucideIcon;
}

export interface HeroContent {
  badge?: HeroBadge;
  headline: {
    primary: string;
    secondary: string;
  };
  subtitle: string;
  actions: HeroAction[];
  trustIndicators: {
    text: string;
    items: TrustIndicator[];
  };
}

export interface VideoHeroSection {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  statistics?: {
    value: string;
    label: string;
  };
}

export interface HeroProps {
  content?: HeroContent;
  className?: string;
  showAnimations?: boolean;
}

export interface VideoSectionProps {
  sections: VideoHeroSection[];
  className?: string;
  autoPlay?: boolean;
  showScrollIndicator?: boolean;
}

export interface FullScreenVideoHeroProps {
  section: VideoHeroSection;
  index: number;
  isActive?: boolean;
  onVideoLoad?: (index: number) => void;
  onVideoError?: (index: number, error: string) => void;
}
