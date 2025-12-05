/**
 * About Page Component Constants
 */

import { Target, Heart, Globe, Award, MapPin, Users } from 'lucide-react';
import type { CompanyValue, TeamMember, CompanyStat } from './types';

export const DEFAULT_HERO_CONTENT = {
  badge: 'Our Story',
  title: 'About InterpreLab',
  description: 'Founded by interpreters, for interpreters. We\'re on a mission to revolutionize the interpretation industry through innovative AI technology and comprehensive professional development.',
  location: 'Houston, Texas',
  teamSize: '50+ Team Members',
};

export const DEFAULT_MISSION = 'To empower interpreters worldwide with cutting-edge AI technology that enhances their skills, improves accuracy, and ensures equitable access to essential services across language barriers.';

export const DEFAULT_VISION = 'A world where language is never a barrier to accessing healthcare, justice, education, or any essential service, powered by the perfect collaboration between human expertise and artificial intelligence.';

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'precision',
    icon: Target,
    title: 'Precision',
    description: 'We believe every word matters in interpretation, and our technology reflects this commitment to accuracy.',
  },
  {
    id: 'empathy',
    icon: Heart,
    title: 'Empathy',
    description: 'Understanding the human element in communication drives everything we build and every decision we make.',
  },
  {
    id: 'accessibility',
    icon: Globe,
    title: 'Accessibility',
    description: 'Breaking down language barriers to make essential services accessible to everyone, everywhere.',
  },
  {
    id: 'excellence',
    icon: Award,
    title: 'Excellence',
    description: 'Continuous improvement and innovation in interpretation technology and professional development.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'maria-rodriguez',
    name: 'Dr. Maria Rodriguez',
    role: 'Founder & CEO',
    background: 'Former court interpreter with 15+ years experience, PhD in Applied Linguistics',
    specialization: 'AI in Language Processing',
    initials: 'MR',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'CTO',
    background: 'Former Google engineer, expert in machine learning and natural language processing',
    specialization: 'AI Architecture',
    initials: 'DC',
  },
  {
    id: 'sarah-ahmed',
    name: 'Sarah Ahmed',
    role: 'Head of Clinical Affairs',
    background: 'Certified medical interpreter, healthcare administration background',
    specialization: 'Healthcare Interpretation',
    initials: 'SA',
  },
  {
    id: 'carlos-mendoza',
    name: 'Carlos Mendoza',
    role: 'Director of Training',
    background: 'Conference interpreter, former training director at major interpretation agency',
    specialization: 'Professional Development',
    initials: 'CM',
  },
];

export const COMPANY_STATS: CompanyStat[] = [
  {
    id: 'interpreters-trained',
    value: '10,000+',
    label: 'Interpreters Trained',
    description: 'Professional interpreters who have used our platform',
  },
  {
    id: 'language-pairs',
    value: '50+',
    label: 'Language Pairs',
    description: 'Supported language combinations',
  },
  {
    id: 'accuracy-improvement',
    value: '95%',
    label: 'Accuracy Improvement',
    description: 'Average improvement in interpretation accuracy',
  },
  {
    id: 'support-availability',
    value: '24/7',
    label: 'Support Available',
    description: 'Round-the-clock customer support',
  },
];

export const DEFAULT_CTA = {
  title: 'Join Our Mission',
  description: 'Whether you\'re an interpreter looking to enhance your skills or an organization seeking interpretation services, we\'re here to help.',
  primaryAction: {
    text: 'Get in Touch',
    href: '/contact',
  },
  secondaryAction: {
    text: 'Join the Waitlist',
    href: '/waitlist',
  },
};

export const HERO_IMAGE = {
  src: '/src/assets/hero-interprelab.jpg',
  alt: 'InterpreLab Team',
};

export const ANIMATION_CONFIG = {
  staggerDelay: 100,
  fadeInDuration: 600,
  slideUpDistance: 20,
} as const;
