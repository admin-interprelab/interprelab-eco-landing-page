/**
 * Footer Bottom Component
 * Copyright, legal links, and certification badges
 */

import { Badge } from '@/components/ui/badge';
import type { FooterBottomProps } from './types';
import {
  getCertificationAriaLabel,
  shouldShowCertifications
} from './utils';
import { useFooterCopyright } from './hooks';

/**
 * Footer Bottom Component
 *
 * Displays footer bottom section with:
 * - Copyright notice
 * - Legal links (Privacy, Terms, etc.)
 * - Certification badges
 * - Responsive layout
 * - Accessibility support
 */
export const FooterBottom = ({
  copyright,
  legal,
  certifications,
  showCertifications = true,
  className = '',
}: FooterBottomProps) => {
  const updatedCopyright = useFooterCopyright(copyright);
  const shouldShowCerts = shouldShowCertifications(certifications, showCertifications);

  return (
    <div className={`border-t border-border/50 mt-12 pt-8 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright and Legal Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          {/* Copyright */}
          <span className="text-center sm:text-left">
            {updatedCopyright}
          </span>

          {/* Legal Links */}
          {legal.length > 0 && (
            <nav
              className="flex flex-wrap items-center justify-center gap-4"
              aria-label="Legal links"
            >
              {legal.map((legalLink, index) => (
                <a
                  key={legalLink.id}
                  href={legalLink.href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {legalLink.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Certification Badges and Stats */}
        {shouldShowCerts && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {certifications.map((cert) => {
              const ariaLabel = getCertificationAriaLabel(cert);

              return (
                <Badge
                  key={cert.id}
                  variant={cert.variant || 'outline'}
                  className="text-xs flex items-center gap-1"
                  title={cert.description}
                  aria-label={ariaLabel}
                >
                  {cert.icon && (
                    <cert.icon
                      className="w-3 h-3"
                      aria-hidden="true"
                    />
                  )}
                  {cert.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
