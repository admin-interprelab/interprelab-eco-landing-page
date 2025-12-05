/**
 * Utility functions for Extension UI Components
 */

import type { AgentType, ContextWindow, AgentUpdate } from './types';
import { AGENT_CONFIGS, REALTIME_UPDATES } from './constants';

/**
 * Get icon component for agent type
 */
export const getAgentIcon = (type: AgentType) => {
  return AGENT_CONFIGS[type]?.icon || AGENT_CONFIGS.translation.icon;
};

/**
 * Get color class for agent type
 */
export const getAgentColor = (type: AgentType) => {
  return AGENT_CONFIGS[type]?.color || AGENT_CONFIGS.translation.color;
};

/**
 * Get label for agent type
 */
export const getAgentLabel = (type: AgentType) => {
  return AGENT_CONFIGS[type]?.label || 'Unknown Agent';
};

/**
 * Generate random agent update
 */
export const generateRandomUpdate = (): AgentUpdate => {
  const types: AgentType[] = ['translation', 'medical', 'cultural', 'analysis'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomMessage = REALTIME_UPDATES[Math.floor(Math.random() * REALTIME_UPDATES.length)];

  return {
    id: Date.now().toString(),
    agentType: randomType,
    content: randomMessage,
    confidence: 85 + Math.random() * 15,
    timestamp: new Date(),
  };
};

/**
 * Convert agent update to context window
 */
export const updateToContextWindow = (update: AgentUpdate): ContextWindow => {
  return {
    id: update.id,
    title: getAgentLabel(update.agentType),
    content: update.content,
    type: update.agentType,
    confidence: Math.round(update.confidence),
    timestamp: update.timestamp,
  };
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: Date): string => {
  return timestamp.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Calculate confidence color class
 */
export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 95) return 'text-green-600';
  if (confidence >= 85) return 'text-blue-600';
  if (confidence >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Calculate window position within viewport bounds
 */
export const constrainPosition = (
  position: { x: number; y: number },
  windowSize: { width: number; height: number },
  viewportSize: { width: number; height: number }
): { x: number; y: number } => {
  const maxX = viewportSize.width - windowSize.width;
  const maxY = viewportSize.height - windowSize.height;

  return {
    x: Math.max(0, Math.min(position.x, maxX)),
    y: Math.max(0, Math.min(position.y, maxY)),
  };
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get viewport dimensions
 */
export const getViewportDimensions = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
};
