/**
 * Community Feature Card Component
 * Community platform feature display
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CommunityFeatureCardProps } from './types';

/**
 * Community Feature Card Component
 *
 * Displays community feature with:
 * - Icon and title
 * - Description
 * - Action button
 * - Hover effects
 */
export const CommunityFeatureCard = ({
  feature,
  onAction,
}: CommunityFeatureCardProps) => {
  const handleAction = () => {
    if (onAction) {
      onAction(feature);
    } else if (feature.action.type === 'external') {
      window.open(feature.action.href, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal navigation
      console.log('Navigate to:', feature.action.href);
    }
  };

  return (
    <Card className="bg-card/30 border-border/50 hover:bg-card/40 transition-all duration-200">
      <CardContent className="p-6 text-center space-y-3">
        {/* Icon */}
        <feature.icon className={`w-8 h-8 mx-auto ${feature.color}`} />

        {/* Title */}
        <h4 className="font-bold text-foreground">
          {feature.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAction}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {feature.action.label}
        </Button>
      </CardContent>
    </Card>
  );
};
