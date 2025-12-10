import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Crown, Check, TrendingUp, Target, BarChart3, Flame } from 'lucide-react';

export default function PremiumUpgradeCard() {
  const features = [
    { icon: <Target className="h-4 w-4" />, text: 'Unlimited goal tracking' },
    { icon: <Flame className="h-4 w-4" />, text: 'Peak performance heatmaps' },
    { icon: <BarChart3 className="h-4 w-4" />, text: 'Platform comparison analytics' },
    { icon: <TrendingUp className="h-4 w-4" />, text: 'Advanced AI insights & predictions' },
    { icon: <Zap className="h-4 w-4" />, text: 'Real-time sync with InterpreCoach' },
    { icon: <Crown className="h-4 w-4" />, text: 'Priority support' },
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent border-primary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <CardContent className="relative p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="h-20 w-20 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center border-2 border-background/20">
            <Crown className="h-10 w-10 text-background" />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <Badge className="bg-background/20 text-background border-background/30 backdrop-blur-sm">
              <Zap className="h-3 w-3 mr-1" />
              Limited Time Offer
            </Badge>
            <h3 className="text-3xl font-bold text-background">
              Upgrade to Premium
            </h3>
            <p className="text-background/90 text-lg">
              Unlock advanced analytics and maximize your earnings
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-background/20 w-full max-w-sm">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-background/70 text-lg line-through">$29.99</span>
              <span className="text-5xl font-bold text-background">$19.99</span>
              <span className="text-background/80">/month</span>
            </div>
            <p className="text-background/80 text-sm mt-2">
              Save 33% for the first 3 months
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-background/90 bg-background/10 backdrop-blur-sm rounded-lg p-3 border border-background/20">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-background/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-background" />
                </div>
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Button size="lg" className="flex-1 bg-background text-primary hover:bg-background/90 font-semibold">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-background border-background/30 hover:bg-background/10">
              Learn More
            </Button>
          </div>

          {/* Guarantee */}
          <p className="text-background/70 text-sm">
            ✓ 14-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
