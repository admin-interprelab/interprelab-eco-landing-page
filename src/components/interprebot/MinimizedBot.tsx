/**
 * Minimized Bot Component
 * Compact floating button when bot is minimized
 */

import { Brain, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { MinimizedBotProps } from './types';

/**
 * Minimized Bot Component
 *
 * Displays minimized state with:
 * - Animated floating button
 * - Notification indicators
 * - Hover effects
 * - Accessibility support
 */
export const MinimizedBot = ({
  onRestore,
  hasNotification = false,
  notificationCount = 0,
}: MinimizedBotProps) => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        <button
          onClick={onRestore}
          className="
            w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full
            flex items-center justify-center shadow-lg hover:scale-105 transition-transform
            animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-purple-500/50
          "
          title="Restore InterpreBot"
          aria-label="Restore InterpreBot chat interface"
        >
          <div className="relative">
            <Brain className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </button>

        {/* Notification Badge */}
        {hasNotification && notificationCount > 0 && (
          <Badge
            className="absolute -top-2 -right-2 text-xs min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white"
            variant="default"
          >
            {notificationCount > 9 ? '9+' : notificationCount}
          </Badge>
        )}

        {/* Pulse Animation for Notifications */}
        {hasNotification && (
          <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-30" />
        )}
      </div>
    </div>
  );
};
