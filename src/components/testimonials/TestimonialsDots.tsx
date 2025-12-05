/**
 * Testimonials Dots Component
 */

import type { TestimonialsDotsProps } from './types';

/**
 * Testimonials Dots Component
 *
 * Dot indicators for carousel navigation
 */
export const TestimonialsDots = ({
  testimonials,
  currentIndex,
  onDotClick,
  className = '',
}: TestimonialsDotsProps) => {
  return (
    <div
      className={`flex justify-center gap-2 mt-10 ${className}`}
      role="tablist"
      aria-label="Testimonial navigation"
    >
      {testimonials.map((testimonial, index) => (
        <button
          key={testimonial.id}
          className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            index === currentIndex
              ? 'w-8 bg-primary'
              : 'w-2 bg-primary/30 hover:bg-primary/50'
          }`}
          onClick={() => onDotClick(index)}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to testimonial ${index + 1} from ${testimonial.name}`}
          tabIndex={index === currentIndex ? 0 : -1}
        />
      ))}
    </div>
  );
};
