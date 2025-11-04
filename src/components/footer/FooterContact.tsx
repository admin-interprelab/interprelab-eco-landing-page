/**
 * Footer Contact Component
 * Contact information and social media links
 */

import { Button } from '@/components/ui/button';
import type { FooterContactProps } from './types';
import type { LucideIcon } from 'lucide-react';
import {
  formatContactValue,
  getContactHref,
  getContactAriaLabel,
  getSocialAriaLabel
} from './utils';
import { useFooterContact, useSocialLinks } from './hooks';

/**
 * Footer Contact Component
 *
 * Displays contact information and social links with:
 * - Contact details (email, phone, address)
 * - Social media buttons
 * - Proper link formatting
 * - Accessibility support
 * - Hover effects
 */
export const FooterContact = ({
  contact,
  social,
  className = '',
}: FooterContactProps) => {
  const {
    primaryContacts,
    locationContacts,
    handleContactClick,
  } = useFooterContact(contact);

  const {
    hoveredSocial,
    handleSocialHover,
    handleSocialClick,
  } = useSocialLinks(social);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Title */}
      <h4 className="text-sm font-semibold text-foreground">
        Contact
      </h4>

      {/* Contact Information */}
      <div className="space-y-3 text-sm text-muted-foreground">
        {contact.map((contactItem) => {
          const href = getContactHref(contactItem);
          const displayValue = formatContactValue(contactItem);
          const ariaLabel = getContactAriaLabel(contactItem);

          return (
            <div
              key={contactItem.id}
              className="flex items-center gap-2"
            >
              {(() => {
                const ContactIcon = contactItem.icon as unknown as LucideIcon;
                return (
                  <ContactIcon
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                );
              })()}

              {href ? (
                <a
                  href={href}
                  className="hover:text-foreground transition-colors duration-200"
                  onClick={() => handleContactClick(contactItem)}
                  aria-label={ariaLabel}
                >
                  {displayValue}
                </a>
              ) : (
                <span>{displayValue}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Social Media Links */}
      {social.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Follow Us
          </h5>

          <div className="flex gap-2">
            {social.map((socialItem) => {
              const isHovered = hoveredSocial === socialItem.id;
              const ariaLabel = getSocialAriaLabel(socialItem);

              return (
                <Button
                  key={socialItem.id}
                  variant="ghost"
                  size="icon"
                  className={`
                    h-8 w-8 transition-all duration-200
                    ${isHovered ? 'scale-110 bg-primary/10' : ''}
                  `}
                  asChild
                  onMouseEnter={() => handleSocialHover(socialItem.id)}
                  onMouseLeave={() => handleSocialHover(null)}
                  onClick={() => handleSocialClick(socialItem)}
                >
                  <a
                    href={socialItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                  >
                    {(() => {
                      const SocialIcon = socialItem.icon as unknown as LucideIcon;
                      return <SocialIcon className="w-4 h-4" />;
                    })()}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
