/**
 * Feature Card Component
 * Individual feature display card with hover effects and accessibility
 */

import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { FeatureCardProps } from './types';
import {
  getCategoryColor,
  getFeatureStatusBadge,
  getFeatureStatusBadgeVariant,
  generateFeatureCardId,
  generateFeatureCardAriaLabel,
  calculateAnimationDelay
} from './utils';

/**
 * Feature Card Component
 *
 * Displays individual feature information with:
 * - Icon and title
 * - Description text
 * - Category badge (optional)
 * - Status badges (New/Coming Soon)
 * - Hover effects and animations
 * - Full accessibility support
 */
export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(({
  feature,
  index = 0,
  variant = 'default',
  showCategory = false,
  onClick,
}, ref) => {
  const statusBadge = getFeatureStatusBadge(feature);
  const statusVariant = getFeatureStatusBadgeVariant(feature);
  const categoryColor = feature.category ? getCategoryColor(feature.category) : '';
  const cardId = generateFeatureCardId(feature);
  const ariaLabel = generateFeatureCardAriaLabel(feature);
  const animationDelay = calculateAnimationDelay(index);

  // Variant-specific styling
  const getCardClasses = () => {
    const baseClasses = "bg-card/50 border-border/50 backdrop-blur-sm hover-lift group transition-all duration-300";

    switch (variant) {
      case 'compact':
        return `${baseClasses} hover:scale-105`;
      case 'detailed':
        return `${baseClasses} hover:shadow-xl`;
      default:
        return baseClasses;
    }
  };

  const getContentClasses = () => {
    switch (variant) {
      case 'compact':
        return "p-4 text-center space-y-3";
      case 'detailed':
        return "p-8 text-center space-y-6";
      default:
        return "p-6 text-center space-y-4";
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case 'compact':
        return "w-8 h-8";
      case 'detailed':
        return "w-16 h-16";
      default:
        return "w-12 h-12";
    }
  };

  const getIconContainerSize = () => {
    switch (variant) {
      case 'compact':
        return "w-10 h-10";
      case 'detailed':
        return "w-20 h-20";
      default:
        return "w-12 h-12";
    }
  };

  const handleClick = () => {
    onClick?.(feature);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      ref={ref}
      id={cardId}
      className={getCardClasses()}
      style={{ animationDelay }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={ariaLabel}
    >
      <CardContent className={getContentClasses()}>
        {/* Status Badges */}
        {statusBadge && (
          <div className="flex justify-center mb-2">
            <Badge variant={statusVariant} className="text-xs">
              {statusBadge}
            </Badge>
          </div>
        )}

        {/* Icon */}
        <div className={`${getIconContainerSize()} bg-gradient-primary rounded-lg flex items-center justify-center mx-auto`}>
          <feature.icon className={`${getIconSize()} text-white`} />
        </div>

        {/* Title */}
        <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors ${
          variant === 'compact' ? 'text-base' : variant === 'detailed' ? 'text-xl' : 'text-lg'
        }`}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className={`text-muted-foreground leading-relaxed ${
          variant === 'compact' ? 'text-xs' : variant === 'detailed' ? 'text-base' : 'text-sm'
        }`}>
          {feature.description}
        </p>

        {/* Category Badge */}
        {showCategory && feature.category && (
          <div className="flex justify-center">
            <Badge variant="outline" className={`text-xs ${categoryColor}`}>
              {feature.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        )}

        {/* Interactive Indicator */}
        {onClick && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-0.5 bg-primary mx-auto rounded-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';
