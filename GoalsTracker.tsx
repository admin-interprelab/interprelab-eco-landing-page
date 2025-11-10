import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Plus } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';
import { PremiumUpgradeCard } from '@/components/premium/PremiumUpgradeCard';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: "dollars" | "hours" | "calls";
}

const mockGoals: Goal[] = [
  { id: '1', title: 'Monthly Earnings', target: 5000, current: 3200, unit: 'dollars' },
  { id: '2', title: 'Weekly Hours', target: 40, current: 28, unit: 'hours' },
];

export const GoalsTracker: React.FC = () => {
  const { isPremium } = usePremium();

  if (!isPremium) {
    return <PremiumUpgradeCard featureName="Goals Tracker" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Goals Tracker</CardTitle>
        <Button variant="ghost" size="sm"><Plus className="w-4 h-4 mr-2" />Add Goal</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockGoals.map(goal => (
          <div key={goal.id}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">{goal.title}</p>
              <p className="text-sm text-muted-foreground">{goal.current} / {goal.target} {goal.unit}</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GoalsTracker;
