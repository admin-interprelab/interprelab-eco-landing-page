/**
 * Careers Page Component Types
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  remote: boolean;
  featured: boolean;
  postedDate: Date;
  applicationDeadline?: Date;
  applicationUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  openPositions: number;
}

export interface CompanyBenefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'health' | 'financial' | 'lifestyle' | 'growth';
}

export interface CareersHeroProps {
  className?: string;
  title?: string;
  description?: string;
  showStats?: boolean;
  customStats?: {
    openPositions: number;
    departments: number;
    employees: number;
  };
}

export interface JobListingsProps {
  className?: string;
  jobs?: JobOpening[];
  departments?: Department[];
  showFilters?: boolean;
  showSearch?: boolean;
  onJobClick?: (job: JobOpening) => void;
  onApplyClick?: (job: JobOpening) => void;
}

export interface JobCardProps {
  job: JobOpening;
  onJobClick?: (job: JobOpening) => void;
  onApplyClick?: (job: JobOpening) => void;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export interface JobFiltersProps {
  className?: string;
  departments: Department[];
  selectedDepartment: string;
  selectedType: string;
  selectedLevel: string;
  remoteOnly: boolean;
  onDepartmentChange: (department: string) => void;
  onTypeChange: (type: string) => void;
  onLevelChange: (level: string) => void;
  onRemoteToggle: (remote: boolean) => void;
  onClearFilters: () => void;
}

export interface CompanyBenefitsProps {
  className?: string;
  benefits?: CompanyBenefit[];
  title?: string;
  description?: string;
}

export interface DepartmentGridProps {
  className?: string;
  departments?: Department[];
  onDepartmentClick?: (department: Department) => void;
}

export interface CareersPageProps {
  className?: string;
  customContent?: {
    hero?: CareersHeroProps;
    jobs?: JobOpening[];
    departments?: Department[];
    benefits?: CompanyBenefit[];
  };
  onJobApply?: (job: JobOpening) => void;
  onJobView?: (job: JobOpening) => void;
}
