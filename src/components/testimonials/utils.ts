/**
 * Testimonials Component Utilities
 */

import type { Testimonial } from './types';
import { SPECIALTY_COLORS, RATING_COLORS } from './constants';

/**
 * Get specialty color class
 */
export const getSpecialtyColor = (specialty: string): string => {
  return SPECIALTY_COLORS[specialty as keyof typeof SPECIALTY_COLORS] || 'bg-gradient-primary';
};

/**
 * Get rating color class
 */
export const getRatingColor = (rating: number): string => {
  return RATING_COLORS[rating as keyof typeof RATING_COLORS] || 'text-warning';
};

/**
 * Generate testimonial card classes
 */
export const getTestimonialCardClasses = (
  variant: 'default' | 'compact' | 'detailed' | 'minimal' = 'default',
  isActive: boolean = false,
  className: string = ''
): string => {
  const baseClasses = 'transition-all duration-300 cursor-pointer';

  const variantClasses = {
    default: 'glass border-border/30 hover-lift',
    compact: 'glass border-border/20 hover:shadow-md',
    detailed: 'glass border-border/40 hover:shadow-xl hover:-translate-y-2',
    minimal: 'border border-border/20 bg-card/50 hover:bg-card/70',
  };

  const activeClasses = isActive ? 'ring-2 ring-primary/50 shadow-glow' : '';

  return `${baseClasses} ${variantClasses[variant]} ${activeClasses} ${className}`.trim();
};

/**
 * Format testimonial name for avatar fallback
 */
export const getAvatarFallback = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Truncate testimonial quote
 */
export const truncateQuote = (quote: string, maxLength: number = 150): string => {
  if (quote.length <= maxLength) return quote;

  const truncated = quote.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? `${truncated.substring(0, lastSpace)}...` : `${truncated}...`;
};

/**
 * Generate star rating display
 */
export const generateStarRating = (rating: number): string[] => {
  return Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆');
};

/**
 * Filter testimonials by specialty
 */
export const filterTestimonialsBySpecialty = (
  testimonials: Testimonial[],
  specialty: string
): Testimonial[] => {
  if (!specialty || specialty === 'all') return testimonials;
  return testimonials.filter(t => t.specialty.toLowerCase() === specialty.toLowerCase());
};

/**
 * Filter testimonials by rating
 */
export const filterTestimonialsByRating = (
  testimonials: Testimonial[],
  minRating: number
): Testimonial[] => {
  return testimonials.filter(t => t.rating >= minRating);
};

/**
 * Sort testimonials by various criteria
 */
export const sortTestimonials = (
  testimonials: Testimonial[],
  sortBy: 'rating' | 'name' | 'date' | 'featured' = 'featured'
): Testimonial[] => {
  return [...testimonials].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
};

/**
 * Get unique specialties from testimonials
 */
export const getUniqueSpecialties = (testimonials: Testimonial[]): string[] => {
  const specialties = testimonials.map(t => t.specialty);
  return [...new Set(specialties)].sort();
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (testimonials: Testimonial[]): number => {
  if (testimonials.length === 0) return 0;
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return Math.round((total / testimonials.length) * 10) / 10;
};

/**
 * Get testimonial by ID
 */
export const getTestimonialById = (
  testimonials: Testimonial[],
  id: string
): Testimonial | null => {
  return testimonials.find(t => t.id === id) || null;
};

/**
 * Validate testimonial data
 */
export const validateTestimonial = (testimonial: Partial<Testimonial>): boolean => {
  return Boolean(
    testimonial.id &&
    testimonial.name &&
    testimonial.role &&
    testimonial.quote &&
    testimonial.rating &&
    testimonial.specialty
  );
};

/**
 * Generate testimonial analytics data
 */
export const generateTestimonialAnalytics = (testimonial: Testimonial) => {
  return {
    event: 'testimonial_viewed',
    testimonial_id: testimonial.id,
    testimonial_name: testimonial.name,
    specialty: testimonial.specialty,
    rating: testimonial.rating,
    is_featured: testimonial.featured || false,
    is_verified: testimonial.verified || false,
  };
};

/**
 * Calculate carousel position
 */
export const calculateCarouselPosition = (
  currentIndex: number,
  totalItems: number,
  itemWidth: number = 100
): number => {
  return -(currentIndex * itemWidth);
};

/**
 * Get next carousel index
 */
export const getNextCarouselIndex = (
  currentIndex: number,
  totalItems: number,
  loop: boolean = true
): number => {
  if (currentIndex >= totalItems - 1) {
    return loop ? 0 : currentIndex;
  }
  return currentIndex + 1;
};

/**
 * Get previous carousel index
 */
export const getPreviousCarouselIndex = (
  currentIndex: number,
  totalItems: number,
  loop: boolean = true
): number => {
  if (currentIndex <= 0) {
    return loop ? totalItems - 1 : currentIndex;
  }
  return currentIndex - 1;
};

/**
 * Check if carousel can go to next
 */
export const canGoNext = (
  currentIndex: number,
  totalItems: number,
  loop: boolean = true
): boolean => {
  return loop || currentIndex < totalItems - 1;
};

/**
 * Check if carousel can go to previous
 */
export const canGoPrevious = (
  currentIndex: number,
  loop: boolean = true
): boolean => {
  return loop || currentIndex > 0;
};

/**
 * Debounce function for search/filter
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
 * Format location display
 */
export const formatLocation = (location: string): string => {
  // Handle various location formats
  const parts = location.split(',').map(part => part.trim());
  if (parts.length >= 2) {
    return `${parts[0]}, ${parts[1]}`;
  }
  return location;
};

/**
 * Generate testimonial excerpt
 */
export const generateTestimonialExcerpt = (
  quote: string,
  maxWords: number = 20
): string => {
  const words = quote.split(' ');
  if (words.length <= maxWords) return quote;

  return `${words.slice(0, maxWords).join(' ')}...`;
};
