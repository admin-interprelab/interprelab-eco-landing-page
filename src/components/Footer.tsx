/**
 * Refactored Footer Component
 * Modular, maintainable, and following best practices
 */

import { FooterCompany, FooterSection, FooterContact, FooterBottom, DEFAULT_FOOTER_DATA } from './footer/index';
import { useFooterLayout, useFooterAnimations } from './footer/hooks';
import { getFooterLayoutClasses } from './footer/utils';
import type { FooterProps } from './footer/types';

/**
 * Main Footer Component
 *
 * A comprehensive footer that provides:
 * - Company information with logo and description
 * - Organized sections with navigation links
 * - Contact information and social media links
 * - Legal links and certification badges
 * - Responsive design with mobile-first approach
 * - Accessibility support with proper ARIA labels
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Custom hooks for responsive behavior
 * - TypeScript support with proper interfaces
 * - Animation support with reduced motion respect
 * - Performance optimizations
 * - Full keyboard navigation support
 */
export const Footer = ({
  data = DEFAULT_FOOTER_DATA,
  className = '',
  showCertifications = true,
  showSocial = true,
  variant = 'default',
}: FooterProps) => {
  const { company, sections, contact, social, legal, certifications, copyright } = data;

  const { screenSize, isMobile } = useFooterLayout();
  const { getAnimationDelay, getAnimationClasses } = useFooterAnimations();

  const layoutClasses = getFooterLayoutClasses(variant);

  return (
    <footer
      className={`relative border-t border-border/50 bg-card/50 backdrop-blur-sm ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className={`grid ${layoutClasses}`}>
          {/* Company Information */}
          <div
            className={getAnimationClasses('company')}
            style={{ animationDelay: getAnimationDelay(0) }}
          >
            <FooterCompany company={company} />
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={getAnimationClasses(section.id)}
              style={{ animationDelay: getAnimationDelay(index + 1) }}
            >
              <FooterSection section={section} />
            </div>
          ))}

          {/* Contact Information */}
          {(contact.length > 0 || (showSocial && social.length > 0)) && (
            <div
              className={getAnimationClasses('contact')}
              style={{ animationDelay: getAnimationDelay(sections.length + 1) }}
            >
              <FooterContact
                contact={contact}
                social={showSocial ? social : []}
              />
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <FooterBottom
          copyright={copyright}
          legal={legal}
          certifications={certifications}
          showCertifications={showCertifications}
        />
      </div>
    </footer>
  );
};

// Export individual components for potential standalone use
export {
  FooterCompany,
  FooterSection,
  FooterContact,
  FooterBottom,
  FooterNewsletter,
} from './footer/index';

// Export hooks for external use
export {
  useFooterLayout,
  useFooterLinks,
  useFooterContact,
  useSocialLinks,
  useFooterAnimations,
  useFooterCopyright,
  useFooterVisibility,
  useFooterTheme,
} from './footer/hooks';

// Export types
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
} from './footer/types';
