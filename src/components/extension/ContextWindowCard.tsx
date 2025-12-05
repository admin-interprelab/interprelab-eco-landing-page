/**
 * Context Window Card Component
 * Individual agent context window display
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ContextWindow } from './types';
import { getAgentIcon, getAgentColor, formatTimestamp, getConfidenceColor, truncateText } from './utils';

interface ContextWindowCardProps {
  /** Context window data */
  window: ContextWindow;
  /** Whether to show full content or truncated */
  showFullContent?: boolean;
  /** Click handler */
  onClick?: (window: ContextWindow) => void;
  /** Maximum content length for truncation */
  maxContentLength?: number;
}

export const ContextWindowCard = ({
  window,
  showFullContent = false,
  onClick,
  maxContentLength = 120,
}: ContextWindowCardProps) => {
  const Icon = getAgentIcon(window.type);
  const colorClass = getAgentColor(window.type);
  const confidenceColor = getConfidenceColor(window.confidence);

  const displayContent = showFullContent
    ? window.content
    : truncateText(window.content, maxContentLength);

  return (
    <Card
      className="bg-muted/30 border-border/50 hover:bg-muted/40 transition-all duration-200 cursor-pointer hover:shadow-md"
      onClick={() => onClick?.(window)}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded ${colorClass} flex-shrink-0`}>
              <Icon className="w-3 h-3" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-medium truncate" title={window.title}>
                {window.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`font-medium ${confidenceColor}`}>
                  {window.confidence}%
                </span>
                <span>•</span>
                <span title={window.timestamp.toLocaleString()}>
                  {formatTimestamp(window.timestamp)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <p
              className="text-xs text-muted-foreground leading-relaxed"
              title={showFullContent ? undefined : window.content}
            >
              {displayContent}
            </p>

            {/* Type Badge */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs capitalize">
                {window.type}
              </Badge>

              {!showFullContent && window.content.length > maxContentLength && (
                <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                  Read more...
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
