/**
 * Loading Overlay Component
 * Full-screen loading overlay with spinner and message
 */

import type { LoadingOverlayProps } from './types';
import { formatLoadingMessage } from './utils';

/**
 * Loading Overlay Component
 *
 * Full-screen loading overlay with:
 * - Backdrop blur effect
 * - Animated spinner
 * - Loading message
 * - Multiple variants
 * - Fade in/out transitions
 */
export const LoadingOverlay = ({
  isVisible,
  message,
  className = '',
  variant = 'spinner',
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  const formattedMessage = formatLoadingMessage(message);

  const renderSpinner = () => (
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  );

  const renderSkeleton = () => (
    <div className="space-y-3">
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
    </div>
  );

  const renderPulse = () => (
    <div className="w-16 h-16 bg-primary/20 rounded-full animate-pulse" />
  );

  const renderVariant = () => {
    switch (variant) {
      case 'skeleton':
        return renderSkeleton();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-background/80 backdrop-blur-sm
        animate-fade-in
        ${className}
      `}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="text-center space-y-4 p-6">
        {renderVariant()}

        {formattedMessage && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {formattedMessage}
          </p>
        )}
      </div>
    </div>
  );
};
