import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import StatsCards from '@/modules/interpretrack/components/StatsCards';
import CallTypeChart from '@/modules/interpretrack/components/CallTypeChart';
import WeeklyChart from '@/modules/interpretrack/components/WeeklyChart';
import ManualLog from '@/modules/interpretrack/components/ManualLog';
import RecentCalls from '@/modules/interpretrack/components/RecentCalls';
import AIInsights from '@/modules/interpretrack/components/AIInsights';
import DemoBanner from '@/modules/interpretrack/components/DemoBanner';
import { useStats } from '@/modules/interpretrack/hooks/useStats';
import { isDemoMode } from '@/lib/data';
import { Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function InterpreTrack() {
  const { stats, callTypeStats, weeklyData, loading } = useStats();
  const demoMode = isDemoMode();

  const aiStats = demoMode 
    ? "Demo Mode: You're viewing sample data. Sign up to track your real earnings and protect yourself from wage theft!"
    : "Great week! You're 15% ahead of your average. Keep up the excellent work!";
  const aiError = false;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 bg-gradient-to-b from-background to-muted/20">
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
            <div className="animate-slide-up">
              <DemoBanner />
            </div>
          )}

          {/* Stats Cards */}
          <div className="animate-slide-up" style={{ animationDelay: '50ms' }}>
            <StatsCards stats={stats} />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Compact Manual Log */}
            <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <ManualLog />
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-2 grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                  <CallTypeChart data={callTypeStats} />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <AIInsights stats={aiStats} error={aiError} />
                </div>
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
                <WeeklyChart data={weeklyData} />
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
      </main>

      <Footer />
    </div>
  );
}
