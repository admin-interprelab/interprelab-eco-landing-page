/**
 * Refactored Navigation Component
 * Now uses modular architecture for better maintainability
 */

import { Navigation as ModularNavigation } from './navigation';

/**
 * Navigation Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
export const Navigation = () => {
  return <ModularNavigation />;
};
