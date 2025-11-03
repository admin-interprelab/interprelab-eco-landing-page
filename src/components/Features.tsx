/**
 * Refactored Features Component
 * Modular, maintainable, and following best practices
 */

import { useState } from 'react';
import { FeatureSection, FeatureModal, DEFAULT_FEATURES_SECTION } from './features/index';
import { useFeatureInteractions } from './features/hooks';
import type { Feature } from './features/types';

/**
 * Main Features Component
 *
 * A comprehensive features showcase that provides:
 * - Responsive feature grid layout
 * - Interactive feature cards with hover effects
 * - Detailed modal views for features
 * - Background image and overlay effects
 * - Accessibility support with ARIA labels
 * - Animation and transition effects
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Custom hooks for interaction management
 * - TypeScript support with proper interfaces
 * - Responsive design with mobile-first approach
 * - Performance optimizations with lazy loading
 * - Full keyboard navigation support
 */
export const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleCardClick,
  } = useFeatureInteractions();

  // Handle feature card click
  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
    handleCardClick(feature);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <>
      {/* Main Features Section */}
      <FeatureSection
        section={DEFAULT_FEATURES_SECTION}
        showAnimation={true}
        onFeatureClick={handleFeatureClick}
      />

      {/* Feature Detail Modal */}
      <FeatureModal
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

// Export individual components for potential standalone use
export {
  FeatureCard,
  FeatureGrid,
  FeatureFilter,
  FeatureModal,
} from './features/index';

// Export hooks for external use
export {
  useFeatureFiltering,
  useFeatureAnimations,
  useFeatureInteractions,
  useResponsiveLayout,
  useFeatureVisibility,
} from './features/hooks';

// Export types
export type {
  Feature,
  FeatureCategory,
  FeatureSection as FeatureSectionType,
  FeatureCardProps,
  FeatureGridProps,
} from './features/types';
