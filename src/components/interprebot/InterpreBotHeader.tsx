/**
 * InterpreBot Header Component
 * Draggable header with branding and controls
 */

import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Minimize2, X } from 'lucide-react';
import type { InterpreBotHeaderProps } from './types';

/**
 * InterpreBot Header Component
 *
 * Displays the header with:
 * - Animated logo and branding
 * - Draggable functionality
 * - Minimize and close controls
 * - Gradient styling
 */
export const InterpreBotHeader = ({
  onMinimize,
  onClose,
  onMouseDown,
  title = 'InterpreBot 🧠✨',
  subtitle = 'Multimodal AI Training & Assessment Agent',
}: InterpreBotHeaderProps) => {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-border/50 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
    >
      {/* Logo and Branding */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow">
          <Brain className="w-5 h-5 text-white" />
          <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 hover:bg-muted/50"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          title="Minimize"
        >
          <Minimize2 className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 hover:bg-muted/50"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="Close"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
