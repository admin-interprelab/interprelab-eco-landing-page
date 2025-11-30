/**
 * Stats Section Component Hooks
 */

import React, { useState, useEffect, useCallback, useContext, createContext, useRef } from 'react';
import type { StatItem, StatsContextType, StatsProviderProps } from './types';
import { DEFAULT_STATS, ANIMATION_CONFIG } from './constants';
import { parseStatValue, animateCountUp, isInViewport, debounce } from './utils';

// Stats Context
const StatsContext = createContext<StatsContextType | null>(null);

/**
 * Stats Provider Component
 */
export const StatsProvider = ({
  children,
  initialStats = DEFAULT_STATS
}: StatsProviderProps) => {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextValue: StatsContextType = {
    stats,
    selectedStat,
    isLoading,
    error,
    setStats,
    setSelectedStat,
    setLoading: setIsLoading,
    setError,
  };

  return React.createElement(
    StatsContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * Hook for accessing stats context
 */
export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

/**
 * Hook for stats animations
 */
export const useStatsAnimations = (stats: StatItem[], animateOnScroll: boolean = true) => {
  const [animatedStats, setAnimatedStats] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(!animateOnScroll);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const statsRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!animateOnScroll) {
      // Animate all stats immediately
      const allStatIds = new Set(stats.map(stat => stat.id));
      setAnimatedStats(allStatIds);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const statId = entry.target.getAttribute('data-stat-id');
            if (statId) {
              setAnimatedStats(prev => new Set([...prev, statId]));

              // Animate count up for numeric values
              const stat = stats.find(s => s.id === statId);
              if (stat?.animated) {
                const valueElement = entry.target.querySelector('[data-stat-value]') as HTMLElement;
                if (valueElement) {
                  const numericValue = parseStatValue(stat.value);
                  const suffix = stat.suffix || '';
                  animateCountUp(valueElement, 0, numericValue, ANIMATION_CONFIG.countUpDuration, suffix);
                }
              }
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all stat elements
    const elements = document.querySelectorAll('[data-stat-id]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [stats, animateOnScroll]);

  const isStatAnimated = useCallback((statId: string) => {
    return animatedStats.has(statId);
  }, [animatedStats]);

  const registerStatRef = useCallback((statId: string, element: HTMLElement | null) => {
    if (element) {
      statsRefs.current.set(statId, element);
    } else {
      statsRefs.current.delete(statId);
    }
  }, []);

  return {
    isVisible,
    isStatAnimated,
    registerStatRef,
  };
};

/**
 * Hook for stats interactions
 */
export const useStatsInteractions = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [clickedStat, setClickedStat] = useState<string | null>(null);

  const handleStatHover = useCallback((statId: string | null) => {
    setHoveredStat(statId);
  }, []);

  const handleStatClick = useCallback((stat: StatItem) => {
    setClickedStat(stat.id);

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'stat_clicked', {
        stat_id: stat.id,
        stat_label: stat.label,
        stat_value: stat.value,
      });
    }
  }, []);

  return {
    hoveredStat,
    clickedStat,
    handleStatHover,
    handleStatClick,
  };
};

/**
 * Hook for responsive stats layout
 */
export const useStatsResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [columns, setColumns] = useState<2 | 3 | 4>(4);

  useEffect(() => {
    const checkScreenSize = debounce(() => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);

      if (width < 768) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    }, 150);

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
 * Hook for stats filtering and search
 */
export const useStatsFilter = (stats: StatItem[]) => {
  const [filteredStats, setFilteredStats] = useState(stats);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyAnimated, setShowOnlyAnimated] = useState(false);
  const [showOnlyWithTrends, setShowOnlyWithTrends] = useState(false);

  const debouncedFilter = useCallback(
    debounce(() => {
      let filtered = [...stats];

      // Filter by search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(stat =>
          stat.label.toLowerCase().includes(term) ||
          stat.description?.toLowerCase().includes(term) ||
          stat.value.toString().toLowerCase().includes(term)
        );
      }

      // Filter by animated
      if (showOnlyAnimated) {
        filtered = filtered.filter(stat => stat.animated);
      }

      // Filter by trends
      if (showOnlyWithTrends) {
        filtered = filtered.filter(stat => stat.trend);
      }

      setFilteredStats(filtered);
    }, 300),
    [stats, searchTerm, showOnlyAnimated, showOnlyWithTrends]
  );

  useEffect(() => {
    debouncedFilter();
  }, [debouncedFilter]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setShowOnlyAnimated(false);
    setShowOnlyWithTrends(false);
    setFilteredStats(stats);
  }, [stats]);

  return {
    filteredStats,
    searchTerm,
    showOnlyAnimated,
    showOnlyWithTrends,
    setSearchTerm,
    setShowOnlyAnimated,
    setShowOnlyWithTrends,
    clearFilters,
  };
};

/**
 * Hook for stats analytics
 */
export const useStatsAnalytics = () => {
  const [viewedStats, setViewedStats] = useState<Set<string>>(new Set());
  const [interactionCounts, setInteractionCounts] = useState<Record<string, number>>({});

  const trackView = useCallback((statId: string) => {
    setViewedStats(prev => new Set([...prev, statId]));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'stat_viewed', {
        stat_id: statId,
      });
    }
  }, []);

  const trackInteraction = useCallback((statId: string, type: 'click' | 'hover') => {
    const key = `${statId}_${type}`;
    setInteractionCounts(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', `stat_${type}`, {
        stat_id: statId,
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      totalViewed: viewedStats.size,
      viewedStats: Array.from(viewedStats),
      interactionCounts,
      totalInteractions: Object.values(interactionCounts).reduce((sum, count) => sum + count, 0),
    };
  }, [viewedStats, interactionCounts]);

  return {
    trackView,
    trackInteraction,
    getAnalytics,
  };
};
