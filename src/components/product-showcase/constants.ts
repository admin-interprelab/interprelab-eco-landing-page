import React from 'react';
import { GraduationCap, Chrome, Brain, Sparkles, Eye, Users, Award, TrendingUp } from 'lucide-react';

export interface ProductFeature {
  text: string;
  iconColorClass?: string;
}

export interface ProductBadge {
  text: string;
  className?: string;
}

export interface ProductSpecialization {
  text: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success';
}

export interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBgGradient: string;
  imageSrc: string;
  imageAlt: string;
  imageBadge: ProductBadge;
  imageBadgeBg: string;
  featuresTitle: string;
  features: ProductFeature[];
  specializationsTitle?: string;
  specializations?: ProductSpecialization[];
  buttonText: string;
  buttonHref: string;
  buttonBgGradient: string;
}

export const PRODUCT_DATA: ProductData[] = [
  {
    id: 'interprelab-platform',
    title: 'InterpreLab Platform',
    subtitle: 'Training & Certification Hub',
    icon: <GraduationCap className="w-6 h-6 text-white" />,
    iconBgGradient: 'bg-gradient-primary',
    imageSrc: 'src/assets/tech-background.jpg',
    imageAlt: 'InterpreLab Platform Dashboard',
    imageBadge: { text: 'Training Active' },
    imageBadgeBg: 'bg-primary',
    featuresTitle: 'Core Features:',
    features: [
      { text: 'Continuous Monitoring & Feedback', iconColorClass: 'bg-primary' },
      { text: 'Performance Analytics', iconColorClass: 'bg-primary' },
      { text: 'Personalized Learning Paths', iconColorClass: 'bg-primary' },
      { text: 'Ethics-Grounded Training', iconColorClass: 'bg-primary' },
      { text: 'Certification Preparation', iconColorClass: 'bg-primary' },
    ],
    specializationsTitle: 'Compliance:',
    specializations: [
      { text: 'HIPAA', variant: 'outline' },
      { text: 'SOC 2', variant: 'outline' },
    ],
    buttonText: 'Take the Assessment',
    buttonHref: '/interprebot',
    buttonBgGradient: 'bg-gradient-primary',
  },
  {
    id: 'interprecoach',
    title: 'InterpreCoach',
    subtitle: 'Live Session Assistant',
    icon: <Chrome className="w-6 h-6 text-white" />,
    iconBgGradient: 'bg-gradient-success',
    imageSrc: 'src/assets/extension-preview.jpg',
    imageAlt: 'InterpreCoach Extension Preview',
    imageBadge: { text: 'Live Recording' },
    imageBadgeBg: 'bg-success',
    featuresTitle: 'Live Features:',
    features: [
      { text: 'Browser Integration', iconColorClass: 'bg-success' },
      { text: 'Real-time Speech-to-Text', iconColorClass: 'bg-success' },
      { text: 'Multi-Agent Processing', iconColorClass: 'bg-success' },
      { text: 'Context Windows', iconColorClass: 'bg-success' },
      { text: 'QA & Ethics Feedback', iconColorClass: 'bg-success' },
    ],
    specializationsTitle: 'Specializations:',
    specializations: [
      { text: 'Medical', variant: 'outline' },
      { text: 'Legal', variant: 'outline' },
    ],
    buttonText: 'Meet InterpreCoach',
    buttonHref: '/interprecoach',
    buttonBgGradient: 'bg-gradient-success',
  },
  {
    id: 'interprebot',
    title: 'InterpreBot',
    subtitle: 'Personal AI Analyst',
    icon: (
      <div className="relative">
        <Brain className="w-6 h-6 text-white animate-pulse" />
        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    ),
    iconBgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    imageSrc: '', // Complex 3D scene, will be rendered directly in component
    imageAlt: 'InterpreBot AI Analyst',
    imageBadge: { text: 'AI Analysis Active' },
    imageBadgeBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
    featuresTitle: 'Analysis Capabilities:',
    features: [
      { text: 'Voice Control & Clarity', iconColorClass: 'bg-purple-500' },
      { text: 'Grammar & Syntax Analysis', iconColorClass: 'bg-purple-500' },
      { text: 'Vocabulary Assessment', iconColorClass: 'bg-purple-500' },
      { text: 'Ethical Decision-Making', iconColorClass: 'bg-purple-500' },
      { text: 'Personalized Learning Paths', iconColorClass: 'bg-purple-500' },
    ],
    specializationsTitle: 'Detection:',
    specializations: [
      { text: 'Hesitations', variant: 'outline' },
      { text: 'Tone Issues', variant: 'outline' },
      { text: 'Pacing', variant: 'outline' },
    ],
    buttonText: 'Find out more',
    buttonHref: '/interprebot',
    buttonBgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
];

export interface BusinessModelTier {
  title: string;
  description: string;
  badge: ProductBadge;
  badgeBgClass?: string;
  cardBorderClass?: string;
}

export const BUSINESS_MODEL_TIERS: BusinessModelTier[] = [
  {
    title: 'Free Tier',
    description: 'Basic features with limited usage',
    badge: { text: 'Perfect for Students' },
    badgeBgClass: 'bg-primary text-primary-foreground',
    cardBorderClass: 'border-border/50',
  },
  {
    title: 'Professional',
    description: 'Advanced features for working interpreters',
    badge: { text: 'Most Popular' },
    badgeBgClass: 'bg-primary text-primary-foreground',
    cardBorderClass: 'border-primary/50',
  },
  {
    title: 'Enterprise',
    description: 'Custom solutions for organizations',
    badge: { text: 'White Glove Support' },
    badgeBgClass: 'bg-primary text-primary-foreground',
    cardBorderClass: 'border-border/50',
  },
];

export interface IntegrationCTAData {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export const INTEGRATION_CTA_DATA: IntegrationCTAData = {
  title: 'Ready to Transform Your Interpretation Practice?',
  description: 'Join thousands of interpreters who trust InterpreLab\'s AI-powered ecosystem for training, live assistance, and continuous improvement.',
  primaryButton: {
    text: 'Join the waitlist',
    href: '/interprecoach',
  },
  secondaryButton: {
    text: 'Find out more',
    href: '/contact',
  },
};

export interface StatData {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const INTERPRELAB_HERO_STATS: StatData[] = [
  {
    label: "Active Interpreters",
    value: "10,000+",
    icon: <Users className="h-8 w-8 text-blue-400" />
  },
  {
    label: "Training Modules",
    value: "500+",
    icon: <Award className="h-8 w-8 text-green-400" />
  },
  {
    label: "Success Rate",
    value: "95%",
    icon: <TrendingUp className="h-8 w-8 text-yellow-400" />
  }
];
