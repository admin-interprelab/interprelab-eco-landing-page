/**
 * Feature Grid Component
 * Responsive grid layout for feature cards
 */

import { useMemo } from 'react';
import { FeatureCard } from './FeatureCard';
import type { FeatureGridProps } from './types';
import { generateGridClasses } from './utils';
import { GRID_LAYOUTS } from './constants';

/**
 * Feature Grid Component
 *
 * Responsive grid container for feature cards with:
 * - Configurable column layouts
 * - Multiple display variants
 * - Staggered animations
 * - Category filtering support
 * - Click handling
 */
export const FeatureGrid = ({
  features,
  columns,
  variant = 'default',
  showCategories = false,
  onFeatureClick,
}: FeatureGridProps) => {
  // Use provided columns or default layout
  const gridColumns = columns || GRID_LAYOUTS[variant] || GRID_LAYOUTS.default;

  // Generate responsive grid classes
  const gridClasses = useMemo(() => {
    return generateGridClasses(gridColumns);
  }, [gridColumns]);

  // Handle empty state
  if (features.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 bg-muted/50 rounded" />
          </div>
          <h3 className="text-lg font-medium text-muted-foreground">
            No features found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your filters or search criteria to find the features you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${gridClasses}`}
      role="grid"
      aria-label="Features grid"
    >
      {features.map((feature, index) => (
        <div
          key={feature.id}
          role="gridcell"
          className="animate-fade-in"
        >
          <FeatureCard
            feature={feature}
            index={index}
            variant={variant}
            showCategory={showCategories}
            onClick={onFeatureClick}
          />
        </div>
      ))}
    </div>
  );
};
