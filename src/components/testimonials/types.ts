/**
 * Testimonials Component Types
 */

import { ReactNode } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  specialty: string;
  company?: string;
  verified?: boolean;
  featured?: boolean;
  date?: string;
}

export interface TestimonialsProps {
  className?: string;
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showNavigation?: boolean;
  itemsPerView?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  onTestimonialClick?: (testimonial: Testimonial) => void;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isActive?: boolean;
  onClick?: (testimonial: Testimonial) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface TestimonialsHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  className?: string;
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export interface TestimonialsDotsProps {
  testimonials: Testimonial[];
  currentIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export interface TestimonialsNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
}

export interface TestimonialsContextType {
  testimonials: Testimonial[];
  currentIndex: number;
  isPlaying: boolean;
  setTestimonials: (testimonials: Testimonial[]) => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  nextTestimonial: () => void;
  previousTestimonial: () => void;
  goToTestimonial: (index: number) => void;
}

export interface TestimonialsProviderProps {
  children: ReactNode;
  initialTestimonials?: Testimonial[];
  autoPlay?: boolean;
  loop?: boolean;
}
