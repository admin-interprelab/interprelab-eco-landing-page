import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, TrendingUp, Target, BarChart3, BookOpen } from 'lucide-react';
import { usePremium, PremiumFeatures } from '@/contexts/PremiumContext';

interface PremiumUpgradePromptProps {
  children?: ReactNode;
  feature?: keyof PremiumFeatures;
  customMessage?: string;
  showPreview?: boolean;
  compact?: boolean;
}

const FEATURE_DETAILS = {
  earningsProjection: {
    icon: TrendingUp,
    title: 'Earnings Projection',
    description: 'AI-powered earnings forecasting with confidence intervals',
    benefits: ['Predict future earnings', 'Plan your schedule', 'Optimize performance']
  },
  goalsTracker: {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set and track professional goals with progress analytics',
    benefits: ['Set custom goals', 'Track progress', 'Achievement insights']
  },
  performanceHeatmap: {
    icon: BarChart3,
    title: 'Performance Heatmap',
    description: 'Visualize your peak performance hours and optimize scheduling',
    benefits: ['Peak hour analysis', 'Performance optimization', 'Schedule planning']
  },
  platformComparison: {
    icon: BarChart3,
    title: 'Platform Analytics',
    description: 'Compare performance across different platforms',
    benefits: ['Multi-platform insights', 'Performance comparison', 'Optimization tips']
  },
  advancedAnalytics: {
    icon: Sparkles,
    title: 'Advanced Analytics',
    description: 'Deep insights into your interpretation business',
    benefits: ['Detailed reports', 'Trend analysis', 'Business insights']
  },
  learningIntegration: {
    icon: BookOpen,
    title: 'Learning Integration',
    description: 'Connect your learning progress with work performance',
    benefits: ['Study tracking', 'Progress correlation', 'Skill development']
  },
  integrationMonitoring: {
    icon: BarChart3,
    title: 'Integration Monitoring',
    description: 'Monitor all your connected services and data sync',
    benefits: ['Health monitoring', 'Sync status', 'Error alerts']
  }
};

export const PremiumUpgradePrompt: React.FC<PremiumUpgradePromptProps> = ({
  children,
  feature,
  customMessage,
  showPreview = true,
  compact = false,
}) => {
  const { upgrade } = usePremium();

  const featureDetail = feature ? FEATURE_DETAILS[feature] : null;
  const IconComponent = featureDetail?.icon || Crown;

  if (compact) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-center p-4">
          <Button onClick={upgrade} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Card className="border-2 border-dashed border-purple-300 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
          </div>

          {featureDetail && (
            <div className="flex items-center justify-center mb-2">
              <IconComponent className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          )}

          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {featureDetail?.title || 'Premium Feature'}
          </CardTitle>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {customMessage || featureDetail?.description || 'Unlock advanced features with Premium'}
          </p>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          {featureDetail?.benefits && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What you'll get:
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {featureDetail.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <Sparkles className="w-3 h-3 mr-2 text-purple-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            onClick={upgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Start your free trial today • Cancel anytime
          </p>
        </CardContent>
      </Card>

      {showPreview && children && (
        <div className="mt-4 opacity-30 pointer-events-none select-none">
          {children}
        </div>
      )}
    </div>
  );
};
