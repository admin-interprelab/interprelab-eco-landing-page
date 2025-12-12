import { ReactNode } from 'react';

export interface NavigationTool {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  preview?: string;
  status: 'available' | 'beta' | 'coming-soon';
  category: 'assessment' | 'training' | 'live-assistance' | 'tracking' | 'community';
}

export interface MegaMenuSection {
  title: string;
  description: string;
  tools: NavigationTool[];
  quickActions?: QuickAction[];
}

export interface QuickAction {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationProps {
  user?: any;
  currentPath: string;
  megaMenuEnabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}
