import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePremium } from '@/contexts/PremiumContext';
import { PremiumUpgradeCard } from '@/components/premium/PremiumUpgradeCard';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ProjectionData {
  month: string;
  actual?: number;
  projected: number;
  range: [number, number];
}

const mockProjectionData: ProjectionData[] = [
    { month: 'Jan', actual: 2400, projected: 2400, range: [2200, 2600] },
    { month: 'Feb', actual: 2800, projected: 2800, range: [2600, 3000] },
    { month: 'Mar', actual: 3500, projected: 3500, range: [3200, 3800] },
    { month: 'Apr', actual: 3100, projected: 3100, range: [2900, 3400] },
    { month: 'May', actual: 4200, projected: 4200, range: [3900, 4500] },
    { month: 'Jun', projected: 4500, range: [4200, 4800] },
    { month: 'Jul', projected: 4700, range: [4300, 5100] },
    { month: 'Aug', projected: 4600, range: [4200, 5000] },
];

export const EarningsProjection: React.FC = () => {
  const { isPremium } = usePremium();

  if (!isPremium) {
    return <PremiumUpgradeCard featureName="AI Earnings Projection" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <CardTitle className="text-lg">AI Earnings Projection</CardTitle>
        </div>
        <CardDescription>
          Forecasted earnings based on your performance trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={mockProjectionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Area type="monotone" dataKey="range" stroke="#8884d8" fillOpacity={0.2} fill="url(#colorProjected)" name="Projected Range" />
            <Area type="monotone" dataKey="projected" stroke="#8884d8" fill="url(#colorProjected)" name="Projected" />
            <Area type="monotone" dataKey="actual" stroke="#82ca9d" fill="url(#colorActual)" name="Actual" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EarningsProjection;
