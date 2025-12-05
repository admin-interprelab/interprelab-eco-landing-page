/**
 * About Main Component
 */

import { Layout } from '@/components/Layout';
import { AboutHero } from './AboutHero';
import { MissionVision } from './MissionVision';
import { CompanyValues } from './CompanyValues';
import { TeamSection } from './TeamSection';
import { CompanyStats } from './CompanyStats';
import { AboutCTA } from './AboutCTA';
import type { AboutPageProps } from './types';
import { useAboutAnimations, useAboutAnalytics } from './hooks';

/**
 * About Component
 *
 * Main About page component with:
 * - Hero section with company introduction
 * - Mission and vision statements
 * - Company values grid
 * - Leadership team showcase
 * - Company statistics
 * - Call-to-action section
 * - Analytics tracking
 * - Responsive design
 */
export const About = ({
  className = '',
  customContent,
}: AboutPageProps) => {
  const { isSectionAnimated } = useAboutAnimations();
  const { trackSectionView } = useAboutAnalytics();

  // Track section views when they become visible
  const handleSectionView = (sectionId: string) => {
    if (isSectionAnimated(sectionId)) {
      trackSectionView(sectionId);
    }
  };

  return (
    <Layout className={className}>
      {/* Hero Section */}
      <AboutHero
        customContent={customContent?.hero}
      />

      {/* Mission & Vision */}
      <MissionVision
        mission={customContent?.mission}
        vision={customContent?.vision}
      />

      {/* Company Values */}
      <CompanyValues
        values={customContent?.values}
      />

      {/* Leadership Team */}
      <TeamSection
        teamMembers={customContent?.team}
      />

      {/* Company Statistics */}
      <CompanyStats
        stats={customContent?.stats}
      />

      {/* Call-to-Action */}
      <AboutCTA
        title={customContent?.cta?.title}
        description={customContent?.cta?.description}
      />
    </Layout>
  );
};
