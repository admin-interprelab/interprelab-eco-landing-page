/**
 * Navigation Component Types
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href?: string;
  submenu?: NavSubItem[];
  icon?: LucideIcon;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
}

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
}

export interface NavigationProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'transparent';
  showLogo?: boolean;
  showAuth?: boolean;
  showMobileMenu?: boolean;
  customNavItems?: NavItem[];
  onNavItemClick?: (item: NavItem | NavSubItem) => void;
}

export interface NavigationLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'minimal';
  onClick?: () => void;
}

export interface NavigationMenuProps {
  items: NavItem[];
  className?: string;
  variant?: 'desktop' | 'mobile';
  onItemClick?: (item: NavItem | NavSubItem) => void;
}

export interface NavigationAuthProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
  showDashboard?: boolean;
  showSettings?: boolean;
  onSignOut?: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  className?: string;
  onItemClick?: (item: NavItem | NavSubItem) => void;
}

export interface NavigationContextType {
  isOpen: boolean;
  activeItem: string | null;
  setIsOpen: (open: boolean) => void;
  setActiveItem: (item: string | null) => void;
  navItems: NavItem[];
  setNavItems: (items: NavItem[]) => void;
}

export interface NavigationProviderProps {
  children: ReactNode;
  initialNavItems?: NavItem[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
}
