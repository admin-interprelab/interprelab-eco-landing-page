import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = '',
  variant = 'horizontal',
  showLabels = true
}) => {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={cn(
      'flex',
      isHorizontal ? 'items-center space-x-4' : 'flex-col space-y-4',
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center',
              isHorizontal ? 'flex-row' : 'flex-col text-center',
              !isHorizontal && 'w-full'
            )}
          >
            {/* Step indicator */}
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
              isCompleted && 'bg-primary border-primary text-primary-foreground',
              isCurrent && 'border-primary text-primary animate-pulse',
              isPending && 'border-muted-foreground/30 text-muted-foreground'
            )}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>

            {/* Step content */}
            {showLabels && (
              <div className={cn(
                'flex flex-col',
                isHorizontal ? 'ml-3' : 'mt-2'
              )}>
                <span className={cn(
                  'text-sm font-medium',
                  isCompleted && 'text-primary',
                  isCurrent && 'text-primary',
                  isPending && 'text-muted-foreground'
                )}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            )}

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={cn(
                'bg-muted-foreground/20',
                isHorizontal
                  ? 'h-0.5 flex-1 mx-4'
                  : 'w-0.5 h-8 mx-auto my-2',
                isCompleted && 'bg-primary'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Simple linear progress bar
interface LinearProgressProps {
  value: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  className = '',
  showPercentage = false,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1">
        {showPercentage && (
          <span className="text-sm text-muted-foreground">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

// Circular progress indicator
interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 40,
  strokeWidth = 4,
  className = '',
  showPercentage = false,
  variant = 'default'
}) => {
  const variantColors = {
    default: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500'
  };

  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted-foreground/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-out', variantColors[variant])}
        />
      </svg>
      {showPercentage && (
        <span className="absolute text-xs font-medium">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
};

export default ProgressIndicator;
