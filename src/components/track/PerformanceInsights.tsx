import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Phone,
  Calendar,
  Award,
  AlertTriangle,
  Target
} from 'lucide-react';

interface PerformanceData {
  totalEarnings: number;
  totalCalls: number;
  totalHours: number;
  averageCallDuration: number;
  averageHourlyRate: number;
  bestDay: {
    date: string;
    earnings: number;
    calls: number;
  };
  trends: {
    earningsChange: number;
    callsChange: number;
    hoursChange: number;
  };
  insights: string[];
  recommendations: string[];
}

interface PerformanceInsightsProps {
  data: PerformanceData;
  period: 'week' | 'month' | 'quarter';
}

export const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({
  data,
  period
}) => {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <div className="h-4 w-4" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getPerformanceRating = () => {
    const earningsScore = data.averageHourlyRate >= 50 ? 100 : (data.averageHourlyRate / 50) * 100;
    const utilizationScore = data.totalHours >= 40 ? 100 : (data.totalHours / 40) * 100;
    const consistencyScore = data.totalCalls >= 20 ? 100 : (data.totalCalls / 20) * 100;

    const overallScore = (earningsScore + utilizationScore + consistencyScore) / 3;

    if (overallScore >= 90) return { rating: 'Excellent', color: 'text-green-400', badge: 'default' };
    if (overallScore >= 75) return { rating: 'Good', color: 'text-blue-400', badge: 'secondary' };
    if (overallScore >= 60) return { rating: 'Fair', color: 'text-yellow-400', badge: 'outline' };
    return { rating: 'Needs Improvement', color: 'text-red-400', badge: 'destructive' };
  };

  const performance = getPerformanceRating();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Performance Insights</h2>
        <Badge variant={performance.badge as any} className="text-sm">
          {performance.rating}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(data.totalEarnings)}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(data.trends.earningsChange)}
                <span className={`text-sm ${getTrendColor(data.trends.earningsChange)}`}>
                  {Math.abs(data.trends.earningsChange)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Calls</p>
                <p className="text-2xl font-bold text-white">{data.totalCalls}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(data.trends.callsChange)}
                <span className={`text-sm ${getTrendColor(data.trends.callsChange)}`}>
                  {Math.abs(data.trends.callsChange)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Hours Worked</p>
                <p className="text-2xl font-bold text-white">{data.totalHours}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(data.trends.hoursChange)}
                <span className={`text-sm ${getTrendColor(data.trends.hoursChange)}`}>
                  {Math.abs(data.trends.hoursChange)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardContent className="p-4">
            <div>
              <p className="text-blue-200 text-sm">Hourly Rate</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(data.averageHourlyRate)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Performance Day */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Best Performance Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{data.bestDay.date}</p>
              <p className="text-blue-200 text-sm">Date</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{formatCurrency(data.bestDay.earnings)}</p>
              <p className="text-blue-200 text-sm">Earnings</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{data.bestDay.calls}</p>
              <p className="text-blue-200 text-sm">Calls</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-blue-200 text-sm">{insight}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-blue-200 text-sm">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
