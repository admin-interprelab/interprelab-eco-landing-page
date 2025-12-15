import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui';
import { Phone, Clock, DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils';

export interface StatsCardsProps {
  stats: {
    totalCalls: number;
    totalMinutes: number;
    totalEarnings: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Total Calls',
      value: formatNumber(stats.totalCalls),
      subtitle: 'This month',
      icon: Phone,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Total Minutes',
      value: formatNumber(stats.totalMinutes),
      subtitle: 'Billable time',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Earnings',
      value: formatCurrency(stats.totalEarnings, { currency: 'USD' }),
      subtitle: 'Gross income',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title} 
            className="border-border/50 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl md:text-3xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;



