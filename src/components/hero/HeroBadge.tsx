/**
 * Hero Badge Component
 * Displays hero section badge with icon and text
 */

import { Badge } from '@/components/ui/badge';
import type { HeroBadge as HeroBadgeType } from './types';

interface HeroBadgeProps {
  badge: HeroBadgeType;
  className?: string;
}

/**
 * Hero Badge Component
 *
 * Displays a badge with:
 * - Optional icon
 * - Text content
 * - Glass morphism effect
 * - Responsive sizing
 */
export const HeroBadge = ({ badge, className = '' }: HeroBadgeProps) => {
  return (
    <Badge
      className={`glass px-6 py-3 text-sm font-medium border-primary/20 ${className}`}
      variant={badge.variant}
    >
      {badge.icon && <badge.icon className="w-4 h-4 mr-2" />}
      {badge.text}
    </Badge>
  );
};
