/**
 * Custom hooks for Footer Components
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FooterLink, ContactInfo, SocialLink } from './types';
import {
  filterLinksByType,
  groupContactByType,
  getCurrentYear,
  getOptimalColumns
} from './utils';

/**
 * Hook for managing footer responsive layout
 */
export const useFooterLayout = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenSize('mobile');
        setColumns(1);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setColumns(2);
      } else {
        setScreenSize('desktop');
        setColumns(4);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Get optimal columns for current screen size
  const getOptimalColumnsForScreen = useCallback(() => {
    return getOptimalColumns(window.innerWidth);
  }, []);

  // Check if current screen is mobile
  const isMobile = useMemo(() => screenSize === 'mobile', [screenSize]);

  // Check if current screen is tablet
  const isTablet = useMemo(() => screenSize === 'tablet', [screenSize]);

  // Check if current screen is desktop
  const isDesktop = useMemo(() => screenSize === 'desktop', [screenSize]);

  return {
    screenSize,
    columns,
    isMobile,
    isTablet,
    isDesktop,
    getOptimalColumnsForScreen,
  };
};

/**
 * Hook for managing footer link interactions
 */
export const useFooterLinks = (links: FooterLink[]) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  // Separate internal and external links
  const { internalLinks, externalLinks } = useMemo(() => {
    return {
      internalLinks: filterLinksByType(links, false),
      externalLinks: filterLinksByType(links, true),
    };
  }, [links]);

  // Handle link hover
  const handleLinkHover = useCallback((linkId: string | null) => {
    setHoveredLink(linkId);
  }, []);

  // Handle link click
  const handleLinkClick = useCallback((linkId: string) => {
    setClickedLink(linkId);

    // Reset clicked state after animation
    setTimeout(() => {
      setClickedLink(null);
    }, 200);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((
    event: React.KeyboardEvent,
    link: FooterLink,
    onClick?: (link: FooterLink) => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLinkClick(link.id);
      onClick?.(link);
    }
  }, [handleLinkClick]);

  return {
    hoveredLink,
    clickedLink,
    internalLinks,
    externalLinks,
    handleLinkHover,
    handleLinkClick,
    handleKeyDown,
  };
};

/**
 * Hook for managing contact information
 */
export const useFooterContact = (contacts: ContactInfo[]) => {
  // Group contacts by type
  const groupedContacts = useMemo(() => {
    return groupContactByType(contacts);
  }, [contacts]);

  // Get primary contact methods
  const primaryContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.type === 'email' || contact.type === 'phone'
    );
  }, [contacts]);

  // Get location information
  const locationContacts = useMemo(() => {
    return contacts.filter(contact => contact.type === 'address');
  }, [contacts]);

  // Handle contact click
  const handleContactClick = useCallback((contact: ContactInfo) => {
    // Track contact interaction
    console.log('Contact clicked:', contact.type, contact.value);
  }, []);

  return {
    groupedContacts,
    primaryContacts,
    locationContacts,
    handleContactClick,
  };
};

/**
 * Hook for managing social media links
 */
export const useSocialLinks = (socialLinks: SocialLink[]) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Handle social link hover
  const handleSocialHover = useCallback((socialId: string | null) => {
    setHoveredSocial(socialId);
  }, []);

  // Handle social link click
  const handleSocialClick = useCallback((social: SocialLink) => {
    // Track social media interaction
    console.log('Social link clicked:', social.platform, social.href);
  }, []);

  // Get social links by platform type
  const getSocialByPlatform = useCallback((platform: string) => {
    return socialLinks.find(social =>
      social.platform.toLowerCase() === platform.toLowerCase()
    );
  }, [socialLinks]);

  return {
    hoveredSocial,
    handleSocialHover,
    handleSocialClick,
    getSocialByPlatform,
  };
};

/**
 * Hook for managing footer animations
 */
export const useFooterAnimations = (enabled: boolean = true) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(enabled);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

  // Mark section as visible for staggered animations
  const markSectionVisible = useCallback((sectionId: string) => {
    setVisibleSections(prev => new Set(prev).add(sectionId));
  }, []);

  // Get animation delay for a section
  const getAnimationDelay = useCallback((index: number, baseDelay: number = 100) => {
    if (!animationsEnabled) return '0ms';
    return `${index * baseDelay}ms`;
  }, [animationsEnabled]);

  // Get animation classes for a section
  const getAnimationClasses = useCallback((sectionId: string) => {
    if (!animationsEnabled) return '';

    const baseClasses = 'animate-fade-in';
    const isVisible = visibleSections.has(sectionId);

    return isVisible ? baseClasses : `${baseClasses} opacity-0`;
  }, [animationsEnabled, visibleSections]);

  return {
    animationsEnabled,
    visibleSections,
    markSectionVisible,
    getAnimationDelay,
    getAnimationClasses,
  };
};

/**
 * Hook for managing footer copyright year
 */
export const useFooterCopyright = (initialCopyright: string) => {
  const [copyright, setCopyright] = useState(initialCopyright);

  // Update copyright year automatically
  useEffect(() => {
    const currentYear = getCurrentYear();
    const yearRegex = /©\s*\d{4}/;

    if (yearRegex.test(initialCopyright)) {
      const updatedCopyright = initialCopyright.replace(yearRegex, `© ${currentYear}`);
      setCopyright(updatedCopyright);
    }
  }, [initialCopyright]);

  return copyright;
};

/**
 * Hook for managing footer visibility and scroll behavior
 */
export const useFooterVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if footer is visible
      const footerVisible = scrollTop + windowHeight >= documentHeight - 100;
      setIsVisible(footerVisible);

      // Check if near bottom of page
      const nearBottom = scrollTop + windowHeight >= documentHeight - 500;
      setIsNearBottom(nearBottom);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isVisible,
    isNearBottom,
  };
};

/**
 * Hook for managing footer theme and appearance
 */
export const useFooterTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Get theme-specific classes
  const getThemeClasses = useCallback(() => {
    return {
      background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      text: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      muted: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    };
  }, [isDarkMode]);

  return {
    isDarkMode,
    getThemeClasses,
  };
};
