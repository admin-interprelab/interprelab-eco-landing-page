/**
 * Testimonials Components Barrel Export
 */

// Main Component
export { Testimonials } from './Testimonials';

// Sub Components
export { TestimonialsHeader } from './TestimonialsHeader';
export { TestimonialCard } from './TestimonialCard';
export { TestimonialsCarousel } from './TestimonialsCarousel';
export { TestimonialsDots } from './TestimonialsDots';
export { TestimonialsNavigation } from './TestimonialsNavigation';

// Types
export type {
  Testimonial,
  TestimonialsProps,
  TestimonialCardProps,
  TestimonialsHeaderProps,
  TestimonialsCarouselProps,
  TestimonialsDotsProps,
  TestimonialsNavigationProps,
  TestimonialsContextType,
  TestimonialsProviderProps,
} from './types';

// Constants
export {
  DEFAULT_TESTIMONIALS,
  DEFAULT_HEADER,
  SPECIALTY_COLORS,
  RATING_COLORS,
  ANIMATION_CONFIG,
  CAROUSEL_CONFIG,
  CARD_VARIANTS,
} from './constants';

// Utils
export {
  getSpecialtyColor,
  getRatingColor,
  getTestimonialCardClasses,
  getAvatarFallback,
  truncateQuote,
  generateStarRating,
  filterTestimonialsBySpecialty,
  filterTestimonialsByRating,
  sortTestimonials,
  getUniqueSpecialties,
  calculateAverageRating,
  getTestimonialById,
  validateTestimonial,
  generateTestimonialAnalytics,
  calculateCarouselPosition,
  getNextCarouselIndex,
  getPreviousCarouselIndex,
  canGoNext,
  canGoPrevious,
  debounce,
  formatLocation,
  generateTestimonialExcerpt,
} from './utils';

// Hooks
export {
  TestimonialsProvider,
  useTestimonials,
  useTestimonialsCarousel,
  useTestimonialsFilter,
  useTestimonialsAnimations,
  useTestimonialsKeyboard,
  useTestimonialsAnalytics,
} from './hooks';
