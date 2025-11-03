/**
 * Custom hooks for InterpreBot Components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  InterpreBotState,
  AssessmentSkill,
  ChatMessage,
  AssessmentResult
} from './types';
import {
  DEFAULT_INTERPREBOT_STATE,
  ASSESSMENT_SKILLS,
  ASSESSMENT_STEPS,
  ANIMATION_CONFIG
} from './constants';
import {
  generateMessageId,
  generateAssessmentResult,
  getSuggestionForInput,
  isValidMessage
} from './utils';

/**
 * Hook for managing InterpreBot state
 */
export const useInterpreBotState = (initialState?: Partial<InterpreBotState>) => {
  const [state, setState] = useState<InterpreBotState>({
    ...DEFAULT_INTERPREBOT_STATE,
    ...initialState,
  });

  const updateState = useCallback((updates: Partial<InterpreBotState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleVisibility = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
  }, []);

  const minimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: true }));
  }, []);

  const restore = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: false }));
  }, []);

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: false }));
  }, []);

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAssessment: true,
      isAnalyzing: true,
      currentStep: 'assessment',
      assessmentProgress: 0,
    }));
  }, []);

  const completeAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAnalyzing: false,
      currentStep: 'results',
      assessmentProgress: 100,
    }));
  }, []);

  const resetAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      showAssessment: false,
      isAnalyzing: false,
      currentStep: 'welcome',
      assessmentProgress: 0,
    }));
  }, []);

  return {
    state,
    updateState,
    toggleVisibility,
    minimize,
    restore,
    close,
    startAssessment,
    completeAssessment,
    resetAssessment,
  };
};

/**
 * Hook for managing assessment process
 */
export const useAssessmentProcess = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState<AssessmentSkill[]>(ASSESSMENT_SKILLS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAssessment = useCallback(() => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    setProgress(0);

    // Reset skills to show animation
    setSkills(prev => prev.map(skill => ({ ...skill, score: 0 })));

    // Start step progression
    const runSteps = () => {
      ASSESSMENT_STEPS.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStepIndex(index);
          setProgress(((index + 1) / ASSESSMENT_STEPS.length) * 100);

          if (index === ASSESSMENT_STEPS.length - 1) {
            // Complete assessment
            setTimeout(() => {
              setSkills(ASSESSMENT_SKILLS); // Restore actual scores
              setIsRunning(false);
            }, step.duration);
          }
        }, ASSESSMENT_STEPS.slice(0, index).reduce((sum, s) => sum + s.duration, 0));
      });
    };

    runSteps();
  }, []);

  const stopAssessment = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resetAssessment = useCallback(() => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setProgress(0);
    setSkills(ASSESSMENT_SKILLS);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStep = ASSESSMENT_STEPS[currentStepIndex];
  const assessmentResult = generateAssessmentResult(skills);

  return {
    isRunning,
    progress,
    currentStep,
    currentStepIndex,
    skills,
    assessmentResult,
    startAssessment,
    stopAssessment,
    resetAssessment,
  };
};

/**
 * Hook for managing chat functionality
 */
export const useChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot', type?: ChatMessage['type']) => {
    const message: ChatMessage = {
      id: generateMessageId(),
      content,
      sender,
      timestamp: new Date(),
      type: type || 'text',
    };

    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  const sendMessage = useCallback(() => {
    if (!isValidMessage(currentMessage)) return;

    // Add user message
    addMessage(currentMessage, 'user');

    // Clear input
    const userMessage = currentMessage;
    setCurrentMessage('');

    // Simulate bot typing
    setIsTyping(true);

    setTimeout(() => {
      // Generate bot response
      const suggestion = getSuggestionForInput(userMessage);
      const response = suggestion || 'I understand. How can I help you improve your interpretation skills?';

      addMessage(response, 'bot', suggestion ? 'suggestion' : 'text');
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }, [currentMessage, addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const addBotMessage = useCallback((content: string, type?: ChatMessage['type']) => {
    return addMessage(content, 'bot', type);
  }, [addMessage]);

  return {
    messages,
    currentMessage,
    isTyping,
    setCurrentMessage,
    sendMessage,
    addMessage,
    addBotMessage,
    clearMessages,
  };
};

/**
 * Hook for managing draggable window
 */
export const useDraggableBot = (initialPosition: { x: number; y: number }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };

    // Constrain to viewport
    const maxX = window.innerWidth - 420; // Bot width
    const maxY = window.innerHeight - 600; // Bot height

    setPosition({
      x: Math.max(0, Math.min(newPosition.x, maxX)),
      y: Math.max(0, Math.min(newPosition.y, maxY)),
    });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    handleMouseDown,
    setPosition,
  };
};

/**
 * Hook for managing skill animations
 */
export const useSkillAnimations = (skills: AssessmentSkill[], isAnalyzing: boolean) => {
  const [animatedSkills, setAnimatedSkills] = useState<AssessmentSkill[]>(skills);
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isAnalyzing) {
      // Reset all skills to 0
      setAnimatedSkills(skills.map(skill => ({ ...skill, score: 0 })));
      setVisibleSkills(new Set());
    } else {
      // Animate skills one by one
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => new Set(prev).add(skill.id));
          setAnimatedSkills(prev =>
            prev.map(s => s.id === skill.id ? { ...s, score: skill.score } : s)
          );
        }, index * ANIMATION_CONFIG.skillBarDelay);
      });
    }
  }, [skills, isAnalyzing]);

  const isSkillVisible = useCallback((skillId: string) => {
    return visibleSkills.has(skillId);
  }, [visibleSkills]);

  return {
    animatedSkills,
    isSkillVisible,
  };
};

/**
 * Hook for managing notifications
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
  }>>([]);

  const addNotification = useCallback((
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    const notification = {
      id: generateMessageId(),
      message,
      type,
      timestamp: new Date(),
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

/**
 * Hook for managing keyboard shortcuts
 */
export const useKeyboardShortcuts = (callbacks: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrl = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;

      // Create key combination string
      let combination = '';
      if (isCtrl) combination += 'ctrl+';
      if (isShift) combination += 'shift+';
      combination += key;

      if (callbacks[combination]) {
        event.preventDefault();
        callbacks[combination]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
};

/**
 * Hook for managing local storage persistence
 */
export const useLocalStoragePersistence = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setStoredValue] as const;
};
