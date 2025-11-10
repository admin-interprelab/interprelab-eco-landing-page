import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface WeeklyChartProps {
  data: {
    day: string;
    calls: number;
    earnings: number;
  }[];
}

const chartConfig = {
  calls: {
    label: 'Calls',
    color: 'hsl(var(--primary))',
  },
  earnings: {
    label: 'Earnings',
    color: 'hsl(var(--accent))',
  },
};

export default function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>
          Your call and earnings trend for the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--primary))"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--accent))"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                yAxisId="left"
                dataKey="calls"
                fill="var(--color-calls)"
                radius={4}
              />
              <Bar
                yAxisId="right"
                dataKey="earnings"
                fill="var(--color-earnings)"
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
