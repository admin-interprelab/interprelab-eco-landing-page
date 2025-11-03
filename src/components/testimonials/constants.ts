/**
 * Testimonials Component Constants
 */

import type { Testimonial } from './types';

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'maria-rodriguez',
    name: "Dr. Maria Rodriguez",
    role: "Medical Interpreter",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e2c5?w=150&h=150&fit=crop&crop=face",
    quote: "InterpreLab transformed my practice. The real-time feedback from InterpreCoach during live sessions has improved my accuracy by 40%. It's like having a mentor always with me.",
    rating: 5,
    specialty: "Medical",
    verified: true,
    featured: true,
  },
  {
    id: 'carlos-mendez',
    name: "Carlos Mendez",
    role: "Court Interpreter",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "The ethics training and cultural context features are game-changers. InterpreBot's analysis helped me identify blind spots I never knew I had.",
    rating: 5,
    specialty: "Legal",
    verified: true,
  },
  {
    id: 'sarah-chen',
    name: "Sarah Chen",
    role: "Healthcare Interpreter Manager",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "We've trained over 200 interpreters using InterpreLab. The personalized learning paths and comprehensive analytics have revolutionized our training program.",
    rating: 5,
    specialty: "Training",
    verified: true,
    featured: true,
  },
  {
    id: 'ahmed-hassan',
    name: "Ahmed Hassan",
    role: "Freelance Medical Interpreter",
    location: "Houston, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The multilingual dictionaries and terminology detection saved my career. I can now confidently handle complex medical procedures in three languages.",
    rating: 5,
    specialty: "Medical",
    verified: true,
  },
  {
    id: 'lisa-thompson',
    name: "Lisa Thompson",
    role: "Legal Interpretation Coordinator",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    quote: "InterpreLab's compliance features ensure our interpreters meet all legal standards. The HIPAA training module alone is worth the subscription.",
    rating: 5,
    specialty: "Legal",
    verified: true,
  },
  {
    id: 'roberto-silva',
    name: "Roberto Silva",
    role: "Community Health Interpreter",
    location: "Phoenix, AZ",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "The InterpreterHub community has been incredible. I've connected with interpreters worldwide and landed three new contracts through the platform.",
    rating: 5,
    specialty: "Community",
    verified: true,
  },
];

export const DEFAULT_HEADER = {
  badge: 'Testimonials',
  title: 'Loved by Interpreters',
  subtitle: 'Interpreters',
  description: 'Join thousands of professionals who\'ve transformed their practice.',
};

export const SPECIALTY_COLORS = {
  Medical: 'bg-gradient-primary',
  Legal: 'bg-gradient-success',
  Training: 'bg-gradient-to-r from-purple-500 to-pink-500',
  Community: 'bg-gradient-to-r from-orange-500 to-red-500',
  Healthcare: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  Business: 'bg-gradient-to-r from-green-500 to-teal-500',
  Education: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  Government: 'bg-gradient-to-r from-gray-500 to-slate-500',
} as const;

export const RATING_COLORS = {
  1: 'text-destructive',
  2: 'text-orange-500',
  3: 'text-yellow-500',
  4: 'text-warning',
  5: 'text-warning',
} as const;

export const ANIMATION_CONFIG = {
  autoPlayInterval: 4000,
  transitionDuration: 500,
  fadeInDelay: 100,
  staggerDelay: 150,
} as const;

export const CAROUSEL_CONFIG = {
  itemsPerView: 1,
  gap: 16,
  loop: true,
  autoPlay: true,
  pauseOnHover: true,
  showDots: true,
  showNavigation: false,
} as const;

export const CARD_VARIANTS = {
  default: 'glass border-border/30 hover-lift',
  compact: 'glass border-border/20 hover:shadow-md',
  detailed: 'glass border-border/40 hover:shadow-xl hover:-translate-y-2',
  minimal: 'border border-border/20 bg-card/50 hover:bg-card/70',
} as const;
