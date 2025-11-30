import { Suspense } from "react";
import {
  DashboardProvider,
  useDashboardData,
} from "@/components/dashboard/DashboardProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/stats-cards";
import WeeklyChart from "@/components/dashboard/weekly-chart";
import AIInsights from "@/components/dashboard/ai-insights";
import RecentCalls from "@/components/dashboard/recent-calls";
import CallTypeChart from "@/components/dashboard/call-type-chart";
import ManualLogWrapper from "@/components/dashboard/ManualLogWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, TrendingUp } from "lucide-react";

// Loading skeleton component
const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 space-y-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-80" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  </div>
);

// Main dashboard content component
const DashboardContent = () => {
  const { stats, weeklyData, callTypeStats, isLoading } = useDashboardData();

  // Mock AI stats for now
  const aiStats =
    stats.totalCalls > 0
      ? `Based on your ${stats.totalCalls} calls totaling ${stats.totalMinutes} minutes, you're maintaining excellent productivity! Your average call duration suggests efficient communication skills.`
      : null;
  const aiError = false;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Enhanced Header with Controls */}
      <DashboardHeader
        title="InterpreTrack Dashboard"
        subtitle="Your comprehensive interpretation activity center"
        showQuickStats={true}
        showExportOptions={true}
      />

      {/* Main Stats Cards with Enhanced Features */}
      <StatsCards stats={stats} showTrends={true} timePeriod="This month" />

      {/* Primary Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left Column - Primary Actions & Analytics */}
        <div className="lg:col-span-3 space-y-6">
          {/* Manual Call Logging */}
          <ManualLogWrapper />

          {/* Weekly Activity Chart with Enhanced Features */}
          <WeeklyChart
            data={weeklyData}
            showStats={true}
            showAverageLines={true}
            title="Weekly Performance"
            description="Your call volume and earnings trend over the past 7 days"
          />
        </div>

        {/* Right Column - Insights & Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Call Type Distribution */}
          <CallTypeChart
            data={callTypeStats}
            showDetailedStats={true}
            title="Call Distribution"
            description="Breakdown of your VRI vs OPI sessions"
          />

          {/* AI-Powered Insights */}
          <AIInsights stats={aiStats} error={aiError} />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <RecentCalls />
      </div>

      {/* Empty State Guidance */}
      {stats.totalCalls === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center text-center p-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Welcome to InterpreTrack!
              </h3>
              <p className="text-muted-foreground max-w-md">
                Start by logging your first call using the Manual Call Log
                above. Once you have some data, you'll see detailed analytics
                and insights here.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Main component with provider wrapper
export default function InterpreTrack() {
  return (
    <DashboardProvider refreshInterval={30000}>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </DashboardProvider>
  );
}
