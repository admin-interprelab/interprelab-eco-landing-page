/**
 * Dashboard Main Component
 */

import React from 'react';
import { Layout } from '@/components/Layout';
import { DashboardHeader } from './DashboardHeader';
import { StatsCards } from './StatsCards';
import { RecentCalls } from './RecentCalls';
import { useDashboardData, useDashboardAnalytics } from './hooks';
import type { DashboardPageProps } from './types';

/**
 * Dashboard Component
 *
 * Main dashboard page with:
 * - Statistics cards
 * - Recent calls list
 * - Data loading and error handling
 * - Analytics tracking
 * - Responsive layout
 */
export const Dashboard = React.memo<DashboardPageProps>(({
  className = '',
  customContent,
  onCallClick,
}) => {
  const {
    stats,
    recentCalls,
    currency,
    isLoading,
    error,
    refreshData,
  } = useDashboardData();

  const { trackPageView, trackCallClick } = useDashboardAnalytics();

  // Track page view on mount
  React.useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  const handleCallClick = (call: any) => {
    trackCallClick(call.id);

    if (onCallClick) {
      onCallClick(call);
    }
  };

  if (error) {
    return (
      <Layout className={className}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive mb-2">
              Unable to load dashboard
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className={className}>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader
          title={customContent?.title}
          onRefresh={refreshData}
          isRefreshing={isLoading}
        />

        {/* Statistics Cards */}
        <StatsCards
          stats={stats}
          currency={currency}
          showMonthly={customContent?.statsConfig?.showMonthly}
          showYearly={customContent?.statsConfig?.showYearly}
          showAverage={customContent?.statsConfig?.showAverage}
          showTotal={customContent?.statsConfig?.showTotal}
        />

        {/* Recent Calls */}
        <RecentCalls
          calls={recentCalls}
          currency={currency}
          title={customContent?.recentCallsConfig?.title}
          description={customContent?.recentCallsConfig?.description}
          onCallClick={handleCallClick}
        />
      </div>
    </Layout>
  );
});
