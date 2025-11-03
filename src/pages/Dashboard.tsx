/**
 * Refactored Dashboard Page
 * Now uses modular architecture for better maintainability
 */

import { Dashboard as ModularDashboard } from '@/components/dashboard-page';

/**
 * Dashboard Page Component
 *
 * Wrapper component that maintains backward compatibility
 * while using the new modular architecture
 */
const Dashboard = () => {
  return <ModularDashboard />;
};

export default Dashboard;
