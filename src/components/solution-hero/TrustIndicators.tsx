/**
 * Trust Indicators Component
 */

import type { TrustIndicatorProps } from './types';
import { DEFAULT_TRUST_INDICATORS } from './constants';
import { getTrustIndicatorColor } from './utils';

/**
 * Trust Indicators Component
 *
 * Displays security and compliance badges
 */
export const TrustIndicators = ({
  className = '',
  indicators = DEFAULT_TRUST_INDICATORS,
}: TrustIndicatorProps) => {
  return (
    <div className={`pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground ${className}`}>
      {indicators.map((indicator) => {
        const statusColor = getTrustIndicatorColor(indicator.status || 'verified');

        return (
          <div
            key={indicator.id}
            className="flex items-center gap-2"
          >
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${statusColor}`}
              aria-label={`${indicator.text} status: ${indicator.status}`}
            />
            <span className="font-sans">{indicator.text}</span>
          </div>
        );
      })}
    </div>
  );
};
