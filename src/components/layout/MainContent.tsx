/**
 * Main Content Component
 * Main content area with error handling and loading states
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { MainContentProps } from './types';
import { getMainContentClasses, getOptimalContentWidth } from './utils';

/**
 * Main Content Component
 *
 * Provides the main content area with:
 * - Variant-specific styling
 * - Error boundary with retry functionality
 * - Loading state handling
 * - Responsive container
 * - Accessibility support
 */
export const MainContent = ({
  children,
  variant,
  className = '',
  isLoading = false,
  error = null,
  onRetry,
}: MainContentProps) => {
  const mainClasses = getMainContentClasses(variant, className);
  const contentWidth = getOptimalContentWidth(variant);

  // Error state
  if (error) {
    return (
      <main className={`${mainClasses} flex items-center justify-center min-h-[50vh]`}>
        <div className={`container mx-auto px-6 ${contentWidth}`}>
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mt-2">
              <div className="space-y-3">
                <p>{error}</p>
                {onRetry && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Try Again
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <main className={`${mainClasses} flex items-center justify-center min-h-[50vh]`}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading content...</p>
        </div>
      </main>
    );
  }

  // Normal content
  return (
    <main
      className={mainClasses}
      role="main"
      aria-label="Main content"
    >
      {children}
    </main>
  );
};
