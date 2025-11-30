/**
 * Resource Card Component
 * Individual resource category display card
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { ResourceCardProps } from './types';
import { calculateAnimationDelay } from './utils';

/**
 * Resource Card Component
 *
 * Displays resource category with:
 * - Icon and title
 * - Description and feature list
 * - Explore button
 * - Hover effects and animations
 * - Premium/new badges
 */
export const ResourceCard = ({
  category,
  index,
  onExplore,
}: ResourceCardProps) => {
  const animationDelay = calculateAnimationDelay(index);

  return (
    <Card
      className="bg-card/50 border-border/50 backdrop-blur-sm hover-lift group transition-all duration-300"
      style={{ animationDelay }}
    >
      <CardContent className="p-6 space-y-4">
        {/* Icon */}
        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>

        {/* Feature Items */}
        <div className="space-y-2">
          {category.items.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <span className="text-xs text-muted-foreground flex-1">
                {item.title}
              </span>
              {item.isNew && (
                <Badge variant="default" className="text-xs px-1 py-0">
                  New
                </Badge>
              )}
              {item.isPremium && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  Pro
                </Badge>
              )}
            </div>
          ))}

          {category.items.length > 4 && (
            <div className="text-xs text-muted-foreground">
              +{category.items.length - 4} more items
            </div>
          )}
        </div>

        {/* Explore Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => onExplore?.(category)}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
};
