
import { DashboardProvider, useDashboardData } from './DashboardProvider';
import DashboardHeader from './DashboardHeader';
import StatsCards from './stats-cards';
import RecentCalls from './recent-calls';
import WeeklyChart from './weekly-chart';
import CallTypeChart from './call-type-chart';
import AIInsights from './ai-insights';
import ManualLogWrapper from './ManualLogWrapper';

const DashboardContent = () => {
  const { isLoading } = useDashboardData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <StatsCards />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <WeeklyChart />
            <CallTypeChart />
          </div>
          <RecentCalls />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
          <AIInsights stats={null} />
          <ManualLogWrapper />
        </div>
      </main>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};
