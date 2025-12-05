/**
 * Index Page Component Constants
 */

export const INDEX_SECTIONS = {
  HERO: 'hero',
  PRODUCT_SHOWCASE: 'product_showcase',
  STATS: 'stats',
  TESTIMONIALS: 'testimonials',
} as const;

export const DEFAULT_SECTION_CONFIG = {
  showHero: true,
  showProductShowcase: true,
  showStats: true,
  showTestimonials: true,
};
