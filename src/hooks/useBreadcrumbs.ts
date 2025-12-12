import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { BreadcrumbItem } from '@/types/navigation';

// Route mapping for generating breadcrumbs
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/interprebot': 'InterpreBot',
  '/interprecoach': 'InterpreCoach',
  '/interprestudy': 'InterpreStudy',
  '/interpretrack': 'InterpreTrack',
  '/interprelink': 'InterpreLink',
  '/dashboard': 'Dashboard',
  '/settings': 'Settings',
  '/resources': 'Resources',
  '/about': 'About',
  '/contact': 'Contact',
  '/signin': 'Sign In',
  '/waitlist': 'Waitlist',
  '/get-in-touch': 'Get In Touch',
  '/careers': 'Careers',
};

// Route categories for better organization
const routeCategories: Record<string, string> = {
  '/interprebot': 'Solutions',
  '/interprecoach': 'Solutions',
  '/interprestudy': 'Solutions',
  '/interpretrack': 'Solutions',
  '/interprelink': 'Solutions',
};

// Route descriptions for context
const routeDescriptions: Record<string, string> = {
  '/interprebot': 'AI-powered interpretation assessment',
  '/interprecoach': 'Personalized coaching sessions',
  '/interprestudy': 'Interactive study materials',
  '/interpretrack': 'Progress tracking and analytics',
  '/interprelink': 'Connect with professional interpreters',
  '/dashboard': 'Your personal dashboard',
  '/settings': 'Account and preferences',
  '/resources': 'Learning resources and materials',
};

export const useBreadcrumbs = (customBreadcrumbs?: BreadcrumbItem[]) => {
  const location = useLocation();

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Add home if not on home page
    if (location.pathname !== '/') {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
      });
    }

    // Add category if applicable
    const currentPath = location.pathname;
    const category = routeCategories[currentPath];
    if (category && !breadcrumbs.some(b => b.label === category)) {
      breadcrumbs.push({
        label: category,
      });
    }

    // Add current page
    if (currentPath !== '/') {
      const currentLabel = routeLabels[currentPath] ||
        pathSegments[pathSegments.length - 1]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      if (currentLabel) {
        breadcrumbs.push({
          label: currentLabel,
          isActive: true,
        });
      }
    }

    return breadcrumbs;
  }, [location.pathname, customBreadcrumbs]);

  const currentPageInfo = useMemo(() => {
    const currentPath = location.pathname;
    return {
      title: routeLabels[currentPath] || 'Page',
      description: routeDescriptions[currentPath],
      category: routeCategories[currentPath],
    };
  }, [location.pathname]);

  return {
    breadcrumbs,
    currentPageInfo,
    shouldShowBreadcrumbs: breadcrumbs.length > 1 || location.pathname !== '/',
  };
};
