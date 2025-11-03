/**
 * Constants for Resources Components
 */

import {
  Play,
  Users,
  BookOpen,
  Scale,
  Network,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
  Shield,
  GraduationCap,
  Globe,
  Heart,
  Award,
  Building,
  Stethoscope,
  Languages,
  MessageSquare,
  Calendar,
  Search
} from 'lucide-react';
import type { ResourcesSection, ResourceCategory, ProfessionalResource, CommunityFeature } from './types';

// Resource Categories
export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'training-videos',
    title: 'Training Videos & Mock Scenarios',
    description: 'Comprehensive library with realistic medical interpreting encounters and AI-powered feedback',
    icon: Play,
    color: 'bg-gradient-primary',
    items: [
      {
        id: 'medical-terminology',
        title: 'Medical Terminology Mastery',
        description: 'Interactive video lessons covering essential medical vocabulary',
        type: 'internal',
        isNew: true,
      },
      {
        id: 'patient-communication',
        title: 'Patient Communication',
        description: 'Real-world scenarios for effective patient interaction',
        type: 'internal',
      },
      {
        id: 'emergency-procedures',
        title: 'Emergency Procedures',
        description: 'Critical care interpretation protocols and procedures',
        type: 'internal',
        isPremium: true,
      },
      {
        id: 'cultural-context',
        title: 'Cultural Context Training',
        description: 'Understanding cultural nuances in healthcare settings',
        type: 'internal',
      },
    ],
    featured: true,
  },
  {
    id: 'certification-courses',
    title: 'Certification-Ready Courses',
    description: '40-60 hour NBCMI & CCHI approved courses for certification preparation',
    icon: GraduationCap,
    color: 'bg-gradient-success',
    items: [
      {
        id: 'nbcmi-prep',
        title: 'NBCMI Preparation',
        description: 'Complete preparation course for NBCMI certification',
        type: 'internal',
        isPremium: true,
      },
      {
        id: 'cchi-prerequisites',
        title: 'CCHI Prerequisites',
        description: 'Foundation courses required for CCHI certification',
        type: 'internal',
      },
      {
        id: 'written-exam',
        title: 'Written Exam Readiness',
        description: 'Practice tests and exam strategies',
        type: 'internal',
      },
      {
        id: 'professional-standards',
        title: 'Professional Standards',
        description: 'Ethics and professional conduct training',
        type: 'internal',
      },
    ],
  },
  {
    id: 'ai-analysis',
    title: 'AI-Driven Analysis Features',
    description: 'Advanced linguistic analysis with personalized insights and performance tracking',
    icon: BookOpen,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    items: [
      {
        id: 'performance-dashboard',
        title: 'Deep Performance Dashboard',
        description: 'Comprehensive analytics of your interpretation skills',
        type: 'internal',
        isNew: true,
      },
      {
        id: 'weakness-identification',
        title: 'Weakness Identification',
        description: 'AI-powered analysis of areas needing improvement',
        type: 'internal',
      },
      {
        id: 'learning-path',
        title: 'Learning Path Generation',
        description: 'Personalized study plans based on your performance',
        type: 'internal',
        isPremium: true,
      },
      {
        id: 'progress-analytics',
        title: 'Progress Analytics',
        description: 'Track your improvement over time with detailed metrics',
        type: 'internal',
      },
    ],
  },
  {
    id: 'legal-ethics',
    title: 'Legal References & Ethics',
    description: 'Comprehensive legal framework and ethical guidelines for professional interpreters',
    icon: Scale,
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    items: [
      {
        id: 'hipaa-compliance',
        title: 'HIPAA Compliance',
        description: 'Healthcare privacy regulations for interpreters',
        type: 'internal',
      },
      {
        id: 'court-procedures',
        title: 'Court Procedures',
        description: 'Legal interpretation protocols and procedures',
        type: 'internal',
      },
      {
        id: 'professional-ethics',
        title: 'Professional Ethics',
        description: 'Ethical guidelines and professional conduct',
        type: 'internal',
      },
      {
        id: 'legal-documentation',
        title: 'Legal Documentation',
        description: 'Required forms and legal documentation',
        type: 'internal',
      },
    ],
  },
];

