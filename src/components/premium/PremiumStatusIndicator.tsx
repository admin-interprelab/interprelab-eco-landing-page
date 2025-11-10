import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles } from 'lucide-react';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';

interface PremiumStatusIndicatorProps {
  showUpgradeButton?: boolean;
  compact?: boolean;
  className?: string;
}

export const PremiumStatusIndicator: React.FC<PremiumStatusIndicatorProps> = ({
  showUpgradeButton = true,
  compact = false,
  className = '',
}) => {
  const { isPremium, subscriptionTier, loading, upgrade, getSubscriptionStatus } = usePremiumFeatures();

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Badge
          variant={isPremium ? "default" : "secondary"}
          className={isPremium ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
        >
          {isPremium ? (
            <>
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </>
          ) : (
            "Free"
          )}
        </Badge>

        {!isPremium && showUpgradeButton && (
          <Button
            size="sm"
            variant="outline"
            onClick={upgrade}
            className="h-6 px-2 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Upgrade
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${className} ${
      isPremium
        ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800'
        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${
          isPremium
            ? 'bg-gradient-to-r from-purple-600 to-blue-600'
            : 'bg-gray-400'
        }`}>
          <Crown className="w-4 h-4 text-white" />
        </div>

        <div>
          <h3 className="font-medium text-sm">{getSubscriptionStatus()}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {isPremium
              ? 'Access to all premium features'
              : 'Limited to basic features'
            }
          </p>
        </div>
      </div>

      {!isPremium && showUpgradeButton && (
        <Button
          onClick={upgrade}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Upgrade Now
        </Button>
      )}
    </div>
  );
};
