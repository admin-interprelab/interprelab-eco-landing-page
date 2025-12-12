import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, DollarSign, Clock, TrendingUp, Edit2, Save, X } from 'lucide-react';

interface Goal {
  id: string;
  type: 'earnings' | 'calls' | 'hours';
  target: number;
  current: number;
  period: 'daily' | 'weekly' | 'monthly';
  title: string;
  deadline?: Date;
}

interface GoalSettingProps {
  goals: Goal[];
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'current'>) => void;
}

export const GoalSetting: React.FC<GoalSettingProps> = ({
  goals,
  onUpdateGoal,
  onDeleteGoal,
  onAddGoal
}) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    type: 'earnings' as const,
    target: 0,
    period: 'weekly' as const,
    title: '',
    deadline: ''
  });

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'earnings': return <DollarSign className="h-4 w-4" />;
      case 'calls': return <Target className="h-4 w-4" />;
      case 'hours': return <Clock className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'earnings': return 'text-green-400';
      case 'calls': return 'text-blue-400';
      case 'hours': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const formatGoalValue = (type: string, value: number) => {
    switch (type) {
      case 'earnings': return `$${value.toLocaleString()}`;
      case 'calls': return `${value} calls`;
      case 'hours': return `${value} hours`;
      default: return value.toString();
    }
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      onAddGoal({
        ...newGoal,
        deadline: newGoal.deadline ? new Date(newGoal.deadline) : undefined
      });
      setNewGoal({
        type: 'earnings',
        target: 0,
        period: 'weekly',
        title: '',
        deadline: ''
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Goals & Targets</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
        >
          <Target className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Create New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-title" className="text-white">Goal Title</Label>
                <Input
                  id="goal-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Monthly Earnings Target"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="goal-type" className="text-white">Goal Type</Label>
                <Select value={newGoal.type} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earnings">Earnings</SelectItem>
                    <SelectItem value="calls">Number of Calls</SelectItem>
                    <SelectItem value="hours">Hours Worked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal-target" className="text-white">Target Value</Label>
                <Input
                  id="goal-target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="goal-period" className="text-white">Time Period</Label>
                <Select value={newGoal.period} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, period: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAddGoal}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/30"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isOnTrack = progress >= 75;

          return (
            <Card key={goal.id} className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getGoalColor(goal.type)}>
                      {getGoalIcon(goal.type)}
                    </div>
                    <CardTitle className="text-sm text-white">{goal.title}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingGoal(goal.id)}
                    className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm capitalize">{goal.period}</span>
                    <span className={`text-sm ${isOnTrack ? 'text-green-400' : 'text-yellow-400'}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <Progress value={progress} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">
                      {formatGoalValue(goal.type, goal.current)}
                    </span>
                    <span className="text-blue-200 text-sm">
                      of {formatGoalValue(goal.type, goal.target)}
                    </span>
                  </div>

                  {goal.deadline && (
                    <div className="text-xs text-blue-200">
                      Deadline: {goal.deadline.toLocaleDateString()}
                    </div>
                  )}

                  <div className={`text-xs px-2 py-1 rounded ${
                    isOnTrack
                      ? 'bg-green-500/20 text-green-300'
                      : progress >= 50
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {isOnTrack ? 'On Track' : progress >= 50 ? 'Behind Schedule' : 'Needs Attention'}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
