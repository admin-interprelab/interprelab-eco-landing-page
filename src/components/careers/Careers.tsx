/**
 * Careers Main Component
 */

import React from 'react';
import { Layout } from '@/components/Layout';
import { CareersHero } from './CareersHero';
import { JobListings } from './JobListings';
import { DepartmentGrid } from './DepartmentGrid';
import { CompanyBenefits } from './CompanyBenefits';
import type { CareersPageProps, JobOpening, Department } from './types';
import { JOB_OPENINGS, DEPARTMENTS, COMPANY_BENEFITS } from './constants';
import { useJobInteractions, useDepartments, useCareersAnalytics } from './hooks';

/**
 * Careers Component
 *
 * Main careers page with:
 * - Hero section with company stats
 * - Job listings with search and filters
 * - Department overview
 * - Company benefits
 * - Analytics tracking
 * - Responsive design
 */
export const Careers = ({
  className = '',
  customContent,
  onJobApply,
  onJobView,
}: CareersPageProps) => {
  const { handleJobView, handleJobApply } = useJobInteractions();
  const { handleDepartmentClick } = useDepartments();
  const { trackPageView, trackInteraction } = useCareersAnalytics();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView('careers_main');
  }, [trackPageView]);

  const handleJobCardClick = (job: JobOpening) => {
    handleJobView(job);
    trackInteraction('job_view', job.id);

    if (onJobView) {
      onJobView(job);
    }
  };

  const handleJobApplyClick = (job: JobOpening) => {
    handleJobApply(job);
    trackInteraction('job_apply', job.id);

    if (onJobApply) {
      onJobApply(job);
    }
  };

  const handleDepartmentCardClick = (department: Department) => {
    handleDepartmentClick(department);
    trackInteraction('department_view', department.id);
  };

  return (
    <Layout className={className}>
      {/* Hero Section */}
      <CareersHero
        title={customContent?.hero?.title}
        description={customContent?.hero?.description}
        showStats={customContent?.hero?.showStats}
        customStats={customContent?.hero?.customStats}
      />

      {/* Job Listings */}
      <JobListings
        jobs={customContent?.jobs || JOB_OPENINGS}
        departments={customContent?.departments || DEPARTMENTS}
        onJobClick={handleJobCardClick}
        onApplyClick={handleJobApplyClick}
      />

      {/* Department Grid */}
      <DepartmentGrid
        departments={customContent?.departments || DEPARTMENTS}
        onDepartmentClick={handleDepartmentCardClick}
      />

      {/* Company Benefits */}
      <CompanyBenefits
        benefits={customContent?.benefits || COMPANY_BENEFITS}
      />
    </Layout>
  );
};
