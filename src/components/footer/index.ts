/**
 * Footer Components Barrel Export
 */

// Components
export { FooterCompany } from './FooterCompany';
export { FooterSection } from './FooterSection';
export { FooterContact } from './FooterContact';
export { FooterBottom } from './FooterBottom';
export { FooterNewsletter } from './FooterNewsletter';

// Types
export type {
  FooterLink,
  FooterSection as FooterSectionType,
  ContactInfo,
  SocialLink,
  CompanyInfo,
  LegalLink,
  CertificationBadge,
  FooterData,
  FooterProps,
  FooterSectionProps,
  FooterContactProps,
  FooterBottomProps,
  FooterCompanyProps,
} from './types';

// Constants
export {
  COMPANY_INFO,
  FOOTER_SECTIONS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  LEGAL_LINKS,
  CERTIFICATION_BADGES,
  DEFAULT_FOOTER_DATA,
  FOOTER_LAYOUTS,
  ANIMATION_DELAYS,
  BREAKPOINTS,
} from './constants';

// Utils
export {
  isExternalLink,
  getLinkTarget,
  getLinkRel,
  formatContactValue,
  getContactHref,
  getSocialAriaLabel,
  getContactAriaLabel,
  getCertificationAriaLabel,
  calculateAnimationDelay,
  generateSectionId,
  generateLinkId,
  shouldShowCertifications,
  shouldShowSocial,
  filterLinksByType,
  groupContactByType,
  getFooterLayoutClasses,
  isValidEmail,
  isValidPhone,
  formatPhoneNumber,
  getCurrentYear,
  updateCopyrightYear,
  truncateForMobile,
  isMobileDevice,
  getOptimalColumns,
} from './utils';

// Hooks
export {
  useFooterLayout,
  useFooterLinks,
  useFooterContact,
  useSocialLinks,
  useFooterAnimations,
  useFooterCopyright,
  useFooterVisibility,
  useFooterTheme,
} from './hooks';
