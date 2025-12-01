import * as React from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Cell, Sector } from 'recharts';
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

// Vibrant, professional colors for VRI and OPI
const chartConfig = {
  vri: {
    label: 'VRI (Video)',
    color: 'hsl(217, 91%, 60%)', // Vibrant blue
    icon: Video,
  },
  opi: {
    label: 'OPI (Phone)',
    color: 'hsl(142, 71%, 45%)', // Vibrant green
    icon: Phone,
  },
} satisfies ChartConfig;

// Active sector rendering for hover effect
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.8}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
      />
    </g>
  );
};

export default function CallTypeChart({ data }: CallTypeChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const chartData = [
    { 
      name: 'vri', 
      value: data.vri, 
      fill: chartConfig.vri.color,
      label: 'VRI (Video)'
    },
    { 
      name: 'opi', 
      value: data.opi, 
      fill: chartConfig.opi.color,
      label: 'OPI (Phone)'
    },
  ];
  
  const totalCalls = data.vri + data.opi;

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className="h-full flex flex-col border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-primary to-success rounded-full" />
          Call Type Breakdown
        </CardTitle>
        <CardDescription>
          VRI vs OPI session distribution
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center pb-6">
        {totalCalls > 0 ? (
          <div className="w-full">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltipContent 
                    hideLabel 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const percentage = ((data.value / totalCalls) * 100).toFixed(1);
                        return (
                          <div className="glass rounded-lg border border-border/50 p-3 shadow-xl">
                            <p className="text-sm font-semibold text-foreground mb-1">
                              {data.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {data.value} calls ({percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    label={({ percent, x, y, midAngle, cx, cy }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 100;
                      const labelX = cx + radius * Math.cos(-midAngle * RADIAN);
                      const labelY = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text
                          x={labelX}
                          y={labelY}
                          fill="hsl(var(--foreground))"
                          textAnchor={labelX > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          className="text-sm font-bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={entry.fill}
                        className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                        stroke="hsl(var(--background))"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Legend
                    content={({ payload }) => {
                      return (
                        <div className="flex flex-col gap-3 pt-6">
                          {payload?.map((item, index) => {
                            const config = chartConfig[item.value as keyof typeof chartConfig];
                            const Icon = config.icon;
                            const percentage = ((item.payload?.value / totalCalls) * 100).toFixed(1);
                            
                            return (
                              <div
                                key={item.value}
                                className={`
                                  flex items-center justify-between p-3 rounded-lg border transition-all duration-300
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
                                      ringColor: item.color
                                    }}
                                  />
                                  <Icon className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm font-medium text-foreground">
                                    {config.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-foreground">
                                    {item.payload?.value}
                                  </span>
                                  <span className="text-xs text-muted-foreground font-medium">
                                    {percentage}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            {/* Total Summary */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-success/10 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Calls</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
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
