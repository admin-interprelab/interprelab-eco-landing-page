import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCallTracker } from '@/hooks/useCallTracker';
import { Phone, PhoneOff, Clock, Video, Monitor, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CallTracker = () => {
  const [notes, setNotes] = useState('');
  const [callType, setCallType] = useState<'VRI' | 'OPI'>('VRI');
  const [stats, setStats] = useState<any>(null);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [callTypeStats, setCallTypeStats] = useState<any[]>([]);
  const [roundingMethod, setRoundingMethod] = useState<string>('actual');
  
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
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDashboardData();
      loadUserSettings();
    }
  }, [user]);

  const loadUserSettings = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_settings')
      .select('time_rounding_method')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data?.time_rounding_method) {
      setRoundingMethod(data.time_rounding_method);
    }
  };

  const loadDashboardData = async () => {
    if (!user) return;

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Get month stats
    const { data: monthData } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('start_time', monthStart.toISOString())
      .lte('start_time', monthEnd.toISOString());

    if (monthData) {
      const totalDuration = monthData.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
      const totalRounded = monthData.reduce((sum, call) => sum + (call.rounded_duration_seconds || call.duration_seconds || 0), 0);
      const totalEarnings = monthData.reduce((sum, call) => sum + (call.earnings || 0), 0);
      const totalRoundedEarnings = monthData.reduce((sum, call) => sum + (call.rounded_earnings || call.earnings || 0), 0);
      
      // Calculate time lost to rounding
      const timeLost = totalDuration - totalRounded;
      const earningsLost = totalEarnings - totalRoundedEarnings;

      // Call type breakdown
      const vriCalls = monthData.filter(c => c.call_type === 'VRI');
      const opiCalls = monthData.filter(c => c.call_type === 'OPI');
      
      setCallTypeStats([
        {
          type: 'VRI',
          count: vriCalls.length,
          duration: vriCalls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0),
          earnings: vriCalls.reduce((sum, call) => sum + (call.earnings || 0), 0),
          color: 'hsl(217, 91%, 60%)', // blue
        },
        {
          type: 'OPI',
          count: opiCalls.length,
          duration: opiCalls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0),
          earnings: opiCalls.reduce((sum, call) => sum + (call.earnings || 0), 0),
          color: 'hsl(271, 81%, 56%)', // purple
        }
      ]);

      setStats({
        monthCalls: monthData.length,
        totalSeconds: totalDuration,
        roundedSeconds: totalRounded,
        totalEarnings: totalEarnings,
        roundedEarnings: totalRoundedEarnings,
        projectedEarnings: totalEarnings, // Could calculate based on remaining days
        timeLost,
        earningsLost,
        roundingMethod,
        totalDuration,
        totalRounded,
        totalRoundedEarnings,
      });
    }

    // Get recent calls
    const { data: recent } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false })
      .limit(10);

    setRecentCalls(recent || []);
  };

  const handleEndCall = async () => {
    await endCall(notes, callType);
    setNotes('');
    setCallType('VRI');
    // Reload data after call ends
    setTimeout(loadDashboardData, 500);
  };

  const currentEarnings = calculateEarnings(elapsedSeconds);
  const formatDurationMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Addressing Pain Point #1: Transparency in Compensation
          </Badge>
          <h1 className="text-4xl font-bold mb-2">InterpreTrack</h1>
          <p className="text-lg text-muted-foreground">
            Precision logging that reveals the truth. Every second counts, every call matters.
          </p>
        </div>

        {/* Active Call Tracker */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              {isTracking ? 'Active Session' : 'Start New Session'}
            </CardTitle>
            <CardDescription>
              Track your interpretation calls with precision and transparency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-mono font-bold mb-4 text-primary">
                {formatDuration(elapsedSeconds)}
              </div>
              {isTracking && (
                <div className="text-2xl text-muted-foreground mb-4">
                  Earnings: {formatCurrency(currentEarnings, userSettings?.preferred_currency)}
                </div>
              )}
            </div>

            {!isTracking && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Call Type</label>
                <Select value={callType} onValueChange={(value: 'VRI' | 'OPI') => setCallType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VRI">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        VRI (Video Remote Interpreting)
                      </div>
                    </SelectItem>
                    <SelectItem value="OPI">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        OPI (Over-the-Phone Interpreting)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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
                  className="w-full max-w-xs"
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

        {/* Month Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.totalEarnings, userSettings?.preferred_currency || 'USD')}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.monthCalls} calls • {formatDurationMinutes(stats.totalDuration)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actual Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDurationMinutes(stats.totalDuration)}</div>
                <p className="text-xs text-muted-foreground">
                  Total call time tracked
                </p>
              </CardContent>
            </Card>

            {roundingMethod !== 'actual' && (
              <>
                <Card className="border-orange-500/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">LSP Reported Time</CardTitle>
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{formatDurationMinutes(stats.totalRounded)}</div>
                    <p className="text-xs text-muted-foreground">
                      Rounded down by LSP
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Time "Lost"</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{formatDurationMinutes(stats.timeLost)}</div>
                    <p className="text-xs text-muted-foreground">
                      ≈ {formatCurrency(Math.abs(stats.earningsLost), userSettings?.preferred_currency || 'USD')} unpaid
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Call Type Distribution */}
        {callTypeStats.length > 0 && callTypeStats.some(stat => stat.count > 0) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Call Distribution by Type</CardTitle>
              <CardDescription>VRI vs OPI breakdown for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={callTypeStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any, name: string) => {
                      if (name === 'duration') return [formatDurationMinutes(value), 'Duration'];
                      if (name === 'earnings') return [formatCurrency(value, userSettings?.preferred_currency || 'USD'), 'Earnings'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Calls" radius={[8, 8, 0, 0]}>
                    {callTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Transparency Message */}
        {roundingMethod !== 'actual' && stats?.timeLost > 0 && (
          <Card className="mb-8 border-orange-500/20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
            <CardHeader>
              <Badge className="w-fit mb-2 bg-orange-500 text-white">Transparency Report</Badge>
              <CardTitle className="text-orange-900 dark:text-orange-100">The Seconds Add Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                This month, <strong>{formatDurationMinutes(stats.timeLost)}</strong> of your work went uncompensated due to rounding practices. 
                At 18-25 calls per day with minimal wait time, these "seconds" compound into real money—money that LSPs keep.
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                We don't need to call it out explicitly. The numbers speak for themselves. InterpreLab provides precision logging 
                so you can see the full picture. We're building tools for interpreters, not corporations.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Call History</CardTitle>
            <CardDescription>Your latest interpretation sessions with full transparency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCalls.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No calls logged yet. Start tracking your calls to see them here.
                </p>
              ) : (
                recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {call.call_type === 'VRI' ? (
                          <Video className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Phone className="h-4 w-4 text-purple-500" />
                        )}
                        <Badge variant={call.call_type === 'VRI' ? 'default' : 'secondary'}>
                          {call.call_type}
                        </Badge>
                        <span className="font-medium text-sm">
                          {format(new Date(call.start_time), 'MMM dd, yyyy • hh:mm a')}
                        </span>
                      </div>
                      {call.notes && (
                        <div className="text-sm text-muted-foreground mt-1">{call.notes}</div>
                      )}
                      {call.rounded_duration_seconds && call.duration_seconds !== call.rounded_duration_seconds && (
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                          Actual: {formatDurationMinutes(call.duration_seconds)} • 
                          LSP Reported: {formatDurationMinutes(call.rounded_duration_seconds)}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(call.earnings || 0, userSettings?.preferred_currency || 'USD')}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDurationMinutes(call.duration_seconds)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CallTracker;
