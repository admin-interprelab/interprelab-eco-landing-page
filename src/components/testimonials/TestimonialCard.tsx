/**
 * Testimonial Card Component
 */

import { Quote, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { TestimonialCardProps } from './types';
import {
  getTestimonialCardClasses,
  getSpecialtyColor,
  getRatingColor,
  getAvatarFallback,
  generateStarRating,
  formatLocation
} from './utils';

/**
 * Testimonial Card Component
 *
 * Individual testimonial card with:
 * - Quote with quotation marks
 * - Star rating display
 * - Author information with avatar
 * - Specialty badge
 * - Verification indicator
 * - Hover animations
 */
export const TestimonialCard = ({
  testimonial,
  index,
  isActive = false,
  onClick,
  className = '',
  variant = 'default',
}: TestimonialCardProps) => {
  const cardClasses = getTestimonialCardClasses(variant, isActive, className);
  const specialtyColor = getSpecialtyColor(testimonial.specialty);
  const ratingColor = getRatingColor(testimonial.rating);
  const avatarFallback = getAvatarFallback(testimonial.name);
  const stars = generateStarRating(testimonial.rating);
  const formattedLocation = formatLocation(testimonial.location);

  const handleClick = () => {
    if (onClick) {
      onClick(testimonial);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="w-full flex-shrink-0 px-4">
      <Card
        className={cardClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Testimonial from ${testimonial.name}`}
        data-testimonial-id={testimonial.id}
        data-testimonial-index={index}
      >
        <CardContent className="p-8 md:p-12">
          <div className="space-y-6">
            {/* Quote Section */}
            <div className="relative">
              <Quote className="w-10 h-10 text-primary/20 absolute -top-4 -left-4" />
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed pl-8">
                "{testimonial.quote}"
              </blockquote>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {stars.map((star, i) => (
                <span key={i} className={`text-xl ${ratingColor}`}>
                  {star}
                </span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                ({testimonial.rating}/5)
              </span>
            </div>

            {/* Author Section */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  loading="lazy"
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">
                    {testimonial.name}
                  </h4>
                  {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-success" title="Verified testimonial" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  {formattedLocation}
                </p>
                {testimonial.company && (
                  <p className="text-xs text-muted-foreground/60">
                    {testimonial.company}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 text-primary">
                  {testimonial.specialty}
                </Badge>
                {testimonial.featured && (
                  <Badge variant="secondary" className="text-xs bg-warning/20 text-warning border-warning/30">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
