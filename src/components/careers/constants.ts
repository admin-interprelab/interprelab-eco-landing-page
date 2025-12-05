/**
 * Careers Page Component Constants
 */

import {
  Code,
  Brain,
  Palette,
  Users,
  BarChart3,
  Shield,
  Heart,
  DollarSign,
  Coffee,
  GraduationCap,
  MapPin,
  Clock,
  Laptop,
  Plane
} from 'lucide-react';
import type { JobOpening, Department, CompanyBenefit } from './types';

export const DEFAULT_HERO_CONTENT = {
  title: 'Join Our Mission',
  description: 'Help us revolutionize the interpretation industry with cutting-edge AI technology and make healthcare communication accessible to everyone.',
  stats: {
    openPositions: 12,
    departments: 6,
    employees: 50,
  },
};

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    location: 'Houston, TX',
    department: 'Engineering',
    type: 'full-time',
    level: 'senior',
    description: 'Lead the development of our React-based web applications and help shape the future of interpretation technology.',
    requirements: [
      '5+ years of React/TypeScript experience',
      'Experience with modern frontend tooling (Vite, Tailwind CSS)',
      'Strong understanding of web accessibility',
      'Experience with real-time applications',
      'Knowledge of healthcare/medical software preferred'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Flexible work arrangements',
      'Professional development budget'
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD',
    },
    remote: true,
    featured: true,
    postedDate: new Date('2024-01-15'),
    applicationUrl: 'mailto:careers@interprelab.com',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    location: 'Houston, TX',
    department: 'Engineering',
    type: 'full-time',
    level: 'mid',
    description: 'Develop and improve our AI models for real-time interpretation assistance and quality assessment.',
    requirements: [
      '3+ years of ML/AI experience',
      'Experience with Python, TensorFlow/PyTorch',
      'Knowledge of NLP and speech processing',
      'Experience with cloud ML platforms',
      'Understanding of healthcare data privacy'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Conference and training budget',
      'Research collaboration opportunities'
    ],
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD',
    },
    remote: true,
    featured: true,
    postedDate: new Date('2024-01-10'),
    applicationUrl: 'mailto:careers@interprelab.com',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    location: 'Houston, TX',
    department: 'Product',
    type: 'full-time',
    level: 'mid',
    description: 'Drive product strategy and roadmap for our interpretation platform, working closely with interpreters and healthcare providers.',
    requirements: [
      '3+ years of product management experience',
      'Experience with B2B SaaS products',
      'Understanding of healthcare workflows',
      'Strong analytical and communication skills',
      'Experience with user research and data analysis'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Flexible PTO policy',
      'Product conference attendance'
    ],
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
    },
    remote: true,
    featured: false,
    postedDate: new Date('2024-01-08'),
    applicationUrl: 'mailto:careers@interprelab.com',
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    location: 'Houston, TX',
    department: 'Design',
    type: 'full-time',
    level: 'mid',
    description: 'Design intuitive and accessible interfaces for our interpretation platform, focusing on user experience for interpreters and healthcare providers.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma and design systems',
      'Experience with accessibility design',
      'Understanding of healthcare UX challenges',
      'Portfolio demonstrating complex B2B products'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Design tools and equipment budget',
      'Creative conference attendance'
    ],
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
    },
    remote: true,
    featured: false,
    postedDate: new Date('2024-01-05'),
    applicationUrl: 'mailto:careers@interprelab.com',
  },
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Build the technology that powers the future of interpretation',
    icon: Code,
    color: 'text-blue-500',
    openPositions: 6,
  },
  {
    id: 'ai-research',
    name: 'AI Research',
    description: 'Develop cutting-edge AI models for interpretation assistance',
    icon: Brain,
    color: 'text-purple-500',
    openPositions: 3,
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Create intuitive and accessible user experiences',
    icon: Palette,
    color: 'text-pink-500',
    openPositions: 2,
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Shape the product strategy and roadmap',
    icon: BarChart3,
    color: 'text-green-500',
    openPositions: 2,
  },
  {
    id: 'clinical',
    name: 'Clinical Affairs',
    description: 'Ensure clinical accuracy and compliance',
    icon: Shield,
    color: 'text-red-500',
    openPositions: 1,
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Support our growing team and operations',
    icon: Users,
    color: 'text-orange-500',
    openPositions: 2,
  },
];

export const COMPANY_BENEFITS: CompanyBenefit[] = [
  {
    id: 'health-insurance',
    title: 'Comprehensive Health Insurance',
    description: 'Full medical, dental, and vision coverage for you and your family',
    icon: Heart,
    category: 'health',
  },
  {
    id: 'competitive-salary',
    title: 'Competitive Salary & Equity',
    description: 'Market-rate compensation with equity participation in company growth',
    icon: DollarSign,
    category: 'financial',
  },
  {
    id: 'flexible-work',
    title: 'Flexible Work Arrangements',
    description: 'Remote-first culture with flexible hours and work-life balance',
    icon: Laptop,
    category: 'lifestyle',
  },
  {
    id: 'professional-development',
    title: 'Professional Development',
    description: 'Annual budget for conferences, courses, and skill development',
    icon: GraduationCap,
    category: 'growth',
  },
  {
    id: 'unlimited-pto',
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge and maintain work-life balance',
    icon: Plane,
    category: 'lifestyle',
  },
  {
    id: 'office-perks',
    title: 'Office Perks',
    description: 'Free snacks, coffee, and a collaborative workspace in Houston',
    icon: Coffee,
    category: 'lifestyle',
  },
];

export const JOB_TYPES = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
} as const;

export const JOB_LEVELS = {
  'entry': 'Entry Level',
  'mid': 'Mid Level',
  'senior': 'Senior Level',
  'lead': 'Lead',
  'executive': 'Executive',
} as const;

export const BENEFIT_CATEGORIES = {
  'health': 'Health & Wellness',
  'financial': 'Financial',
  'lifestyle': 'Lifestyle',
  'growth': 'Growth & Development',
} as const;

export const ANIMATION_CONFIG = {
  staggerDelay: 100,
  fadeInDuration: 600,
  slideUpDistance: 20,
} as const;
