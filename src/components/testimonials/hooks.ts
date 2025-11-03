/**
 * Testimonials Component Hooks
 */

import React, { useState, useEffect, useCallback, useContext, createContext, useRef } from 'react';
import type { Testimonial, TestimonialsContextType, TestimonialsProviderProps } from './types';
import { DEFAULT_TESTIMONIALS, ANIMATION_CONFIG } from './constants';
import {
  getNextCarouselIndex,
  getPreviousCarouselIndex,
  canGoNext,
  canGoPrevious,
  debounce
} from './utils';

// Testimonials Context
const TestimonialsContext = createContext<TestimonialsContextType | null>(null);

/**
 * Testimonials Provider Component
 */
export const TestimonialsProvider = ({
  children,
  initialTestimonials = DEFAULT_TESTIMONIALS,
  autoPlay = true,
  loop = true
}: TestimonialsProviderProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex(prev => getNextCarouselIndex(prev, testimonials.length, loop));
  }, [testimonials.length, loop]);

  const previousTestimonial = useCallback(() => {
    setCurrentIndex(prev => getPreviousCarouselIndex(prev, testimonials.length, loop));
  }, [testimonials.length, loop]);

  const goToTestimonial = useCallback((index: number) => {
    if (index >= 0 && index < testimonials.length) {
      setCurrentIndex(index);
    }
  }, [testimonials.length]);

  const contextValue: TestimonialsContextType = {
    testimonials,
    currentIndex,
    isPlaying,
    setTestimonials,
    setCurrentIndex,
    setIsPlaying,
    nextTestimonial,
    previousTestimonial,
    goToTestimonial,
  };

  return React.createElement(
    TestimonialsContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing testimonials context
 */
export const useTestimonials = (): TestimonialsContextType => {
  const context = useContext(TestimonialsContext);
  if (!context) {
    throw new Error('useTestimonials must be used within a TestimonialsProvider');
  }
  return context;
};

/**
 * Hook for testimonials carousel functionality
 */
export const useTestimonialsCarousel = (
  testimonials: Testimonial[],
  autoPlay: boolean = true,
  autoPlayInterval: number = ANIMATION_CONFIG.autoPlayInterval,
  loop: boolean = true,
  pauseOnHover: boolean = true
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused || testimonials.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => getNextCarouselIndex(prev, testimonials.length, loop));
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, testimonials.length, autoPlayInterval, loop]);

  const next = useCallback(() => {
    setCurrentIndex(prev => getNextCarouselIndex(prev, testimonials.length, loop));
  }, [testimonials.length, loop]);

  const previous = useCallback(() => {
    setCurrentIndex(prev => getPreviousCarouselIndex(prev, testimonials.length, loop));
  }, [testimonials.length, loop]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < testimonials.length) {
      setCurrentIndex(index);
    }
  }, [testimonials.length]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return {
    currentIndex,
    isPlaying,
    isPaused,
    next,
    previous,
    goTo,
    play,
    pause,
    togglePlay,
    handleMouseEnter,
    handleMouseLeave,
    canGoNext: canGoNext(currentIndex, testimonials.length, loop),
    canGoPrevious: canGoPrevious(currentIndex, loop),
  };
};

/**
 * Hook for testimonials filtering and search
 */
export const useTestimonialsFilter = (testimonials: Testimonial[]) => {
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [minRating, setMinRating] = useState(0);

  // Debounced filter function
  const debouncedFilter = useCallback(
    debounce(() => {
      let filtered = [...testimonials];

      // Filter by search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(testimonial =>
          testimonial.name.toLowerCase().includes(term) ||
          testimonial.role.toLowerCase().includes(term) ||
          testimonial.quote.toLowerCase().includes(term) ||
          testimonial.specialty.toLowerCase().includes(term)
        );
      }

      // Filter by specialty
      if (selectedSpecialty !== 'all') {
        filtered = filtered.filter(testimonial =>
          testimonial.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        );
      }

      // Filter by rating
      if (minRating > 0) {
        filtered = filtered.filter(testimonial => testimonial.rating >= minRating);
      }

      setFilteredTestimonials(filtered);
    }, 300),
    [testimonials, searchTerm, selectedSpecialty, minRating]
  );

  useEffect(() => {
    debouncedFilter();
  }, [debouncedFilter]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setMinRating(0);
    setFilteredTestimonials(testimonials);
  }, [testimonials]);

  return {
    filteredTestimonials,
    searchTerm,
    selectedSpecialty,
    minRating,
    setSearchTerm,
    setSelectedSpecialty,
    setMinRating,
    clearFilters,
  };
};

/**
 * Hook for testimonials animations
 */
export const useTestimonialsAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const itemId = entry.target.getAttribute('data-testimonial-id');
            if (itemId) {
              setAnimatedItems(prev => new Set([...prev, itemId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-testimonial-id]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isItemAnimated = useCallback((itemId: string) => {
    return animatedItems.has(itemId);
  }, [animatedItems]);

  return {
    isVisible,
    isItemAnimated,
  };
};

/**
 * Hook for testimonials keyboard navigation
 */
export const useTestimonialsKeyboard = (
  testimonials: Testimonial[],
  currentIndex: number,
  onIndexChange: (index: number) => void
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onIndexChange(getPreviousCarouselIndex(currentIndex, testimonials.length));
        break;
      case 'ArrowRight':
        event.preventDefault();
        onIndexChange(getNextCarouselIndex(currentIndex, testimonials.length));
        break;
      case 'Home':
        event.preventDefault();
        onIndexChange(0);
        break;
      case 'End':
        event.preventDefault();
        onIndexChange(testimonials.length - 1);
        break;
      case 'Escape':
        // Could be used to close modal or stop autoplay
        break;
    }
  }, [currentIndex, testimonials.length, onIndexChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

/**
 * Hook for testimonials analytics
 */
export const useTestimonialsAnalytics = () => {
  const [viewedTestimonials, setViewedTestimonials] = useState<Set<string>>(new Set());
  const [interactionCounts, setInteractionCounts] = useState<Record<string, number>>({});

  const trackView = useCallback((testimonialId: string) => {
    setViewedTestimonials(prev => new Set([...prev, testimonialId]));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'testimonial_viewed', {
        testimonial_id: testimonialId,
      });
    }
  }, []);

  const trackInteraction = useCallback((testimonialId: string, type: 'click' | 'share' | 'like') => {
    const key = `${testimonialId}_${type}`;
    setInteractionCounts(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', `testimonial_${type}`, {
        testimonial_id: testimonialId,
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      totalViewed: viewedTestimonials.size,
      viewedTestimonials: Array.from(viewedTestimonials),
      interactionCounts,
      totalInteractions: Object.values(interactionCounts).reduce((sum, count) => sum + count, 0),
    };
  }, [viewedTestimonials, interactionCounts]);

  return {
    trackView,
    trackInteraction,
    getAnalytics,
  };
};
