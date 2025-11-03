/**
 * Refactored Solution Hero Component
 * Now uses modular architecture for better maintainability
 */

import { SolutionHero as ModularSolutionHero } from './solution-hero';

/**
 * Solution Hero Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
export const SolutionHero = () => {
  return <ModularSolutionHero />;
};
