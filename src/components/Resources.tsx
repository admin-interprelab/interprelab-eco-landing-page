/**
 * Refactored Resources Component
 * Modular, maintainable, and following best practices
 */

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, ArrowRight } from 'lucide-react';
import {
  ResourceCard,
  ProfessionalResourceCard,
  CommunityFeatureCard,
  ResourceFilter,
  ResourceModal,
  DEFAULT_RESOURCES_SECTION,
} from './resources/index';
import {
  useResourceFiltering,
  useResourceDownloads,
  useResourceModal,
} from './resources/hooks';
import type { ResourcesProps, ResourceCategory, ProfessionalResource, CommunityFeature } from './resources/types';

/**
 * Main Resources Component
 *
 * A comprehensive resources section that provides:
 * - Training videos and mock scenarios
 * - Certification-ready courses
 * - AI-driven analysis features
 * - Professional resources (IMIA, NCIHC, etc.)
 * - Community platform features
 * - Search and filtering capabilities
 *
 * Features:
 * - Modular architecture with separated concerns
 * - Professional resource downloads
 * - Interactive community features
 * - Search and filtering functionality
 * - Modal views for detailed information
 * - Responsive design with animations
 * - Accessibility support
 */
export const Resources = ({
  section = DEFAULT_RESOURCES_SECTION,
  className = '',
  showProfessionalResources = true,
  showCommunityFeatures = true,
}: ResourcesProps = {}) => {
  const {
    title,
    subtitle,
    description,
    badge,
    backgroundImage,
    categories,
    professionalResources,
    communityFeatures
  } = section;

  // Resource filtering for professional resources
  const {
    searchQuery,
    selectedType,
    filteredResources,
    availableTypes,
    setSearchQuery,
    setSelectedType,
  } = useResourceFiltering(professionalResources);

  // Resource downloads
  const { startDownload } = useResourceDownloads();

  // Resource modal
  const { selectedResource, isOpen, openModal, closeModal } = useResourceModal();

  // Handle category exploration
  const handleExploreCategory = (category: ResourceCategory) => {
    console.log('Exploring category:', category.title);
    // Could navigate to detailed category page or expand inline
  };

  // Handle professional resource view
  const handleViewResource = (resource: ProfessionalResource) => {
    openModal(resource);
  };

  // Handle resource download
  const handleDownloadResource = (resource: ProfessionalResource) => {
    startDownload(resource);
  };

  // Handle community feature action
  const handleCommunityAction = (feature: CommunityFeature) => {
    console.log('Community action:', feature.title);
    // Handle navigation or action
  };

  return (
    <section className={`py-20 px-6 relative ${className}`}>
      {/* Background */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        </>
      )}

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
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

        {/* Resource Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <ResourceCard
              key={category.id}
              category={category}
              index={index}
              onExplore={handleExploreCategory}
            />
          ))}
        </div>

        {/* Professional Resources Section */}
        {showProfessionalResources && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Professional Resources & Standards
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Essential documents, codes of ethics, and professional standards from leading interpretation organizations
              </p>
            </div>

            {/* Resource Filter */}
            <ResourceFilter
              categories={categories}
              selectedCategory={selectedType}
              onCategoryChange={setSelectedType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Professional Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredResources.map((resource) => (
                <ProfessionalResourceCard
                  key={resource.id}
                  resource={resource}
                  onView={handleViewResource}
                  onDownload={handleDownloadResource}
                />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No resources found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* InterpreterHub Community Section */}
        {showCommunityFeatures && (
          <div className="bg-card/30 border border-border/50 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">InterpreterHub</h3>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                InterpreLinks: A dedicated social web application for interpreters, like a specialized LinkedIn for our community.
                Share experiences, get peer feedback, and discover professional opportunities.
              </p>

              {/* Community Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {communityFeatures.map((feature) => (
                  <CommunityFeatureCard
                    key={feature.id}
                    feature={feature}
                    onAction={handleCommunityAction}
                  />
                ))}
              </div>

              {/* Access Button */}
              <Button size="lg" className="bg-gradient-primary border-0 text-white hover:opacity-90">
                <ArrowRight className="w-5 h-5 mr-2" />
                Access InterpreterHub
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Resource Modal */}
      <ResourceModal
        resource={selectedResource}
        isOpen={isOpen}
        onClose={closeModal}
        onDownload={handleDownloadResource}
      />
    </section>
  );
};

// Export individual components for potential standalone use
export {
  ResourceCard,
  ProfessionalResourceCard,
  CommunityFeatureCard,
  ResourceFilter,
  ResourceModal,
} from './resources/index';

// Export hooks for external use
export {
  useResourceFiltering,
  useResourceDownloads,
  useResourceFavorites,
  useResourceModal,
  useResourceCategories,
  useResourceAnalytics,
} from './resources/hooks';

// Export types
export type {
  ResourceCategory,
  ProfessionalResource,
  CommunityFeature,
  ResourcesSection,
  ResourcesProps,
} from './resources/types';
