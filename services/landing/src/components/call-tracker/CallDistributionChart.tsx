import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CallTypeStats {
  type: string;
  count: number;
  duration: number;
  earnings: number;
  color: string;
}

interface CallDistributionChartProps {
  callTypeStats: CallTypeStats[];
  userSettings: any;
  formatDurationMinutes: (seconds: number) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const CallDistributionChart: React.FC<CallDistributionChartProps> = ({
  callTypeStats,
  userSettings,
  formatDurationMinutes,
  formatCurrency
}) => {
  if (callTypeStats.length === 0 || !callTypeStats.some(stat => stat.count > 0)) {
    return null;
  }

  return (
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
              formatter={(value: number | string, name: string) => {
                if (name === 'duration') return [formatDurationMinutes(Number(value)), 'Duration'];
                if (name === 'earnings') return [formatCurrency(Number(value), userSettings?.preferred_currency || 'USD'), 'Earnings'];
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
  );
};
