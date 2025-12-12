import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  errorId
}) => {
  const handleReportError = () => {
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
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
          </p>

          <div className="space-y-2">
            <Button
              onClick={resetError}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button
              onClick={() => window.location.href = '/'}
              className="w-full"
              variant="outline"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>

            <Button
              onClick={handleReportError}
              className="w-full"
              variant="outline"
            >
              <Mail className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-muted rounded text-xs font-mono overflow-auto max-h-32">
              <div className="mb-2">
                <strong>Error ID:</strong> {errorId}
              </div>
              {error && (
                <div className="mb-2">
                  <strong>Message:</strong> {error.message}
                </div>
              )}
              {error?.stack && (
                <div>
                  <strong>Stack:</strong>
                  <pre className="whitespace-pre-wrap text-xs mt-1">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
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
