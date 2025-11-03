/**
 * Stat Card Component
 */

import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardProps } from './types';
import {
  getStatGradient,
  getCardVariantClasses,
  getTrendColor,
  formatStatValue,
  formatTrend,
  getAnimationDelay
} from './utils';

/**
 * Stat Card Component
 *
 * Individual stat display with:
 * - Icon with gradient background
 * - Animated value
 * - Label and description
 * - Optional trend indicator
 * - Multiple variants
 */
export const StatCard = ({
  stat,
  index,
  variant = 'default',
  showTrend = false,
  animateOnScroll = true,
  onClick,
  className = '',
}: StatCardProps) => {
  const IconComponent = stat.icon;
  const gradient = getStatGradient(stat.gradient);
  const cardClasses = getCardVariantClasses(variant);
  const animationDelay = getAnimationDelay(index);
  const formattedValue = formatStatValue(stat);
  const trendColor = stat.trend ? getTrendColor(stat.trend.direction) : '';
  const formattedTrend = formatTrend(stat.trend);

  const handleClick = () => {
    if (onClick) {
      onClick(stat);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`${cardClasses} ${className} ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `View details for ${stat.label}` : undefined}
      data-stat-id={stat.id}
      style={animateOnScroll ? { animationDelay } : undefined}
    >
      {/* Icon */}
      <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      {/* Value */}
      <div className="text-4xl md:text-5xl font-bold text-foreground" data-stat-value>
        {stat.animated && animateOnScroll ? '0' : formattedValue}
      </div>

      {/* Label */}
      <div className="text-sm text-muted-foreground">
        {stat.label}
      </div>

      {/* Description */}
      {stat.description && variant === 'detailed' && (
        <div className="text-xs text-muted-foreground/80 mt-2">
          {stat.description}
        </div>
      )}

      {/* Trend */}
      {showTrend && stat.trend && (
        <div className={`text-xs mt-2 flex items-center justify-center gap-1 ${trendColor}`}>
          {stat.trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
          {stat.trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
          <span>{formattedTrend}</span>
        </div>
      )}
    </div>
  );
};
