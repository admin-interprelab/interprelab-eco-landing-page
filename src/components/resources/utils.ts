/**
 * Utility functions for Resources Components
 */

import type { ResourceCategory, ProfessionalResource, ResourceItem } from './types';
import { RESOURCE_TYPE_CONFIG, FILE_FORMAT_ICONS } from './constants';

/**
 * Check if a resource is external
 */
export const isExternalResource = (resource: ProfessionalResource | ResourceItem): boolean => {
  if ('url' in resource && resource.url) {
    return resource.url.startsWith('http://') || resource.url.startsWith('https://');
  }
  if ('type' in resource) {
    return resource.type === 'external';
  }
  return false;
};

/**
 * Get resource type configuration
 */
export const getResourceTypeConfig = (type: keyof typeof RESOURCE_TYPE_CONFIG) => {
  return RESOURCE_TYPE_CONFIG[type] || RESOURCE_TYPE_CONFIG.guidelines;
};

/**
 * Get file format icon
 */
export const getFileFormatIcon = (format: keyof typeof FILE_FORMAT_ICONS) => {
  return FILE_FORMAT_ICONS[format] || FILE_FORMAT_ICONS.html;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get resource download filename
 */
export const getDownloadFilename = (resource: ProfessionalResource): string => {
  if (resource.downloadUrl) {
    const url = new URL(resource.downloadUrl);
    const pathname = url.pathname;
    const filename = pathname.split('/').pop();

    if (filename && filename.includes('.')) {
      return filename;
    }
  }

  // Generate filename from title and format
  const cleanTitle = resource.title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  const extension = resource.fileFormat || 'pdf';
  return `${cleanTitle}.${extension}`;
};

/**
 * Check if resource is recently updated
 */
export const isRecentlyUpdated = (resource: ProfessionalResource, daysThreshold: number = 90): boolean => {
  if (!resource.lastUpdated) return false;

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - resource.lastUpdated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold;
};

/**
 * Filter resources by type
 */
export const filterResourcesByType = (
  resources: ProfessionalResource[],
  type: ProfessionalResource['type']
): ProfessionalResource[] => {
  return resources.filter(resource => resource.type === type);
};

/**
 * Filter resources by search query
 */
export const filterResourcesBySearch = (
  resources: ProfessionalResource[],
  query: string
): ProfessionalResource[] => {
  if (!query.trim()) return resources;

  const searchTerm = query.toLowerCase();

  return resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm) ||
    resource.organization.toLowerCase().includes(searchTerm) ||
    resource.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Sort resources by relevance
 */
export const sortResourcesByRelevance = (
  resources: ProfessionalResource[],
  query?: string
): ProfessionalResource[] => {
  if (!query) {
    // Default sort: official first, then by last updated
    return [...resources].sort((a, b) => {
      if (a.isOfficial && !b.isOfficial) return -1;
      if (!a.isOfficial && b.isOfficial) return 1;

      if (a.lastUpdated && b.lastUpdated) {
        return b.lastUpdated.getTime() - a.lastUpdated.getTime();
      }

      return a.title.localeCompare(b.title);
    });
  }

  // Sort by search relevance
  const searchTerm = query.toLowerCase();

  return [...resources].sort((a, b) => {
    const aScore = getSearchScore(a, searchTerm);
    const bScore = getSearchScore(b, searchTerm);

    return bScore - aScore;
  });
};

/**
 * Calculate search relevance score
 */
const getSearchScore = (resource: ProfessionalResource, searchTerm: string): number => {
  let score = 0;

  // Title match (highest weight)
  if (resource.title.toLowerCase().includes(searchTerm)) {
    score += 10;
    if (resource.title.toLowerCase().startsWith(searchTerm)) {
      score += 5;
    }
  }

  // Organization match
  if (resource.organization.toLowerCase().includes(searchTerm)) {
    score += 5;
  }

  // Description match
  if (resource.description.toLowerCase().includes(searchTerm)) {
    score += 3;
  }

  // Official resource bonus
  if (resource.isOfficial) {
    score += 2;
  }

  // Recent update bonus
  if (isRecentlyUpdated(resource)) {
    score += 1;
  }

  return score;
};

/**
 * Group resources by type
 */
export const groupResourcesByType = (
  resources: ProfessionalResource[]
): Record<string, ProfessionalResource[]> => {
  return resources.reduce((groups, resource) => {
    const type = resource.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(resource);
    return groups;
  }, {} as Record<string, ProfessionalResource[]>);
};

/**
 * Get unique resource types
 */
export const getUniqueResourceTypes = (resources: ProfessionalResource[]): string[] => {
  const types = resources.map(resource => resource.type);
  return Array.from(new Set(types));
};

/**
 * Generate resource card ID for accessibility
 */
export const generateResourceCardId = (resource: ProfessionalResource): string => {
  return `resource-card-${resource.id}`;
};

/**
 * Generate resource card aria-label
 */
export const generateResourceCardAriaLabel = (resource: ProfessionalResource): string => {
  const typeLabel = getResourceTypeConfig(resource.type).label;
  const orgText = resource.organization ? ` by ${resource.organization}` : '';
  const formatText = resource.fileFormat ? ` (${resource.fileFormat.toUpperCase()})` : '';

  return `${resource.title}${orgText}. ${typeLabel} resource${formatText}. ${resource.description}`;
};

/**
 * Validate resource URL
 */
export const isValidResourceUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get resource domain
 */
export const getResourceDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
};

/**
 * Check if resource requires authentication
 */
export const requiresAuthentication = (resource: ProfessionalResource): boolean => {
  // This could be enhanced with actual logic to detect auth requirements
  const authDomains = ['portal.', 'member.', 'secure.', 'login.'];
  const domain = getResourceDomain(resource.url);

  return authDomains.some(authDomain => domain.includes(authDomain));
};

/**
 * Get resource accessibility score
 */
export const getResourceAccessibilityScore = (resource: ProfessionalResource): number => {
  let score = 0;

  // Official resources are typically more accessible
  if (resource.isOfficial) score += 3;

  // PDF format is generally accessible
  if (resource.fileFormat === 'pdf') score += 2;

  // HTML is most accessible
  if (resource.fileFormat === 'html') score += 3;

  // Recent updates suggest maintained accessibility
  if (isRecentlyUpdated(resource)) score += 1;

  // Download availability
  if (resource.downloadUrl) score += 1;

  return score;
};

/**
 * Calculate animation delay for staggered animations
 */
export const calculateAnimationDelay = (index: number, baseDelay: number = 100): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Truncate text for display
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;

  return `${Math.ceil(diffDays / 365)} years ago`;
};

/**
 * Check if resource is downloadable
 */
export const isDownloadable = (resource: ProfessionalResource): boolean => {
  return Boolean(resource.downloadUrl && resource.fileFormat !== 'html');
};

/**
 * Get resource action label
 */
export const getResourceActionLabel = (resource: ProfessionalResource): string => {
  if (isDownloadable(resource)) {
    return 'Download';
  }

  if (isExternalResource(resource)) {
    return 'Visit Site';
  }

  return 'View';
};