// Professional Resources (External Links)
export const PROFESSIONAL_RESOURCES: ProfessionalResource[] = [
  {
    id: 'imia-code-ethics',
    title: 'IMIA Code of Ethics',
    organization: 'International Medical Interpreters Association',
    description: 'Comprehensive ethical guidelines for medical interpreters worldwide',
    url: 'https://www.imiaweb.org/code-of-ethics.asp',
    downloadUrl: 'https://www.imiaweb.org/uploads/pages/376.pdf',
    type: 'ethics',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-01-15'),
  },
  {
    id: 'ncihc-standards',
    title: 'NCIHC Standards of Practice',
    organization: 'National Council on Interpreting in Health Care',
    description: 'National standards for healthcare interpreting practice and professional conduct',
    url: 'https://www.ncihc.org/standards-of-practice',
    downloadUrl: 'https://www.ncihc.org/assets/documents/publications/NCIHC%20Standards%20of%20Practice.pdf',
    type: 'standards',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-03-20'),
  },
  {
    id: 'nbcmi-certification',
    title: 'NBCMI Certification Guide',
    organization: 'National Board of Certification for Medical Interpreters',
    description: 'Complete guide to medical interpreter certification requirements and process',
    url: 'https://www.certifiedmedicalinterpreters.org/certification',
    downloadUrl: 'https://www.certifiedmedicalinterpreters.org/candidate-handbook.pdf',
    type: 'certification',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-06-10'),
  },
  {
    id: 'cchi-standards',
    title: 'CCHI Standards and Certification',
    organization: 'Certification Commission for Healthcare Interpreters',
    description: 'Healthcare interpreter certification standards and requirements',
    url: 'https://cchicertification.org/certifications/healthcare-interpreter-certification/',
    downloadUrl: 'https://cchicertification.org/wp-content/uploads/CHI-Candidate-Handbook.pdf',
    type: 'certification',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-05-15'),
  },
  {
    id: 'ata-guidelines',
    title: 'ATA Interpreter Guidelines',
    organization: 'American Translators Association',
    description: 'Professional guidelines for translators and interpreters',
    url: 'https://www.atanet.org/certification/aboutcert_overview.php',
    type: 'guidelines',
    fileFormat: 'html',
    isOfficial: true,
    lastUpdated: new Date('2023-04-01'),
  },
  {
    id: 'hhs-language-access',
    title: 'HHS Language Access Plan',
    organization: 'U.S. Department of Health and Human Services',
    description: 'Federal guidelines for language access in healthcare settings',
    url: 'https://www.hhs.gov/civil-rights/for-individuals/language-assistance/index.html',
    downloadUrl: 'https://www.hhs.gov/sites/default/files/hhs-language-access-plan.pdf',
    type: 'legal',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-02-28'),
  },
  {
    id: 'joint-commission-standards',
    title: 'Joint Commission Language Standards',
    organization: 'The Joint Commission',
    description: 'Hospital accreditation standards for language services and interpreter qualifications',
    url: 'https://www.jointcommission.org/standards/standard-faqs/hospital/patient-centered-communication-pc/000001793/',
    type: 'standards',
    fileFormat: 'html',
    isOfficial: true,
    lastUpdated: new Date('2023-07-12'),
  },
  {
    id: 'cms-interpreter-services',
    title: 'CMS Interpreter Services Guidelines',
    organization: 'Centers for Medicare & Medicaid Services',
    description: 'Federal guidelines for interpreter services in Medicare and Medicaid programs',
    url: 'https://www.cms.gov/about-cms/agency-information/omh/equity-initiatives/language-access-plan',
    type: 'legal',
    fileFormat: 'html',
    isOfficial: true,
    lastUpdated: new Date('2023-08-05'),
  },
  {
    id: 'chia-best-practices',
    title: 'CHIA Best Practices',
    organization: 'California Healthcare Interpreting Association',
    description: 'Best practices for healthcare interpreting in California',
    url: 'https://www.chiaonline.org/best-practices',
    type: 'guidelines',
    fileFormat: 'html',
    isOfficial: true,
    lastUpdated: new Date('2023-03-10'),
  },
  {
    id: 'interpreting-ethics-handbook',
    title: 'Interpreting Ethics Handbook',
    organization: 'Registry of Interpreters for the Deaf',
    description: 'Comprehensive ethics handbook applicable to all interpreting fields',
    url: 'https://rid.org/ethics/',
    downloadUrl: 'https://rid.org/wp-content/uploads/2021/03/RID-Code-of-Professional-Conduct.pdf',
    type: 'ethics',
    fileFormat: 'pdf',
    isOfficial: true,
    lastUpdated: new Date('2023-01-20'),
  },
];

