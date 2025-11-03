/**
 * Custom hooks for Layout Components
 */

import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import type { LayoutContextType, LayoutProviderProps } from './types';
import {
  DEFAULT_LAYOUT_CONFIG,
  SCROLL_CONFIG,
  ANIMATION_CONFIG
} from './constants';
import {
  calculateScrollProgress,
  hasScrolledPastThreshold,
  scrollToTop,
  getViewportDimensions,
  getDeviceType,
  prefersReducedMotion,
  debounce,
  throttle
} from './utils';

// Layout Context
const LayoutContext = createContext<LayoutContextType>(DEFAULT_LAYOUT_CONFIG);

/**
 * Layout Provider Component
 */
export const LayoutProvider = ({ children, initialConfig }: LayoutProviderProps) => {
  const [config, setConfig] = useState<LayoutContextType>({
    ...DEFAULT_LAYOUT_CONFIG,
    ...initialConfig,
  });

  const updateLayout = useCallback((updates: Partial<LayoutContextType>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setConfig(prev => ({ ...prev, isLoading: loading, loadingMessage: message }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setConfig(prev => ({ ...prev, error: error }));
  }, []);

  const contextValue: LayoutContextType = {
    ...config,
    updateLayout,
    setLoading,
    setError,
  };

  return React.createElement(
    LayoutContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing layout context
 */
export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

/**
 * Hook for managing scroll behavior
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollState = throttle(() => {
      const currentScrollY = window.pageYOffset;
      const progress = calculateScrollProgress();
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsAtTop(currentScrollY < 10);
      setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 10);

      lastScrollY = currentScrollY;
    }, 16); // ~60fps

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const scrollToTopSmooth = useCallback(() => {
    scrollToTop(!prefersReducedMotion());
  }, []);

  return {
    scrollY,
    scrollProgress,
    isScrollingUp,
    isAtTop,
    isAtBottom,
    scrollToTop: scrollToTopSmooth,
  };
};

/**
 * Hook for managing scroll to top button
 */
export const useScrollToTop = (threshold: number = SCROLL_CONFIG.scrollToTopThreshold) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsVisible(hasScrolledPastThreshold(threshold));
  }, [scrollY, threshold]);

  const scrollToTopHandler = useCallback(() => {
    scrollToTop(!prefersReducedMotion());
  }, []);

  return {
    isVisible,
    scrollToTop: scrollToTopHandler,
  };
};

/**
 * Hook for managing responsive layout
 */
export const useResponsiveLayout = () => {
  const [dimensions, setDimensions] = useState(getViewportDimensions());
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const updateDimensions = debounce(() => {
      const newDimensions = getViewportDimensions();
      const newDeviceType = getDeviceType();

      setDimensions(newDimensions);
      setDeviceType(newDeviceType);
    }, 150);

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    dimensions,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Hook for managing loading states
 */
export const useLoadingState = (initialLoading: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const startLoading = useCallback((message?: string) => {
    setIsLoading(true);
    setLoadingMessage(message || 'Loading...');
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  const updateLoadingMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    updateLoadingMessage,
  };
};

/**
 * Hook for managing error states
 */
export const useErrorState = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const setErrorMessage = useCallback((errorMessage: string | null) => {
    setError(errorMessage);
    setIsRetrying(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsRetrying(false);
  }, []);

  const retry = useCallback(async (retryFn?: () => Promise<void>) => {
    if (!retryFn) {
      clearError();
      return;
    }

    setIsRetrying(true);
    try {
      await retryFn();
      clearError();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Retry failed');
    } finally {
      setIsRetrying(false);
    }
  }, [clearError]);

  return {
    error,
    isRetrying,
    setError: setErrorMessage,
    clearError,
    retry,
  };
};

/**
 * Hook for managing keyboard shortcuts
 */
export const useLayoutKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrl = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;
      const isAlt = event.altKey;

      // Create key combination string
      let combination = '';
      if (isCtrl) combination += 'ctrl+';
      if (isShift) combination += 'shift+';
      if (isAlt) combination += 'alt+';
      combination += key;

      if (shortcuts[combination]) {
        event.preventDefault();
        shortcuts[combination]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
