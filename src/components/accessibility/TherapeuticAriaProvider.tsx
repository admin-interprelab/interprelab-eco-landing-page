import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTherapeuticAnnouncements } from '@/hooks/useTherapeuticAnnouncements';

interface TherapeuticAriaContextType {
  announceValidation: (context: string) => void;
  announceEncouragement: (achievement: string) => void;
  announceCrisisSupport: () => void;
  announceHope: (context: any) => void;
  announce: (message: string, priority?: 'low' | 'medium' | 'high') => void;
  currentUserStage: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment';
  setUserStage: (stage: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment') => void;
}

const TherapeuticAriaContext = createContext<TherapeuticAriaContextType | undefined>(undefined);

export const useTherapeuticAria = () => {
  const context = useContext(TherapeuticAriaContext);
  if (!context) {
    throw new Error('useTherapeuticAria must be used within a TherapeuticAriaProvider');
  }
  return context;
};

interface TherapeuticAriaProviderProps {
  children: React.ReactNode;
}

export const TherapeuticAriaProvider: React.FC<TherapeuticAriaProviderProps> = ({ children }) => {
  const [currentUserStage, setUserStage] = useState<'validation' | 'hope-building' | 'solution-exploration' | 'empowerment'>('validation');

  const {
    announce,
    announceValidation,
    announceEncouragement,
    announceCrisisSupport,
    announceHope,
    startPeriodicEncouragement,
    stopPeriodicEncouragement
  } = useTherapeuticAnnouncements({
    enableEncouragement: true,
    enableValidation: true,
    enableCrisisSupport: true,
    politeness: 'polite'
  });

  // Start periodic encouragement when component mounts
  useEffect(() => {
    startPeriodicEncouragement();
    return () => stopPeriodicEncouragement();
  }, [startPeriodicEncouragement, stopPeriodicEncouragement]);

  // Announce stage changes
  useEffect(() => {
    const stageMessages = {
      'validation': 'Entering validation and understanding phase.',
      'hope-building': 'Exploring hope and possibilities.',
      'solution-exploration': 'Discovering solutions and tools.',
      'empowerment': 'Taking action toward professional empowerment.'
    };

    announce(stageMessages[currentUserStage], 'medium');
  }, [currentUserStage, announce]);

  const contextValue: TherapeuticAriaContextType = {
    announceValidation,
    announceEncouragement,
    announceCrisisSupport,
    announceHope,
    announce,
    currentUserStage,
    setUserStage
  };

  return (
    <TherapeuticAriaContext.Provider value={contextValue}>
      {children}
    </TherapeuticAriaContext.Provider>
  );
};
