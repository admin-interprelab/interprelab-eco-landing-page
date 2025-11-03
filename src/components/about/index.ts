/**
 * About Components Barrel Export
 */

// Main Component
export { About } from './About';

// Sub Components
export { AboutHero } from './AboutHero';
export { MissionVision } from './MissionVision';
export { CompanyValues } from './CompanyValues';
export { TeamSection } from './TeamSection';
export { CompanyStats } from './CompanyStats';
export { AboutCTA } from './AboutCTA';

// Types
export type {
  CompanyValue,
  TeamMember,
  CompanyStat,
  AboutHeroProps,
  MissionVisionProps,
  CompanyValuesProps,
  TeamSectionProps,
  CompanyStatsProps,
  AboutCTAProps,
  AboutPageProps,
} from './types';

// Constants
export {
  DEFAULT_HERO_CONTENT,
  DEFAULT_MISSION,
  DEFAULT_VISION,
  COMPANY_VALUES,
  TEAM_MEMBERS,
  COMPANY_STATS,
  DEFAULT_CTA,
  HERO_IMAGE,
  ANIMATION_CONFIG,
} from './constants';

// Utils
export {
  generateInitials,
  formatTeamMemberInitials,
  getAnimationDelay,
  filterTeamMembersByRole,
  sortTeamMembersByHierarchy,
  validateTeamMember,
  validateCompanyValue,
  validateCompanyStat,
  formatStatValue,
  getValueIconColor,
  generateTeamMemberCardId,
  generateValueCardId,
  generateStatId,
  hasTeamMemberAvatar,
  getValuesGridClasses,
  getTeamGridClasses,
  getStatsGridClasses,
  truncateText,
  generateTeamMemberAnalytics,
  generateValueAnalytics,
} from './utils';

// Hooks
export {
  useAboutAnimations,
  useTeamMemberInteractions,
  useCompanyValuesInteractions,
  useAboutPageData,
  useAboutResponsive,
  useAboutAnalytics,
} from './hooks';
