import StatsCards from '@/components/dashboard/stats-cards';
import WeeklyChart from '@/components/dashboard/weekly-chart';
import AIInsights from '@/components/dashboard/ai-insights';
import RecentCalls from '@/components/dashboard/recent-calls';
import CallTypeChart from '@/components/dashboard/call-type-chart';
import ManualLog from '@/components/dashboard/manual-log';
import { getAggregatedStats, getWeeklyData, getCallTypeStats, isDemoMode } from '@/lib/data';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function InterpreTrack() {
  const stats = getAggregatedStats();
  const weeklyData = getWeeklyData();
  const callTypeData = getCallTypeStats();
  const aiStats = isDemoMode() 
    ? "Demo Mode: You're viewing sample data. Sign up to track your real earnings and protect yourself from wage theft!"
    : "Great week! You're 15% ahead of your average. Keep up the excellent work!";
  const aiError = false;
  const demoMode = isDemoMode();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-gradient-to-b from-primary to-success rounded-full" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                InterpreTrack Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                {demoMode ? 'Viewing Demo Data' : 'Welcome back, Interpreter!'}
              </p>
            </div>
          </div>
        </header>

        {/* Demo Mode Banner */}
        {demoMode && (
          <Alert className="border-primary/50 bg-gradient-to-r from-primary/10 via-success/10 to-primary/10 animate-fade-in">
            <Sparkles className="h-5 w-5 text-primary" />
            <AlertDescription className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  You're viewing demo data with realistic interpreter call logs
                </p>
                <p className="text-xs text-muted-foreground">
                  Sign up to track your actual earnings, detect wage theft, and manage your business!
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to="/signup">
                    Create Free Account
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-primary to-success text-white">
                  <Link to="/pricing">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Pricing
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="animate-slide-up">
          <StatsCards stats={stats} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <ManualLog />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <WeeklyChart data={weeklyData} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 grid gap-6 content-start">
            <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
              <CallTypeChart data={callTypeData} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
              <AIInsights stats={aiStats} error={aiError} />
            </div>
          </div>
        </div>

        {/* Recent Calls Table */}
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <RecentCalls />
        </div>

        {/* Footer CTA for Demo Users */}
        {demoMode && (
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-success/20 to-primary/20 border border-border/50 text-center animate-fade-in">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Ready to protect your earnings?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of interpreters using InterpreTrack to detect wage theft, 
              manage multiple clients, and maximize their income.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" variant="outline">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-success text-white">
                <Link to="/pricing">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Plans & Pricing
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
