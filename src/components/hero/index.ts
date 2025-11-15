/**
 * Hero Components Barrel Export
 */

// Components
export { Hero } from '../Hero';
export { HeroBadge } from './HeroBadge';
export { HeroHeadline } from './HeroHeadline';
export { HeroActions } from './HeroActions';
export { HeroTrustIndicators } from './HeroTrustIndicators';
export { VideoHeroSection } from './VideoHeroSection';

// Types
export type {
  HeroAction,
  HeroBadge as HeroBadgeType,
  TrustIndicator,
  HeroContent,
  VideoHeroSection as VideoHeroSectionType,
  HeroProps,
  VideoSectionProps,
  FullScreenVideoHeroProps,
} from './types';

// Constants
export {
  DEFAULT_HERO_CONTENT,
  VIDEO_HERO_SECTIONS,
  HERO_ANIMATIONS,
  VIDEO_CONFIG,
  BREAKPOINTS,
  HERO_VARIANTS,
} from './constants';

// Utils
export {
  isExternalAction,
  getActionTarget,
  getActionRel,
  getActionClasses,
  calculateAnimationDelay,
  formatStatistic,
  getVideoPoster,
  generateVideoSectionId,
  generateVideoAriaLabel,
  supportsVideoAutoplay,
  playVideoWithFallback,
  getVideoResponsiveDimensions,
  getVideoIntersectionThreshold,
  getHeroSectionClasses,
  isValidVideoSource,
  getOptimalVideoFormat,
  preloadVideo,
  shouldShowScrollIndicator,
} from './utils';

// Hooks
export {
  useHeroAnimations,
  useVideoHero,
  useHeroLayout,
  useHeroScroll,
  useHeroActions,
  useVideoPreloader,
} from './hooks';
