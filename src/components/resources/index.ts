/**
 * Resources Components Barrel Export
 */

// Components
export { ResourceCard } from './ResourceCard';
export { ProfessionalResourceCard } from './ProfessionalResourceCard';
export { CommunityFeatureCard } from './CommunityFeatureCard';
export { ResourceFilter } from './ResourceFilter';
export { ResourceModal } from './ResourceModal';

// Types
export type {
  ResourceItem,
  ResourceCategory,
  ProfessionalResource,
  CommunityFeature,
  ResourcesSection,
  ResourceCardProps,
  ProfessionalResourceCardProps,
  CommunityFeatureCardProps,
  ResourcesProps,
  ResourceModalProps,
  ResourceFilterProps,
} from './types';

// Constants
export {
  RESOURCE_CATEGORIES,
  PROFESSIONAL_RESOURCES,
  COMMUNITY_FEATURES,
  DEFAULT_RESOURCES_SECTION,
  ANIMATION_CONFIG,
  RESOURCE_TYPE_CONFIG,
  FILE_FORMAT_ICONS,
} from './constants';

// Utils
export {
  isExternalResource,
  getResourceTypeConfig,
  getFileFormatIcon,
  formatFileSize,
  getDownloadFilename,
  isRecentlyUpdated,
  filterResourcesByType,
  filterResourcesBySearch,
  sortResourcesByRelevance,
  groupResourcesByType,
  getUniqueResourceTypes,
  generateResourceCardId,
  generateResourceCardAriaLabel,
  isValidResourceUrl,
  getResourceDomain,
  requiresAuthentication,
  getResourceAccessibilityScore,
  calculateAnimationDelay,
  truncateText,
  formatDate,
  getRelativeTime,
  isDownloadable,
  getResourceActionLabel,
} from './utils';

// Hooks
export {
  useResourceFiltering,
  useResourceDownloads,
  useResourceFavorites,
  useResourceModal,
  useResourceCategories,
  useResourceAnalytics,
  useResourceKeyboardShortcuts,
} from './hooks';
