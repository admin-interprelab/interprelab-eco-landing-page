import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, DollarSign, Clock, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: 'dollars' | 'hours' | 'calls';
  deadline: string;
  type: 'monthly' | 'weekly' | 'yearly';
}

interface GoalsTrackerProps {
  goals: Goal[];
  isPremium: boolean;
}

export default function GoalsTracker({ goals, isPremium }: GoalsTrackerProps) {
  const formatValue = (value: number, unit: string) => {
    switch (unit) {
      case 'dollars':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'hours':
        return `${value}h`;
      case 'calls':
        return value;
      default:
        return value;
    }
  };

  const getIcon = (unit: string) => {
    switch (unit) {
      case 'dollars':
        return <DollarSign className="h-4 w-4" />;
      case 'hours':
        return <Clock className="h-4 w-4" />;
      case 'calls':
        return <Target className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'weekly':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'yearly':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Goals & Targets
          </CardTitle>
          <CardDescription>Track your progress towards your goals</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 relative">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Premium Feature</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Set and track unlimited goals to stay motivated and achieve your interpretation career targets.
            </p>
            <Button className="mt-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Goals & Targets
          </CardTitle>
          <CardDescription>Track your progress towards your goals</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isComplete = progress >= 100;

          return (
            <div key={goal.id} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {getIcon(goal.unit)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold">{goal.title}</h4>
                      <Badge variant="secondary" className={getTypeColor(goal.type)}>
                        {goal.type}
                      </Badge>
                      {isComplete && (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          ✓ Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold">{progress.toFixed(0)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {formatValue(goal.current, goal.unit)} / {formatValue(goal.target, goal.unit)}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No goals set yet. Create your first goal to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
