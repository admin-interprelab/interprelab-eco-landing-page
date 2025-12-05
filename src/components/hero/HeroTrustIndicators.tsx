/**
 * Hero Trust Indicators Component
 * Trust indicators and social proof for hero section
 */

import type { TrustIndicator } from './types';

interface HeroTrustIndicatorsProps {
  text: string;
  items: TrustIndicator[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

/**
 * Hero Trust Indicators Component
 *
 * Displays trust indicators with:
 * - Main trust text
 * - List of trust items with emojis/icons
 * - Responsive layout
 * - Fade-in animations
 */
export const HeroTrustIndicators = ({
  text,
  items,
  className = '',
  layout = 'horizontal'
}: HeroTrustIndicatorsProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col items-center gap-4';
      case 'horizontal':
      default:
        return 'flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8';
    }
  };

  return (
    <div className={`pt-8 text-sm text-muted-foreground animate-slide-up ${className}`}>
      <p className="text-center mb-4">{text}</p>

      <div className={`${getLayoutClasses()} opacity-60 hover:opacity-80 transition-opacity duration-300`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.emoji && (
              <span className="text-base" role="img" aria-label={item.text}>
                {item.emoji}
              </span>
            )}
            {item.icon && (
              <item.icon className="w-4 h-4" aria-hidden="true" />
            )}
            <span className="whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
