/**
 * Chat Interface Component
 * Interactive chat interface for user communication
 */

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import type { ChatInterfaceProps } from './types';
import { formatTimestamp } from './utils';

/**
 * Chat Interface Component
 *
 * Provides chat functionality with:
 * - Message input with validation
 * - Send button with loading states
 * - Keyboard shortcuts (Enter to send)
 * - Suggestions display
 * - Accessibility support
 */
export const ChatInterface = ({
  messages,
  currentMessage,
  onMessageChange,
  onSendMessage,
  disabled = false,
  suggestions = [],
}: ChatInterfaceProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onMessageChange(suggestion);
  };

  return (
    <div className="border-t border-border/50 p-4 space-y-3">
      {/* Message History */}
      {messages.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-2 mb-3">
          {messages.slice(-3).map((message) => (
            <div
              key={message.id}
              className={`text-xs p-2 rounded ${
                message.sender === 'user'
                  ? 'bg-primary/10 text-primary ml-4'
                  : 'bg-muted/30 text-muted-foreground mr-4'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="flex-1">{message.content}</span>
                <span className="text-xs opacity-60 whitespace-nowrap">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-2 py-1 bg-muted/20 hover:bg-muted/40 rounded transition-colors"
              disabled={disabled}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me about your assessment or training needs..."
          value={currentMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled}
          className="
            flex-1 px-3 py-2 text-sm bg-muted/30 border border-border/50 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          "
          maxLength={500}
          aria-label="Chat message input"
        />

        <Button
          size="sm"
          onClick={onSendMessage}
          disabled={disabled || !currentMessage.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Helper Text */}
      <div className="text-xs text-muted-foreground text-center">
        💡 Try: "Analyze my weak areas" or "Create learning path"
      </div>
    </div>
  );
};
