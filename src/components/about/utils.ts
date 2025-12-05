/**
 * About Page Component Utilities
 */

import type { TeamMember, CompanyValue, CompanyStat } from './types';

/**
 * Generate team member initials
 */
export const generateInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

/**
 * Format team member initials
 */
export const formatTeamMemberInitials = (member: TeamMember): string => {
  return member.initials || generateInitials(member.name);
};

/**
 * Get animation delay for staggered animations
 */
export const getAnimationDelay = (index: number, staggerDelay: number = 100): string => {
  return `${index * staggerDelay}ms`;
};

/**
 * Filter team members by role
 */
export const filterTeamMembersByRole = (members: TeamMember[], role: string): TeamMember[] => {
  return members.filter(member =>
    member.role.toLowerCase().includes(role.toLowerCase())
  );
};

/**
 * Sort team members by hierarchy
 */
export const sortTeamMembersByHierarchy = (members: TeamMember[]): TeamMember[] => {
  const hierarchy = ['CEO', 'CTO', 'Head', 'Director', 'Manager'];

  return [...members].sort((a, b) => {
    const aIndex = hierarchy.findIndex(title => a.role.includes(title));
    const bIndex = hierarchy.findIndex(title => b.role.includes(title));

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
};

/**
 * Validate team member data
 */
export const validateTeamMember = (member: Partial<TeamMember>): boolean => {
  return Boolean(
    member.id &&
    member.name &&
    member.role &&
    member.background &&
    member.specialization
  );
};

/**
 * Validate company value data
 */
export const validateCompanyValue = (value: Partial<CompanyValue>): boolean => {
  return Boolean(
    value.id &&
    value.icon &&
    value.title &&
    value.description
  );
};

/**
 * Validate company stat data
 */
export const validateCompanyStat = (stat: Partial<CompanyStat>): boolean => {
  return Boolean(
    stat.id &&
    stat.value &&
    stat.label
  );
};

/**
 * Format stat value for display
 */
export const formatStatValue = (value: string): string => {
  // Add any special formatting logic here
  return value;
};

/**
 * Get company value icon color
 */
export const getValueIconColor = (valueId: string): string => {
  const colorMap: Record<string, string> = {
    precision: 'text-primary',
    empathy: 'text-success',
    accessibility: 'text-info',
    excellence: 'text-warning',
  };

  return colorMap[valueId] || 'text-primary';
};

/**
 * Generate team member card ID
 */
export const generateTeamMemberCardId = (member: TeamMember): string => {
  return `team-member-${member.id}`;
};

/**
 * Generate company value card ID
 */
export const generateValueCardId = (value: CompanyValue): string => {
  return `company-value-${value.id}`;
};

/**
 * Generate company stat ID
 */
export const generateStatId = (stat: CompanyStat): string => {
  return `company-stat-${stat.id}`;
};

/**
 * Check if team member has avatar
 */
export const hasTeamMemberAvatar = (member: TeamMember): boolean => {
  return Boolean(member.avatar);
};

/**
 * Get responsive grid classes for values
 */
export const getValuesGridClasses = (valueCount: number): string => {
  if (valueCount <= 2) return 'grid-cols-1 md:grid-cols-2';
  if (valueCount === 3) return 'grid-cols-1 md:grid-cols-3';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
};

/**
 * Get responsive grid classes for team members
 */
export const getTeamGridClasses = (memberCount: number): string => {
  if (memberCount <= 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2';
};

/**
 * Get responsive grid classes for stats
 */
export const getStatsGridClasses = (statCount: number): string => {
  if (statCount <= 2) return 'grid-cols-2';
  if (statCount === 3) return 'grid-cols-3';
  return 'grid-cols-2 md:grid-cols-4';
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generate analytics data for team member interaction
 */
export const generateTeamMemberAnalytics = (member: TeamMember) => {
  return {
    event: 'team_member_viewed',
    member_id: member.id,
    member_name: member.name,
    member_role: member.role,
  };
};

/**
 * Generate analytics data for company value interaction
 */
export const generateValueAnalytics = (value: CompanyValue) => {
  return {
    event: 'company_value_viewed',
    value_id: value.id,
    value_title: value.title,
  };
};
