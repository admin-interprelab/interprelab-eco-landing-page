import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, Clock, TrendingUp, Phone } from 'lucide-react';
import { format, startOfMonth, startOfYear, endOfMonth, endOfYear } from 'date-fns';

interface Stats {
  monthTotal: number;
  monthEarnings: number;
  monthCalls: number;
  yearTotal: number;
  yearEarnings: number;
  yearCalls: number;
  avgCallDuration: number;
  totalCalls: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    monthTotal: 0,
    monthEarnings: 0,
    monthCalls: 0,
    yearTotal: 0,
    yearEarnings: 0,
    yearCalls: 0,
    avgCallDuration: 0,
    totalCalls: 0,
  });
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [currency, setCurrency] = useState('USD');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    // Get user currency
    const { data: settings } = await supabase
      .from('user_settings')
      .select('preferred_currency')
      .eq('user_id', user.id)
      .maybeSingle();

    if (settings) {
      setCurrency(settings.preferred_currency);
    }

    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);

    // Get month stats
    const { data: monthData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings')
      .eq('user_id', user.id)
      .gte('start_time', monthStart.toISOString())
      .lte('start_time', monthEnd.toISOString());

    // Get year stats
    const { data: yearData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings')
      .eq('user_id', user.id)
      .gte('start_time', yearStart.toISOString())
      .lte('start_time', yearEnd.toISOString());

    // Get all time stats
    const { data: allData } = await supabase
      .from('call_logs')
      .select('duration_seconds, earnings')
      .eq('user_id', user.id);

    // Get recent calls
    const { data: recent } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false })
      .limit(5);

    const monthStats = calculateStats(monthData || []);
    const yearStats = calculateStats(yearData || []);
    const allStats = calculateStats(allData || []);

    setStats({
      monthTotal: monthStats.totalDuration,
      monthEarnings: monthStats.totalEarnings,
      monthCalls: monthStats.callCount,
      yearTotal: yearStats.totalDuration,
      yearEarnings: yearStats.totalEarnings,
      yearCalls: yearStats.callCount,
      avgCallDuration: allStats.avgDuration,
      totalCalls: allStats.callCount,
    });

    setRecentCalls(recent || []);
  };

  const calculateStats = (data: any[]) => {
    const totalDuration = data.reduce((sum, call) => sum + (call.duration_seconds || 0), 0);
    const totalEarnings = data.reduce((sum, call) => sum + (parseFloat(call.earnings) || 0), 0);
    const callCount = data.length;
    const avgDuration = callCount > 0 ? totalDuration / callCount : 0;

    return { totalDuration, totalEarnings, callCount, avgDuration };
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Monthly & Yearly Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.monthEarnings)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.monthCalls} calls • {formatDuration(stats.monthTotal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Year</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.yearEarnings)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.yearCalls} calls • {formatDuration(stats.yearTotal)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDuration(stats.avgCallDuration)}</div>
              <p className="text-xs text-muted-foreground">Across all calls</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCalls}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
            <CardDescription>Your latest interpretation sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No calls logged yet. Start tracking your calls to see them here.
                </p>
              ) : (
                recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        {format(new Date(call.start_time), 'MMM dd, yyyy • hh:mm a')}
                      </div>
                      {call.notes && (
                        <div className="text-sm text-muted-foreground mt-1">{call.notes}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(parseFloat(call.earnings))}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDuration(call.duration_seconds)}
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

export default Dashboard;
