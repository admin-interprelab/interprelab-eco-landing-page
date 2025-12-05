/**
 * Utility functions for Features Components
 */

import type { Feature, FeatureCategory } from './types';
import { FEATURE_CATEGORIES } from './constants';

/**
 * Get category configuration for a feature category
 */
export const getCategoryConfig = (category: FeatureCategory) => {
  return FEATURE_CATEGORIES[category] || FEATURE_CATEGORIES['quality-assurance'];
};

/**
 * Get category color class for a feature category
 */
export const getCategoryColor = (category: FeatureCategory): string => {
  return getCategoryConfig(category).color;
};

/**
 * Get category label for a feature category
 */
export const getCategoryLabel = (category: FeatureCategory): string => {
  return getCategoryConfig(category).label;
};

/**
 * Get category icon for a feature category
 */
export const getCategoryIcon = (category: FeatureCategory) => {
  return getCategoryConfig(category).icon;
};

/**
 * Filter features by category
 */
export const filterFeaturesByCategory = (
  features: Feature[],
  category: FeatureCategory
): Feature[] => {
  return features.filter(feature => feature.category === category);
};

/**
 * Filter features by priority
 */
export const filterFeaturesByPriority = (
  features: Feature[],
  priority: 'high' | 'medium' | 'low'
): Feature[] => {
  return features.filter(feature => feature.priority === priority);
};

/**
 * Get unique categories from features array
 */
export const getUniqueCategories = (features: Feature[]): FeatureCategory[] => {
  const categories = features
    .map(feature => feature.category)
    .filter((category): category is FeatureCategory => category !== undefined);

  return Array.from(new Set(categories));
};

/**
 * Sort features by priority (high -> medium -> low)
 */
export const sortFeaturesByPriority = (features: Feature[]): Feature[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  return [...features].sort((a, b) => {
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];
    return bPriority - aPriority;
  });
};

/**
 * Group features by category
 */
export const groupFeaturesByCategory = (
  features: Feature[]
): Record<FeatureCategory, Feature[]> => {
  const grouped = {} as Record<FeatureCategory, Feature[]>;

  features.forEach(feature => {
    if (feature.category) {
      if (!grouped[feature.category]) {
        grouped[feature.category] = [];
      }
      grouped[feature.category].push(feature);
    }
  });

  return grouped;
};

/**
 * Calculate animation delay for staggered animations
 */
export const calculateAnimationDelay = (
  index: number,
  baseDelay: number = 100
): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Generate grid column classes based on configuration
 */
export const generateGridClasses = (columns: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}): string => {
  const classes = [];

  if (columns.mobile) {
    classes.push(`grid-cols-${columns.mobile}`);
  }

  if (columns.tablet) {
    classes.push(`md:grid-cols-${columns.tablet}`);
  }

  if (columns.desktop) {
    classes.push(`lg:grid-cols-${columns.desktop}`);
  }

  return classes.join(' ');
};

/**
 * Check if feature is new
 */
export const isNewFeature = (feature: Feature): boolean => {
  return feature.isNew === true;
};

/**
 * Check if feature is coming soon
 */
export const isComingSoonFeature = (feature: Feature): boolean => {
  return feature.comingSoon === true;
};

/**
 * Get feature status badge text
 */
export const getFeatureStatusBadge = (feature: Feature): string | null => {
  if (isNewFeature(feature)) return 'New';
  if (isComingSoonFeature(feature)) return 'Coming Soon';
  return null;
};

/**
 * Get feature status badge variant
 */
export const getFeatureStatusBadgeVariant = (feature: Feature): 'default' | 'secondary' | 'outline' => {
  if (isNewFeature(feature)) return 'default';
  if (isComingSoonFeature(feature)) return 'secondary';
  return 'outline';
};

/**
 * Truncate feature description
 */
export const truncateDescription = (
  description: string,
  maxLength: number = 120
): string => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

/**
 * Generate feature card ID for accessibility
 */
export const generateFeatureCardId = (feature: Feature): string => {
  return `feature-card-${feature.id}`;
};

/**
 * Generate feature card aria-label
 */
export const generateFeatureCardAriaLabel = (feature: Feature): string => {
  const statusText = getFeatureStatusBadge(feature);
  const categoryText = feature.category ? getCategoryLabel(feature.category) : '';

  let label = `${feature.title}. ${feature.description}`;

  if (categoryText) {
    label += ` Category: ${categoryText}.`;
  }

  if (statusText) {
    label += ` Status: ${statusText}.`;
  }

  return label;
};

/**
 * Check if feature matches search query
 */
export const matchesSearchQuery = (feature: Feature, query: string): boolean => {
  if (!query.trim()) return true;

  const searchText = `${feature.title} ${feature.description}`.toLowerCase();
  const searchQuery = query.toLowerCase();

  return searchText.includes(searchQuery);
};

/**
 * Filter features by search query
 */
export const filterFeaturesBySearch = (
  features: Feature[],
  query: string
): Feature[] => {
  return features.filter(feature => matchesSearchQuery(feature, query));
};

/**
 * Get responsive image URL
 */
export const getResponsiveImageUrl = (
  baseUrl: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const sizeMap = {
    small: '_sm',
    medium: '_md',
    large: '_lg',
  };

  const extension = baseUrl.split('.').pop();
  const baseName = baseUrl.replace(`.${extension}`, '');

  return `${baseName}${sizeMap[size]}.${extension}`;
};
