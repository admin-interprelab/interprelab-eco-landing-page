/**
 * Testimonials Carousel Component
 */

import { useEffect } from 'react';
import { TestimonialCard } from './TestimonialCard';
import type { TestimonialsCarouselProps } from './types';
import { useTestimonialsCarousel, useTestimonialsKeyboard } from './hooks';

/**
 * Testimonials Carousel Component
 *
 * Carousel container with:
 * - Smooth slide transitions
 * - Auto-play functionality
 * - Pause on hover
 * - Keyboard navigation
 * - Touch/swipe support
 */
export const TestimonialsCarousel = ({
  testimonials,
  currentIndex,
  onIndexChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  loop = true,
  pauseOnHover = true,
  className = '',
}: TestimonialsCarouselProps) => {
  const {
    handleMouseEnter,
    handleMouseLeave,
  } = useTestimonialsCarousel(
    testimonials,
    autoPlay,
    autoPlayInterval,
    loop,
    pauseOnHover
  );

  // Keyboard navigation
  useTestimonialsKeyboard(testimonials, currentIndex, onIndexChange);

  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label="Testimonials carousel"
        aria-live="polite"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
