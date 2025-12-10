import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Globe, Settings2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const [payRate, setPayRate] = useState('0');
  const [payRateType, setPayRateType] = useState('per_hour');
  const [currency, setCurrency] = useState('USD');
  const [roundingMethod, setRoundingMethod] = useState('actual');
  const { user } = useAuth();
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { toast } = useToast();

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'MXN', name: 'Mexican Peso' },
  ];

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    const { data } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (data) {
      setPayRate(data.pay_rate?.toString() || '0');
      setPayRateType(data.pay_rate_type || 'per_hour');
      setCurrency(data.preferred_currency || 'USD');
      setRoundingMethod(data.time_rounding_method || 'actual');
    }
  };

  const handleSave = async () => {
    if (!user) return;

    // Validate pay rate
    const payRateValue = parseFloat(payRate);
    if (isNaN(payRateValue) || payRateValue < 0 || payRateValue > 10000) {
      toast({
        title: 'Invalid Pay Rate',
        description: 'Pay rate must be between 0 and 10,000',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        pay_rate: payRateValue,
        pay_rate_type: payRateType,
        preferred_currency: currency,
        preferred_language: language,
        time_rounding_method: roundingMethod,
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Settings saved successfully',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <Settings2 className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pay Rate Configuration
              </CardTitle>
              <CardDescription>
                Set your interpretation pay rate for earnings calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payRate">Pay Rate</Label>
                <Input
                  id="payRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10000"
                  value={payRate}
                  onChange={(e) => setPayRate(e.target.value)}
                  placeholder="Enter your pay rate (0-10,000)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payRateType">Pay Rate Type</Label>
                <Select value={payRateType} onValueChange={setPayRateType}>
                  <SelectTrigger id="payRateType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_hour">Per Hour</SelectItem>
                    <SelectItem value="per_minute">Per Minute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.name} ({curr.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language Preference
              </CardTitle>
              <CardDescription>
                Select your preferred language for the interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Tracking Method
              </CardTitle>
              <CardDescription>
                Configure how your call duration is calculated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rounding">Rounding Method</Label>
                <Select value={roundingMethod} onValueChange={setRoundingMethod}>
                  <SelectTrigger id="rounding">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actual">Actual Time (No Rounding)</SelectItem>
                    <SelectItem value="round_down">Round Down to Completed Minutes</SelectItem>
                    <SelectItem value="roll_over">Roll Over to Next Minute</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    {roundingMethod === 'actual' && (
                      <>
                        <Badge variant="outline" className="mb-2">Recommended</Badge>
                        <br />
                        Track your exact call duration without any rounding. This gives you the most accurate picture of your work.
                      </>
                    )}
                    {roundingMethod === 'round_down' && (
                      <>
                        <Badge variant="outline" className="mb-2 bg-orange-500/10 text-orange-600 border-orange-500/20">LSP Standard</Badge>
                        <br />
                        Many LSPs round down to completed minutes only. Use this to match their reporting and see time differences. InterpreTrack will show both your actual time and the rounded time.
                      </>
                    )}
                    {roundingMethod === 'roll_over' && (
                      <>
                        <Badge variant="outline" className="mb-2">Fair Compensation</Badge>
                        <br />
                        Any partial minute counts as a full minute. This is fairer compensation for interpreters, though few LSPs use this method.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full" size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
