import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Phone,
  MessageCircle,
  Heart,
  Coffee,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SupportiveErrorProps {
  error?: Error | null;
  errorType?: 'network' | 'content' | 'authentication' | 'server' | 'unknown';
  onRetry?: () => void;
  onEscalateSupport?: () => void;
  showCrisisSupport?: boolean;
  className?: string;
}

// Empathetic error messages that don't add to interpreter stress
const errorMessages = {
  network: {
    title: "Connection Issue - We're Here to Help",
    message: "We know how frustrating tech problems can be when you're already stressed. Let's get you back on track.",
    supportMessage: "This isn't your fault - technology can be unreliable.",
    alternatives: [
      "Try refreshing the page",
      "Check your internet connection",
      "Access our offline support resources",
      "Contact our support team for immediate help"
    ]
  },
  content: {
    title: "Content Temporarily Unavailable",
    message: "The content you're looking for is taking a moment to load. We understand your time is valuable.",
    supportMessage: "While we fix this, here are other ways we can support you:",
    alternatives: [
      "Browse our crisis support resources",
      "Connect with our peer community",
      "Access our mobile-friendly tools",
      "Get immediate help from our support team"
    ]
  },
  authentication: {
    title: "Sign-In Issue - Let's Get You Connected",
    message: "There's a small hiccup with signing in. We'll help you get back to your professional development.",
    supportMessage: "Your progress and data are safe - this is just a temporary issue.",
    alternatives: [
      "Try signing in again",
      "Reset your password",
      "Use guest access for immediate tools",
      "Contact support for account help"
    ]
  },
  server: {
    title: "Service Temporarily Down",
    message: "Our servers are experiencing high demand. We're working quickly to restore full service.",
    supportMessage: "We know you depend on these tools for your work:",
    alternatives: [
      "Access our offline crisis support",
      "Use our mobile emergency tools",
      "Connect with peer support community",
      "Get updates on service restoration"
    ]
  },
  unknown: {
    title: "Unexpected Issue - We're Here for You",
    message: "Something unexpected happened, but you're not alone in dealing with this.",
    supportMessage: "Let's find you the support you need right now:",
    alternatives: [
      "Try a different approach",
      "Access our support resources",
      "Connect with our community",
      "Get immediate professional help"
    ]
  }
};

// Crisis support resources for users showing distress
const crisisResources = [
  {
    title: "Immediate Support",
    description: "Talk to someone right now",
    action: "Call Crisis Line",
    icon: Phone,
    urgent: true,
    href: "tel:988"
  },
  {
    title: "Peer Support",
    description: "Connect with other interpreters",
    action: "Join Community",
    icon: MessageCircle,
    urgent: false,
    href: "/community"
  },
  {
    title: "Self-Care Resources",
    description: "Immediate stress relief tools",
    action: "Access Tools",
    icon: Heart,
    urgent: false,
    href: "/self-care"
  }
];

export const SupportiveErrorHandler: React.FC<SupportiveErrorProps> = ({
  error,
  errorType = 'unknown',
  onRetry,
  onEscalateSupport,
  showCrisisSupport = false,
  className = ''
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [supportEscalated, setSupportEscalated] = useState(false);

  const errorInfo = errorMessages[errorType];

  const handleEscalateSupport = () => {
    setSupportEscalated(true);
    onEscalateSupport?.();
  };

  const handleRetry = () => {
    onRetry?.();
  };

  return (
    <div className={cn(
      'min-h-[400px] flex items-center justify-center p-4',
      className
    )}>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <AlertTriangle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl text-blue-700 dark:text-blue-300">
            {errorInfo.title}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {errorInfo.message}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Supportive message */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
            <div className="flex items-start space-x-3">
              <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {errorInfo.supportMessage}
              </p>
            </div>
          </div>

          {/* Immediate alternatives */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">
              Here's what you can do right now:
            </h3>
            <div className="grid gap-2">
              {errorInfo.alternatives.map((alternative, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => {
                    if (index === 0 && onRetry) handleRetry();
                  }}
                >
                  <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm">{alternative}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRetry}
              className="flex-1"
              variant="default"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button
              onClick={() => window.location.href = '/'}
              className="flex-1"
              variant="outline"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>

            <Button
              onClick={handleEscalateSupport}
              className="flex-1"
              variant="outline"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Get Help
            </Button>
          </div>

          {/* Crisis support section */}
          {(showCrisisSupport || supportEscalated) && (
            <div className="border-t pt-6">
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800/30">
                <h3 className="font-medium text-red-700 dark:text-red-300 mb-3">
                  Need Immediate Support?
                </h3>
                <div className="grid gap-3">
                  {crisisResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.href}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg transition-colors',
                        resource.urgent
                          ? 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 border border-red-300 dark:border-red-700/50'
                          : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 border border-blue-300 dark:border-blue-700/50'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <resource.icon className={cn(
                          'h-5 w-5',
                          resource.urgent ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                        )} />
                        <div>
                          <p className={cn(
                            'font-medium text-sm',
                            resource.urgent ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
                          )}>
                            {resource.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          'text-sm font-medium',
                          resource.urgent ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                        )}>
                          {resource.action}
                        </span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Encouragement section */}
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
            <div className="flex items-center space-x-3">
              <Coffee className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Take a moment for yourself
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Technical issues happen - you're handling this well
                </p>
              </div>
            </div>
          </div>

          {/* Technical details (collapsed by default) */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Technical Details (for support)
            </summary>
            <div className="mt-2 p-3 bg-muted rounded text-xs font-mono overflow-auto max-h-32">
              <div className="mb-2">
                <strong>Error Type:</strong> {errorType}
              </div>
              <div className="mb-2">
                <strong>Timestamp:</strong> {new Date().toISOString()}
              </div>
              {error && (
                <>
                  <div className="mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  );
};

// Specialized error handlers for different contexts
export const NetworkErrorHandler: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <SupportiveErrorHandler
    errorType="network"
    onRetry={onRetry}
    showCrisisSupport={false}
  />
);

export const ContentErrorHandler: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <SupportiveErrorHandler
    errorType="content"
    onRetry={onRetry}
    showCrisisSupport={false}
  />
);

export const CriticalErrorHandler: React.FC<{
  error?: Error;
  onRetry?: () => void;
  onEscalateSupport?: () => void;
}> = ({ error, onRetry, onEscalateSupport }) => (
  <SupportiveErrorHandler
    error={error}
    errorType="server"
    onRetry={onRetry}
    onEscalateSupport={onEscalateSupport}
    showCrisisSupport={true}
  />
);

export default SupportiveErrorHandler;
