import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS_MODEL_TIERS } from './constants';

export const BusinessModelSection: React.FC = () => {
  return (
    <div className="mt-20 text-center space-y-8">
      <Badge className="bg-gradient-primary border-0 text-white px-4 py-2">
        Flexible Pricing
      </Badge>
      <h3 className="text-3xl md:text-4xl font-bold text-white">
        Freemium to Enterprise Solutions
      </h3>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {BUSINESS_MODEL_TIERS.map((tier, index) => (
          <Card key={index} className={`bg-card/30 backdrop-blur-sm ${tier.cardBorderClass || 'border-border/50'}`}>
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-bold text-foreground mb-2">{tier.title}</h4>
              <p className="text-muted-foreground mb-4">{tier.description}</p>
              <Badge className={tier.badgeBgClass || 'variant-outline'}>
                {tier.badge.text}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
