/**
 * Custom hooks for Resources Components
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ProfessionalResource, ResourceCategory } from './types';
import {
  filterResourcesBySearch,
  filterResourcesByType,
  sortResourcesByRelevance,
  getUniqueResourceTypes
} from './utils';

/**
 * Hook for managing resource filtering and search
 */
export const useResourceFiltering = (resources: ProfessionalResource[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance');

  // Get unique resource types
  const availableTypes = useMemo(() => {
    return getUniqueResourceTypes(resources);
  }, [resources]);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = [...resources];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filterResourcesBySearch(filtered, searchQuery);
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filterResourcesByType(filtered, selectedType as ProfessionalResource['type']);
    }

    // Apply sorting
    switch (sortBy) {
      case 'relevance':
        filtered = sortResourcesByRelevance(filtered, searchQuery);
        break;
      case 'date':
        filtered.sort((a, b) => {
          if (!a.lastUpdated && !b.lastUpdated) return 0;
          if (!a.lastUpdated) return 1;
          if (!b.lastUpdated) return -1;
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        });
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [resources, searchQuery, selectedType, sortBy]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedType('all');
    setSortBy('relevance');
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' || selectedType !== 'all' || sortBy !== 'relevance';
  }, [searchQuery, selectedType, sortBy]);

  return {
    // State
    searchQuery,
    selectedType,
    sortBy,

    // Derived data
    filteredResources,
    availableTypes,
    hasActiveFilters,

    // Actions
    setSearchQuery,
    setSelectedType,
    setSortBy,
    resetFilters,
  };
};

/**
 * Hook for managing resource downloads
 */
export const useResourceDownloads = () => {
  const [downloadingResources, setDownloadingResources] = useState<Set<string>>(new Set());
  const [downloadedResources, setDownloadedResources] = useState<Set<string>>(new Set());
  const [downloadErrors, setDownloadErrors] = useState<Map<string, string>>(new Map());

  // Start download
  const startDownload = useCallback(async (resource: ProfessionalResource) => {
    if (!resource.downloadUrl) return;

    setDownloadingResources(prev => new Set(prev).add(resource.id));
    setDownloadErrors(prev => {
      const newMap = new Map(prev);
      newMap.delete(resource.id);
      return newMap;
    });

    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = resource.title;
      link.target = '_blank';

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Mark as downloaded
      setDownloadedResources(prev => new Set(prev).add(resource.id));

      // Track download event
      console.log('Resource downloaded:', resource.title);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      setDownloadErrors(prev => new Map(prev).set(resource.id, errorMessage));
      console.error('Download error:', error);
    } finally {
      setDownloadingResources(prev => {
        const newSet = new Set(prev);
        newSet.delete(resource.id);
        return newSet;
      });
    }
  }, []);

  // Check if resource is downloading
  const isDownloading = useCallback((resourceId: string) => {
    return downloadingResources.has(resourceId);
  }, [downloadingResources]);

  // Check if resource is downloaded
  const isDownloaded = useCallback((resourceId: string) => {
    return downloadedResources.has(resourceId);
  }, [downloadedResources]);

  // Get download error
  const getDownloadError = useCallback((resourceId: string) => {
    return downloadErrors.get(resourceId);
  }, [downloadErrors]);

  // Clear download error
  const clearDownloadError = useCallback((resourceId: string) => {
    setDownloadErrors(prev => {
      const newMap = new Map(prev);
      newMap.delete(resourceId);
      return newMap;
    });
  }, []);

  return {
    startDownload,
    isDownloading,
    isDownloaded,
    getDownloadError,
    clearDownloadError,
  };
};

/**
 * Hook for managing resource favorites
 */
export const useResourceFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('resource-favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resource-favorites', JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = useCallback((resourceId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  }, []);

  // Check if resource is favorite
  const isFavorite = useCallback((resourceId: string) => {
    return favorites.has(resourceId);
  }, [favorites]);

  // Get favorite resources
  const getFavoriteResources = useCallback((resources: ProfessionalResource[]) => {
    return resources.filter(resource => favorites.has(resource.id));
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteResources,
    clearFavorites,
  };
};

/**
 * Hook for managing resource modal
 */
export const useResourceModal = () => {
  const [selectedResource, setSelectedResource] = useState<ProfessionalResource | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Open modal with resource
  const openModal = useCallback((resource: ProfessionalResource) => {
    setSelectedResource(resource);
    setIsOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelectedResource(null), 300); // Delay to allow animation
  }, []);

  return {
    selectedResource,
    isOpen,
    openModal,
    closeModal,
  };
};

/**
 * Hook for managing resource categories
 */
export const useResourceCategories = (categories: ResourceCategory[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Filter categories by selection
  const filteredCategories = useMemo(() => {
    if (selectedCategory === 'all') return categories;
    return categories.filter(category => category.id === selectedCategory);
  }, [categories, selectedCategory]);

  // Toggle category expansion
  const toggleCategoryExpansion = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  // Check if category is expanded
  const isCategoryExpanded = useCallback((categoryId: string) => {
    return expandedCategories.has(categoryId);
  }, [expandedCategories]);

  // Expand all categories
  const expandAllCategories = useCallback(() => {
    setExpandedCategories(new Set(categories.map(cat => cat.id)));
  }, [categories]);

  // Collapse all categories
  const collapseAllCategories = useCallback(() => {
    setExpandedCategories(new Set());
  }, []);

  return {
    selectedCategory,
    filteredCategories,
    expandedCategories,
    setSelectedCategory,
    toggleCategoryExpansion,
    isCategoryExpanded,
    expandAllCategories,
    collapseAllCategories,
  };
};

/**
 * Hook for managing resource analytics
 */
export const useResourceAnalytics = () => {
  const [viewedResources, setViewedResources] = useState<Set<string>>(new Set());
  const [resourceViews, setResourceViews] = useState<Map<string, number>>(new Map());

  // Track resource view
  const trackResourceView = useCallback((resourceId: string) => {
    setViewedResources(prev => new Set(prev).add(resourceId));
    setResourceViews(prev => {
      const newMap = new Map(prev);
      const currentViews = newMap.get(resourceId) || 0;
      newMap.set(resourceId, currentViews + 1);
      return newMap;
    });
  }, []);

  // Get view count for resource
  const getViewCount = useCallback((resourceId: string) => {
    return resourceViews.get(resourceId) || 0;
  }, [resourceViews]);

  // Check if resource was viewed
  const wasViewed = useCallback((resourceId: string) => {
    return viewedResources.has(resourceId);
  }, [viewedResources]);

  // Get most viewed resources
  const getMostViewedResources = useCallback((resources: ProfessionalResource[], limit: number = 5) => {
    return resources
      .map(resource => ({
        resource,
        views: getViewCount(resource.id),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
      .map(item => item.resource);
  }, [getViewCount]);

  return {
    trackResourceView,
    getViewCount,
    wasViewed,
    getMostViewedResources,
  };
};

/**
 * Hook for managing keyboard shortcuts
 */
export const useResourceKeyboardShortcuts = (callbacks: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrl = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;

      // Create key combination string
      let combination = '';
      if (isCtrl) combination += 'ctrl+';
      if (isShift) combination += 'shift+';
      combination += key;

      if (callbacks[combination]) {
        event.preventDefault();
        callbacks[combination]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
};
