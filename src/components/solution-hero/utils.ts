/**
 * Solution Hero Component Utilities
 */

import type { SolutionItem } from './types';
import { SOLUTION_COLORS, TRUST_INDICATOR_COLORS, ANIMATION_CONFIG } from './constants';

/**
 * Get solution card classes based on variant and state
 */
export const getSolutionCardClasses = (
  variant: 'default' | 'elevated' | 'outlined' | 'solid' = 'default',
  isHovered: boolean = false,
  className: string = ''
): string => {
  const baseClasses = 'group transition-all duration-300 cursor-pointer';

  const variantClasses = {
    default: 'glass border-primary/20 hover:shadow-glow hover:-translate-y-1',
    elevated: 'glass border-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-2',
    outlined: 'border-2 border-primary/40 bg-card/50 hover:border-primary/60 hover:bg-card/70',
    solid: 'bg-card border-border hover:shadow-md hover:-translate-y-1',
  };

  const hoverClasses = isHovered ? 'shadow-glow -translate-y-1' : '';

  return `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`.trim();
};

/**
 * Get solution icon color classes
 */
export const getSolutionIconColor = (color: string): string => {
  return SOLUTION_COLORS[color as keyof typeof SOLUTION_COLORS] || color;
};

/**
 * Get trust indicator color
 */
export const getTrustIndicatorColor = (status: 'active' | 'verified' | 'certified'): string => {
  return TRUST_INDICATOR_COLORS[status];
};

/**
 * Calculate animation delay for staggered animations
 */
export const getAnimationDelay = (index: number): string => {
  return `${index * ANIMATION_CONFIG.staggerDelay}ms`;
};

/**
 * Format solution description for better readability
 */
export const formatSolutionDescription = (description: string, maxLength: number = 120): string => {
  if (description.length <= maxLength) return description;

  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? `${truncated.substring(0, lastSpace)}...` : `${truncated}...`;
};

/**
 * Generate solution card ID for accessibility
 */
export const generateSolutionId = (solution: SolutionItem): string => {
  return `solution-${solution.id}`;
};

/**
 * Check if solution is featured (new or popular)
 */
export const isFeaturedSolution = (solution: SolutionItem): boolean => {
  return Boolean(solution.isNew || solution.isPopular);
};

/**
 * Get featured badge text
 */
export const getFeaturedBadgeText = (solution: SolutionItem): string | null => {
  if (solution.isNew) return 'New';
  if (solution.isPopular) return 'Popular';
  return null;
};

/**
 * Get featured badge color
 */
export const getFeaturedBadgeColor = (solution: SolutionItem): string => {
  if (solution.isNew) return 'bg-success text-success-foreground';
  if (solution.isPopular) return 'bg-primary text-primary-foreground';
  return 'bg-muted text-muted-foreground';
};

/**
 * Sort solutions by priority (featured first)
 */
export const sortSolutionsByPriority = (solutions: SolutionItem[]): SolutionItem[] => {
  return [...solutions].sort((a, b) => {
    // Popular solutions first
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;

    // New solutions second
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;

    // Maintain original order for others
    return 0;
  });
};

/**
 * Filter solutions by search term
 */
export const filterSolutions = (solutions: SolutionItem[], searchTerm: string): SolutionItem[] => {
  if (!searchTerm.trim()) return solutions;

  const term = searchTerm.toLowerCase();

  return solutions.filter(solution =>
    solution.title.toLowerCase().includes(term) ||
    solution.description.toLowerCase().includes(term) ||
    solution.features?.some(feature => feature.toLowerCase().includes(term))
  );
};

/**
 * Get solution by ID
 */
export const getSolutionById = (solutions: SolutionItem[], id: string): SolutionItem | null => {
  return solutions.find(solution => solution.id === id) || null;
};

/**
 * Validate solution item
 */
export const validateSolution = (solution: Partial<SolutionItem>): boolean => {
  return Boolean(
    solution.id &&
    solution.title &&
    solution.description &&
    solution.link &&
    solution.icon
  );
};

/**
 * Generate solution analytics data
 */
export const generateSolutionAnalytics = (solution: SolutionItem) => {
  return {
    event: 'solution_clicked',
    solution_id: solution.id,
    solution_title: solution.title,
    is_featured: isFeaturedSolution(solution),
    has_badge: Boolean(solution.badge),
    feature_count: solution.features?.length || 0,
  };
};

/**
 * Get responsive grid classes
 */
export const getGridClasses = (itemCount: number): string => {
  if (itemCount === 1) return 'grid-cols-1 max-w-md mx-auto';
  if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
  if (itemCount === 3) return 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto';
  if (itemCount === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto';

  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto';
};

/**
 * Debounce function for search
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
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to element
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.offsetTop - offset;

  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth',
  });
};
