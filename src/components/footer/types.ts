/**
 * Types for Footer Components
 */

import type { LucideIcon } from 'lucide-react';

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
  badge?: string;
  description?: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
  className?: string;
}

export interface ContactInfo {
  id: string;
  type: 'email' | 'phone' | 'address' | 'website';
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon: LucideIcon;
  label: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo?: {
    icon: LucideIcon;
    className?: string;
  };
  badges?: Array<{
    id: string;
    label: string;
    icon?: LucideIcon;
    variant?: 'default' | 'secondary' | 'outline';
  }>;
}

export interface LegalLink {
  id: string;
  label: string;
  href: string;
}

export interface CertificationBadge {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: 'default' | 'secondary' | 'outline';
  description?: string;
}

export interface FooterData {
  company: CompanyInfo;
  sections: FooterSection[];
  contact: ContactInfo[];
  social: SocialLink[];
  legal: LegalLink[];
  certifications: CertificationBadge[];
  copyright: string;
}

export interface FooterProps {
  data?: FooterData;
  className?: string;
  showCertifications?: boolean;
  showSocial?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
}

export interface FooterSectionProps {
  section: FooterSection;
  className?: string;
}

export interface FooterContactProps {
  contact: ContactInfo[];
  social: SocialLink[];
  className?: string;
}

export interface FooterBottomProps {
  copyright: string;
  legal: LegalLink[];
  certifications: CertificationBadge[];
  showCertifications?: boolean;
  className?: string;
}

export interface FooterCompanyProps {
  company: CompanyInfo;
  className?: string;
}
