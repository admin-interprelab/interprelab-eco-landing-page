/**
 * Index Page Component Constants
 */

export const INDEX_SECTIONS = {
  HERO: 'hero',
  VIDEO_SECTION: 'video_section',
  PRODUCT_SHOWCASE: 'product_showcase',
  STATS: 'stats',
  TESTIMONIALS: 'testimonials',
} as const;

export const DEFAULT_SECTION_CONFIG = {
  showHero: true,
  showVideoSection: true, // Enabled: show video pain-points section on landing
  showProductShowcase: true,
  showStats: true,
  showTestimonials: true,
};
