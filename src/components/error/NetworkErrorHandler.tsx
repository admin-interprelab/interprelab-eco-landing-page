import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SupportiveErrorHandler } from './SupportiveErrorHandler';
import { useOfflineSupport } from '@/hooks/useSmartCache';

interface NetworkErrorHandlerProps {
  onRetry?: () => void;
  onOfflineMode?: () => void;
  className?: string;
  showOfflineOptions?: boolean;
}

interface RetryAttempt {
  attempt: number;
  timestamp: Date;
  success: boolean;
  error?: string;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  onRetry,
  onOfflineMode,
  className = '',
  showOfflineOptions = true
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState<RetryAttempt[]>([]);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'poor' | 'offline'>('offline');
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

  const { isOnline, hasOfflineContent, getOfflineContent } = useOfflineSupport();

  // Monitor connection quality
  useEffect(() => {
    const checkConnection = async () => {
      if (!navigator.onLine) {
        setConnectionQuality('offline');
        return;
      }

      try {
        const start = Date.now();
        const response = await fetch('/api/health', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        const duration = Date.now() - start;

        if (response.ok) {
          setConnectionQuality(duration < 1000 ? 'good' : 'poor');
        } else {
          setConnectionQuality('poor');
        }
      } catch {
        setConnectionQuality('offline');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);

    const attempt: RetryAttempt = {
      attempt: retryAttempts.length + 1,
      timestamp: new Date(),
      success: false
    };

    try {
      // Wait a bit before retrying to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onRetry) {
        await onRetry();
        attempt.success = true;
      }
    } catch (error) {
      attempt.error = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      setRetryAttempts(prev => [...prev, attempt]);
      setIsRetrying(false);
    }
  };

  const handleOfflineMode = () => {
    setOfflineModeEnabled(true);
    onOfflineMode?.();
  };

  // If we have too many failed attempts, show supportive error handler
  if (retryAttempts.length >= 3 && retryAttempts.every(attempt => !attempt.success)) {
    return (
      <SupportiveErrorHandler
        errorType="network"
        onRetry={handleRetry}
        showCrisisSupport={true}
        className={className}
      />
    );
  }

  return (
    <div className={cn(
      'min-h-[400px] flex items-center justify-center p-4',
      className
    )}>
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            {connectionQuality === 'offline' ? (
              <WifiOff className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            ) : (
              <Wifi className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            )}
          </div>
          <CardTitle className="text-xl text-orange-700 dark:text-orange-300">
            {connectionQuality === 'offline' ? 'Connection Lost' : 'Slow Connection Detected'}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {connectionQuality === 'offline'
              ? "We understand how frustrating this is when you need support. Let's find you alternatives."
              : "Your connection seems slow. We'll help you get the support you need."
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Connection status */}
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Connection Status
              </span>
              <div className={cn(
                'flex items-center space-x-2 text-xs',
                connectionQuality === 'good' && 'text-green-600 dark:text-green-400',
                connectionQuality === 'poor' && 'text-yellow-600 dark:text-yellow-400',
                connectionQuality === 'offline' && 'text-red-600 dark:text-red-400'
              )}>
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  connectionQuality === 'good' && 'bg-green-500',
                  connectionQuality === 'poor' && 'bg-yellow-500',
                  connectionQuality === 'offline' && 'bg-red-500'
                )} />
                <span className="capitalize">{connectionQuality}</span>
              </div>
            </div>

            {isOnline && connectionQuality !== 'good' && (
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Your connection is working but may be slow. We'll prioritize essential content.
              </p>
            )}
          </div>

          {/* Retry attempts */}
          {retryAttempts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Attempts</h4>
              <div className="space-y-1">
                {retryAttempts.slice(-3).map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      {attempt.success ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span>Attempt {attempt.attempt}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{attempt.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full"
              variant="default"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </>
              )}
            </Button>

            {showOfflineOptions && hasOfflineContent('crisis-support') && (
              <Button
                onClick={handleOfflineMode}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Use Offline Support Resources
              </Button>
            )}
          </div>

          {/* Offline content availability */}
          {showOfflineOptions && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                Available Offline
              </h4>
              <div className="space-y-1 text-xs">
                {[
                  { key: 'crisis-support', label: 'Crisis Support Resources' },
                  { key: 'peer-community', label: 'Peer Community Access' },
                  { key: 'self-care-tools', label: 'Self-Care Tools' },
                  { key: 'emergency-contacts', label: 'Emergency Contacts' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400">{item.label}</span>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      hasOfflineContent(item.key) ? 'bg-green-500' : 'bg-gray-300'
                    )} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Encouragement */}
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>You're not alone:</strong> Technical issues happen to everyone.
              We've prepared offline resources specifically for situations like this.
            </p>
          </div>

          {/* Progress indicator for retry */}
          {isRetrying && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Reconnecting...</span>
                <span>Please wait</span>
              </div>
              <Progress value={undefined} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkErrorHandler;
