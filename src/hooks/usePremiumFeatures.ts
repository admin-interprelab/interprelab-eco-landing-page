import { usePremium, PremiumFeatures } from '@/contexts/PremiumContext';

/**
 * Hook for checking premium feature access with additional utilities
 */
export const usePremiumFeatures = () => {
  const {
    isPremium,
    subscriptionTier,
    features,
    loading,
    checkFeatureAccess,
    upgrade,
    refreshSubscription
  } = usePremium();

  /**
   * Check if user has access to a specific feature
   */
  const hasFeature = (feature: keyof PremiumFeatures): boolean => {
    return checkFeatureAccess(feature);
  };

  /**
   * Get a list of all available features for the current subscription
   */
  const getAvailableFeatures = (): (keyof PremiumFeatures)[] => {
    return Object.entries(features)
      .filter(([_, hasAccess]) => hasAccess)
      .map(([feature, _]) => feature as keyof PremiumFeatures);
  };

  /**
   * Get a list of premium features that are locked for the current subscription
   */
  const getLockedFeatures = (): (keyof PremiumFeatures)[] => {
    return Object.entries(features)
      .filter(([_, hasAccess]) => !hasAccess)
      .map(([feature, _]) => feature as keyof PremiumFeatures);
  };

  /**
   * Check if user is on a trial
   */
  const isOnTrial = (): boolean => {
    // This would need to be implemented based on subscription data
    // For now, return false as we don't have trial logic implemented
    return false;
  };

  /**
   * Get subscription status display text
   */
  const getSubscriptionStatus = (): string => {
    if (loading) return 'Loading...';

    switch (subscriptionTier) {
      case 'free':
        return 'Free Plan';
      case 'premium':
        return 'Premium Plan';
      case 'enterprise':
        return 'Enterprise Plan';
      default:
        return 'Unknown Plan';
    }
  };

  /**
   * Trigger upgrade flow with optional feature context
   */
  const upgradeWithFeature = (feature?: keyof PremiumFeatures) => {
    // Store the feature context for the upgrade modal
    if (feature) {
      sessionStorage.setItem('upgradeFeatureContext', feature);
    }
    upgrade();
  };

  return {
    // Core premium state
    isPremium,
    subscriptionTier,
    features,
    loading,

    // Feature checking utilities
    hasFeature,
    checkFeatureAccess,
    getAvailableFeatures,
    getLockedFeatures,

    // Subscription utilities
    isOnTrial,
    getSubscriptionStatus,

    // Actions
    upgrade,
    upgradeWithFeature,
    refreshSubscription,
  };
};
