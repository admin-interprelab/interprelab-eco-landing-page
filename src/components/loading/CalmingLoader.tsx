import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, Coffee, Clock, CheckCircle } from 'lucide-react';

interface CalmingLoaderProps {
  className?: string;
  message?: string;
  showProgress?: boolean;
  duration?: number;
  variant?: 'gentle' | 'supportive' | 'encouraging';
}

// Supportive messages that acknowledge interpreter time constraints and stress
const supportiveMessages = {
  gentle: [
    "Taking a moment to gather your resources...",
    "Preparing your personalized experience...",
    "Almost ready to support your journey...",
    "Setting up your professional tools..."
  ],
  supportive: [
    "We understand your time is valuable - almost ready...",
    "Preparing tools to reduce your cognitive load...",
    "Getting your stress-relief resources ready...",
    "Your professional support is loading..."
  ],
  encouraging: [
    "You're taking a positive step forward...",
    "Building your path to empowerment...",
    "Your transformation journey is beginning...",
    "Connecting you with hope and solutions..."
  ]
};

export const CalmingLoader: React.FC<CalmingLoaderProps> = ({
  className = '',
  message,
  showProgress = true,
  duration = 3000,
  variant = 'supportive'
}) => {
  const [currentMessage, setCurrentMessage] = useState(message || supportiveMessages[variant][0]);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!message) {
      const messageInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % supportiveMessages[variant].length);
      }, 2000);

      return () => clearInterval(messageInterval);
    }
  }, [message, variant]);

  useEffect(() => {
    if (!message) {
      setCurrentMessage(supportiveMessages[variant][messageIndex]);
    }
  }, [messageIndex, message, variant]);

  useEffect(() => {
    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + (100 / (duration / 100));
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [showProgress, duration]);

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-8 space-y-6',
      'bg-gradient-to-br from-blue-50/50 to-green-50/50 dark:from-blue-950/20 dark:to-green-950/20',
      'rounded-lg border border-blue-100/50 dark:border-blue-800/30',
      className
    )}>
      {/* Calming breathing animation */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-green-400 opacity-20 animate-ping"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-40 animate-pulse"></div>
        <div className="absolute inset-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white animate-pulse" />
        </div>
      </div>

      {/* Supportive message */}
      <div className="text-center space-y-2 max-w-md">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 transition-all duration-500">
          {currentMessage}
        </p>
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>We respect your time</span>
        </div>
      </div>

      {/* Progress indicator */}
      {showProgress && (
        <div className="w-full max-w-xs space-y-2">
          <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Loading...</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>
      )}

      {/* Encouragement for stressed users */}
      <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
        <Coffee className="w-3 h-3" />
        <span>Take a deep breath - you've got this</span>
      </div>
    </div>
  );
};

// Progressive content loading component
interface ProgressiveLoaderProps {
  stages: Array<{
    id: string;
    label: string;
    description?: string;
    priority: 'critical' | 'important' | 'nice-to-have';
  }>;
  currentStage: number;
  className?: string;
}

export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  stages,
  currentStage,
  className = ''
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-6 space-y-4',
      'bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10',
      'rounded-lg border border-blue-100/30 dark:border-blue-800/20',
      className
    )}>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
          Prioritizing Your Emotional Support
        </h3>
        <p className="text-sm text-muted-foreground">
          Loading the most important content first
        </p>
      </div>

      <div className="space-y-3 w-full max-w-md">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStage;
          const isCurrent = index === currentStage;
          const isPending = index > currentStage;

          return (
            <div
              key={stage.id}
              className={cn(
                'flex items-center space-x-3 p-3 rounded-lg transition-all duration-300',
                isCompleted && 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30',
                isCurrent && 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30',
                isPending && 'bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800/30'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200',
                isCompleted && 'bg-green-500 text-white',
                isCurrent && 'bg-blue-500 text-white animate-pulse',
                isPending && 'bg-gray-300 dark:bg-gray-600 text-gray-500'
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : isCurrent ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                ) : (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium truncate',
                  isCompleted && 'text-green-700 dark:text-green-300',
                  isCurrent && 'text-blue-700 dark:text-blue-300',
                  isPending && 'text-gray-500 dark:text-gray-400'
                )}>
                  {stage.label}
                </p>
                {stage.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {stage.description}
                  </p>
                )}
              </div>

              {stage.priority === 'critical' && (
                <div className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded">
                  Critical
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>Essential support content loads first</p>
      </div>
    </div>
  );
};

export default CalmingLoader;
