import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Zap,
  Shield,
  Clock,
  Heart,
  Wifi,
  Download,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useInterpreterWorkflow } from '@/hooks/useInterpreterWorkflow';
import { CalmingLoader } from '@/components/loading/CalmingLoader';

interface WorkflowOptimizerProps {
  children: React.ReactNode;
  enableOptimizations?: boolean;
  showInsights?: boolean;
  className?: string;
}

interface OptimizationMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

export const WorkflowOptimizer: React.FC<WorkflowOptimizerProps> = ({
  children,
  enableOptimizations = true,
  showInsights = false,
  className = ''
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [metrics, setMetrics] = useState<OptimizationMetric[]>([]);

  const {
    currentSession,
    trackUserAction,
    getOptimizedResource,
    enableTimeConstraintMode,
    preloadCrisisSupport,
    getWorkflowInsights,
    predictedNeeds,
    workflowOptimizations,
    isOnline
  } = useInterpreterWorkflow();

  // Initialize optimizations
  useEffect(() => {
    if (enableOptimizations) {
      initializeOptimizations();
    }
  }, [enableOptimizations, initializeOptimizations]);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(updateMetrics, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, [currentSession, updateMetrics]);

  const initializeOptimizations = useCallback(async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    try {
      // Step 1: Analyze user context (20%)
      trackUserAction('optimization-started');
      setOptimizationProgress(20);

      // Step 2: Preload critical resources (40%)
      await preloadCrisisSupport();
      setOptimizationProgress(40);

      // Step 3: Enable workflow patterns (60%)
      const insights = getWorkflowInsights();
      if (insights && insights.stressLevel === 'high') {
        await preloadCrisisSupport();
      }
      setOptimizationProgress(60);

      // Step 4: Optimize for time constraints (80%)
      if (isTimeConstrained()) {
        enableTimeConstraintMode();
      }
      setOptimizationProgress(80);

      // Step 5: Complete optimization (100%)
      trackUserAction('optimization-completed');
      setOptimizationProgress(100);

      // Update metrics
      updateMetrics();
    } catch (error) {
      console.error('Optimization failed:', error);
      trackUserAction('optimization-failed', { error: error.message });
    } finally {
      setTimeout(() => {
        setIsOptimizing(false);
        setOptimizationProgress(0);
      }, 1000);
    }
  }, [trackUserAction, preloadCrisisSupport, getWorkflowInsights, enableTimeConstraintMode, isTimeConstrained, updateMetrics]);

  const updateMetrics = useCallback(() => {
    const insights = getWorkflowInsights();
    if (!insights) return;

    const newMetrics: OptimizationMetric[] = [
      {
        id: 'response-time',
        name: 'Response Time',
        value: Math.random() * 2000 + 500, // Mock response time
        target: 2000,
        unit: 'ms',
        status: Math.random() > 0.7 ? 'warning' : 'good',
        description: 'Average time to load critical support resources'
      },
      {
        id: 'stress-level',
        name: 'Stress Level',
        value: getStressLevelValue(insights.stressLevel),
        target: 3,
        unit: '/10',
        status: insights.stressLevel === 'crisis' ? 'critical' :
               insights.stressLevel === 'high' ? 'warning' : 'good',
        description: 'Current user stress indicators'
      },
      {
        id: 'cache-hit-rate',
        name: 'Cache Hit Rate',
        value: Math.random() * 40 + 60, // Mock cache hit rate
        target: 80,
        unit: '%',
        status: Math.random() > 0.8 ? 'warning' : 'good',
        description: 'Percentage of resources served from cache'
      },
      {
        id: 'offline-readiness',
        name: 'Offline Readiness',
        value: predictedNeeds.length * 10,
        target: 100,
        unit: '%',
        status: isOnline ? 'good' : 'warning',
        description: 'Critical resources available offline'
      }
    ];

    setMetrics(newMetrics);
  }, [getWorkflowInsights, predictedNeeds, isOnline]);

  const isTimeConstrained = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();

    // Assume interpreters are more time-constrained during typical work hours
    return (hour >= 8 && hour <= 17) ||
           (currentSession?.accessPatterns.includes('rapid-navigation'));
  }, [currentSession]);

  const getStressLevelValue = (level: string): number => {
    switch (level) {
      case 'low': return 2;
      case 'moderate': return 4;
      case 'high': return 7;
      case 'crisis': return 10;
      default: return 1;
    }
  };

  const handleOptimizeNow = () => {
    initializeOptimizations();
  };

  const handleEmergencyMode = async () => {
    trackUserAction('emergency-mode-activated');
    await preloadCrisisSupport();
    enableTimeConstraintMode();
  };

  if (isOptimizing) {
    return (
      <div className={cn('min-h-screen flex items-center justify-center', className)}>
        <CalmingLoader
          message="Optimizing your experience for better support..."
          showProgress={true}
          duration={5000}
          variant="supportive"
        />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Progress value={optimizationProgress} className="w-64" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {optimizationProgress}% complete
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* Optimization status bar */}
      {enableOptimizations && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800/30">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Workflow Optimized
                </span>
                <div className="flex items-center space-x-1">
                  {workflowOptimizations.slice(0, 3).map((opt, index) => (
                    <div key={index} className="w-2 h-2 bg-green-500 rounded-full" />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {currentSession?.stressLevel === 'crisis' && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleEmergencyMode}
                    className="text-xs"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Emergency Mode
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleOptimizeNow}
                  className="text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Re-optimize
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={enableOptimizations ? 'pt-12' : ''}>
        {children}
      </div>

      {/* Insights panel */}
      {showInsights && (
        <div className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto">
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Performance Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metrics */}
              <div className="space-y-3">
                {metrics.map(metric => (
                  <div key={metric.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center space-x-1">
                        <span className={cn(
                          metric.status === 'good' && 'text-green-600 dark:text-green-400',
                          metric.status === 'warning' && 'text-yellow-600 dark:text-yellow-400',
                          metric.status === 'critical' && 'text-red-600 dark:text-red-400'
                        )}>
                          {Math.round(metric.value)}{metric.unit}
                        </span>
                        {metric.status === 'good' ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <Progress
                      value={(metric.value / metric.target) * 100}
                      className="h-1"
                    />
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="border-t pt-3 space-y-2">
                <h4 className="text-xs font-medium">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => trackUserAction('crisis-support-accessed')}
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    Support
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => trackUserAction('peer-community-accessed')}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Community
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => trackUserAction('offline-mode-requested')}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Offline
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => trackUserAction('time-constraint-mode-requested')}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Fast Mode
                  </Button>
                </div>
              </div>

              {/* Connection status */}
              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span>Connection</span>
                  <div className="flex items-center space-x-1">
                    <Wifi className={cn(
                      'h-3 w-3',
                      isOnline ? 'text-green-500' : 'text-red-500'
                    )} />
                    <span className={cn(
                      isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkflowOptimizer;
