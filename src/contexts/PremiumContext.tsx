import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

export interface PremiumFeatures {
  earningsProjection: boolean;
  goalsTracker: boolean;
  performanceHeatmap: boolean;
  platformComparison: boolean;
  advancedAnalytics: boolean;
  learningIntegration: boolean;
  integrationMonitoring: boolean;
}

export interface PremiumContextType {
  isPremium: boolean;
  subscriptionTier: SubscriptionTier;
  features: PremiumFeatures;
  loading: boolean;
  checkFeatureAccess: (feature: keyof PremiumFeatures) => boolean;
  upgrade: () => void;
  refreshSubscription: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

const DEFAULT_FREE_FEATURES: PremiumFeatures = {
  earningsProjection: false,
  goalsTracker: false,
  performanceHeatmap: false,
  platformComparison: false,
  advancedAnalytics: false,
  learningIntegration: false,
  integrationMonitoring: false,
};

const DEFAULT_PREMIUM_FEATURES: PremiumFeatures = {
  earningsProjection: true,
  goalsTracker: true,
  performanceHeatmap: true,
  platformComparison: true,
  advancedAnalytics: true,
  learningIntegration: true,
  integrationMonitoring: true,
};

export const PremiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
  const [loading, setLoading] = useState(true);

  const isPremium = subscriptionTier === 'premium' || subscriptionTier === 'enterprise';
  const features = isPremium ? DEFAULT_PREMIUM_FEATURES : DEFAULT_FREE_FEATURES;

  const checkFeatureAccess = (feature: keyof PremiumFeatures): boolean => {
    return features[feature];
  };

  const upgrade = () => {
    // This will be handled by the upgrade modal
    const event = new CustomEvent('openUpgradeModal');
    window.dispatchEvent(event);
  };

  const refreshSubscription = async () => {
    if (!user) {
      setSubscriptionTier('free');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Call the database function to get user's subscription tier
      const { data, error } = await supabase.rpc('get_user_subscription_tier', {
        user_uuid: user.id
      });

      if (error) {
        console.error('Error fetching subscription status:', error);
        setSubscriptionTier('free');
      } else {
        setSubscriptionTier((data as SubscriptionTier) || 'free');
      }
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      setSubscriptionTier('free');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      refreshSubscription();
    }
  }, [user, authLoading]);

  const value: PremiumContextType = {
    isPremium,
    subscriptionTier,
    features,
    loading: loading || authLoading,
    checkFeatureAccess,
    upgrade,
    refreshSubscription,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};
