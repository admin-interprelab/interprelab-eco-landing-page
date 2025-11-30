/**
 * Professional Resource Card Component
 * External professional resource display with download/view options
 */

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ExternalLink, Eye, Clock } from 'lucide-react';
import type { ProfessionalResourceCardProps } from './types';
import {
  getResourceTypeConfig,
  getFileFormatIcon,
  isDownloadable,
  getResourceActionLabel,
  formatDate,
  isRecentlyUpdated,
  generateResourceCardAriaLabel
} from './utils';

/**
 * Professional Resource Card Component
 *
 * Displays professional resource with:
 * - Organization and title
 * - Type and format badges
 * - Download/view actions
 * - Last updated information
 * - Official resource indicator
 */
export const ProfessionalResourceCard = ({
  resource,
  onDownload,
  onView,
}: ProfessionalResourceCardProps) => {
  const typeConfig = getResourceTypeConfig(resource.type);
  const FileFormatIcon = resource.fileFormat ? getFileFormatIcon(resource.fileFormat) : null;
  const isDownloadableResource = isDownloadable(resource);
  const actionLabel = getResourceActionLabel(resource);
  const ariaLabel = generateResourceCardAriaLabel(resource);

  const handleAction = () => {
    if (isDownloadableResource && onDownload) {
      onDownload(resource);
    } else if (onView) {
      onView(resource);
    } else {
      // Fallback: open in new tab
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="space-y-2">
          {/* Organization */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              {resource.organization}
            </span>
            {resource.isOfficial && (
              <Badge variant="default" className="text-xs">
                Official
              </Badge>
            )}
          </div>

          {/* Title */}
          <h4 className="font-semibold text-sm leading-tight" title={resource.title}>
            {resource.title}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {resource.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className={`text-xs ${typeConfig.color}`}>
            <typeConfig.icon className="w-3 h-3 mr-1" />
            {typeConfig.label}
          </Badge>

          {FileFormatIcon && resource.fileFormat && (
            <Badge variant="secondary" className="text-xs">
              <FileFormatIcon className="w-3 h-3 mr-1" />
              {resource.fileFormat.toUpperCase()}
            </Badge>
          )}

          {isRecentlyUpdated(resource) && (
            <Badge variant="default" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Recent
            </Badge>
          )}
        </div>

        {/* Last Updated */}
        {resource.lastUpdated && (
          <div className="text-xs text-muted-foreground">
            Updated: {formatDate(resource.lastUpdated)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={handleAction}
            aria-label={ariaLabel}
          >
            {isDownloadableResource ? (
              <>
                <Download className="w-3 h-3 mr-1" />
                Download
              </>
            ) : (
              <>
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit Site
              </>
            )}
          </Button>

          {isDownloadableResource && (
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
              title="View online"
            >
              <Eye className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
