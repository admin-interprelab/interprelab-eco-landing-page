/**
 * Resource Modal Component
 * Detailed view modal for professional resources
 */

import { X, Download, ExternalLink, Calendar, Building, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ResourceModalProps } from './types';
import {
  getResourceTypeConfig,
  getFileFormatIcon,
  isDownloadable,
  formatDate,
  isRecentlyUpdated,
  getResourceDomain
} from './utils';

/**
 * Resource Modal Component
 *
 * Detailed modal view for resources with:
 * - Full resource information
 * - Organization and type details
 * - Download and view options
 * - Last updated information
 * - Keyboard navigation support
 */
export const ResourceModal = ({
  resource,
  isOpen,
  onClose,
  onDownload,
}: ResourceModalProps) => {
  if (!isOpen || !resource) return null;

  const typeConfig = getResourceTypeConfig(resource.type);
  const FileFormatIcon = resource.fileFormat ? getFileFormatIcon(resource.fileFormat) : null;
  const isDownloadableResource = isDownloadable(resource);
  const domain = getResourceDomain(resource.url);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(resource);
    }
    onClose();
  };

  const handleViewOnline = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
      aria-describedby="resource-modal-description"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-card border-border shadow-2xl">
        <CardHeader className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 w-8 h-8"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Resource Type and Status */}
          <div className="flex flex-wrap gap-2 mb-4">
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

            {resource.isOfficial && (
              <Badge variant="default" className="text-xs">
                Official
              </Badge>
            )}

            {isRecentlyUpdated(resource) && (
              <Badge variant="default" className="text-xs">
                Recently Updated
              </Badge>
            )}
          </div>

          {/* Title and Organization */}
          <div className="space-y-2">
            <h2
              id="resource-modal-title"
              className="text-xl font-bold text-foreground leading-tight"
            >
              {resource.title}
            </h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4" />
              <span>{resource.organization}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p
              id="resource-modal-description"
              className="text-muted-foreground leading-relaxed"
            >
              {resource.description}
            </p>
          </div>

          {/* Resource Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resource Information</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline" className={`text-xs ${typeConfig.color}`}>
                    {typeConfig.label}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Organization:</span>
                  <span className="text-sm font-medium">{resource.organization}</span>
                </div>

                {resource.fileFormat && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Format:</span>
                    <Badge variant="secondary" className="text-xs">
                      {resource.fileFormat.toUpperCase()}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Source:</span>
                  <span className="text-sm font-medium">{domain}</span>
                </div>
              </div>
            </div>

            {/* Access Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Access Details</h3>

              <div className="space-y-3">
                {resource.lastUpdated && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Updated:</span>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {formatDate(resource.lastUpdated)}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Availability:</span>
                  <Badge variant="default" className="text-xs">
                    {isDownloadableResource ? 'Downloadable' : 'Online Only'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Access:</span>
                  <Badge variant="secondary" className="text-xs">
                    Free
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>

            <Button onClick={handleViewOnline}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Online
            </Button>

            {isDownloadableResource && (
              <Button onClick={handleDownload} className="bg-gradient-primary text-white">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
