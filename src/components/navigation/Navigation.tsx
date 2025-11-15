/**
 * Navigation Main Component
 */

import { NavigationLogo } from './NavigationLogo';
import { NavigationMenu } from './NavigationMenu';
import { NavigationAuth } from './NavigationAuth';
import { MobileMenu } from './MobileMenu';
import type { NavigationProps, NavItem, NavSubItem } from './types';
import { DEFAULT_NAV_ITEMS } from './constants';
import { getNavigationVariantClasses, generateNavAnalytics } from './utils';
import { useMobileMenu, useNavigationAnalytics } from './hooks';

/**
 * Navigation Component
 *
 * Main navigation bar with:
 * - Logo and branding
 * - Desktop navigation menu
 * - Authentication buttons
 * - Mobile menu
 * - Analytics tracking
 * - Responsive design
 */
export const Navigation = ({
  className = '',
  variant = 'default',
  showLogo = true,
  showAuth = true,
  showMobileMenu = true,
  customNavItems = DEFAULT_NAV_ITEMS,
  onNavItemClick,
}: NavigationProps) => {
  const { isOpen, toggle } = useMobileMenu();
  const { trackClick } = useNavigationAnalytics();

  const navClasses = getNavigationVariantClasses(variant);

  const handleNavItemClick = (item: NavItem | NavSubItem) => {
    // Track analytics
    // Track with analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', analyticsData.event, analyticsData);
    }
  };

  const handleMobileItemClick = (item: NavItem | NavSubItem) => {
    // Track analytics for mobile
    const analyticsData = generateNavAnalytics(item, 'mobile');
    trackClick(item.href || '', item.label, 'mobile');

    // Call custom handler if provided
    if (onNavItemClick) {
      onNavItemClick(item);
    }

    // Track with analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', analyticsData.event, analyticsData);
    }
  };

  return (
    <nav
      className={`${navClasses} ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {showLogo && (
            <NavigationLogo
              variant={variant === 'minimal' ? 'minimal' : 'default'}
            />
          )}

          {/* Desktop Navigation */}
          <NavigationMenu
            items={customNavItems}
            variant="desktop"
            onItemClick={handleNavItemClick}
          />

          {/* Desktop Auth */}
          {showAuth && (
            <NavigationAuth variant="desktop" />
          )}

          {/* Mobile Menu */}
          {showMobileMenu && (
            <MobileMenu
              isOpen={isOpen}
              onOpenChange={toggle}
              items={customNavItems}
              onItemClick={handleMobileItemClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
