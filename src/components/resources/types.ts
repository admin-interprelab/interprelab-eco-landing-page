/**
 * Types for Resources Components
 */

import type { LucideIcon } from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  downloadUrl?: string;
  type: 'link' | 'download' | 'internal' | 'external';
  isNew?: boolean;
  isPremium?: boolean;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  items: ResourceItem[];
  featured?: boolean;
}

export interface ProfessionalResource {
  id: string;
  title: string;
  organization: string;
  description: string;
  url: string;
  downloadUrl?: string;
  type: 'ethics' | 'standards' | 'guidelines' | 'certification' | 'legal' | 'training';
  language?: string;
  fileFormat?: 'pdf' | 'doc' | 'html' | 'video';
  lastUpdated?: Date;
  isOfficial?: boolean;
}

export interface CommunityFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  action: {
    label: string;
    href: string;
    type: 'internal' | 'external';
  };
}

export interface ResourcesSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  backgroundImage?: string;
  categories: ResourceCategory[];
  professionalResources: ProfessionalResource[];
  communityFeatures: CommunityFeature[];
}

export interface ResourceCardProps {
  category: ResourceCategory;
  index: number;
  onExplore?: (category: ResourceCategory) => void;
}

export interface ProfessionalResourceCardProps {
  resource: ProfessionalResource;
  onDownload?: (resource: ProfessionalResource) => void;
  onView?: (resource: ProfessionalResource) => void;
}

export interface CommunityFeatureCardProps {
  feature: CommunityFeature;
  onAction?: (feature: CommunityFeature) => void;
}

export interface ResourcesProps {
  section?: ResourcesSection;
  className?: string;
  showProfessionalResources?: boolean;
  showCommunityFeatures?: boolean;
}

export interface ResourceModalProps {
  resource: ProfessionalResource | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (resource: ProfessionalResource) => void;
}

export interface ResourceFilterProps {
  categories: ResourceCategory[];
  selectedCategory: string | 'all';
  onCategoryChange: (category: string | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
