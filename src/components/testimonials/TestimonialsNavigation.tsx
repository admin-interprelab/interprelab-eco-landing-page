/**
 * Testimonials Navigation Component
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TestimonialsNavigationProps } from './types';

/**
 * Testimonials Navigation Component
 *
 * Previous/Next navigation buttons for carousel
 */
export const TestimonialsNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className = '',
}: TestimonialsNavigationProps) => {
  return (
    <div className={`flex justify-center gap-4 mt-8 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous testimonial"
        className="w-12 h-12 rounded-full"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next testimonial"
        className="w-12 h-12 rounded-full"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
