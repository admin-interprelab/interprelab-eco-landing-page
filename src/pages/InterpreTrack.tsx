import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCallTracker } from '@/hooks/useCallTracker';
import { Phone, PhoneOff, Clock, BarChart3, DollarSign, Calendar, TrendingUp, Settings, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const InterpreTrack = () => {
  const [notes, setNotes] = useState('');
  const { user } = useAuth();
  const {
    isTracking,
    elapsedSeconds,
    startCall,
    endCall,
    formatDuration,
    formatCurrency,
    calculateEarnings,
    userSettings,
  } = useCallTracker();

  const handleEndCall = async () => {
    await endCall(notes);
    setNotes('');
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Time & Earnings Tracker
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            InterpreTrack
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Track your interpretation sessions, monitor earnings, and manage your professional practice—all in one place.
          </p>
        </div>
      </section>

      {/* Call Tracker Section */}
      {user ? (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-8 glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Current Session
                </CardTitle>
                <CardDescription>
                  Track your interpretation calls and earnings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold mb-4">
                    {formatDuration(elapsedSeconds)}
                  </div>
                  {isTracking && (
                    <div className="text-2xl text-muted-foreground">
                      Earnings: {formatCurrency(currentEarnings, userSettings?.preferred_currency)}
                    </div>
                  )}
                </div>

                {isTracking && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Call Notes (Optional)</label>
                    <Textarea
                      placeholder="Add notes about this call..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  {!isTracking ? (
                    <Button
                      onClick={startCall}
                      size="lg"
                      className="w-full max-w-xs glass-button"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Start Call
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEndCall}
                      variant="destructive"
                      size="lg"
                      className="w-full max-w-xs"
                    >
                      <PhoneOff className="mr-2 h-5 w-5" />
                      End Call
                    </Button>
                  )}
                </div>

                {userSettings && (
                  <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                    Current Rate: {formatCurrency(userSettings.pay_rate, userSettings.preferred_currency)} {userSettings.pay_rate_type === 'per_hour' ? 'per hour' : 'per minute'}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-center mb-8">
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Full Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Track Everything That Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tracking and analytics for professional interpreters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Automatic Time Tracking</CardTitle>
                <CardDescription>
                  Start and stop tracking with one click. No manual timers or complicated setup.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Earnings Calculator</CardTitle>
                <CardDescription>
                  Set your pay rate and see real-time earnings calculations during each session.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Performance Dashboard</CardTitle>
                <CardDescription>
                  View detailed analytics, monthly earnings, and session history at a glance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Calendar className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Session History</CardTitle>
                <CardDescription>
                  Access complete logs of all your interpretation sessions with notes and details.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>
                  Track your productivity trends and earnings over time with visual charts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Settings className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Custom Settings</CardTitle>
                <CardDescription>
                  Configure pay rates, currency preferences, and personalize your tracking experience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your path to better practice management
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Set Your Pay Rate</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Configure your hourly or per-minute rate in your preferred currency. Update anytime in Settings.
                  </p>
                  <Link to="/settings">
                    <Button className="glass-button">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Settings
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Track Your Sessions</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Click "Start Call" when you begin an interpretation session. Add notes and click "End Call" when finished.
                  </p>
                  <div className="p-4 glass rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Example Session</span>
                      <Badge variant="outline">45:30</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Medical interpretation - Hospital ER</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">View Analytics</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Access your dashboard to view earnings, session statistics, and performance trends over time.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Monthly earnings summary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Session history with notes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Performance trend charts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="glass-button">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button size="lg" className="glass-button">
                  Sign In to Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InterpreTrack;
