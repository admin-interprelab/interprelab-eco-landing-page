/**
 * Refactored Home Page
 * Now uses modular architecture for better maintainability
 */

import { Home as ModularHome } from '@/components/home';

/**
 * Home Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
export default function Home() {
  return <ModularHome />;
}
