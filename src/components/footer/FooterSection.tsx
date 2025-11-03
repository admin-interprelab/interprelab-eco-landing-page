/**
 * Footer Section Component
 * Individual footer section with title and links
 */

import { ExternalLink } from 'lucide-react';
import type { FooterSectionProps } from './types';
import {
  getLinkTarget,
  getLinkRel,
  generateSectionId,
  generateLinkId
} from './utils';
import { useFooterLinks } from './hooks';

/**
 * Footer Section Component
 *
 * Displays a footer section with:
 * - Section title
 * - List of links with icons
 * - External link indicators
 * - Hover effects
 * - Accessibility support
 */
export const FooterSection = ({
  section,
  className = '',
}: FooterSectionProps) => {
  const { title, links } = section;
  const sectionId = generateSectionId(title);

  const {
    hoveredLink,
    handleLinkHover,
    handleLinkClick,
    handleKeyDown,
  } = useFooterLinks(links);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Section Title */}
      <h4
        id={sectionId}
        className="text-sm font-semibold text-foreground"
      >
        {title}
      </h4>

      {/* Links List */}
      <ul
        className="space-y-2 text-sm text-muted-foreground"
        role="list"
        aria-labelledby={sectionId}
      >
        {links.map((link) => {
          const linkId = generateLinkId(sectionId, link.label);
          const isHovered = hoveredLink === link.id;
          const isExternal = link.external || link.href.startsWith('http');

          return (
            <li key={link.id} role="listitem">
              <a
                id={linkId}
                href={link.href}
                target={getLinkTarget(link)}
                rel={getLinkRel(link)}
                className={`
                  hover:text-foreground transition-colors duration-200
                  flex items-center gap-2 group
                  ${isHovered ? 'text-foreground' : ''}
                `}
                onMouseEnter={() => handleLinkHover(link.id)}
                onMouseLeave={() => handleLinkHover(null)}
                onClick={() => handleLinkClick(link.id)}
                onKeyDown={(e) => handleKeyDown(e, link)}
                aria-describedby={link.description ? `${linkId}-desc` : undefined}
              >
                {/* Link Icon */}
                {link.icon && (
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                )}

                {/* Link Label */}
                <span className="flex-1">{link.label}</span>

                {/* External Link Indicator */}
                {isExternal && (
                  <ExternalLink
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  />
                )}

                {/* Badge */}
                {link.badge && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </a>

              {/* Link Description (hidden, for screen readers) */}
              {link.description && (
                <span
                  id={`${linkId}-desc`}
                  className="sr-only"
                >
                  {link.description}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
