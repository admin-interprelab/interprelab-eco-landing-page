import React, { lazy } from "react";
import LazyComponent from "./LazyComponent";
import { ChartErrorBoundary } from "@/components/error";

// Lazy load the WeeklyChart component
const WeeklyChart = lazy(() => import("@/components/dashboard/WeeklyChart"));

interface LazyWeeklyChartProps {
  data: {
    day: string;
    calls: number;
    earnings: number;
  }[];
  className?: string;
}

const ChartSkeleton = () => (
  <div className="w-full h-[350px] bg-card border rounded-lg p-6 animate-pulse">
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
      <div className="h-[250px] bg-muted rounded flex items-end justify-between p-4 space-x-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted-foreground/20 rounded-t"
            style={{
              height: `${Math.random() * 80 + 20}%`,
              width: "12%",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const LazyWeeklyChart: React.FC<LazyWeeklyChartProps> = ({
  data,
  className,
}) => {
  return (
    <ChartErrorBoundary>
      <LazyComponent
        fallback={ChartSkeleton}
        threshold={0.1}
        rootMargin="100px"
        className={className}
      >
        <WeeklyChart data={data} />
      </LazyComponent>
    </ChartErrorBoundary>
  );
};

export default LazyWeeklyChart;
