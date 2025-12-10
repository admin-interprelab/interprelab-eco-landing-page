import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Building2, Plus, Trash2, Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlatformRate {
  id: string;
  platform_name: string;
  rate_per_minute: number;
  currency: string;
  is_active: boolean;
}

const COMMON_PLATFORMS = ['Globo', 'BoostLingo', 'LSA', 'LanguageLine', 'Martti', 'Voyce'];

export const PlatformRatesPanel = () => {
  const [platforms, setPlatforms] = useState<PlatformRate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    platform_name: '',
    rate_per_minute: '',
    currency: 'USD'
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadPlatforms();
    }
  }, [user]);

  const loadPlatforms = async () => {
    const { data, error } = await supabase
      .from('platform_rates')
      .select('*')
      .eq('user_id', user?.id)
      .order('platform_name');

    if (!error && data) {
      setPlatforms(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const rateValue = parseFloat(formData.rate_per_minute);
    if (isNaN(rateValue) || rateValue < 0) {
      toast({
        title: 'Invalid Rate',
        description: 'Please enter a valid rate per minute',
        variant: 'destructive',
      });
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('platform_rates')
        .update({
          platform_name: formData.platform_name,
          rate_per_minute: rateValue,
          currency: formData.currency,
        })
        .eq('id', editingId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update platform rate',
          variant: 'destructive',
        });
        return;
      }
    } else {
      const { error } = await supabase
        .from('platform_rates')
        .insert({
          user_id: user.id,
          platform_name: formData.platform_name,
          rate_per_minute: rateValue,
          currency: formData.currency,
        });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to add platform rate',
          variant: 'destructive',
        });
        return;
      }
    }

    toast({
      title: 'Success',
      description: editingId ? 'Platform updated successfully' : 'Platform added successfully',
    });

    resetForm();
    loadPlatforms();
  };

  const resetForm = () => {
    setFormData({ platform_name: '', rate_per_minute: '', currency: 'USD' });
    setShowForm(false);
    setEditingId(null);
  };

  const editPlatform = (platform: PlatformRate) => {
    setFormData({
      platform_name: platform.platform_name,
      rate_per_minute: platform.rate_per_minute.toString(),
      currency: platform.currency
    });
    setEditingId(platform.id);
    setShowForm(true);
  };

  const deletePlatform = async (platformId: string) => {
    const { error } = await supabase
      .from('platform_rates')
      .delete()
      .eq('id', platformId);

    if (!error) {
      toast({
        title: 'Success',
        description: 'Platform deleted successfully',
      });
      loadPlatforms();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Platform Rates
            </CardTitle>
            <CardDescription>
              Configure pay rates for different interpretation platforms
            </CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Platform
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform_name">Platform Name</Label>
              <div className="flex gap-2 flex-wrap mb-2">
                {COMMON_PLATFORMS.map((platform) => (
                  <Badge
                    key={platform}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setFormData({ ...formData, platform_name: platform })}
                  >
                    {platform}
                  </Badge>
                ))}
              </div>
              <Input
                id="platform_name"
                value={formData.platform_name}
                onChange={(e) => setFormData({ ...formData, platform_name: e.target.value })}
                placeholder="Enter platform name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate_per_minute">Rate Per Minute</Label>
                <Input
                  id="rate_per_minute"
                  type="number"
                  step="0.01"
                  value={formData.rate_per_minute}
                  onChange={(e) => setFormData({ ...formData, rate_per_minute: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="USD"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update' : 'Add'} Platform</Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {platforms.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No platforms configured yet. Add your first platform to start tracking platform-specific earnings!
            </p>
          ) : (
            platforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{platform.platform_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {platform.rate_per_minute} {platform.currency}/minute
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editPlatform(platform)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePlatform(platform.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
