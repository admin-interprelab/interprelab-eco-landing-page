/**
 * Utility functions for Footer Components
 */

import type { FooterLink, ContactInfo, SocialLink, CertificationBadge } from './types';

/**
 * Check if a link is external
 */
export const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:');
};

/**
 * Get link target attribute
 */
export const getLinkTarget = (link: FooterLink): string | undefined => {
  return link.external || isExternalLink(link.href) ? '_blank' : undefined;
};

/**
 * Get link rel attribute
 */
export const getLinkRel = (link: FooterLink): string | undefined => {
  return link.external || isExternalLink(link.href) ? 'noopener noreferrer' : undefined;
};

/**
 * Format contact value for display
 */
export const formatContactValue = (contact: ContactInfo): string => {
  switch (contact.type) {
    case 'email':
      return contact.value;
    case 'phone':
      return contact.value;
    case 'address':
      return contact.value;
    case 'website':
      return contact.value.replace(/^https?:\/\//, '');
    default:
      return contact.value;
  }
};

/**
 * Get contact href with proper protocol
 */
export const getContactHref = (contact: ContactInfo): string | undefined => {
  if (contact.href) return contact.href;

  switch (contact.type) {
    case 'email':
      return `mailto:${contact.value}`;
    case 'phone':
      return `tel:${contact.value.replace(/\D/g, '')}`;
    case 'website':
      return contact.value.startsWith('http') ? contact.value : `https://${contact.value}`;
    default:
      return undefined;
  }
};

/**
 * Generate social link aria-label
 */
export const getSocialAriaLabel = (social: SocialLink): string => {
  return social.label || `Visit our ${social.platform} page`;
};

/**
 * Generate contact aria-label
 */
export const getContactAriaLabel = (contact: ContactInfo): string => {
  switch (contact.type) {
    case 'email':
      return `Send email to ${contact.value}`;
    case 'phone':
      return `Call ${contact.value}`;
    case 'address':
      return `Our address: ${contact.value}`;
    case 'website':
      return `Visit our website at ${contact.value}`;
    default:
      return contact.label;
  }
};

/**
 * Generate certification badge aria-label
 */
export const getCertificationAriaLabel = (cert: CertificationBadge): string => {
  return cert.description || `${cert.label} certified`;
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
 * Generate footer section ID for accessibility
 */
export const generateSectionId = (sectionTitle: string): string => {
  return `footer-section-${sectionTitle.toLowerCase().replace(/\s+/g, '-')}`;
};

/**
 * Generate footer link ID for accessibility
 */
export const generateLinkId = (sectionId: string, linkLabel: string): string => {
  return `${sectionId}-${linkLabel.toLowerCase().replace(/\s+/g, '-')}`;
};

/**
 * Check if footer should show certifications
 */
export const shouldShowCertifications = (
  certifications: CertificationBadge[],
  showCertifications: boolean = true
): boolean => {
  return showCertifications && certifications.length > 0;
};

/**
 * Check if footer should show social links
 */
export const shouldShowSocial = (
  social: SocialLink[],
  showSocial: boolean = true
): boolean => {
  return showSocial && social.length > 0;
};

/**
 * Filter links by type
 */
export const filterLinksByType = (
  links: FooterLink[],
  external: boolean
): FooterLink[] => {
  return links.filter(link =>
    external ? (link.external || isExternalLink(link.href)) : !(link.external || isExternalLink(link.href))
  );
};

/**
 * Group contact info by type
 */
export const groupContactByType = (
  contacts: ContactInfo[]
): Record<string, ContactInfo[]> => {
  return contacts.reduce((acc, contact) => {
    if (!acc[contact.type]) {
      acc[contact.type] = [];
    }
    acc[contact.type].push(contact);
    return acc;
  }, {} as Record<string, ContactInfo[]>);
};

/**
 * Get footer layout classes
 */
export const getFooterLayoutClasses = (variant: 'default' | 'minimal' | 'detailed' = 'default'): string => {
  const layouts = {
    default: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
    minimal: 'grid-cols-1 md:grid-cols-3 gap-6',
    detailed: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8',
  };

  return layouts[variant];
};

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return phoneRegex.test(cleanPhone);
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
};

/**
 * Get current year for copyright
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Update copyright year
 */
export const updateCopyrightYear = (copyright: string): string => {
  const currentYear = getCurrentYear();
  return copyright.replace(/©\s*\d{4}/, `© ${currentYear}`);
};

/**
 * Truncate text for mobile display
 */
export const truncateForMobile = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Get optimal number of columns for screen size
 */
export const getOptimalColumns = (screenWidth: number): number => {
  if (screenWidth < 768) return 1;
  if (screenWidth < 1024) return 2;
  return 4;
};
