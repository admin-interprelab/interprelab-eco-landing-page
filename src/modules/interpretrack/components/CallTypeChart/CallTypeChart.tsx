import * as React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, TooltipProps } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import type { CallTypeStats } from '@/modules/interpretrack/types';
import { Video, Phone } from 'lucide-react';

interface CallTypeChartProps {
  data: CallTypeStats;
}

// Vibrant, professional colors for VRI and OPI
const COLORS = {
  vri: '#4F9BFF', // Vibrant blue
  opi: '#10B981', // Success green  
};

export default function CallTypeChart({ data }: CallTypeChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const chartData = [
    { 
      name: 'VRI',
      fullName: 'VRI (Video)',
      value: data.vri, 
      color: COLORS.vri,
    },
    { 
      name: 'OPI',
      fullName: 'OPI (Phone)', 
      value: data.opi, 
      color: COLORS.opi,
    },
  ];
  
  const totalCalls = data.vri + data.opi;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalCalls) * 100).toFixed(1);
      return (
        <div className="bg-background/95 backdrop-blur-sm rounded-lg border border-border/50 p-3 shadow-xl">
          <p className="text-sm font-semibold text-foreground mb-1">
            {data.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {data.value} calls ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full" />
          Call Type Breakdown
        </CardTitle>
        <CardDescription>
          VRI vs OPI session distribution
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center pb-6">
        {totalCalls > 0 ? (
          <div className="w-full">
            {/* Pie Chart */}
            <div className="w-full max-w-[300px] mx-auto" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(undefined)}
                    label={({ percent, x, y, midAngle, cx, cy }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 110;
                      const labelX = cx + radius * Math.cos(-midAngle * RADIAN);
                      const labelY = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text
                          x={labelX}
                          y={labelY}
                          fill="currentColor"
                          className="text-foreground text-sm font-bold"
                          textAnchor={labelX > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={entry.color}
                        className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                        stroke="hsl(var(--background))"
                        strokeWidth={3}
                        opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.6}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-col gap-3 pt-6 mt-4">
              {chartData.map((item, index) => {
                const Icon = item.name === 'VRI' ? Video : Phone;
                const percentage = ((item.value / totalCalls) * 100).toFixed(1);
                
                return (
                  <div
                    key={item.name}
                    className={`
                      flex items-center justify-between p-3 rounded-lg border transition-all duration-300 cursor-pointer
                      ${activeIndex === index ? 'border-primary bg-primary/5 scale-105' : 'border-border/50 hover:border-border hover:bg-muted/30'}
                    `}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(undefined)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full ring-2 ring-offset-2 ring-offset-background"
                        style={{ 
                          backgroundColor: item.color,
                        }}
                      />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {item.fullName}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">
                        {item.value}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Total Summary */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Calls</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  {totalCalls}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <Phone className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              No call data available yet.
              <br />
              <span className="text-xs">Start logging your calls to see the breakdown!</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
