/**
 * Footer Company Component
 * Company information section with logo, description, and badges
 */

import { Badge } from '@/components/ui/badge';
import type { FooterCompanyProps } from './types';

/**
 * Footer Company Component
 *
 * Displays company information with:
 * - Logo and company name
 * - Tagline and description
 * - Industry/service badges
 * - Responsive design
 * - Accessibility support
 */
export const FooterCompany = ({
  company,
  className = '',
}: FooterCompanyProps) => {
  const { name, tagline, description, logo, badges } = company;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Company Logo and Name */}
      <div className="flex items-center gap-3">
        {logo && (
          <div className="p-2 bg-gradient-primary rounded-lg">
            {/** Use a capitalized variable for JSX components to avoid JSX treating it as an intrinsic tag */}
            {(() => {
              const LogoIcon = logo.icon;
              return <LogoIcon className={logo.className || 'w-5 h-5 text-white'} />;
            })()}
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </div>
      </div>

      {/* Company Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Industry/Service Badges */}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge
              key={badge.id}
              variant={badge.variant || 'outline'}
              className="text-xs flex items-center gap-1"
            >
              {badge.icon && (() => {
                const BadgeIcon = badge.icon;
                return <BadgeIcon className="w-3 h-3" />;
              })()}
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
