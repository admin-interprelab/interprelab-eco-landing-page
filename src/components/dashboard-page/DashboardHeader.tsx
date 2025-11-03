/**
 * Dashboard Header Component
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import type { DashboardHeaderProps } from './types';

/**
 * DashboardHeader Component
 *
 * Header section for the dashboard with:
 * - Page title
 * - Refresh button
 * - Optional actions
 */
export const DashboardHeader = React.memo<DashboardHeaderProps & {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}>(({
  title = "Dashboard",
  className = "",
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <h1 className="text-4xl font-bold">{title}</h1>

      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      )}
    </div>
  );
});
