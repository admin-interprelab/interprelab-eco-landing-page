/**
 * Custom hooks for Extension UI Components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Position, DragState, ContextWindow, AgentUpdate } from './types';
import { generateRandomUpdate, updateToContextWindow, constrainPosition, getViewportDimensions } from './utils';
import { ANIMATION_DURATIONS, MOCK_CONTEXT_WINDOWS } from './constants';

/**
 * Hook for managing draggable window position
 */
export const useDraggableWindow = (initialPosition: Position) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: { x: 0, y: 0 },
  });

  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragState({
      isDragging: true,
      offset: {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      },
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const newPosition = {
      x: e.clientX - dragState.offset.x,
      y: e.clientY - dragState.offset.y,
    };

    // Constrain to viewport
    const viewport = getViewportDimensions();
    const windowSize = { width: 480, height: 600 }; // Default size
    const constrainedPosition = constrainPosition(newPosition, windowSize, viewport);

    setPosition(constrainedPosition);
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    setPosition,
    isDragging: dragState.isDragging,
    handleMouseDown,
    dragRef,
  };
};

/**
 * Hook for managing real-time context windows
 */
export const useContextWindows = (isRecording: boolean) => {
  const [contextWindows, setContextWindows] = useState<ContextWindow[]>(MOCK_CONTEXT_WINDOWS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addContextWindow = useCallback((window: ContextWindow) => {
    setContextWindows(prev => [window, ...prev.slice(0, 5)]); // Keep only 6 most recent
  }, []);

  const clearContextWindows = useCallback(() => {
    setContextWindows([]);
  }, []);

  const generateUpdate = useCallback(() => {
    if (!isRecording || Math.random() <= 0.3) return; // 70% chance to generate update

    const update = generateRandomUpdate();
    const contextWindow = updateToContextWindow(update);
    addContextWindow(contextWindow);
  }, [isRecording, addContextWindow]);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(generateUpdate, ANIMATION_DURATIONS.update);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, generateUpdate]);

  return {
    contextWindows,
    addContextWindow,
    clearContextWindows,
  };
};

/**
 * Hook for managing extension state
 */
export const useExtensionState = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleRecording = useCallback(() => {
    setIsRecording(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const restore = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  return {
    isRecording,
    isMuted,
    isMinimized,
    isVisible,
    toggleRecording,
    toggleMute,
    minimize,
    restore,
    hide,
    show,
  };
};

/**
 * Hook for managing InterpreBot assessment state
 */
export const useAssessmentState = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAssessment = useCallback(() => {
    setShowAssessment(true);
    setIsAnalyzing(true);

    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const resetAssessment = useCallback(() => {
    setShowAssessment(false);
    setIsAnalyzing(false);
  }, []);

  const sendMessage = useCallback(() => {
    if (!message.trim()) return;

    // Handle message sending logic here
    console.log('Sending message:', message);
    setMessage('');
  }, [message]);

  return {
    showAssessment,
    message,
    isAnalyzing,
    setMessage,
    startAssessment,
    resetAssessment,
    sendMessage,
  };
};

/**
 * Hook for managing window resize
 */
export const useWindowResize = () => {
  const [dimensions, setDimensions] = useState(getViewportDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getViewportDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
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
 * Hook for managing local storage state
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};
