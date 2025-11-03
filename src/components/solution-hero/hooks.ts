/**
 * Solution Hero Component Hooks
 */

import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';
import type { SolutionItem, SolutionHeroContextType, SolutionHeroProviderProps } from './types';
import { DEFAULT_SOLUTIONS } from './constants';
import { sortSolutionsByPriority, filterSolutions, debounce } from './utils';

// Solution Hero Context
const SolutionHeroContext = createContext<SolutionHeroContextType | null>(null);

/**
 * Solution Hero Provider Component
 */
export const SolutionHeroProvider = ({ children, initialSolutions = DEFAULT_SOLUTIONS }: SolutionHeroProviderProps) => {
  const [solutions, setSolutions] = useState<SolutionItem[]>(initialSolutions);
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextValue: SolutionHeroContextType = {
    solutions,
    selectedSolution,
    isLoading,
    error,
    setSolutions,
    setSelectedSolution,
    setLoading: setIsLoading,
    setError,
  };

  return React.createElement(
    SolutionHeroContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing solution hero context
 */
export const useSolutionHero = (): SolutionHeroContextType => {
  const context = useContext(SolutionHeroContext);
  if (!context) {
    throw new Error('useSolutionHero must be used within a SolutionHeroProvider');
  }
  return context;
};

/**
 * Hook for managing solution interactions
 */
export const useSolutionInteractions = () => {
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);
  const [clickedSolution, setClickedSolution] = useState<string | null>(null);

  const handleSolutionHover = useCallback((solutionId: string | null) => {
    setHoveredSolution(solutionId);
  }, []);

  const handleSolutionClick = useCallback((solution: SolutionItem) => {
    setClickedSolution(solution.id);

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'solution_clicked', {
        solution_id: solution.id,
        solution_title: solution.title,
      });
    }
  }, []);

  return {
    hoveredSolution,
    clickedSolution,
    handleSolutionHover,
    handleSolutionClick,
  };
};

/**
 * Hook for solution search and filtering
 */
export const useSolutionSearch = (solutions: SolutionItem[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSolutions, setFilteredSolutions] = useState(solutions);
  const [sortBy, setSortBy] = useState<'default' | 'priority' | 'alphabetical'>('priority');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const filtered = filterSolutions(solutions, term);
      const sorted = sortBy === 'priority'
        ? sortSolutionsByPriority(filtered)
        : sortBy === 'alphabetical'
        ? filtered.sort((a, b) => a.title.localeCompare(b.title))
        : filtered;

      setFilteredSolutions(sorted);
    }, 300),
    [solutions, sortBy]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((sortType: 'default' | 'priority' | 'alphabetical') => {
    setSortBy(sortType);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setFilteredSolutions(solutions);
  }, [solutions]);

  return {
    searchTerm,
    filteredSolutions,
    sortBy,
    handleSearch,
    handleSort,
    clearSearch,
  };
};

/**
 * Hook for solution animations
 */
export const useSolutionAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const itemId = entry.target.getAttribute('data-solution-id');
            if (itemId) {
              setAnimatedItems(prev => new Set([...prev, itemId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-solution-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isItemAnimated = useCallback((itemId: string) => {
    return animatedItems.has(itemId);
  }, [animatedItems]);

  return {
    isVisible,
    isItemAnimated,
  };
};

/**
 * Hook for responsive behavior
 */
export const useResponsiveSolutions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);

      if (width < 768) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    isMobile,
    isTablet,
    columns,
  };
};

/**
 * Hook for solution card focus management
 */
export const useSolutionFocus = () => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent, solutionsCount: number) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % solutionsCount);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + solutionsCount) % solutionsCount);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(solutionsCount - 1);
        break;
      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  }, []);

  const focusCard = useCallback((index: number) => {
    const card = document.querySelector(`[data-solution-index="${index}"]`) as HTMLElement;
    if (card) {
      card.focus();
    }
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0) {
      focusCard(focusedIndex);
    }
  }, [focusedIndex, focusCard]);

  return {
    focusedIndex,
    handleKeyDown,
    setFocusedIndex,
  };
};

/**
 * Hook for solution performance tracking
 */
export const useSolutionAnalytics = () => {
  const [interactions, setInteractions] = useState<Record<string, number>>({});
  const [viewTime, setViewTime] = useState<Record<string, number>>({});

  const trackInteraction = useCallback((solutionId: string, type: 'view' | 'hover' | 'click') => {
    setInteractions(prev => ({
      ...prev,
      [`${solutionId}_${type}`]: (prev[`${solutionId}_${type}`] || 0) + 1,
    }));
  }, []);

  const trackViewTime = useCallback((solutionId: string, duration: number) => {
    setViewTime(prev => ({
      ...prev,
      [solutionId]: (prev[solutionId] || 0) + duration,
    }));
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      interactions,
      viewTime,
      totalInteractions: Object.values(interactions).reduce((sum, count) => sum + count, 0),
      averageViewTime: Object.values(viewTime).reduce((sum, time) => sum + time, 0) / Object.keys(viewTime).length || 0,
    };
  }, [interactions, viewTime]);

  return {
    trackInteraction,
    trackViewTime,
    getAnalytics,
  };
};
