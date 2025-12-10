import * as React from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { CallTypeStats } from '@/lib/types';
import { Video, Phone } from 'lucide-react';

interface CallTypeChartProps {
  data: CallTypeStats;
}

const chartConfig = {
  vri: {
    label: 'VRI',
    color: 'hsl(var(--chart-1))',
    icon: Video,
  },
  opi: {
    label: 'OPI',
    color: 'hsl(var(--chart-2))',
    icon: Phone,
  },
} satisfies ChartConfig;

export default function CallTypeChart({ data }: CallTypeChartProps) {
  const chartData = [
    { name: 'vri', value: data.vri, fill: chartConfig.vri.color },
    { name: 'opi', value: data.opi, fill: chartConfig.opi.color },
  ];
  const totalCalls = data.vri + data.opi;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Call Type Breakdown</CardTitle>
        <CardDescription>
          A summary of your VRI vs. OPI sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center">
        {totalCalls > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-full w-full"
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <ChartTooltipContent hideLabel />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  content={({ payload }) => {
                    return (
                      <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-4 text-sm">
                        {payload?.map((item) => {
                           const config = chartConfig[item.value as keyof typeof chartConfig];
                          return (
                            <li key={item.value} className="flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-muted-foreground">{config.label} ({item.payload?.value})</span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p className="text-muted-foreground">No call data available.</p>
        )}
      </CardContent>
    </Card>
  );
}
