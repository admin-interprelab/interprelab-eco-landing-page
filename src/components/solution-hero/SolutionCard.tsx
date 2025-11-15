/**
 * Solution Card Component
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SolutionCardProps } from './types';
import {
  getSolutionCardClasses,
  getSolutionIconColor,
  getAnimationDelay,
  getFeaturedBadgeText,
  getFeaturedBadgeColor,
  generateSolutionId,
  isFeaturedSolution
} from './utils';

/**
 * Solution Card Component
 *
 * Individual solution card with:
 * - Icon and title
 * - Description
 * - Call-to-action button
 * - Featured badges
 * - Hover animations
 * - Accessibility support
 */
export const SolutionCard = ({
  solution,
  index,
  onClick,
  className = '',
}: SolutionCardProps) => {
  const cardClasses = getSolutionCardClasses('default', false, className);
  const iconColor = getSolutionIconColor(solution.color);
  const animationDelay = getAnimationDelay(index);
  const cardId = generateSolutionId(solution);
  const featuredBadgeText = getFeaturedBadgeText(solution);
  const featuredBadgeColor = getFeaturedBadgeColor(solution);
  const IconComponent = solution.icon;

  const handleClick = () => {
    if (onClick) {
      onClick(solution);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      id={cardId}
      className={cardClasses}
      style={{ animationDelay }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${solution.title}`}
      data-solution-id={solution.id}
      data-solution-index={index}
    >
      <CardContent className="p-6 relative">
        {/* Featured Badge */}
        {isFeaturedSolution(solution) && featuredBadgeText && (
          <Badge
            className={`absolute top-4 right-4 text-xs ${featuredBadgeColor}`}
            variant="secondary"
          >
            {featuredBadgeText}
          </Badge>
        )}

        {/* Custom Badge */}
        {solution.badge && !isFeaturedSolution(solution) && (
          <Badge
            className="absolute top-4 right-4 text-xs bg-muted text-muted-foreground"
            variant="outline"
          >
            {solution.badge}
          </Badge>
        )}

        {/* Icon */}
        <div className={`mb-3 ${iconColor}`}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-display font-bold mb-2 text-foreground">
          {solution.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 font-sans leading-relaxed">
          {solution.description}
        </p>

        {/* Features List */}
        {solution.features && solution.features.length > 0 && (
          <ul className="text-xs text-muted-foreground/80 mb-4 space-y-1">
            {solution.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <Link to={solution.link} className="block">
          <Button
            variant="ghost"
            className="group/btn p-0 h-auto font-medium text-primary hover:text-primary-foreground w-full justify-start"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
