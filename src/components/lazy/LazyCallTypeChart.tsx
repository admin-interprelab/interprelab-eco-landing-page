import React, { lazy } from 'react';
import LazyComponent from './LazyComponent';
import { ChartErrorBoundary } from '@/components/error';
import type { CallTypeStats } from '@/lib/types';

// Lazy load the CallTypeChart component
const CallTypeChart = lazy(() => import('@/components/dashboard/CallTypeChart'));

interface LazyCallTypeChartProps {
  data: CallTypeStats;
  className?: string;
}

const PieChartSkeleton = () => (
  <div className="w-full h-full bg-card border rounded-lg p-6 animate-pulse flex flex-col">
    <div className="space-y-2 mb-6">
      <div className="h-6 bg-muted rounded w-1/2"></div>
      <div className="h-4 bg-muted rounded w-3/4"></div>
    </div>
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-muted mb-4 relative">
        <div className="absolute inset-4 rounded-full bg-background"></div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
      </div>
    </div>
  </div>
);

export const LazyCallTypeChart: React.FC<LazyCallTypeChartProps> = ({
  data,
  className
}) => {
  return (
    <ChartErrorBoundary>
      <LazyComponent
        fallback={PieChartSkeleton}
        threshold={0.1}
        rootMargin="100px"
        className={className}
      >
        <CallTypeChart data={data} />
      </LazyComponent>
    </ChartErrorBoundary>
  );
};

export default LazyCallTypeChart;
