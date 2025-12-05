/**
 * Feature Modal Component
 * Detailed view modal for individual features
 */

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Feature } from './types';
import {
  getCategoryColor,
  getCategoryLabel,
  getCategoryIcon,
  getFeatureStatusBadge,
  getFeatureStatusBadgeVariant
} from './utils';

interface FeatureModalProps {
  /** Feature to display */
  feature: Feature | null;
  /** Whether modal is open */
  isOpen: boolean;
  /** Close modal handler */
  onClose: () => void;
}

/**
 * Feature Modal Component
 *
 * Detailed modal view for features with:
 * - Full feature information
 * - Category and status badges
 * - Large icon display
 * - Keyboard navigation support
 * - Backdrop click to close
 */
export const FeatureModal = ({
  feature,
  isOpen,
  onClose,
}: FeatureModalProps) => {
  if (!isOpen || !feature) return null;

  const statusBadge = getFeatureStatusBadge(feature);
  const statusVariant = getFeatureStatusBadgeVariant(feature);
  const categoryColor = feature.category ? getCategoryColor(feature.category) : '';
  const CategoryIcon = feature.category ? getCategoryIcon(feature.category) : null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
      aria-describedby="feature-modal-description"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-card border-border shadow-2xl">
        <CardHeader className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 w-8 h-8"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {statusBadge && (
              <Badge variant={statusVariant} className="text-xs">
                {statusBadge}
              </Badge>
            )}

            {feature.category && (
              <Badge variant="outline" className={`text-xs ${categoryColor} flex items-center gap-1`}>
                {CategoryIcon && <CategoryIcon className="w-3 h-3" />}
                {getCategoryLabel(feature.category)}
              </Badge>
            )}

            {feature.priority && (
              <Badge variant="secondary" className="text-xs capitalize">
                {feature.priority} Priority
              </Badge>
            )}
          </div>

          {/* Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <h2
                id="feature-modal-title"
                className="text-2xl font-bold text-foreground mb-2"
              >
                {feature.title}
              </h2>

              {feature.category && (
                <p className="text-sm text-muted-foreground">
                  {getCategoryLabel(feature.category)} Feature
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p
              id="feature-modal-description"
              className="text-muted-foreground leading-relaxed"
            >
              {feature.description}
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Details</h3>

              <div className="space-y-3">
                {feature.category && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="outline" className={`text-xs ${categoryColor}`}>
                      {getCategoryLabel(feature.category)}
                    </Badge>
                  </div>
                )}

                {feature.priority && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {feature.priority}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant={statusBadge ? statusVariant : 'outline'}
                    className="text-xs"
                  >
                    {statusBadge || 'Available'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefits</h3>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Improves workflow efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Enhances professional capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Provides actionable insights</span>
                </li>
                {feature.category === 'security' && (
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Ensures data protection</span>
                  </li>
                )}
                {feature.category === 'real-time' && (
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Delivers instant feedback</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>

            {!feature.comingSoon && (
              <Button className="bg-gradient-primary text-white">
                Learn More
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
