import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupportiveErrorHandler } from './SupportiveErrorHandler';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetError: () => void;
  errorId: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
          errorId={this.state.errorId}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component using supportive error handling
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  errorId
}) => {
  const handleEscalateSupport = () => {
    const errorReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // In a real app, send this to your error reporting service
    console.log('Error Report:', errorReport);

    // For now, copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2));
    alert('Error details copied to clipboard. Please send this to support.');
  };

  return (
    <SupportiveErrorHandler
      error={error}
      errorType="unknown"
      onRetry={resetError}
      onEscalateSupport={handleEscalateSupport}
      showCrisisSupport={true}
    />
  );
};

// Specialized error boundaries for different contexts
export const ChartErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary
    fallback={({ resetError }) => (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
        <div className="text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto" />
          <div>
            <p className="text-sm font-medium">Chart failed to load</p>
            <p className="text-xs text-muted-foreground">Unable to display chart data</p>
          </div>
          <Button size="sm" variant="outline" onClick={resetError}>
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </div>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);

export const ImageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary
    fallback={({ resetError }) => (
      <div className="flex items-center justify-center h-48 border rounded-lg bg-muted/20">
        <div className="text-center space-y-2">
          <div className="text-2xl">📷</div>
          <p className="text-sm text-muted-foreground">Image failed to load</p>
          <Button size="sm" variant="outline" onClick={resetError}>
            Retry
          </Button>
        </div>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);

export const FormErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary
    fallback={({ resetError }) => (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
          <div>
            <h3 className="font-medium">Form Error</h3>
            <p className="text-sm text-muted-foreground">
              There was a problem with the form. Please refresh and try again.
            </p>
          </div>
          <Button onClick={resetError}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Form
          </Button>
        </div>
      </Card>
    )}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary;
