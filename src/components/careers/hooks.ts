/**
 * Careers Page Component Hooks
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { JobOpening, Department, CompanyBenefit } from './types';
import { JOB_OPENINGS, DEPARTMENTS, COMPANY_BENEFITS } from './constants';
import {
  filterJobsByDepartment,
  filterJobsByType,
  filterJobsByLevel,
  filterJobsByRemote,
  searchJobs,
  sortJobs,
  getUniqueDepartments,
  getUniqueJobTypes,
  getUniqueJobLevels,
} from './utils';

/**
 * Hook for managing job listings and filters
 */
export const useJobListings = (initialJobs: JobOpening[] = JOB_OPENINGS) => {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'department' | 'featured'>('featured');

  // Memoized filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Apply search
    filtered = searchJobs(filtered, searchTerm);

    // Apply filters
    filtered = filterJobsByDepartment(filtered, selectedDepartment);
    filtered = filterJobsByType(filtered, selectedType);
    filtered = filterJobsByLevel(filtered, selectedLevel);
    filtered = filterJobsByRemote(filtered, remoteOnly);

    // Apply sorting
    filtered = sortJobs(filtered, sortBy);

    return filtered;
  }, [jobs, searchTerm, selectedDepartment, selectedType, selectedLevel, remoteOnly, sortBy]);

  // Get unique filter options
  const filterOptions = useMemo(() => ({
    departments: getUniqueDepartments(jobs),
    types: getUniqueJobTypes(jobs),
    levels: getUniqueJobLevels(jobs),
  }), [jobs]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedType('all');
    setSelectedLevel('all');
    setRemoteOnly(false);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchTerm !== '' ||
           selectedDepartment !== 'all' ||
           selectedType !== 'all' ||
           selectedLevel !== 'all' ||
           remoteOnly;
  }, [searchTerm, selectedDepartment, selectedType, selectedLevel, remoteOnly]);

  return {
    jobs: filteredJobs,
    allJobs: jobs,
    searchTerm,
    selectedDepartment,
    selectedType,
    selectedLevel,
    remoteOnly,
    sortBy,
    filterOptions,
    hasActiveFilters,
    setJobs,
    setSearchTerm,
    setSelectedDepartment,
    setSelectedType,
    setSelectedLevel,
    setRemoteOnly,
    setSortBy,
    clearFilters,
  };
};

/**
 * Hook for managing job interactions
 */
export const useJobInteractions = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [viewedJobs, setViewedJobs] = useState<Set<string>>(new Set());

  const handleJobView = useCallback((job: JobOpening) => {
    setSelectedJob(job);
    setViewedJobs(prev => new Set([...prev, job.id]));

    // Track analytics
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'job_viewed', {
        job_id: job.id,
        job_title: job.title,
        department: job.department,
      });
    }
  }, []);

  const handleJobApply = useCallback((job: JobOpening) => {
    setAppliedJobs(prev => new Set([...prev, job.id]));

    // Track analytics
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'job_applied', {
        job_id: job.id,
        job_title: job.title,
        department: job.department,
        application_url: job.applicationUrl,
      });
    }

    // Open application URL
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    }
  }, []);

  const isJobApplied = useCallback((jobId: string) => {
    return appliedJobs.has(jobId);
  }, [appliedJobs]);

  const isJobViewed = useCallback((jobId: string) => {
    return viewedJobs.has(jobId);
  }, [viewedJobs]);

  return {
    selectedJob,
    appliedJobs,
    viewedJobs,
    handleJobView,
    handleJobApply,
    isJobApplied,
    isJobViewed,
    setSelectedJob,
  };
};

/**
 * Hook for managing department data
 */
export const useDepartments = (initialDepartments: Department[] = DEPARTMENTS) => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleDepartmentClick = useCallback((department: Department) => {
    setSelectedDepartment(department);

    // Track analytics
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'department_clicked', {
        department_id: department.id,
        department_name: department.name,
        open_positions: department.openPositions,
      });
    }
  }, []);

  const getDepartmentById = useCallback((id: string) => {
    return departments.find(dept => dept.id === id) || null;
  }, [departments]);

  return {
    departments,
    selectedDepartment,
    setDepartments,
    setSelectedDepartment,
    handleDepartmentClick,
    getDepartmentById,
  };
};

/**
 * Hook for managing company benefits
 */
export const useCompanyBenefits = (initialBenefits: CompanyBenefit[] = COMPANY_BENEFITS) => {
  const [benefits, setBenefits] = useState<CompanyBenefit[]>(initialBenefits);
  const [selectedCategory, setSelectedCategory] = useState<CompanyBenefit['category'] | 'all'>('all');

  const filteredBenefits = useMemo(() => {
    if (selectedCategory === 'all') return benefits;
    return benefits.filter(benefit => benefit.category === selectedCategory);
  }, [benefits, selectedCategory]);

  const benefitsByCategory = useMemo(() => {
    return benefits.reduce((groups, benefit) => {
      const category = benefit.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(benefit);
      return groups;
    }, {} as Record<CompanyBenefit['category'], CompanyBenefit[]>);
  }, [benefits]);

  return {
    benefits: filteredBenefits,
    allBenefits: benefits,
    benefitsByCategory,
    selectedCategory,
    setBenefits,
    setSelectedCategory,
  };
};

/**
 * Hook for careers page animations
 */
export const useCareersAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              setAnimatedSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isSectionAnimated = useCallback((sectionId: string) => {
    return animatedSections.has(sectionId);
  }, [animatedSections]);

  return {
    isVisible,
    isSectionAnimated,
  };
};

/**
 * Hook for careers analytics
 */
export const useCareersAnalytics = () => {
  const [pageViews, setPageViews] = useState<Record<string, number>>({});
  const [interactions, setInteractions] = useState<Record<string, number>>({});

  const trackPageView = useCallback((page: string) => {
    setPageViews(prev => ({
      ...prev,
      [page]: (prev[page] || 0) + 1,
    }));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'careers_page_viewed', {
        page_name: page,
      });
    }
  }, []);

  const trackInteraction = useCallback((type: string, itemId: string) => {
    const key = `${type}_${itemId}`;
    setInteractions(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('event', 'careers_interaction', {
        interaction_type: type,
        item_id: itemId,
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      pageViews,
      interactions,
      totalPageViews: Object.values(pageViews).reduce((sum, count) => sum + count, 0),
      totalInteractions: Object.values(interactions).reduce((sum, count) => sum + count, 0),
    };
  }, [pageViews, interactions]);

  return {
    trackPageView,
    trackInteraction,
    getAnalytics,
  };
};
