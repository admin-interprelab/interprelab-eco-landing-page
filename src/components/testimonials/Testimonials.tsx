/**
 * Testimonials Main Component
 */

import { TestimonialsHeader } from './TestimonialsHeader';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TestimonialsDots } from './TestimonialsDots';
import { TestimonialsNavigation } from './TestimonialsNavigation';
import type { TestimonialsProps, Testimonial } from './types';
import { DEFAULT_TESTIMONIALS, CAROUSEL_CONFIG } from './constants';
import { useTestimonialsCarousel, useTestimonialsAnalytics } from './hooks';

/**
 * Testimonials Component
 *
 * Main testimonials section with:
 * - Header with title and description
 * - Carousel with auto-play
 * - Dot navigation
 * - Optional arrow navigation
 * - Analytics tracking
 * - Responsive design
 */
export const Testimonials = ({
  className = '',
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlay = CAROUSEL_CONFIG.autoPlay,
  autoPlayInterval = 4000,
  showDots = CAROUSEL_CONFIG.showDots,
  showNavigation = CAROUSEL_CONFIG.showNavigation,
  loop = CAROUSEL_CONFIG.loop,
  pauseOnHover = CAROUSEL_CONFIG.pauseOnHover,
  onTestimonialClick,
}: TestimonialsProps) => {
  const {
    currentIndex,
    next,
    previous,
    goTo,
    canGoNext,
    canGoPrevious,
  } = useTestimonialsCarousel(
    testimonials,
    autoPlay,
    autoPlayInterval,
    loop,
    pauseOnHover
  );

  const { trackView, trackInteraction } = useTestimonialsAnalytics();

  const handleTestimonialClick = (testimonial: Testimonial) => {
    trackInteraction(testimonial.id, 'click');

    if (onTestimonialClick) {
      onTestimonialClick(testimonial);
    }
  };

  const handleDotClick = (index: number) => {
    goTo(index);
    trackInteraction(testimonials[index].id, 'click');
  };

  return (
    <section
      className={`py-32 px-6 relative ${className}`}
      aria-label="Customer Testimonials"
    >
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <TestimonialsHeader />

        {/* Carousel */}
        <TestimonialsCarousel
          testimonials={testimonials}
          currentIndex={currentIndex}
          onIndexChange={goTo}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
          loop={loop}
          pauseOnHover={pauseOnHover}
        />

        {/* Navigation */}
        {showNavigation && (
          <TestimonialsNavigation
            onPrevious={previous}
            onNext={next}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        )}

        {/* Dots Indicator */}
        {showDots && (
          <TestimonialsDots
            testimonials={testimonials}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
          />
        )}
      </div>
    </section>
  );
};
