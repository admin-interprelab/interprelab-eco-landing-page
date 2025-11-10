import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Crown,
  Check,
  TrendingUp,
  Target,
  BarChart3,
  BookOpen,
  Sparkles,
  X
} from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'premium-monthly',
    name: 'Premium',
    price: 19.99,
    period: 'month',
    description: 'Perfect for professional interpreters',
    features: [
      'Earnings projection with AI insights',
      'Advanced performance analytics',
      'Goal tracking and progress monitoring',
      'Performance heatmaps',
      'Platform comparison analytics',
      'Learning progress integration',
      'Integration health monitoring',
      'Priority customer support'
    ],
    popular: true
  },
  {
    id: 'premium-yearly',
    name: 'Premium Annual',
    price: 199.99,
    period: 'year',
    description: 'Save 17% with annual billing',
    features: [
      'All Premium features',
      'Advanced reporting & exports',
      'Custom goal templates',
      'Extended data history',
      'Priority feature requests',
      'Dedicated account manager'
    ]
  }
];

export const PremiumUpgradeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('premium-monthly');
  const [loading, setLoading] = useState(false);
  const { refreshSubscription } = usePremium();

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('openUpgradeModal', handleOpenModal);
    return () => window.removeEventListener('openUpgradeModal', handleOpenModal);
  }, []);

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      // TODO: Implement actual payment processing
      // This would typically integrate with Stripe, Paddle, or similar
      console.log('Upgrading to plan:', planId);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, we'll just close the modal
      // In production, this would handle the payment flow
      setIsOpen(false);

      // Refresh subscription status after successful upgrade
      await refreshSubscription();
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-purple-600" />
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Upgrade to Premium
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-base">
            Unlock advanced analytics and features to optimize your interpretation business
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <TrendingUp className="w-8 h-8 mx-auto text-purple-600" />
              <h3 className="font-medium text-sm">Earnings Projection</h3>
              <p className="text-xs text-gray-600">AI-powered forecasting</p>
            </div>
            <div className="text-center space-y-2">
              <BarChart3 className="w-8 h-8 mx-auto text-blue-600" />
              <h3 className="font-medium text-sm">Advanced Analytics</h3>
              <p className="text-xs text-gray-600">Deep performance insights</p>
            </div>
            <div className="text-center space-y-2">
              <Target className="w-8 h-8 mx-auto text-green-600" />
              <h3 className="font-medium text-sm">Goal Tracking</h3>
              <p className="text-xs text-gray-600">Monitor your progress</p>
            </div>
            <div className="text-center space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-orange-600" />
              <h3 className="font-medium text-sm">Learning Integration</h3>
              <p className="text-xs text-gray-600">Connect study & work</p>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-purple-500 shadow-lg'
                    : 'hover:shadow-md'
                } ${plan.popular ? 'border-purple-300' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-base font-normal text-gray-600">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'variant-outline'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpgrade(plan.id);
                    }}
                    disabled={loading}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-2 pt-4 border-t">
            <p className="text-sm text-gray-600">
              ✓ 14-day free trial • ✓ Cancel anytime • ✓ Secure payment
            </p>
            <p className="text-xs text-gray-500">
              Join thousands of professional interpreters optimizing their business
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
