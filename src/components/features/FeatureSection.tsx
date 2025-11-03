/**
 * Feature Section Component
 * Complete section with header, background, and feature grid
 */

import { Badge } from '@/components/ui/badge';
import { FeatureGrid } from './FeatureGrid';
import type { FeaturesSectionProps, Feature } from './types';

/**
 * Feature Section Component
 *
 * Complete section layout with:
 * - Background image and overlay
 * - Section header with badge and title
 * - Description text
 * - Feature grid
 * - Responsive design
 * - Animation support
 */
interface FeatureSectionProps extends FeaturesSectionProps {
  onFeatureClick?: (feature: Feature) => void;
}

export const FeatureSection = ({
  section,
  className = '',
  showAnimation = true,
  onFeatureClick,
}: FeatureSectionProps) => {
  const {
    title,
    subtitle,
    description,
    badge,
    backgroundImage,
    features,
  } = section;

  return (
    <section className={`py-20 px-6 relative ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        </>
      )}

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${showAnimation ? 'animate-fade-in' : ''}`}>
          {badge && (
            <Badge className="bg-gradient-primary border-0 text-white px-4 py-2 mb-4">
              {badge}
            </Badge>
          )}

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Feature Grid */}
        <FeatureGrid
          features={features}
          variant="default"
          showCategories={false}
          onFeatureClick={onFeatureClick}
        />
      </div>
    </section>
  );
};
