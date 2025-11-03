/**
 * Refactored Index Page
 * Now uses modular architecture for better maintainability
 */

import { Index as ModularIndex } from '@/components/index-page';

/**
 * Index Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
const Index = () => {
  return <ModularIndex />;
};

export default Index;
