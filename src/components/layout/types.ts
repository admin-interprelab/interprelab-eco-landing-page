/**
 * Types for Layout Components
 */

import type { ReactNode } from 'react';

export interface LayoutProps {
  /** Child components to render in main content area */
  children: ReactNode;
  /** Whether to show the InterpreBot UI */
  showInterpreBot?: boolean;
  /** Whether to show the navigation */
  showNavigation?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Custom navigation component */
  customNavigation?: ReactNode;
  /** Custom footer component */
  customFooter?: ReactNode;
  /** Layout variant */
  variant?: 'default' | 'minimal' | 'fullscreen' | 'dashboard';
  /** Custom CSS classes */
  className?: string;
  /** Main content CSS classes */
  mainClassName?: string;
  /** Whether to show scroll to top button */
  showScrollToTop?: boolean;
  /** Whether to show loading overlay */
  isLoading?: boolean;
  /** Loading message */
  loadingMessage?: string;
  /** Error state */
  error?: string | null;
  /** Error retry handler */
  onRetry?: () => void;
}

export interface MainContentProps {
  /** Child components */
  children: ReactNode;
  /** Layout variant */
  variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard';
  /** Custom CSS classes */
  className?: string;
  /** Whether content is loading */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Error retry handler */
  onRetry?: () => void;
}

export interface ScrollToTopProps {
  /** Whether button is visible */
  isVisible?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Scroll threshold for showing button */
  threshold?: number;
  /** Smooth scroll behavior */
  smooth?: boolean;
}

export interface LoadingOverlayProps {
  /** Whether overlay is visible */
  isVisible: boolean;
  /** Loading message */
  message?: string;
  /** Custom CSS classes */
  className?: string;
  /** Loading variant */
  variant?: 'spinner' | 'skeleton' | 'pulse';
}

export interface ErrorBoundaryProps {
  /** Child components */
  children: ReactNode;
  /** Error fallback component */
  fallback?: ReactNode;
  /** Error handler */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface LayoutContextType {
  /** Current layout variant */
  variant: 'default' | 'minimal' | 'fullscreen' | 'dashboard';
  /** Whether navigation is visible */
  showNavigation: boolean;
  /** Whether footer is visible */
  showFooter: boolean;
  /** Whether InterpreBot is visible */
  showInterpreBot: boolean;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Update layout configuration */
  updateLayout: (config: Partial<LayoutContextType>) => void;
  /** Set loading state */
  setLoading: (loading: boolean, message?: string) => void;
  /** Set error state */
  setError: (error: string | null) => void;
}

export interface LayoutProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial layout configuration */
  initialConfig?: Partial<LayoutContextType>;
}

export interface LayoutHeaderProps {
  /** Header title */
  title?: string;
  /** Header subtitle */
  subtitle?: string;
  /** Header actions */
  actions?: ReactNode;
  /** Whether to show breadcrumbs */
  showBreadcrumbs?: boolean;
  /** Custom CSS classes */
  className?: string;
}

export interface LayoutSidebarProps {
  /** Sidebar content */
  children: ReactNode;
  /** Whether sidebar is open */
  isOpen: boolean;
  /** Sidebar position */
  position?: 'left' | 'right';
  /** Sidebar width */
  width?: string;
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Collapse handler */
  onToggle?: () => void;
  /** Custom CSS classes */
  className?: string;
}
