/**
 * About Page Component Hooks
 */

import { useState, useEffect, useCallback } from 'react';
import type { TeamMember, CompanyValue, CompanyStat } from './types';
import { TEAM_MEMBERS, COMPANY_VALUES, COMPANY_STATS } from './constants';

/**
 * Hook for managing about page animations
 */
export const useAboutAnimations = () => {
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
 * Hook for managing team member interactions
 */
export const useTeamMemberInteractions = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const handleMemberClick = useCallback((member: TeamMember) => {
    setSelectedMember(member);

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'team_member_clicked', {
        member_id: member.id,
        member_name: member.name,
        member_role: member.role,
      });
    }
  }, []);

  const handleMemberHover = useCallback((memberId: string | null) => {
    setHoveredMember(memberId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return {
    selectedMember,
    hoveredMember,
    handleMemberClick,
    handleMemberHover,
    clearSelection,
  };
};

/**
 * Hook for managing company values interactions
 */
export const useCompanyValuesInteractions = () => {
  const [selectedValue, setSelectedValue] = useState<CompanyValue | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const handleValueClick = useCallback((value: CompanyValue) => {
    setSelectedValue(value);

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'company_value_clicked', {
        value_id: value.id,
        value_title: value.title,
      });
    }
  }, []);

  const handleValueHover = useCallback((valueId: string | null) => {
    setHoveredValue(valueId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedValue(null);
  }, []);

  return {
    selectedValue,
    hoveredValue,
    handleValueClick,
    handleValueHover,
    clearSelection,
  };
};

/**
 * Hook for managing about page data
 */
export const useAboutPageData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>(COMPANY_VALUES);
  const [companyStats, setCompanyStats] = useState<CompanyStat[]>(COMPANY_STATS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTeamMembers = useCallback((members: TeamMember[]) => {
    setTeamMembers(members);
  }, []);

  const updateCompanyValues = useCallback((values: CompanyValue[]) => {
    setCompanyValues(values);
  }, []);

  const updateCompanyStats = useCallback((stats: CompanyStat[]) => {
    setCompanyStats(stats);
  }, []);

  return {
    teamMembers,
    companyValues,
    companyStats,
    isLoading,
    error,
    updateTeamMembers,
    updateCompanyValues,
    updateCompanyStats,
    setIsLoading,
    setError,
  };
};

/**
 * Hook for responsive about page layout
 */
export const useAboutResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  };
};

/**
 * Hook for about page analytics
 */
export const useAboutAnalytics = () => {
  const [sectionViews, setSectionViews] = useState<Record<string, number>>({});
  const [interactions, setInteractions] = useState<Record<string, number>>({});

  const trackSectionView = useCallback((sectionId: string) => {
    setSectionViews(prev => ({
      ...prev,
      [sectionId]: (prev[sectionId] || 0) + 1,
    }));

    // Track with analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'about_section_viewed', {
        section_id: sectionId,
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
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'about_interaction', {
        interaction_type: type,
        item_id: itemId,
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    return {
      sectionViews,
      interactions,
      totalViews: Object.values(sectionViews).reduce((sum, count) => sum + count, 0),
      totalInteractions: Object.values(interactions).reduce((sum, count) => sum + count, 0),
    };
  }, [sectionViews, interactions]);

  return {
    trackSectionView,
    trackInteraction,
    getAnalytics,
  };
};
