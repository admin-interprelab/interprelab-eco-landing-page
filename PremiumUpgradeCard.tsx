import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';

interface PremiumUpgradeCardProps {
  featureName: string;
}

export const PremiumUpgradeCard: React.FC<PremiumUpgradeCardProps> = ({ featureName }) => {
  const { upgrade } = usePremium();

  return (
    <Card className="flex flex-col items-center justify-center text-center h-full">
      <CardHeader>
        <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
        <CardTitle className="text-lg mt-2">Unlock {featureName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">This is a premium feature. Upgrade your plan to access it.</p>
        <Button onClick={upgrade}>Upgrade to Premium</Button>
      </CardContent>
    </Card>
  );
};
