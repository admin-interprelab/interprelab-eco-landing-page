/**
 * Refactored Careers Page
 * Now uses modular architecture for better maintainability
 */

import { Careers as ModularCareers } from '@/components/careers';

/**
 * Careers Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
const Careers = () => {
  return <ModularCareers />;
};

export default Careers;
