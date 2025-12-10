import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Target, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  goal_type: string;
  target_amount: number;
  target_currency: string;
  target_period: string;
  platform_name?: string;
  description?: string;
  is_active: boolean;
}

export const GoalsPanel = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    goal_type: 'monthly_earnings',
    target_amount: '',
    target_currency: 'USD',
    target_period: 'monthly',
    platform_name: '',
    description: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGoals(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('user_goals')
      .insert({
        user_id: user.id,
        goal_type: formData.goal_type,
        target_amount: parseFloat(formData.target_amount),
        target_currency: formData.target_currency,
        target_period: formData.target_period,
        platform_name: formData.platform_name || null,
        description: formData.description || null,
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create goal',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Goal created successfully',
    });

    setShowForm(false);
    setFormData({
      goal_type: 'monthly_earnings',
      target_amount: '',
      target_currency: 'USD',
      target_period: 'monthly',
      platform_name: '',
      description: ''
    });
    loadGoals();
  };

  const deleteGoal = async (goalId: string) => {
    const { error } = await supabase
      .from('user_goals')
      .delete()
      .eq('id', goalId);

    if (!error) {
      toast({
        title: 'Success',
        description: 'Goal deleted successfully',
      });
      loadGoals();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Goals
              </CardTitle>
              <CardDescription>
                Set and track your interpretation income goals
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal_type">Goal Type</Label>
                  <Select
                    value={formData.goal_type}
                    onValueChange={(value) => setFormData({ ...formData, goal_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily_earnings">Daily Earnings</SelectItem>
                      <SelectItem value="monthly_earnings">Monthly Earnings</SelectItem>
                      <SelectItem value="call_duration">Call Duration</SelectItem>
                      <SelectItem value="call_count">Call Count</SelectItem>
                      <SelectItem value="platform_specific">Platform Specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_amount">Target Amount</Label>
                  <Input
                    id="target_amount"
                    type="number"
                    step="0.01"
                    value={formData.target_amount}
                    onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_period">Period</Label>
                  <Select
                    value={formData.target_period}
                    onValueChange={(value) => setFormData({ ...formData, target_period: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform_name">Platform (Optional)</Label>
                  <Input
                    id="platform_name"
                    value={formData.platform_name}
                    onChange={(e) => setFormData({ ...formData, platform_name: e.target.value })}
                    placeholder="e.g., Globo, BoostLingo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Save $1500 by end of month for vacation"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Create Goal</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {goals.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No goals set yet. Create your first goal to start tracking!
              </p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">
                        {goal.target_amount} {goal.target_currency}
                      </h4>
                      <Badge variant="outline">{goal.target_period}</Badge>
                      {goal.platform_name && (
                        <Badge variant="secondary">{goal.platform_name}</Badge>
                      )}
                    </div>
                    {goal.description && (
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
