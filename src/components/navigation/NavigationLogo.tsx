/**
 * Navigation Logo Component
 */

import { Link } from 'react-router-dom';
import type { NavigationLogoProps } from './types';
import { LOGO_CONFIG } from './constants';

/**
 * Navigation Logo Component
 *
 * Logo with icon and text for the navigation bar
 */
export const NavigationLogo = ({
  className = '',
  showText = true,
  variant = 'default',
  onClick,
}: NavigationLogoProps) => {
  const IconComponent = LOGO_CONFIG.icon;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`} onClick={handleClick}>
      <div className="p-2 bg-gradient-primary rounded-lg">
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      {showText && (
        <div className={variant === 'minimal' ? 'hidden sm:block' : ''}>
          <h1 className="text-xl font-bold">{LOGO_CONFIG.name}</h1>
          <p className="text-xs text-muted-foreground">{LOGO_CONFIG.tagline}</p>
        </div>
      )}
    </div>
  );

  return (
    <Link to="/" className="flex items-center">
      {logoContent}
    </Link>
  );
};
