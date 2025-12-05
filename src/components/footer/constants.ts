/**
 * Constants for Footer Components
 */

import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Chrome,
  Stethoscope,
  Scale,
  Globe,
  ExternalLink,
  Award,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  Heart,
  Zap
} from 'lucide-react';
import type { FooterData, CompanyInfo, FooterSection, ContactInfo, SocialLink, LegalLink, CertificationBadge } from './types';

// Company Information
export const COMPANY_INFO: CompanyInfo = {
  name: 'InterpreLab',
  tagline: 'Advanced Interpretation',
  description: 'Revolutionizing medical and legal interpretation through advanced AI technology while preserving the essential human element in critical communication.',
  logo: {
    icon: Shield,
    className: 'w-5 h-5 text-white',
  },
  badges: [
    {
      id: 'medical',
      label: 'Medical',
      icon: Stethoscope,
      variant: 'outline',
    },
    {
      id: 'legal',
      label: 'Legal',
      icon: Scale,
      variant: 'outline',
    },
  ],
};

// Footer Sections
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    id: 'services',
    title: 'Services',
    links: [
      {
        id: 'interprebot',
        label: 'InterpreBot',
        href: '/interprebot',
        description: 'AI-powered interpretation assistant',
      },
      {
        id: 'interprecoach',
        label: 'InterpreCoach',
        href: '/interprecoach',
        description: 'Professional training platform',
      },
      {
        id: 'certification',
        label: 'Certification Courses',
        href: '/certification',
        icon: GraduationCap,
        description: 'Professional certification programs',
      },
      {
        id: 'enterprise',
        label: 'Enterprise Solutions',
        href: '/enterprise',
        icon: Building,
        description: 'Custom solutions for organizations',
      },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      {
        id: 'nbcmi',
        label: 'NBCMI',
        href: 'https://www.certifiedmedicalinterpreters.org/',
        external: true,
        description: 'National Board of Certification for Medical Interpreters',
      },
      {
        id: 'cchi',
        label: 'CCHI',
        href: 'https://cchicertification.org/',
        external: true,
        description: 'Certification Commission for Healthcare Interpreters',
      },
      {
        id: 'careers',
        label: 'Careers',
        href: '/careers',
        icon: Users,
        description: 'Join our team',
      },
      {
        id: 'documentation',
        label: 'Documentation',
        href: '/docs',
        icon: BookOpen,
        description: 'API and integration guides',
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      {
        id: 'about',
        label: 'About Us',
        href: '/about',
        description: 'Our mission and story',
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        description: 'Get in touch',
      },
      {
        id: 'blog',
        label: 'Blog',
        href: '/blog',
        description: 'Latest news and insights',
      },
      {
        id: 'press',
        label: 'Press Kit',
        href: '/press',
        description: 'Media resources',
      },
    ],
  },
];

// Contact Information
export const CONTACT_INFO: ContactInfo[] = [
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    value: 'admin.ceo@interprelab.com',
    href: 'mailto:admin.ceo@interprelab.com',
    icon: Mail,
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    icon: Phone,
  },
  {
    id: 'address',
    type: 'address',
    label: 'Address',
    value: 'Houston, Texas',
    icon: MapPin,
  },
  {
    id: 'website',
    type: 'website',
    label: 'Website',
    value: 'www.interprelab.com',
    href: 'https://www.interprelab.com',
    icon: Globe,
  },
];

// Social Media Links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'twitter',
    platform: 'Twitter',
    href: 'https://twitter.com/interprelab',
    icon: Twitter,
    label: 'Follow us on Twitter',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    href: 'https://linkedin.com/company/interprelab',
    icon: Linkedin,
    label: 'Connect on LinkedIn',
  },
  {
    id: 'github',
    platform: 'GitHub',
    href: 'https://github.com/interprelab',
    icon: Github,
    label: 'View our GitHub',
  },
];

// Legal Links
export const LEGAL_LINKS: LegalLink[] = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    href: '/privacy',
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    href: '/terms',
  },
  {
    id: 'security',
    label: 'Security',
    href: '/security',
  },
  {
    id: 'cookies',
    label: 'Cookie Policy',
    href: '/cookies',
  },
];

// Certification Badges
export const CERTIFICATION_BADGES: CertificationBadge[] = [
  {
    id: 'hipaa',
    label: 'HIPAA Compliant',
    icon: Shield,
    variant: 'outline',
    description: 'Health Insurance Portability and Accountability Act compliant',
  },
  {
    id: 'soc2',
    label: 'SOC 2 Type II',
    variant: 'outline',
    description: 'Service Organization Control 2 certified',
  },
  {
    id: 'iso27001',
    label: 'ISO 27001',
    icon: Award,
    variant: 'outline',
    description: 'Information Security Management certified',
  },
  {
    id: 'global',
    label: '50+ Countries',
    icon: Globe,
    variant: 'secondary',
    description: 'Available in over 50 countries worldwide',
  },
];

// Default Footer Data
export const DEFAULT_FOOTER_DATA: FooterData = {
  company: COMPANY_INFO,
  sections: FOOTER_SECTIONS,
  contact: CONTACT_INFO,
  social: SOCIAL_LINKS,
  legal: LEGAL_LINKS,
  certifications: CERTIFICATION_BADGES,
  copyright: '© 2024 InterpreLab. All rights reserved.',
};

// Layout Configurations
export const FOOTER_LAYOUTS = {
  default: {
    columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    spacing: 'gap-8',
  },
  minimal: {
    columns: 'grid-cols-1 md:grid-cols-3',
    spacing: 'gap-6',
  },
  detailed: {
    columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    spacing: 'gap-8',
  },
} as const;

// Animation Delays
export const ANIMATION_DELAYS = {
  section: 100, // ms between each section animation
  link: 50,     // ms between each link animation
  social: 75,   // ms between each social icon animation
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const;
