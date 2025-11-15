/**
 * Navigation Component Hooks
 */

import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import type { NavItem, NavigationContextType, NavigationProviderProps } from './types';
import { DEFAULT_NAV_ITEMS } from './constants';
import { getActiveNavItem, isMobileDevice, debounce, throttle } from './utils';

// Navigation Context
const NavigationContext = createContext<NavigationContextType | null>(null);

/**
 * Navigation Provider Component
 */
export const NavigationProvider = ({
  children,
  initialNavItems = DEFAULT_NAV_ITEMS
}: NavigationProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);

  const contextValue: NavigationContextType = {
    isOpen,
    activeItem,
    setIsOpen,
    setActiveItem,
    navItems,
    setNavItems,
  };

  return React.createElement(
    NavigationContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing navigation context
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

/**
 * Hook for mobile menu functionality
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = debounce(() => {
      const mobile = isMobileDevice();
      setIsMobile(mobile);

      // Close mobile menu when switching to desktop
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    }, 150);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close menu on route change
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    isMobile,
    toggle,
    open,
    close,
  };
};

/**
 * Hook for navigation active state
 */
export const useNavigationActive = (navItems: NavItem[]) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const active = getActiveNavItem(navItems, location.pathname);
    setActiveItem(active?.href || null);
  }, [location.pathname, navItems]);

  const isActive = useCallback((href: string) => {
    return activeItem === href;
  }, [activeItem]);

  return {
    activeItem,
    isActive,
  };
};

/**
 * Hook for navigation scroll behavior
 */
export const useNavigationScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollState = throttle(() => {
      const currentScrollY = window.pageYOffset;

      setScrollY(currentScrollY);
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsAtTop(currentScrollY < 10);

      lastScrollY = currentScrollY;
    }, 16); // ~60fps

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState(); // Initial call

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return {
    scrollY,
    isScrollingUp,
    isAtTop,
  };
};

/**
 * Hook for navigation keyboard shortcuts
 */
export const useNavigationKeyboard = (navItems: NavItem[]) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const flatItems = navItems.filter(item => item.href); // Only items with direct links

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % flatItems.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + flatItems.length) % flatItems.length);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(flatItems.length - 1);
        break;
      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  }, [navItems]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
};

/**
 * Hook for navigation analytics
 */
export const useNavigationAnalytics = () => {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const trackClick = useCallback((href: string, label: string, context: 'desktop' | 'mobile' = 'desktop') => {
    setClickCounts(prev => ({
      ...prev,
      [href]: (prev[href] || 0) + 1,
    }));

    setLastClicked(href);

    // Track with analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'nav_item_clicked', {
        item_label: label,
        item_href: href,
        context,
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      clickCounts,
      lastClicked,
      totalClicks: Object.values(clickCounts).reduce((sum, count) => sum + count, 0),
      mostClicked: Object.entries(clickCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || null,
    };
  }, [clickCounts, lastClicked]);

  return {
    trackClick,
    getAnalytics,
  };
};

/**
 * Hook for navigation accessibility
 */
export const useNavigationAccessibility = () => {
  const [announceText, setAnnounceText] = useState<string>('');

  const announceNavigation = useCallback((text: string) => {
    setAnnounceText(text);

    // Clear announcement after a delay
    setTimeout(() => {
      setAnnounceText('');
    }, 1000);
  }, []);

  const announceMenuState = useCallback((isOpen: boolean) => {
    announceNavigation(isOpen ? 'Menu opened' : 'Menu closed');
  }, [announceNavigation]);

  const announceActiveItem = useCallback((itemLabel: string) => {
    announceNavigation(`Navigated to ${itemLabel}`);
  }, [announceNavigation]);

  return {
    announceText,
    announceNavigation,
    announceMenuState,
    announceActiveItem,
  };
};

/**
 * Hook for navigation performance
 */
export const useNavigationPerformance = () => {
  const [renderTime, setRenderTime] = useState<number>(0);
  const [interactionTime, setInteractionTime] = useState<number>(0);

  const measureRender = useCallback(() => {
    const start = performance.now();

    // Use requestAnimationFrame to measure after render
    requestAnimationFrame(() => {
      const end = performance.now();
      setRenderTime(end - start);
    });
  }, []);

  const measureInteraction = useCallback((callback: () => void) => {
    const start = performance.now();

    callback();

    requestAnimationFrame(() => {
      const end = performance.now();
      setInteractionTime(end - start);
    });
  }, []);

  return {
    renderTime,
    interactionTime,
    measureRender,
    measureInteraction,
  };
};
