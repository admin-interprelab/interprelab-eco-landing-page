import { useEffect, useRef, useCallback } from 'react';

interface TherapeuticAnnouncementOptions {
  enableEncouragement?: boolean;
  enableValidation?: boolean;
  enableCrisisSupport?: boolean;
  politeness?: 'polite' | 'assertive';
}

interface AnnouncementContext {
  userStage: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment';
  stressLevel: 'low' | 'moderate' | 'high' | 'crisis';
  lastAction?: string;
}

export const useTherapeuticAnnouncements = (options: TherapeuticAnnouncementOptions = {}) => {
  const {
    enableEncouragement = true,
    enableValidation = true,
    enableCrisisSupport = true,
    politeness = 'polite'
  } = options;

  const announcementRef = useRef<HTMLDivElement | null>(null);
  const lastAnnouncementRef = useRef<string>('');
  const encouragementTimerRef = useRef<NodeJS.Timeout>();

  // Create or get the announcement region
  useEffect(() => {
    if (!announcementRef.current) {
      const existingRegion = document.getElementById('therapeutic-announcements');
      if (existingRegion) {
        announcementRef.current = existingRegion as HTMLDivElement;
      } else {
        const region = document.createElement('div');
        region.id = 'therapeutic-announcements';
        region.setAttribute('aria-live', politeness);
        region.setAttribute('aria-atomic', 'true');
        region.setAttribute('role', 'status');
        region.className = 'sr-only';
        region.style.position = 'absolute';
        region.style.left = '-10000px';
        region.style.width = '1px';
        region.style.height = '1px';
        region.style.overflow = 'hidden';
        document.body.appendChild(region);
        announcementRef.current = region;
      }
    }
  }, [politeness]);

  // Announce message to screen readers
  const announce = useCallback((message: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (!announcementRef.current || !message.trim()) return;

    // Avoid duplicate announcements
    if (lastAnnouncementRef.current === message) return;
    lastAnnouncementRef.current = message;

    // Clear previous content
    announcementRef.current.textContent = '';

    // Add new announcement with slight delay for screen readers
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = message;
      }
    }, priority === 'high' ? 100 : 300);

    // Clear announcement after it's been read
    setTimeout(() => {
      if (announcementRef.current && announcementRef.current.textContent === message) {
        announcementRef.current.textContent = '';
      }
    }, 5000);
  }, []);

  // Validation announcements
  const announceValidation = useCallback((context: string) => {
    if (!enableValidation) return;

    const validationMessages = [
      `Your struggles as an interpreter are valid and recognized.`,
      `You're not alone in facing these challenges.`,
      `Many interpreters share similar experiences.`,
      `Your feelings about the industry challenges are completely understandable.`,
      `It takes courage to seek support and solutions.`
    ];

    const contextualMessages: Record<string, string[]> = {
      'financial-stress': [
        'Financial pressures in interpretation work are a real concern.',
        'Many interpreters face similar economic challenges.',
        'Your financial worries are valid and shared by many in the field.'
      ],
      'burnout': [
        'Burnout is common in interpretation work.',
        'Your exhaustion is a natural response to demanding work.',
        'Taking care of your mental health is essential.'
      ],
      'technology-frustration': [
        'Technology failures add unnecessary stress to your work.',
        'Your frustration with unreliable platforms is completely justified.',
        'Better technology solutions exist to support your work.'
      ]
    };

    const messages = contextualMessages[context] || validationMessages;
    const message = messages[Math.floor(Math.random() * messages.length)];
    announce(message, 'medium');
  }, [enableValidation, announce]);

  // Encouragement announcements
  const announceEncouragement = useCallback((achievement: string) => {
    if (!enableEncouragement) return;

    const encouragementMessages: Record<string, string[]> = {
      'page-progress': [
        'You\'re making progress in exploring solutions.',
        'Each step forward is meaningful.',
        'You\'re taking positive action for your career.'
      ],
      'tool-exploration': [
        'Exploring AI tools shows your commitment to growth.',
        'You\'re discovering new ways to enhance your work.',
        'These tools can help reduce your daily stress.'
      ],
      'community-engagement': [
        'Connecting with peers is a powerful step.',
        'You\'re building valuable professional relationships.',
        'The interpreter community is here to support you.'
      ],
      'learning-progress': [
        'Your dedication to learning is admirable.',
        'Every new skill strengthens your professional foundation.',
        'You\'re investing in your future success.'
      ]
    };

    const messages = encouragementMessages[achievement] || [
      'You\'re making positive progress.',
      'Your efforts are meaningful.',
      'You\'re moving in the right direction.'
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    announce(message, 'low');
  }, [enableEncouragement, announce]);

  // Crisis support announcements
  const announceCrisisSupport = useCallback(() => {
    if (!enableCrisisSupport) return;

    const crisisMessages = [
      'Immediate support resources are available.',
      'Crisis support is accessible through keyboard shortcuts.',
      'You don\'t have to face this alone - help is available.',
      'Professional support and peer community are ready to help.',
      'Press Control Shift H for immediate crisis support.'
    ];

    const message = crisisMessages[Math.floor(Math.random() * crisisMessages.length)];
    announce(message, 'high');
  }, [enableCrisisSupport, announce]);

  // Hope-building announcements
  const announceHope = useCallback((context: AnnouncementContext) => {
    const hopeMessages: Record<string, string[]> = {
      'validation': [
        'You\'ve taken the first step by acknowledging your challenges.',
        'Recognition of problems is the beginning of positive change.',
        'Your awareness shows strength and wisdom.'
      ],
      'hope-building': [
        'Solutions exist for the challenges you\'re facing.',
        'Many interpreters have successfully transformed their careers.',
        'AI tools can significantly reduce your daily stress.',
        'Professional growth and wellbeing are achievable goals.'
      ],
      'solution-exploration': [
        'You\'re discovering tools that can transform your work experience.',
        'Each solution you explore brings you closer to professional satisfaction.',
        'These AI tools are designed specifically for interpreter challenges.'
      ],
      'empowerment': [
        'You have the power to change your professional trajectory.',
        'Your investment in growth will yield meaningful returns.',
        'You\'re becoming part of a community of empowered interpreters.'
      ]
    };

    const messages = hopeMessages[context.userStage] || [
      'You\'re making meaningful progress.',
      'Positive change is within reach.',
      'Your journey toward professional fulfillment continues.'
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    announce(message, 'medium');
  }, [announce]);

  // Periodic encouragement for long sessions
  const startPeriodicEncouragement = useCallback(() => {
    if (encouragementTimerRef.current) {
      clearInterval(encouragementTimerRef.current);
    }

    encouragementTimerRef.current = setInterval(() => {
      announceEncouragement('page-progress');
    }, 300000); // Every 5 minutes
  }, [announceEncouragement]);

  const stopPeriodicEncouragement = useCallback(() => {
    if (encouragementTimerRef.current) {
      clearInterval(encouragementTimerRef.current);
      encouragementTimerRef.current = undefined;
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopPeriodicEncouragement();
    };
  }, [stopPeriodicEncouragement]);

  return {
    announce,
    announceValidation,
    announceEncouragement,
    announceCrisisSupport,
    announceHope,
    startPeriodicEncouragement,
    stopPeriodicEncouragement
  };
};
