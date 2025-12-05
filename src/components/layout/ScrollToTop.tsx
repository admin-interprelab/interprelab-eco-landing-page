/**
 * Scroll to Top Component
 * Floating button to scroll back to top of page
 */

import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ScrollToTopProps } from './types';
import { useScrollToTop } from './hooks';

/**
 * Scroll to Top Component
 *
 * Floating button that appears when user scrolls down:
 * - Smooth scroll to top functionality
 * - Fade in/out based on scroll position
 * - Accessibility support
 * - Customizable threshold
 * - Respects reduced motion preferences
 */
export const ScrollToTop = ({
  isVisible: visibilityOverride,
  className = '',
  threshold = 400,
  smooth = true,
}: ScrollToTopProps) => {
  const { isVisible: autoVisible, scrollToTop } = useScrollToTop(threshold);

  const shouldShow = visibilityOverride !== undefined ? visibilityOverride : autoVisible;

  if (!shouldShow) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="
          w-12 h-12 rounded-full shadow-lg backdrop-blur-sm
          bg-card/90 border-border/50
          hover:scale-110 hover:shadow-xl
          transition-all duration-300
          animate-fade-in
        "
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};
