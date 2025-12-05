/**
 * Careers Components Barrel Export
 */

// Main Component
export { Careers } from './Careers';

// Sub Components
export { CareersHero } from './CareersHero';
export { JobListings } from './JobListings';
export { JobCard } from './JobCard';
export { JobFilters } from './JobFilters';
export { DepartmentGrid } from './DepartmentGrid';
export { CompanyBenefits } from './CompanyBenefits';

// Types
export type {
  JobOpening,
  Department,
  CompanyBenefit,
  CareersHeroProps,
  JobListingsProps,
  JobCardProps,
  JobFiltersProps,
  CompanyBenefitsProps,
  DepartmentGridProps,
  CareersPageProps,
} from './types';

// Constants
export {
  DEFAULT_HERO_CONTENT,
  JOB_OPENINGS,
  DEPARTMENTS,
  COMPANY_BENEFITS,
  JOB_TYPES,
  JOB_LEVELS,
  BENEFIT_CATEGORIES,
  ANIMATION_CONFIG,
} from './constants';

// Utils
export {
  formatSalaryRange,
  getJobTypeDisplay,
  getJobLevelDisplay,
  getBenefitCategoryDisplay,
  filterJobsByDepartment,
  filterJobsByType,
  filterJobsByLevel,
  filterJobsByRemote,
  searchJobs,
  sortJobs,
  getUniqueDepartments,
  getUniqueJobTypes,
  getUniqueJobLevels,
  getDaysSincePosted,
  formatPostedDate,
  isApplicationDeadlinePassed,
  validateJobOpening,
  generateJobCardId,
  generateDepartmentCardId,
  getAnimationDelay,
  groupBenefitsByCategory,
  calculateTotalOpenPositions,
  generateJobAnalytics,
  generateApplicationUrl,
  isRecentlyPosted,
  getJobUrgency,
} from './utils';

// Hooks
export {
  useJobListings,
  useJobInteractions,
  useDepartments,
  useCompanyBenefits,
  useCareersAnimations,
  useCareersAnalytics,
} from './hooks';
