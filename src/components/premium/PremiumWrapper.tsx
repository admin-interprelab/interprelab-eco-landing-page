import React, { ReactNode } from 'react';
import { usePremium, PremiumFeatures } from '@/contexts/PremiumContext';
import { PremiumUpgradePrompt } from './PremiumUpgradePrompt';

interface PremiumWrapperProps {
  children: ReactNode;
  feature?: keyof PremiumFeatures;
  fallbackComponent?: React.ComponentType;
  upgradePrompt?: string;
  showPreview?: boolean;
  className?: string;
}

export const PremiumWrapper: React.FC<PremiumWrapperProps> = ({
  children,
  feature,
  fallbackComponent: FallbackComponent,
  upgradePrompt,
  showPreview = true,
  className = '',
}) => {
  const { isPremium, checkFeatureAccess, loading } = usePremium();

  // Show loading state while checking subscription
  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // If no specific feature is specified, check general premium status
  const hasAccess = feature ? checkFeatureAccess(feature) : isPremium;

  // If user has access, render the premium content
  if (hasAccess) {
    return <div className={className}>{children}</div>;
  }

  // If a custom fallback component is provided, use it
  if (FallbackComponent) {
    return (
      <div className={className}>
        <FallbackComponent />
      </div>
    );
  }

  // Default behavior: show upgrade prompt
  return (
    <div className={className}>
      <PremiumUpgradePrompt
        feature={feature}
        customMessage={upgradePrompt}
        showPreview={showPreview}
      >
        {showPreview && (
          <div className="opacity-50 pointer-events-none">
            {children}
          </div>
        )}
      </PremiumUpgradePrompt>
    </div>
  );
};
