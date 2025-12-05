/**
 * Custom hooks for Features Components
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Feature, FeatureCategory } from './types';
import {
  filterFeaturesByCategory,
  filterFeaturesByPriority,
  filterFeaturesBySearch,
  sortFeaturesByPriority,
  getUniqueCategories
} from './utils';

/**
 * Hook for managing feature filtering and search
 */
export const useFeatureFiltering = (features: Feature[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low' | 'all'>('all');
  const [sortByPriority, setSortByPriority] = useState(false);

  // Get unique categories from features
  const availableCategories = useMemo(() => {
    return getUniqueCategories(features);
  }, [features]);

  // Filter and sort features based on current filters
  const filteredFeatures = useMemo(() => {
    let filtered = [...features];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filterFeaturesBySearch(filtered, searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filterFeaturesByCategory(filtered, selectedCategory);
    }

    // Apply priority filter
    if (selectedPriority !== 'all') {
      filtered = filterFeaturesByPriority(filtered, selectedPriority);
    }

    // Apply sorting
    if (sortByPriority) {
      filtered = sortFeaturesByPriority(filtered);
    }

    return filtered;
  }, [features, searchQuery, selectedCategory, selectedPriority, sortByPriority]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSortByPriority(false);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           selectedCategory !== 'all' ||
           selectedPriority !== 'all' ||
           sortByPriority;
  }, [searchQuery, selectedCategory, selectedPriority, sortByPriority]);

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedPriority,
    sortByPriority,

    // Derived data
    filteredFeatures,
    availableCategories,
    hasActiveFilters,

    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedPriority,
    setSortByPriority,
    resetFilters,
  };
};

/**
 * Hook for managing feature card animations
 */
export const useFeatureAnimations = (enabled: boolean = true) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(enabled);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  // Check if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setAnimationsEnabled(!e.matches && enabled);
    };

    setAnimationsEnabled(!mediaQuery.matches && enabled);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enabled]);

  // Mark card as visible for staggered animations
  const markCardVisible = useCallback((cardId: string) => {
    setVisibleCards(prev => new Set(prev).add(cardId));
  }, []);

  // Reset visible cards
  const resetVisibleCards = useCallback(() => {
    setVisibleCards(new Set());
  }, []);

  // Get animation delay for a card
  const getAnimationDelay = useCallback((index: number, baseDelay: number = 100) => {
    if (!animationsEnabled) return '0ms';
    return `${index * baseDelay}ms`;
  }, [animationsEnabled]);

  // Get animation classes for a card
  const getAnimationClasses = useCallback((cardId: string, index: number) => {
    if (!animationsEnabled) return '';

    const baseClasses = 'animate-fade-in';
    const isVisible = visibleCards.has(cardId);

    return isVisible ? baseClasses : `${baseClasses} opacity-0`;
  }, [animationsEnabled, visibleCards]);

  return {
    animationsEnabled,
    visibleCards,
    markCardVisible,
    resetVisibleCards,
    getAnimationDelay,
    getAnimationClasses,
  };
};

/**
 * Hook for managing feature card interactions
 */
export const useFeatureInteractions = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  // Handle card hover
  const handleCardHover = useCallback((cardId: string | null) => {
    setHoveredCard(cardId);
  }, []);

  // Handle card selection
  const handleCardSelect = useCallback((cardId: string | null) => {
    setSelectedCard(cardId);
  }, []);

  // Handle card focus
  const handleCardFocus = useCallback((cardId: string | null) => {
    setFocusedCard(cardId);
  }, []);

  // Handle card click
  const handleCardClick = useCallback((feature: Feature, onClick?: (feature: Feature) => void) => {
    setSelectedCard(feature.id);
    onClick?.(feature);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((
    event: React.KeyboardEvent,
    feature: Feature,
    onClick?: (feature: Feature) => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(feature, onClick);
    }
  }, [handleCardClick]);

  // Reset all interactions
  const resetInteractions = useCallback(() => {
    setHoveredCard(null);
    setSelectedCard(null);
    setFocusedCard(null);
  }, []);

  return {
    // State
    hoveredCard,
    selectedCard,
    focusedCard,

    // Handlers
    handleCardHover,
    handleCardSelect,
    handleCardFocus,
    handleCardClick,
    handleKeyDown,
    resetInteractions,
  };
};

/**
 * Hook for managing responsive layout
 */
export const useResponsiveLayout = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Get optimal columns for current screen size
  const getOptimalColumns = useCallback((
    columns: { mobile?: number; tablet?: number; desktop?: number }
  ) => {
    switch (screenSize) {
      case 'mobile':
        return columns.mobile || 1;
      case 'tablet':
        return columns.tablet || 2;
      case 'desktop':
        return columns.desktop || 4;
      default:
        return 4;
    }
  }, [screenSize]);

  // Check if current screen is mobile
  const isMobile = useMemo(() => screenSize === 'mobile', [screenSize]);

  // Check if current screen is tablet
  const isTablet = useMemo(() => screenSize === 'tablet', [screenSize]);

  // Check if current screen is desktop
  const isDesktop = useMemo(() => screenSize === 'desktop', [screenSize]);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    getOptimalColumns,
  };
};

/**
 * Hook for managing feature card visibility (for lazy loading)
 */
export const useFeatureVisibility = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());

  // Intersection Observer for lazy loading
  const observeFeature = useCallback((element: HTMLElement, featureId: string) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => new Set(prev).add(featureId));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  // Check if feature is visible
  const isFeatureVisible = useCallback((featureId: string) => {
    return visibleFeatures.has(featureId);
  }, [visibleFeatures]);

  // Reset visible features
  const resetVisibleFeatures = useCallback(() => {
    setVisibleFeatures(new Set());
  }, []);

  return {
    visibleFeatures,
    observeFeature,
    isFeatureVisible,
    resetVisibleFeatures,
  };
};
