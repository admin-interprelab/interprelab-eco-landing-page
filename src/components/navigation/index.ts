/**
 * Navigation Components Barrel Export
 */

// Main Component
export { Navigation } from './Navigation';

// Sub Components
export { NavigationLogo } from './NavigationLogo';
export { NavigationMenu } from './NavigationMenu';
export { NavigationAuth } from './NavigationAuth';
export { MobileMenu } from './MobileMenu';

// Types
export type {
  NavItem,
  NavSubItem,
  NavigationProps,
  NavigationLogoProps,
  NavigationMenuProps,
  NavigationAuthProps,
  MobileMenuProps,
  NavigationContextType,
  NavigationProviderProps,
  User,
} from './types';

// Constants
export {
  DEFAULT_NAV_ITEMS,
  LOGO_CONFIG,
  AUTH_ROUTES,
  NAVIGATION_VARIANTS,
  MOBILE_BREAKPOINT,
  ANIMATION_CONFIG,
  Z_INDEX,
} from './constants';

// Utils
export {
  getNavigationVariantClasses,
  isNavItemActive,
  getActiveNavItem,
  filterNavItems,
  getNavItemByHref,
  validateNavItem,
  generateNavAnalytics,
  isMobileDevice,
  getNavItemDepth,
  flattenNavItems,
  getNavBreadcrumbs,
  sortNavItems,
  hasNavItemBadge,
  getNavItemDisplayText,
  shouldNavigationBeSticky,
  debounce,
  throttle,
} from './utils';

// Hooks
export {
  NavigationProvider,
  useNavigation,
  useMobileMenu,
  useNavigationActive,
  useNavigationScroll,
  useNavigationKeyboard,
  useNavigationAnalytics,
  useNavigationAccessibility,
  useNavigationPerformance,
} from './hooks';
