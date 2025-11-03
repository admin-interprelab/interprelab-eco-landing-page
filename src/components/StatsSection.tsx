/**
 * Refactored Stats Section Component
 * Now uses modular architecture for better maintainability
 */

import { StatsSection as ModularStatsSection } from './stats';

/**
 * Stats Section Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
export const StatsSection = () => {
  return <ModularStatsSection />;
};
