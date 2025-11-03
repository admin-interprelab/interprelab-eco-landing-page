/**
 * Stats Section Main Component
 */

import { StatsHeader } from './StatsHeader';
import { StatsGrid } from './StatsGrid';
import type { StatsSectionProps, StatItem } from './types';
import { DEFAULT_STATS } from './constants';
import { useStatsAnimations, useStatsInteractions, useStatsAnalytics } from './hooks';

/**
 * Stats Section Component
 *
 * Main stats section with:
 * - Header with title and badge
 * - Responsive grid of stat cards
 * - Animation on scroll
 * - Analytics tracking
 * - Multiple variants
 */
export const StatsSection = ({
  className = '',
  stats = DEFAULT_STATS,
  title,
  subtitle,
  badge,
  variant = 'default',
  showBackground = true,
  showTrends = false,
  animateOnScroll = true,
  columns = 'auto',
  onStatClick,
}: StatsSectionProps) => {
  const { isVisible } = useStatsAnimations(stats, animateOnScroll);
  const { handleStatClick } = useStatsInteractions();
  const { trackView, trackInteraction } = useStatsAnalytics();

  const handleCardClick = (stat: StatItem) => {
    // Track analytics
    trackInteraction(stat.id, 'click');

    // Call custom handler if provided
    if (onStatClick) {
      onStatClick(stat);
    }

    // Call hook handler for internal tracking
    handleStatClick(stat);
  };

  return (
    <section
      className={`py-20 px-6 relative ${className}`}
      aria-label="Statistics Section"
    >
      <div className="container mx-auto">
        <div className={`${showBackground ? 'glass border-border/30 rounded-3xl p-12 md:p-16 relative overflow-hidden' : ''}`}>
          {/* Background glow */}
          {showBackground && (
            <div className="absolute inset-0 bg-gradient-glow opacity-10" />
          )}

          <div className="relative z-10">
            {/* Header */}
            <StatsHeader
              title={title}
              subtitle={subtitle}
              badge={badge}
            />

            {/* Stats Grid */}
            <StatsGrid
              stats={stats}
              columns={columns}
              variant={variant}
              showTrends={showTrends}
              animateOnScroll={animateOnScroll}
              onStatClick={handleCardClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
