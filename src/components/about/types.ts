/**
 * About Page Component Types
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface CompanyValue {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  background: string;
  specialization: string;
  avatar?: string;
  initials?: string;
}

export interface CompanyStat {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface AboutHeroProps {
  className?: string;
  showImage?: boolean;
  customContent?: {
    badge?: string;
    title?: string;
    description?: string;
    location?: string;
    teamSize?: string;
  };
}

export interface MissionVisionProps {
  className?: string;
  mission?: string;
  vision?: string;
}

export interface CompanyValuesProps {
  className?: string;
  values?: CompanyValue[];
  title?: string;
  description?: string;
}

export interface TeamSectionProps {
  className?: string;
  teamMembers?: TeamMember[];
  title?: string;
  description?: string;
}

export interface CompanyStatsProps {
  className?: string;
  stats?: CompanyStat[];
}

export interface AboutCTAProps {
  className?: string;
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

export interface AboutPageProps {
  className?: string;
  customContent?: {
    hero?: AboutHeroProps['customContent'];
    mission?: string;
    vision?: string;
    values?: CompanyValue[];
    team?: TeamMember[];
    stats?: CompanyStat[];
    cta?: {
      title?: string;
      description?: string;
    };
  };
}