// Community Features
export const COMMUNITY_FEATURES: CommunityFeature[] = [
  {
    id: 'community-wall',
    title: 'Community Wall',
    description: 'Share field experiences, ask questions, and learn from fellow interpreters worldwide',
    icon: MessageSquare,
    color: 'text-primary',
    action: {
      label: 'Join Discussion',
      href: '/community/wall',
      type: 'internal',
    },
  },
  {
    id: 'job-opportunities',
    title: 'Job Opportunities',
    description: 'Stay updated on the latest interpreter positions and contract opportunities',
    icon: Briefcase,
    color: 'text-success',
    action: {
      label: 'View Jobs',
      href: '/jobs',
      type: 'internal',
    },
  },
  {
    id: 'mentorship-program',
    title: 'Mentorship Program',
    description: 'Connect with experienced interpreters for guidance and professional development',
    icon: Users,
    color: 'text-warning',
    action: {
      label: 'Find Mentor',
      href: '/mentorship',
      type: 'internal',
    },
  },
  {
    id: 'events-calendar',
    title: 'Events & Webinars',
    description: 'Professional development events, conferences, and educational webinars',
    icon: Calendar,
    color: 'text-secondary',
    action: {
      label: 'View Events',
      href: '/events',
      type: 'internal',
    },
  },
];

// Default Resources Section
export const DEFAULT_RESOURCES_SECTION: ResourcesSection = {
  id: 'professional-resources',
  title: 'Professional Development Ecosystem',
  subtitle: 'Comprehensive Resources & Community',
  description: 'From certification-ready training courses to AI-driven linguistic analysis features and a dedicated interpreter community platform - everything you need for professional excellence.',
  badge: 'Comprehensive Resources & Community',
  backgroundImage: '/src/assets/tech-background.jpg',
  categories: RESOURCE_CATEGORIES,
  professionalResources: PROFESSIONAL_RESOURCES,
  communityFeatures: COMMUNITY_FEATURES,
};

// Animation Configurations
export const ANIMATION_CONFIG = {
  staggerDelay: 100, // ms between each card animation
  fadeInDuration: 600, // ms for fade-in animations
  hoverTransition: 200, // ms for hover transitions
} as const;

// Resource Types Configuration
export const RESOURCE_TYPE_CONFIG = {
  ethics: {
    label: 'Ethics',
    color: 'bg-red-500/10 text-red-700 dark:text-red-300',
    icon: Heart,
  },
  standards: {
    label: 'Standards',
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
    icon: Award,
  },
  guidelines: {
    label: 'Guidelines',
    color: 'bg-green-500/10 text-green-700 dark:text-green-300',
    icon: FileText,
  },
  certification: {
    label: 'Certification',
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
    icon: GraduationCap,
  },
  legal: {
    label: 'Legal',
    color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
    icon: Scale,
  },
  training: {
    label: 'Training',
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
    icon: BookOpen,
  },
} as const;

// File Format Icons
export const FILE_FORMAT_ICONS = {
  pdf: FileText,
  doc: FileText,
  html: Globe,
  video: Play,
} as const;
