/**
 * Refactored Layout Component
 * Modular, maintainable, and following best practices
 */

import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { InterpreBotUI } from './InterpreBotUI';
import {
  MainContent,
  ScrollToTop,
  LoadingOverlay,
  ErrorBoundary,
  LayoutProvider,
  useLayout,
  useLayoutKeyboardShortcuts,
} from './layout/index';
import {
  getLayoutContainerClasses,
  shouldShowComponent,
} from './layout/utils';
import type { LayoutProps } from './layout/types';

/**
 * Layout Content Component
 * Internal component that uses layout context
 */
const LayoutContent = ({
  children,
  showInterpreBot: showInterpreBotOverride,
  showNavigation: showNavigationOverride,
  showFooter: showFooterOverride,
  customNavigation,
  customFooter,
  variant = 'default',
  className = '',
}: LayoutProps) => {
  const {
    showInterpreBot,
    showNavigation,
    showFooter,
    isLoading,
    error,
    updateLayout,
  } = useLayout();

  // Determine component visibility
  const shouldShowNav = shouldShowComponent(showNavigationOverride, showNavigation);
  const shouldShowBot = shouldShowComponent(showInterpreBotOverride, showInterpreBot);
  const shouldShowFooterComponent = shouldShowComponent(showFooterOverride, showFooter);

  // Keyboard shortcuts
  useLayoutKeyboardShortcuts({
    'ctrl+shift+b': () => updateLayout({ showInterpreBot: !showInterpreBot }),
    'ctrl+shift+n': () => updateLayout({ showNavigation: !showNavigation }),
    'escape': () => {
      if (showInterpreBot) {
        updateLayout({ showInterpreBot: false });
      }
    },
  });

  const containerClasses = getLayoutContainerClasses(variant, className);

  return (
    <div className={containerClasses}>
      {/* Navigation */}
      {shouldShowNav && (
        customNavigation || <Navigation />
      )}

      {/* Main Content */}
      <MainContent
        variant={variant}
        isLoading={isLoading}
        error={error}
        onRetry={() => window.location.reload()}
      >
        {children}
      </MainContent>

      {/* Footer */}
      {shouldShowFooterComponent && (
        customFooter || <Footer />
      )}

      {/* InterpreBot */}
      {shouldShowBot && <InterpreBotUI />}

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
};

/**
 * Main Layout Component
 *
 * Provides the main application layout with:
 * - Error boundary protection
 * - Layout context provider
 * - Modular component system
 * - Responsive design
 * - Accessibility support
 * - Keyboard shortcuts
 * - Loading and error states
 */
export const Layout = (props: LayoutProps) => {
  const { onError, initialConfig, ...layoutProps } = props;

  return (
    <ErrorBoundary onError={onError}>
      <LayoutProvider initialConfig={initialConfig}>
        <LayoutContent {...layoutProps} />
      </LayoutProvider>
    </ErrorBoundary>
  );
};
