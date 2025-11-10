import React, { createContext, useState, useContext, useMemo } from 'react';

export interface PremiumFeatures {
  earningsProjection: boolean;
  goalsTracker: boolean;
  performanceHeatmap: boolean;
  platformComparison: boolean;
  advancedAnalytics: boolean;
}

interface PremiumContextType {
  isPremium: boolean;
  features: PremiumFeatures;
  upgrade: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);

  // In a real app, feature flags might come from a service
  const features = useMemo((): PremiumFeatures => ({
    earningsProjection: isPremium,
    goalsTracker: isPremium,
    performanceHeatmap: isPremium,
    platformComparison: isPremium,
    advancedAnalytics: isPremium,
  }), [isPremium]);

  const upgrade = () => setIsPremium(true);

  return (
    <PremiumContext.Provider value={{ isPremium, features, upgrade }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};
