/**
 * Navigation Component Utilities
 */

import type { NavItem, NavSubItem } from './types';
import { NAVIGATION_VARIANTS } from './constants';

/**
 * Get navigation variant classes
 */
export const getNavigationVariantClasses = (variant: 'default' | 'minimal' | 'transparent'): string => {
  return NAVIGATION_VARIANTS[variant];
};

/**
 * Check if navigation item is active
 */
export const isNavItemActive = (item: NavItem | NavSubItem, currentPath: string): boolean => {
  if (item.href === currentPath) return true;

  // Check if current path starts with item href (for nested routes)
  if (item.href && currentPath.startsWith(item.href) && item.href !== '/') {
    return true;
  }

  // Check submenu items
  if ('submenu' in item && item.submenu) {
    return item.submenu.some(subItem => isNavItemActive(subItem, currentPath));
  }

  return false;
};

/**
 * Get active navigation item
 */
export const getActiveNavItem = (items: NavItem[], currentPath: string): NavItem | NavSubItem | null => {
  for (const item of items) {
    if (isNavItemActive(item, currentPath)) {
      if (item.submenu) {
        const activeSubItem = item.submenu.find(subItem => isNavItemActive(subItem, currentPath));
        return activeSubItem || item;
      }
      return item;
    }
  }
  return null;
};

/**
 * Filter navigation items by criteria
 */
export const filterNavItems = (
  items: NavItem[],
  criteria: {
    showDisabled?: boolean;
    hasSubmenu?: boolean;
    external?: boolean;
  } = {}
): NavItem[] => {
  return items.filter(item => {
    if (criteria.showDisabled === false && item.disabled) return false;
    if (criteria.hasSubmenu !== undefined && Boolean(item.submenu) !== criteria.hasSubmenu) return false;
    if (criteria.external !== undefined && Boolean(item.external) !== criteria.external) return false;
    return true;
  });
};

/**
 * Get navigation item by href
 */
export const getNavItemByHref = (items: NavItem[], href: string): NavItem | NavSubItem | null => {
  for (const item of items) {
    if (item.href === href) return item;

    if (item.submenu) {
      const subItem = item.submenu.find(sub => sub.href === href);
      if (subItem) return subItem;
    }
  }
  return null;
};

/**
 * Validate navigation item
 */
export const validateNavItem = (item: Partial<NavItem>): boolean => {
  return Boolean(
    item.label &&
    (item.href || item.submenu)
  );
};

/**
 * Generate navigation analytics data
 */
export const generateNavAnalytics = (item: NavItem | NavSubItem, context: 'desktop' | 'mobile' = 'desktop') => {
  return {
    event: 'nav_item_clicked',
    item_label: item.label,
    item_href: item.href,
    context,
    has_submenu: 'submenu' in item && Boolean(item.submenu),
    is_external: Boolean(item.external),
  };
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Get navigation item depth
 */
export const getNavItemDepth = (items: NavItem[], targetHref: string): number => {
  for (const item of items) {
    if (item.href === targetHref) return 1;

    if (item.submenu) {
      const subItem = item.submenu.find(sub => sub.href === targetHref);
      if (subItem) return 2;
    }
  }
  return 0;
};

/**
 * Flatten navigation items
 */
export const flattenNavItems = (items: NavItem[]): (NavItem | NavSubItem)[] => {
  const flattened: (NavItem | NavSubItem)[] = [];

  items.forEach(item => {
    flattened.push(item);
    if (item.submenu) {
      flattened.push(...item.submenu);
    }
  });

  return flattened;
};

/**
 * Get navigation breadcrumbs
 */
export const getNavBreadcrumbs = (items: NavItem[], currentPath: string): (NavItem | NavSubItem)[] => {
  const breadcrumbs: (NavItem | NavSubItem)[] = [];

  for (const item of items) {
    if (item.href === currentPath) {
      breadcrumbs.push(item);
      break;
    }

    if (item.submenu) {
      const subItem = item.submenu.find(sub => sub.href === currentPath);
      if (subItem) {
        breadcrumbs.push(item, subItem);
        break;
      }
    }
  }

  return breadcrumbs;
};

/**
 * Sort navigation items
 */
export const sortNavItems = (
  items: NavItem[],
  sortBy: 'label' | 'order' | 'href' = 'label'
): NavItem[] => {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'label':
        return a.label.localeCompare(b.label);
      case 'href':
        const aHref = a.href || '';
        const bHref = b.href || '';
        return aHref.localeCompare(bHref);
      case 'order':
      default:
        return 0; // Maintain original order
    }
  });
};

/**
 * Check if navigation item has badge
 */
export const hasNavItemBadge = (item: NavItem | NavSubItem): boolean => {
  return Boolean(item.badge);
};

/**
 * Get navigation item display text
 */
export const getNavItemDisplayText = (item: NavItem | NavSubItem): string => {
  return item.badge ? `${item.label} ${item.badge}` : item.label;
};

/**
 * Check if navigation should be sticky
 */
export const shouldNavigationBeSticky = (scrollY: number, threshold: number = 100): boolean => {
  return scrollY > threshold;
};

/**
 * Debounce function for navigation interactions
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
