/**
 * Navigation Component Constants
 */

import { Shield, Bot, BookOpen, BarChart3, Users, Phone, Mail, FileText, Info } from 'lucide-react';
import type { NavItem } from './types';

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: 'Solutions',
    submenu: [
      {
        label: 'InterpreBot',
        href: '/interprebot',
        description: 'AI-powered assessment tool',
        icon: Bot,
      },
      {
        label: 'InterpreCoach',
        href: '/interprecoach',
        description: 'Personalized AI coaching',
        icon: BookOpen,
      },
      {
        label: 'InterpreTrack',
        href: '/interpretrack',
        description: 'Performance tracking',
        icon: BarChart3,
      },
      {
        label: 'InterpreLink',
        href: '/interprelink',
        description: 'Community platform',
        icon: Users,
      },
    ]
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: FileText,
  },
  {
    label: 'About',
    href: '/about',
    icon: Info,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Phone,
  },
];

export const LOGO_CONFIG = {
  name: 'InterpreLab',
  tagline: 'Advanced Interpretation',
  icon: Shield,
};

export const AUTH_ROUTES = {
  signIn: '/signin',
  signUp: '/signup',
  dashboard: '/dashboard',
  settings: '/settings',
  waitlist: '/waitlist',
} as const;

export const NAVIGATION_VARIANTS = {
  default: 'fixed top-0 left-0 right-0 z-50 glass border-b border-border/50',
  minimal: 'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/30',
  transparent: 'fixed top-0 left-0 right-0 z-50 bg-transparent',
} as const;

export const MOBILE_BREAKPOINT = 768;

export const ANIMATION_CONFIG = {
  duration: 200,
  easing: 'ease-in-out',
  staggerDelay: 50,
} as const;

export const Z_INDEX = {
  navigation: 50,
  mobileMenu: 51,
  dropdown: 52,
} as const;
