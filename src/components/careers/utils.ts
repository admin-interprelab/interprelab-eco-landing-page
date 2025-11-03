/**
 * Careers Page Component Utilities
 */

import type { JobOpening, Department, CompanyBenefit } from './types';
import { JOB_TYPES, JOB_LEVELS, BENEFIT_CATEGORIES } from './constants';

/**
 * Format salary range for display
 */
export const formatSalaryRange = (salary?: JobOpening['salary']): string => {
  if (!salary) return 'Competitive salary';

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: salary.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
};

/**
 * Get job type display text
 */
export const getJobTypeDisplay = (type: JobOpening['type']): string => {
  return JOB_TYPES[type] || type;
};

/**
 * Get job level display text
 */
export const getJobLevelDisplay = (level: JobOpening['level']): string => {
  return JOB_LEVELS[level] || level;
};

/**
 * Get benefit category display text
 */
export const getBenefitCategoryDisplay = (category: CompanyBenefit['category']): string => {
  return BENEFIT_CATEGORIES[category] || category;
};

/**
 * Filter jobs by department
 */
export const filterJobsByDepartment = (jobs: JobOpening[], department: string): JobOpening[] => {
  if (department === 'all') return jobs;
  return jobs.filter(job => job.department.toLowerCase() === department.toLowerCase());
};

/**
 * Filter jobs by type
 */
export const filterJobsByType = (jobs: JobOpening[], type: string): JobOpening[] => {
  if (type === 'all') return jobs;
  return jobs.filter(job => job.type === type);
};

/**
 * Filter jobs by level
 */
export const filterJobsByLevel = (jobs: JobOpening[], level: string): JobOpening[] => {
  if (level === 'all') return jobs;
  return jobs.filter(job => job.level === level);
};

/**
 * Filter jobs by remote availability
 */
export const filterJobsByRemote = (jobs: JobOpening[], remoteOnly: boolean): JobOpening[] => {
  if (!remoteOnly) return jobs;
  return jobs.filter(job => job.remote);
};

/**
 * Search jobs by title or description
 */
export const searchJobs = (jobs: JobOpening[], searchTerm: string): JobOpening[] => {
  if (!searchTerm.trim()) return jobs;

  const term = searchTerm.toLowerCase();
  return jobs.filter(job =>
    job.title.toLowerCase().includes(term) ||
    job.description.toLowerCase().includes(term) ||
    job.requirements.some(req => req.toLowerCase().includes(term))
  );
};

/**
 * Sort jobs by various criteria
 */
export const sortJobs = (
  jobs: JobOpening[],
  sortBy: 'date' | 'title' | 'department' | 'featured' = 'featured'
): JobOpening[] => {
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.postedDate.getTime() - a.postedDate.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'department':
        return a.department.localeCompare(b.department);
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.postedDate.getTime() - a.postedDate.getTime();
      default:
        return 0;
    }
  });
};

/**
 * Get unique departments from jobs
 */
export const getUniqueDepartments = (jobs: JobOpening[]): string[] => {
  const departments = jobs.map(job => job.department);
  return [...new Set(departments)].sort();
};

/**
 * Get unique job types from jobs
 */
export const getUniqueJobTypes = (jobs: JobOpening[]): JobOpening['type'][] => {
  const types = jobs.map(job => job.type);
  return [...new Set(types)].sort();
};

/**
 * Get unique job levels from jobs
 */
export const getUniqueJobLevels = (jobs: JobOpening[]): JobOpening['level'][] => {
  const levels = jobs.map(job => job.level);
  return [...new Set(levels)].sort();
};

/**
 * Calculate days since job was posted
 */
export const getDaysSincePosted = (postedDate: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format posted date for display
 */
export const formatPostedDate = (postedDate: Date): string => {
  const days = getDaysSincePosted(postedDate);

  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return '1 month ago';

  return `${Math.floor(days / 30)} months ago`;
};

/**
 * Check if job application deadline has passed
 */
export const isApplicationDeadlinePassed = (deadline?: Date): boolean => {
  if (!deadline) return false;
  return new Date() > deadline;
};

/**
 * Validate job opening data
 */
export const validateJobOpening = (job: Partial<JobOpening>): boolean => {
  return Boolean(
    job.id &&
    job.title &&
    job.location &&
    job.department &&
    job.type &&
    job.level &&
    job.description &&
    job.requirements &&
    job.requirements.length > 0 &&
    job.postedDate
  );
};

/**
 * Generate job card ID
 */
export const generateJobCardId = (job: JobOpening): string => {
  return `job-card-${job.id}`;
};

/**
 * Generate department card ID
 */
export const generateDepartmentCardId = (department: Department): string => {
  return `department-card-${department.id}`;
};

/**
 * Get animation delay for staggered animations
 */
export const getAnimationDelay = (index: number, staggerDelay: number = 100): string => {
  return `${index * staggerDelay}ms`;
};

/**
 * Group benefits by category
 */
export const groupBenefitsByCategory = (benefits: CompanyBenefit[]) => {
  return benefits.reduce((groups, benefit) => {
    const category = benefit.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(benefit);
    return groups;
  }, {} as Record<CompanyBenefit['category'], CompanyBenefit[]>);
};

/**
 * Calculate total open positions
 */
export const calculateTotalOpenPositions = (departments: Department[]): number => {
  return departments.reduce((total, dept) => total + dept.openPositions, 0);
};

/**
 * Generate analytics data for job interaction
 */
export const generateJobAnalytics = (job: JobOpening, action: 'view' | 'apply') => {
  return {
    event: `job_${action}`,
    job_id: job.id,
    job_title: job.title,
    department: job.department,
    job_type: job.type,
    job_level: job.level,
    is_remote: job.remote,
    is_featured: job.featured,
  };
};

/**
 * Generate application URL with tracking
 */
export const generateApplicationUrl = (job: JobOpening, source: string = 'careers_page'): string => {
  if (!job.applicationUrl) return 'mailto:careers@interprelab.com';

  const url = new URL(job.applicationUrl);
  url.searchParams.set('job_id', job.id);
  url.searchParams.set('source', source);

  return url.toString();
};

/**
 * Check if job is recently posted (within last 7 days)
 */
export const isRecentlyPosted = (postedDate: Date): boolean => {
  return getDaysSincePosted(postedDate) <= 7;
};

/**
 * Get job urgency level based on deadline
 */
export const getJobUrgency = (deadline?: Date): 'low' | 'medium' | 'high' | null => {
  if (!deadline) return null;

  const daysUntilDeadline = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDeadline <= 3) return 'high';
  if (daysUntilDeadline <= 7) return 'medium';
  return 'low';
};
